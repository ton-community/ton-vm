import BN from "bn.js";
import { DispatchTable } from "../DispatchTable";

function div(a: BN, b: BN, round: number) {

    // Adjust for negative
    let neg = a.isNeg() !== b.isNeg();
    a = a.abs();
    b = b.abs();
    if (neg) {
        if (round === 0) {
            round = 2;
        } else if (round === 2) {
            round = 0;
        }
    }

    // Round to nearest
    if (round === 1) {
        return a.divRound(b).muln(neg ? -1 : 1);
    }

    // Floor
    if (round === 0) {
        return a.div(b).muln(neg ? -1 : 1);
    }

    // Ceil
    if (round === 2) {
        let res = a.divmod(b);

        // Fast case - exact division
        if (res.mod.isZero()) {
            return res.div.muln(neg ? -1 : 1);
        }

        return res.div.addn(1).muln(neg ? -1 : 1);
    }

    throw Error('Unknown rounding: ' + round);
}

function mod(a: BN, b: BN, round: number) {
    if (a.isNeg() !== b.isNeg()) {
        let r = div(a, b, round);
        return a.sub(r.mul(b));
    } else {
        let r = div(a, b, round);
        return a.sub(r.mul(b));
    }
}

function divmod(a: BN, b: BN, round: number) {
    if (a.isNeg() !== b.isNeg()) {
        let r = div(a, b, round);
        return { div: r, mod: a.sub(r.mul(b)) };
    } else {
        let r = div(a, b, round);
        return { div: r, mod: a.sub(r.mul(b)) };
    }
}

// function mod(a: BN, b: BN, round: number) {

//     // Adjust for negative
//     let neg = a.isNeg() !== b.isNeg();
//     a = a.abs();
//     b = b.abs();
//     if (neg) {
//         if (round === 0) {
//             round = 2;
//         } else if (round === 2) {
//             round = 0;
//         }
//     }

//     // Round to nearest
//     if (round === 1) {
//         return a.divRound(b).muln(neg ? -1 : 1);
//     }

//     // Floor
//     if (round === 0) {
//         return a.div(b).muln(neg ? -1 : 1);
//     }

//     // Ceil
//     if (round === 2) {
//         let res = a.divmod(b);

//         // Fast case - exact division
//         if (res.mod.isZero()) {
//             return res.div.muln(neg ? -1 : 1);
//         }

//         return res.div.addn(1).muln(neg ? -1 : 1);
//     }

//     throw Error('Unknown rounding: ' + round);
// }

