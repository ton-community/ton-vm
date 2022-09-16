import { OpCodes } from "../codepage/opcodes.gen";
import { VM } from "./VM";

type SelectOpcode<T> = Extract<OpCodes, { code: T }>;
type Handler<T, P> = T extends { args: any } ? (vm: VM, args: T['args']) => P : (vm: VM) => P;
type HandlerProcessor<T, P> = T extends { args: any } ? (args: T['args']) => P : () => P;


export class DispatchTable {

    private readonly handlers: Map<string, (vm: VM, handler: any) => number>;
    private readonly preprocesors: Map<string, (handler: any) => OpCodes[]>;

    constructor() {
        this.handlers = new Map();
        this.preprocesors = new Map();
    }

    register<T extends OpCodes['code']>(code: T, handler: Handler<SelectOpcode<T>, number>) {
        if (this.handlers.has(code) || this.preprocesors.has(code)) {
            throw Error('Opcode ' + code + ' already registered');
        }
        this.handlers.set(code, handler);
    }

    preprocessor<T extends OpCodes['code']>(code: T, handler: HandlerProcessor<SelectOpcode<T>, OpCodes[]>) {
        if (this.handlers.has(code) || this.preprocesors.has(code)) {
            throw Error('Opcode ' + code + ' already registered');
        }
        this.preprocesors.set(code, handler);
    }

    process(vm: VM, opcode: OpCodes): number {

        // Check preprocessor
        let preprocessor = this.preprocesors.get(opcode.code);
        if (preprocessor) {
            let processed: OpCodes[];
            if ((opcode as any).args) {
                processed = preprocessor((opcode as any).args);
            } else {
                processed = preprocessor(undefined);
            }
            for (let op of processed) {
                let r2 = this.process(vm, op);
                if (r2 !== 0) {
                    return r2;
                }
            }
            return 0;
        }

        let handler = this.handlers.get(opcode.code);
        if (!handler) {
            throw Error('Unimplemented opcode: ' + opcode.code);
        }
        if ((opcode as any).args) {
            return handler(vm, (opcode as any).args);
        } else {
            return handler(vm, undefined);
        }
    }
}