import BN from "bn.js";
import { Slice } from "ton";
import { CP0Auto } from "./parserDef";

export function readOpcode(slice: Slice) {
    let opCode = ''
    while (slice.remaining > 0) {
        let opCodePart = slice.readBit();
        opCode += opCodePart ? '1' : '0'

        // Check for existing match
        let matches = CP0Auto.find(opCode);
        if (matches.length > 1) {
            continue;
        }
        if (matches.length == 1 && opCode.length !== matches[0].length) {
            continue;
        }
        if (matches.length == 0) {
            throw Error('Unknown prefix: ' + new BN(opCode, 2).toString('hex'));
        }

        // Resolve OP
        let op = CP0Auto.getOp(opCode)!;
        opCode = '';
        if (typeof op === 'function') {
            let opTxt = op(slice);
            return opTxt;
        } else {
            return op;
        }
    }
    throw Error('Unable to read opcode');
}