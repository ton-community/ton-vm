import { Cell } from "ton";
import { VM } from "../VM";

export interface Continuation {
    jump(vm: VM): number;
}

export class ControlRegs {
    c0: Continuation | null = null;
    c1: Continuation | null = null;
    c2: Continuation | null = null;
    c3: Continuation | null = null;
    c4: Cell | null = null;
    c5: Cell | null = null;
    // Ref<Tuple> c7;                  // c7

    clear() {
        this.c0 = null;
        this.c1 = null;
        this.c2 = null;
        this.c3 = null;
        this.c4 = null;
        this.c5 = null;
    }
}

export class OrdinaryContinuation implements Continuation {
    readonly code: Cell;
    constructor(code: Cell) {
        this.code = code;
    }

    jump(vm: VM) {
        vm.setCode(this.code);
        return 0;
    }
}

export class QuitContinuation implements Continuation {
    #exitCode: number = 0

    constructor(exitCode: number = 0) {
        this.#exitCode = exitCode;
    }

    jump(vm: VM) {
        return ~this.#exitCode;
    }
}

export class ExceptionQuitContinuation implements Continuation {
    jump(vm: VM) {
        let code = vm.stack.popSmallIntRange(0xffff);
        return ~code;
    }
}