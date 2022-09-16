import { beginCell, parseDict, parseDictRefs } from "ton";
import { OrdinaryContinuation } from "../continuation/Continuation";
import { DispatchTable } from "../DispatchTable";

export function registerDictOperations(table: DispatchTable) {

    // Push static
    table.register('DICTPUSHCONST', (vm, [keyLength, cell]) => {
        vm.stack.pushCell(beginCell().storeBit(true).storeRef(cell).endCell());
        vm.stack.pushSmallInt(keyLength);
        return 0;
    });

    table.register('DICTIGETJMPZ', (vm) => {
        let k = vm.stack.popSmallIntRange(256);
        let r = vm.stack.popCell();
        let key = vm.stack.popInt();
        let res = parseDict(r.beginParse().readRef(), k, (s) => s.toCell());
        let ex = res.get(key.toString(10));
        if (!ex) {
            throw Error('!');
        }
        return vm.jump(new OrdinaryContinuation(ex));
    });
}