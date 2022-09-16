import BN from "bn.js";
import { Builder, Cell } from "ton";
import { VMStackItem } from "./VMStackItem";

export class VMStack {

    #values: VMStackItem[];

    constructor(initial: VMStackItem[] = []) {
        this.#values = [...initial].reverse();
    }

    get depth() {
        return this.#values.length;
    }

    clear() {
        this.#values = [];
    }

    dump() {
        return [...this.#values].reverse();
    }

    at(index: number): VMStackItem {
        if (index < 0) {
            throw new Error('Negative index');
        }
        if (index >= this.#values.length) {
            throw new Error('Index out of bounds');
        }
        return this.#values[this.#values.length - index - 1];
    }

    set(index: number, value: VMStackItem) {
        if (index < 0) {
            throw new Error('Negative index');
        }
        if (index >= this.#values.length) {
            throw new Error('Index out of bounds');
        }
        this.#values[this.#values.length - index - 1] = value;
    }

    push(value: VMStackItem) {
        this.#values.push(value);
    }

    pop(index: number = 0) {
        if (index >= this.#values.length) {
            throw new Error('Index out of bounds');
        }

        let ri = this.#values.length - index - 1;
        let res = this.#values[ri];
        this.#values = [...this.#values.slice(0, ri), ...this.#values.slice(ri + 1)];
        return res;
    }

    swap(i1: number, i2: number) {
        let a = this.at(i1);
        let b = this.at(i2);
        this.set(i1, b);
        this.set(i2, a);
    }

    reverse(i: number, l: number) {
        if (i + l >= this.#values.length) {
            throw new Error('Index out of bounds');
        }

        let items: VMStackItem[] = [];
        for (let k = 0; k < l; k++) {
            items.push(this.at(i + k));
        }
        items.reverse();
        for (let k = 0; k < l; k++) {
            this.set(i + k, items[k]);
        }
    }

    blockswap(i: number, j: number) {
        this.reverse(i, j);
        this.reverse(j, 0);
        this.reverse(i + j, 0);
    }

    truncateTop(l: number) {
        if (l >= this.#values.length) {
            throw new Error('Index out of bounds');
        }
        this.#values = this.#values.slice(this.#values.length - l);
    }
    truncateBottom(l: number) {
        if (l >= this.#values.length) {
            throw new Error('Index out of bounds');
        }
        this.#values = this.#values.slice(0, l);
    }

    //
    // Helpers 
    //

    popSmallIntRange(max: number, min: number = 0) {
        let v = this.pop();
        if (v.type !== 'int') {
            throw new Error('Invalid stack item');
        }
        if (v.value.gt(new BN(max)) || v.value.lt(new BN(min))) {
            throw Error('Value out of bounds');
        }
        return v.value.toNumber();
    }

    pushSmallInt(value: number) {
        this.push({ type: 'int', value: new BN(value) });
    }

    pushBool(value: boolean) {
        this.pushSmallInt(value ? -1 : 0);
    }

    pushInt(value: BN, quiet: boolean = false) {
        // TODO: Handle non-quiet case
        // if (!val->signed_fits_bits(257)) {
        //     if (!quiet) {
        //       throw VmError{Excno::int_ov};
        //     } else if (val->is_valid()) {
        //       push(td::make_refint());
        //       return;
        //     }
        //   }
        //   push(std::move(val));
        this.push({ type: 'int', value });
    }

    popInt() {
        let r = this.pop();
        if (r.type !== 'int') {
            throw Error('Invalid value on stack');
        }
        return r.value;
    }

    pushCell(src: Cell) {
        this.push({ type: 'cell', value: src });
    }

    popCell() {
        let r = this.pop();
        if (r.type !== 'cell') {
            throw Error('Invalid value on stack');
        }
        return r.value;
    }

    pushBuilder(builder: Builder) {
        this.push({ type: 'builder', value: builder });
    }

    popBuilder() {
        let r = this.pop();
        if (r.type !== 'builder') {
            throw Error('Invalid value on stack');
        }
        return r.value;
    }

    pushTuple(items: VMStackItem[]) {
        this.push({ type: 'tuple', value: items });
    }

    popTuple() {
        let r = this.pop();
        if (r.type !== 'tuple') {
            throw Error('Invalid value on stack');
        }
        return r.value;
    }
}