export function registerMathOpcodes(table: DispatchTable) {

    //
    // Basic math
    //

    table.register('PUSHINT', (vm, [v]) => {
        vm.stack.pushInt(v, false);
        return 0;
    });
    table.register('PUSHPOW2', (vm, [v]) => {
        if (v === 256) {
            vm.stack.push({ type: 'nan' });
            return 0;
        }
        vm.stack.pushInt(new BN(2).pow(new BN(v)), false);
        return 0;
    });
    table.register('PUSHNAN', (vm) => {
        vm.stack.push({ type: 'nan' });
        return 0;
    });
    table.register('PUSHPOW2DEC', (vm, [v]) => {
        vm.stack.pushInt(new BN(2).pow(new BN(v)).subn(1), false);
        return 0;
    });
    table.register('PUSHNEGPOW2', (vm, [v]) => {
        vm.stack.pushInt(new BN(2).pow(new BN(v)).muln(-1), false);
        return 0;
    });

    table.register('ADD', (vm) => {
        let a = vm.stack.popInt();
        let b = vm.stack.popInt();
        vm.stack.pushInt(a.add(b));
        return 0;
    });
    table.register('SUB', (vm) => {
        let a = vm.stack.popInt();
        let b = vm.stack.popInt();
        vm.stack.pushInt(b.sub(a));
        return 0;
    });
    table.register('SUBR', (vm) => {
        let a = vm.stack.popInt();
        let b = vm.stack.popInt();
        vm.stack.pushInt(a.sub(b));
        return 0;
    });
    table.register('MUL', (vm) => {
        let a = vm.stack.popInt();
        let b = vm.stack.popInt();
        vm.stack.pushInt(a.mul(b));
        return 0;
    });
    table.register('ADDCONST', (vm, [x]) => {
        let a = vm.stack.popInt();
        vm.stack.pushInt(a.add(new BN(x)));
        return 0;
    });
    table.register('MULCONST', (vm, [x]) => {
        let a = vm.stack.popInt();
        vm.stack.pushInt(a.mul(new BN(x)));
        return 0;
    });
    table.register('DIV', (vm, [m, s, c, d, f]) => {
        if (m) {
            return 404;
        } else {
            if (s !== 0) {
                return 404;
            }
            if (c) {
                return 404;
            }

            let y = vm.stack.popInt();
            let x = vm.stack.popInt();
            if (d === 1) {
                // Divide numbers
                let res = div(x, y, f);
                vm.stack.pushInt(res);
            } else if (d === 2) {
                // Mod numbers
                let res = mod(x, y, f);
                vm.stack.pushInt(res);
            } else {
                // Divide numbers
                let res = divmod(x, y, f);
                vm.stack.pushInt(res.div);
                vm.stack.pushInt(res.mod);
            }

            //             int round_mode = (int)(args & 3) - 1;
            //   if (!(args & 12) || round_mode == 2) {
            //     throw VmError{Excno::inv_opcode};
            //   }
            //   Stack& stack = st->get_stack();
            //   VM_LOG(st) << "execute DIV/MOD " << (args & 15);
            //   stack.check_underflow(2);
            //   auto y = stack.pop_int();
            //   auto x = stack.pop_int();
            //   switch ((args >> 2) & 3) {
            //     case 1:
            //       stack.push_int_quiet(td::div(std::move(x), std::move(y), round_mode), quiet);
            //       break;
            //     case 2:
            //       stack.push_int_quiet(td::mod(std::move(x), std::move(y), round_mode), quiet);
            //       break;
            //     case 3: {
            //       auto dm = td::divmod(std::move(x), std::move(y), round_mode);
            //       stack.push_int_quiet(std::move(dm.first), quiet);
            //       stack.push_int_quiet(std::move(dm.second), quiet);
            //       break;
            //     }
            //   }
            //   return 0;

            return 0;
        }
    });

    // TODO: DIV

    // Shifts and logical operations
    table.register('LSHIFT', (vm, [x]) => {
        let a = vm.stack.popInt();
        vm.stack.pushInt(a.shln(x));
        return 0;
    });
    table.register('RSHIFT', (vm, [x]) => {
        let a = vm.stack.popInt();
        vm.stack.pushInt(a.shrn(x));
        return 0;
    });
    table.register('LSHIFTX', (vm) => {
        let x = vm.stack.popSmallIntRange(1023);
        let a = vm.stack.popInt();
        vm.stack.pushInt(a.shln(x));
        return 0;
    });
    table.register('RSHIFTX', (vm) => {
        let x = vm.stack.popSmallIntRange(1023);
        let a = vm.stack.popInt();
        vm.stack.pushInt(a.shrn(x));
        return 0;
    });
    table.register('POW2', (vm) => {
        let a = vm.stack.popSmallIntRange(1023);
        vm.stack.pushInt(new BN(2).pow(new BN(a)));
        return 0;
    });
    table.register('AND', (vm) => {
        let a = vm.stack.popInt();
        let b = vm.stack.popInt();
        vm.stack.pushInt(a.and(b));
        return 0;
    });
    table.register('OR', (vm) => {
        let a = vm.stack.popInt();
        let b = vm.stack.popInt();
        vm.stack.pushInt(a.or(b));
        return 0;
    });
    table.register('XOR', (vm) => {
        let a = vm.stack.popInt();
        let b = vm.stack.popInt();
        vm.stack.pushInt(a.xor(b));
        return 0;
    });
    //   MIN:
    //   MAX:
    //   MINMAX:
    //   ABS:
    // table.register('NOT', (vm) => {
    //     // let a = vm.stack.popInt();
    //     // vm.stack.pushInt(a.);
    //     // TODO: Implement
    // });
    // table.register('FITS', (vm, [x]) => {
    //     // TODO: Implement
    // });
    // table.register('UFITS', (vm, [x]) => {
    //     // TODO: Implement
    // });
    //   FITS: ["int"]
    //   UFITS: ["int"]
    //   FITSX:
    //   UFITSX:
    //   BITSIZE:
    //   UBITSIZE:
}