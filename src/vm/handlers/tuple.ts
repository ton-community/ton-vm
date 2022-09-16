import { DispatchTable } from "../DispatchTable";
import { VMStackItem } from "../VMStackItem";

export function registerTupleOpcodes(table: DispatchTable) {

    table.register('NULL', (vm) => {
        vm.stack.push({ type: 'null' });
        return 0;
    });
    table.register('ISNULL', (vm) => {
        let v = vm.stack.pop();
        vm.stack.pushBool(v.type === 'null');
        return 0;
    });


    table.register('TUPLE', (vm, [n]) => {
        let items: VMStackItem[] = [];
        for (let i = 0; i < n; i++) {
            let v = vm.stack.pop();
            items.push(v);
        }
        vm.stack.push({ type: 'tuple', value: items });
        return 0;
    });
    table.register('UNTUPLE', (vm, [n]) => {
        let t = vm.stack.popTuple();
        for (let i = 0; i < n; i++) {
            let v = t[i];
            vm.stack.push(v);
        }
        return 0;
    });

    table.register('INDEX', (vm, [n]) => {
        let t = vm.stack.popTuple();
        if (t.length >= n) {
            throw Error('Out of index');
        }
        vm.stack.push(t[n]);
        return 0;
    });


    //
    // Not implemented
    //
    
    table.register('INDEXQ', (vm, [n]) => {
        return 404;
    });
    table.register('SETINDEX', (vm, [n]) => {
        return 404;
    });
    table.register('SETINDEXQ', (vm, [n]) => {
        return 404;
    });
    table.register('UNPACKFIRST', (vm, [n]) => {
        return 404;
    });
    table.register('CHKTUPLE', (vm) => {
        return 404;
    });
    table.register('EXPLODE', (vm, [n]) => {
        return 404;
    });
    table.register('TUPLEVAR', (vm) => {
        return 404;
    });
    table.register('INDEXVAR', (vm) => {
        return 404;
    });
    table.register('UNTUPLEVAR', (vm) => {
        return 404;
    });
    table.register('UNPACKFIRSTVAR', (vm) => {
        return 404;
    });
    table.register('EXPLODEVAR', (vm) => {
        return 404;
    });
    table.register('SETINDEXVAR', (vm) => {
        return 404;
    });
    table.register('INDEXVARQ', (vm) => {
        return 404;
    });
    table.register('SETINDEXVARQ', (vm) => {
        return 404;
    });
    table.register('TLEN', (vm) => {
        return 404;
    });
    table.register('QTLEN', (vm) => {
        return 404;
    });
    table.register('ISTUPLE', (vm) => {
        return 404;
    });
    table.register('LAST', (vm) => {
        return 404;
    });
    table.register('TPUSH', (vm) => {
        return 404;
    });
    table.register('TPOP', (vm) => {
        return 404;
    });
    table.register('NULLSWAPIF', (vm) => {
        return 404;
    });
    table.register('NULLSWAPIFNOT', (vm) => {
        return 404;
    });
    table.register('NULLROTRIF', (vm) => {
        return 404;
    });
    table.register('NULLROTRIFNOT', (vm) => {
        return 404;
    });
    table.register('NULLSWAPIF2', (vm) => {
        return 404;
    });
    table.register('NULLSWAPIFNOT2', (vm) => {
        return 404;
    });
    table.register('NULLROTRIF2', (vm) => {
        return 404;
    });
    table.register('NULLROTRIFNOT2', (vm) => {
        return 404;
    });
    table.register('INDEX2', (vm, [i, j]) => {
        return 404;
    });
    table.register('CADR', (vm) => {
        return 404;
    });
    table.register('CDDR', (vm) => {
        return 404;
    });
    table.register('CADDR', (vm) => {
        return 404;
    });
    table.register('CDDDR', (vm) => {
        return 404;
    });
    table.register('INDEX3', (vm, [i, j, k]) => {
        return 404;
    });
}