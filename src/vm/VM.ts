import { Cell, Slice } from "ton";
import { readOpcode } from "../codepage/readOpcode";
import { Continuation, ControlRegs, ExceptionQuitContinuation, OrdinaryContinuation, QuitContinuation } from "./continuation/Continuation";
import { allHandlers } from "./handlers/_all";
import { VMStack } from "./VMStack";
import { VMStackItem } from "./VMStackItem";

export class VM {

    static quit0 = new QuitContinuation(0);
    static quit1 = new QuitContinuation(1);
    static exceptionQuit = new ExceptionQuitContinuation();

    readonly stack: VMStack;
    readonly registers: ControlRegs;
    #codeSlice!: Slice;
    debug: boolean;

    constructor(code: Cell, stack: VMStackItem[] = [], debug: boolean = false) {
        this.stack = new VMStack(stack);
        this.registers = new ControlRegs();
        this.debug = debug;
        this.setCode(code);
        this.#initRegs();
    }

    #initRegs() {
        this.registers.c0 = VM.quit0;
        this.registers.c1 = VM.quit1;
        this.registers.c2 = VM.exceptionQuit;
        this.registers.c3 = new QuitContinuation(11); // ???
        if (!this.registers.c4) {
            this.registers.c4 = new Cell();
        }
        if (!this.registers.c5) {
            this.registers.c5 = new Cell();
        }
    }

    setCode(code: Cell) {
        this.#codeSlice = code.beginParse();
    }

    jump(continuation: Continuation) {
        return continuation.jump(this);
    }

    throwException(exitCode: number) {
        console.warn('throw exception')
        this.stack.clear();
        this.stack.pushSmallInt(0);
        this.stack.pushSmallInt(exitCode);
        this.setCode(new Cell());
        return this.jump(this.registers.c2!);
    }

    run() {
        while (true) {
            let res = this.#step();
            if (res !== 0) {
                return ~res;
            }
        }
    }

    ret() {
        return this.jump(this.registers.c0!);
    }

    retAlt() {
        return this.jump(this.registers.c1!);
    }

    #step(): number {
        if (this.#codeSlice.remaining === 0 && this.#codeSlice.remainingRefs === 0) {
            return ~1;
        }

        if (this.#codeSlice.remaining > 0) {
            let opcode = readOpcode(this.#codeSlice);
            console.warn(opcode.code);
            return allHandlers.process(this, opcode);
        } else if (this.#codeSlice.remainingRefs > 0) {
            // Implicit jmp
            let ncode = this.#codeSlice.readCell();
            return this.jump(new OrdinaryContinuation(ncode));
        } else {
            // Implicit ret
            return this.ret();
        }
    }
}