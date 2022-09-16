import { DispatchTable } from "../DispatchTable";

export function registerCPOperations(table: DispatchTable) {
    table.register('SETCP', (vm, [cp]) => {
        if (cp !== 0) {
            throw Error('Unsupported codepage');
        }
        return 0;
    });
    table.register('SETCPX', (vm) => {
        let x = vm.stack.popSmallIntRange(0x7fff, -0x8000);
        if (x !== 0) {
            throw Error('Unsupported codepage');
        }
        return 0;
    });
}