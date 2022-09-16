import BN from "bn.js"
import { Builder, Cell } from "ton"

export type VMStackItem =
    | {
        type: 'null'
    }
    | {
        type: 'nan'
    }
    | {
        type: 'int',
        value: BN
    }
    | {
        type: 'cell',
        value: Cell
    }
    | {
        type: 'builder',
        value: Builder
    }
    | {
        type: 'tuple',
        value: VMStackItem[]
    }