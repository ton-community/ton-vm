import { DispatchTable } from "../DispatchTable";

export function registerDebugHandlers(table: DispatchTable) {
    table.register('DEBUGON', (vm) => {
        vm.debug = true;
        return 0;
    });
    table.register('DEBUGOFF', (vm) => {
        vm.debug = false;
        return 0;
    });
    table.register('DUMPSTK', (vm) => {
        if (vm.debug) {
            console.warn(vm.stack.dump());
        }
        return 0;
    });
    table.register('DUMP', (vm, [x]) => {
        if (vm.debug) {
            console.warn(vm.stack.at(x));
        }
        return 0;
    });
}