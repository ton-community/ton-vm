import { Cell } from "ton";
import { compileFunc, compileFift } from "ton-compiler";
import * as fs from 'fs';
import { runTVM, TVMStack, TVMStackEntry } from 'ton-contract-executor';
import { VM } from "../../vm/VM";
import BN from "bn.js";
import { VMStackItem } from "../../vm/VMStackItem";

async function compile(src: string) {
    let compiled = await compileFunc(src);
    return Cell.fromBoc(await compileFift(compiled))[0];
}

async function compileF(src: string) {

    let cc = `
    <{
        ${src}
    }>c
    `;

    return Cell.fromBoc(await compileFift(cc))[0];
}

async function executeLocal(code: Cell) {
    const vm = new VM(code, [{ type: 'int', value: new BN(0) }]);
    vm.run();
    return vm.stack.dump();
}

function expectSameStack(a: VMStackItem[], b: VMStackItem[]) {
    expect(a).toMatchObject(b);
    // expect(a.length).toBe(b.length);
    // for (let i = 0; i < a.length; i++) {
    //     const ai = a[i];
    //     const bi = b[i];
    //     if (ai.type !== bi.type) {
    //         throw Error('Different types');
    //     }
    //     if (ai.type === 'int' && bi.type === 'int') {
    //         expect(ai.value.toString(10)).toBe(bi.value.toString(10));
    //         continue;
    //     }
    //     if (ai.type === 'null' && bi.type === 'null') {
    //         continue;
    //     }
    //     throw Error('Unsupported type');
    // }
}

function convertStack(src: TVMStackEntry): VMStackItem {
    if (src.type === 'null') {
        return { type: 'null' };
    }
    if (src.type === 'cell') {
        return { type: 'cell', value: Cell.fromBoc(Buffer.from(src.value, 'base64'))[0] };
    }
    if (src.type === 'int') {
        return { type: 'int', value: new BN(src.value, 10) };
    }
    throw Error('Unsupported stack item');
}

async function executeReference(code: Cell) {
    let res = await runTVM({
        debug: false,
        function_selector: 0,
        init_stack: [],
        code: code.toBoc({ idx: false }).toString('base64'),
        data: new Cell().toBoc({ idx: false }).toString('base64'),
        c7_register: {
            type: 'tuple',
            value: []
        }
    });
    if (!res.ok) {
        throw Error('VM Error');
    }
    return res.stack.map(convertStack).reverse();
}

export async function testVM(source: string) {

    // Prepare Code
    let code = source.endsWith('fif') ? await compileF(fs.readFileSync(__dirname + '/../sources/' + source, 'utf-8')) : await compile(fs.readFileSync(__dirname + '/../sources/' + source, 'utf-8'));

    // Reference
    let remoteStack = await executeReference(code);

    // Execute VM
    let localStack = await executeLocal(code);

    // Check
    expectSameStack(localStack, remoteStack);
}