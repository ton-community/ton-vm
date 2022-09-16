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

function convertRefStack(src: TVMStackEntry): any {
    if (src.type === 'null') {
        return { type: 'null' };
    }
    if (src.type === 'cell') {
        return { type: 'cell', value: Cell.fromBoc(Buffer.from(src.value, 'base64'))[0].toBoc({ idx: false }).toString('base64') };
    }
    if (src.type === 'int') {
        return { type: 'int', value: new BN(src.value, 10).toString(10) };
    }
    throw Error('Unsupported stack item');
}

function convertLocStack(src: VMStackItem): any {
    if (src.type === 'null') {
        return { type: 'null' };
    }
    if (src.type === 'cell') {
        return { type: 'cell', value: src.value.toBoc({ idx: false }).toString('base64') };
    }
    if (src.type === 'int') {
        return { type: 'int', value: new BN(src.value, 10).toString(10) };
    }
    throw Error('Unsupported stack item');
}

async function executeLocal(code: Cell) {
    const vm = new VM(code, [{ type: 'int', value: new BN(0) }]);
    vm.run();
    return vm.stack.dump().map(convertLocStack);
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
    return res.stack.map(convertRefStack).reverse();
}

export async function testVM(source: string) {

    // Prepare Code
    let code = source.endsWith('fif') ? await compileF(fs.readFileSync(__dirname + '/../sources/' + source, 'utf-8')) : await compile(fs.readFileSync(__dirname + '/../sources/' + source, 'utf-8'));

    // Reference
    let remoteStack = await executeReference(code);

    // Execute VM
    let localStack = await executeLocal(code);

    // Check
    expect(localStack).toMatchObject(remoteStack);
}

export function testVMSteps(prefix: string, source: string) {
    let lines = fs.readFileSync(__dirname + '/../sources/' + source, 'utf-8').split('\n');
    for (let i = 1; i <= lines.length; i++) {
        it(prefix + ' line #' + i, async () => {

            // Compile
            let code = await compileF(lines.slice(0, i).join('\n'));

            // Reference
            let remoteStack = await executeReference(code);

            // Execute VM
            let localStack = await executeLocal(code);

            // Check
            expect(localStack).toMatchObject(remoteStack);
        });
    }
}