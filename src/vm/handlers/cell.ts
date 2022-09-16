import { Builder } from "ton";
import { DispatchTable } from "../DispatchTable";

export function registerCellOperations(table: DispatchTable) {
    table.register('NEWC', (vm) => {
        vm.stack.pushBuilder(new Builder());
        return 0;
    });
    table.register('ENDC', (vm) => {
        vm.stack.pushCell(vm.stack.popBuilder().endCell());
        return 0;
    })
    table.register('STI', (vm, [bits]) => {
        let b = vm.stack.popBuilder();
        let v = vm.stack.popInt();
        b = b.storeInt(v, bits);
        vm.stack.pushBuilder(b);
        return 0;
    });
    table.register('STU', (vm, [bits]) => {
        let b = vm.stack.popBuilder();
        let v = vm.stack.popInt();
        b = b.storeUint(v, bits);
        vm.stack.pushBuilder(b);
        return 0;
    });
    table.register('STREF', (vm) => {
        let b = vm.stack.popBuilder();
        let v = vm.stack.popCell();
        b = b.storeRef(v);
        vm.stack.pushBuilder(b);
        return 0;
    });
}