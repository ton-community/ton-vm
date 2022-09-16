import { DispatchTable } from "../DispatchTable";

export function registerStackOpcodes(table: DispatchTable) {

    //
    // Basic Opcodes
    //

    table.register('XCHG', (vm, [a1, a2]) => {
        vm.stack.swap(a1, a2);
        return 0;
    });
    table.register('PUSH', (vm, [x]) => {
        vm.stack.push(vm.stack.at(x));
        return 0;
    });
    table.register('POP', (vm, [x]) => {
        vm.stack.pop(x);
        return 0;
    });
    table.register('REVERSE', (vm, [x, y]) => {
        vm.stack.reverse(x, y);
        return 0;
    });
    table.register('ROT', (vm) => {
        vm.stack.swap(1, 2);
        vm.stack.swap(0, 1);
        return 0;
    });
    table.register('ROTREV', (vm) => {
        vm.stack.swap(0, 1);
        vm.stack.swap(1, 2);
        return 0;
    });
    table.register('BLKDROP', (vm, [x]) => {
        for (let i = 0; i < x; i++) {
            vm.stack.pop();
        }
        return 0;
    });
    table.register('BLKPUSH', (vm, [x, y]) => {
        while (--x >= 0) {
            vm.stack.push(vm.stack.at(y));
        }
        return 0;
    });
    table.register('PICK', (vm) => {
        let x = vm.stack.popSmallIntRange(255);
        vm.stack.push(vm.stack.at(x));
        return 0;
    });
    table.register('BLKSWX', (vm) => {
        let x = vm.stack.popSmallIntRange(255);
        let y = vm.stack.popSmallIntRange(255);
        if (x > 0 && y > 0) {
            vm.stack.reverse(x, y);
            vm.stack.reverse(y, 0);
            vm.stack.reverse(x + y, 0);
        }
        return 0;
    });
    table.register('DROPX', (vm) => {
        let x = vm.stack.popSmallIntRange(255);
        for (let i = 0; i < x; i++) {
            vm.stack.pop();
        }
        return 0;
    });
    table.register('TUCK', (vm) => {
        vm.stack.swap(0, 1);
        vm.stack.push(vm.stack.at(1));
        return 0;
    });
    table.register('XCHGX', (vm) => {
        let x = vm.stack.popSmallIntRange(255);
        vm.stack.swap(0, x);
        return 0;
    });
    table.register('DEPTH', (vm) => {
        vm.stack.pushSmallInt(vm.stack.depth);
        return 0;
    });
    table.register('CHKDEPTH', (vm) => {
        let x = vm.stack.popSmallIntRange(255);
        if (x >= vm.stack.depth) {
            throw Error('Out of bounds');
        }
        return 0;
    });
    table.register('ONLYTOPX', (vm) => {
        let x = vm.stack.popSmallIntRange(255);
        vm.stack.truncateTop(x);
        return 0;
    });
    table.register('ONLYX', (vm) => {
        let x = vm.stack.popSmallIntRange(255);
        vm.stack.truncateBottom(x);
        return 0;
    });
    table.register('BLKDROP2', (vm, [x, y]) => {
        for (let i = 0; i < x; i++) {
            vm.stack.pop(y);
        }
        return 0;
    });

    //
    // Derived primitives
    //

    table.preprocessor('XCHG2', ([x, y]) => {
        return [
            { code: 'XCHG', args: [1, x] },
            { code: 'XCHG', args: [0, y] }
        ];
    });
    table.preprocessor('XCHG3', ([x, y, z]) => {
        return [
            { code: 'XCHG', args: [2, x] },
            { code: 'XCHG', args: [1, y] },
            { code: 'XCHG', args: [0, z] }
        ];
    });
    table.preprocessor('PUSH2', ([x, y]) => {
        return [
            { code: 'PUSH', args: [x] },
            { code: 'PUSH', args: [y + 1] }
        ];
    });
    table.preprocessor('PUSH3', ([x, y, z]) => {
        return [
            { code: 'PUSH', args: [x] },
            { code: 'PUSH', args: [y + 1] },
            { code: 'PUSH', args: [z + 2] }
        ];
    });
    table.preprocessor('XCPU', ([x, y]) => {
        return [
            { code: 'XCHG', args: [0, x] },
            { code: 'PUSH', args: [y] }
        ];
    });
    table.preprocessor('XCPU2', ([x, y, z]) => {
        return [
            { code: 'XCHG', args: [0, x] },
            { code: 'PUSH', args: [y] },
            { code: 'PUSH', args: [z + 1] }
        ];
    });
    table.preprocessor('XCPUXC', ([x, y, z]) => {
        return [
            { code: 'XCHG', args: [1, x] },
            { code: 'PUSH', args: [y] },
            { code: 'XCHG', args: [0, 1] },
            { code: 'XCHG', args: [0, z] },
        ];
    });
    table.preprocessor('XC2PU', ([x, y, z]) => {
        return [
            { code: 'XCHG', args: [1, x] },
            { code: 'XCHG', args: [0, y] },
            { code: 'PUSH', args: [z] }
        ];
    });
    table.preprocessor('PUXC', ([x, y]) => {
        return [
            { code: 'PUSH', args: [x] },
            { code: 'XCHG', args: [0, 1] },
            { code: 'XCHG', args: [0, y] }
        ];
    });
    table.preprocessor('PUXC2', ([x, y, z]) => {
        return [
            { code: 'PUSH', args: [x] },
            { code: 'XCHG', args: [2, 0] },
            { code: 'XCHG', args: [1, y] },
            { code: 'XCHG', args: [0, z] }
        ];
    });
    table.preprocessor('PU2XC', ([x, y, z]) => {
        return [
            { code: 'PUSH', args: [x] },
            { code: 'XCHG', args: [1, 0] },
            { code: 'PUSH', args: [y] },
            { code: 'XCHG', args: [1, 0] },
            { code: 'XCHG', args: [0, z] }
        ];
    });
    table.preprocessor('PUXCPU', ([x, y, z]) => {
        return [
            { code: 'PUSH', args: [x] },
            { code: 'XCHG', args: [0, 1] },
            { code: 'XCHG', args: [0, y] },
            { code: 'PUSH', args: [z] },
        ];
    });
    table.preprocessor('BLKSWAP', ([x, y]) => {
        return [
            { code: 'REVERSE', args: [x, y] },
            { code: 'REVERSE', args: [y, 0] },
            { code: 'REVERSE', args: [y + x, 0] },
        ];
    });
    table.preprocessor('SWAP2', () => {
        return [
            { code: 'XCHG', args: [1, 3] },
            { code: 'XCHG', args: [0, 2] }
        ];
    });
    table.preprocessor('DROP2', () => {
        return [
            { code: 'POP', args: [0] },
            { code: 'POP', args: [0] },
        ];
    });
    table.preprocessor('DUP2', () => {
        return [
            { code: 'PUSH', args: [1] },
            { code: 'PUSH', args: [1] },
        ];
    });
    table.preprocessor('OVER2', () => {
        return [
            { code: 'PUSH', args: [3] },
            { code: 'PUSH', args: [3] },
        ];
    });
}