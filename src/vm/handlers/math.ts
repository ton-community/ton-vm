import { BN } from "bn.js";
import { DispatchTable } from "../DispatchTable";

export function registerMathOpcodes(table: DispatchTable) {

    //
    // Basic math
    //

    table.register('PUSHINT', (vm, [v]) => {
        vm.stack.pushInt(v, false);
        return 0;
    });
    table.register('PUSHPOW2', (vm, [v]) => {
        if (v === 256) {
            vm.stack.push({ type: 'nan' });
            return 0;
        }
        vm.stack.pushInt(new BN(2).pow(new BN(v)), false);
        return 0;
    });
    table.register('PUSHNAN', (vm) => {
        vm.stack.push({ type: 'nan' });
        return 0;
    });
    table.register('PUSHPOW2DEC', (vm, [v]) => {
        vm.stack.pushInt(new BN(2).pow(new BN(v)).subn(1), false);
        return 0;
    });
    table.register('PUSHNEGPOW2', (vm, [v]) => {
        vm.stack.pushInt(new BN(2).pow(new BN(v)).muln(-1), false);
        return 0;
    });

    table.register('ADD', (vm) => {
        let a = vm.stack.popInt();
        let b = vm.stack.popInt();
        vm.stack.pushInt(a.add(b));
        return 0;
    });
    table.register('SUB', (vm) => {
        let a = vm.stack.popInt();
        let b = vm.stack.popInt();
        vm.stack.pushInt(b.sub(a));
        return 0;
    });
    table.register('SUBR', (vm) => {
        let a = vm.stack.popInt();
        let b = vm.stack.popInt();
        vm.stack.pushInt(a.sub(b));
        return 0;
    });
    table.register('MUL', (vm) => {
        let a = vm.stack.popInt();
        let b = vm.stack.popInt();
        vm.stack.pushInt(a.mul(b));
        return 0;
    });
    table.register('ADDCONST', (vm, [x]) => {
        let a = vm.stack.popInt();
        vm.stack.pushInt(a.add(new BN(x)));
        return 0;
    });
    table.register('MULCONST', (vm, [x]) => {
        let a = vm.stack.popInt();
        vm.stack.pushInt(a.mul(new BN(x)));
        return 0;
    });

    // TODO: DIV

    // Shifts and logical operations
    table.register('LSHIFT', (vm, [x]) => {
        let a = vm.stack.popInt();
        vm.stack.pushInt(a.shln(x));
        return 0;
    });
    table.register('RSHIFT', (vm, [x]) => {
        let a = vm.stack.popInt();
        vm.stack.pushInt(a.shrn(x));
        return 0;
    });
    table.register('POW2', (vm) => {
        let a = vm.stack.popSmallIntRange(1023);
        vm.stack.pushInt(new BN(2).pow(new BN(a)));
        return 0;
    });
    table.register('AND', (vm) => {
        let a = vm.stack.popInt();
        let b = vm.stack.popInt();
        vm.stack.pushInt(a.and(b));
        return 0;
    });
    table.register('OR', (vm) => {
        let a = vm.stack.popInt();
        let b = vm.stack.popInt();
        vm.stack.pushInt(a.or(b));
        return 0;
    });
    table.register('XOR', (vm) => {
        let a = vm.stack.popInt();
        let b = vm.stack.popInt();
        vm.stack.pushInt(a.xor(b));
        return 0;
    });
    //   MIN:
    //   MAX:
    //   MINMAX:
    //   ABS:
    // table.register('NOT', (vm) => {
    //     // let a = vm.stack.popInt();
    //     // vm.stack.pushInt(a.);
    //     // TODO: Implement
    // });
    // table.register('FITS', (vm, [x]) => {
    //     // TODO: Implement
    // });
    // table.register('UFITS', (vm, [x]) => {
    //     // TODO: Implement
    // });
    //   FITS: ["int"]
    //   UFITS: ["int"]
    //   FITSX:
    //   UFITSX:
    //   BITSIZE:
    //   UBITSIZE:
}