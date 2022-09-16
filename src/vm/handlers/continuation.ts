import { DispatchTable } from "../DispatchTable";

export function registerContinuationOpcodes(table: DispatchTable) {
    table.register('THROWARG', (vm, [code]) => {
        return vm.throwException(code);
    });
}