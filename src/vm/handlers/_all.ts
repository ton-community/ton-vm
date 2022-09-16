import { DispatchTable } from "../DispatchTable";
import { registerCellOperations } from "./cell";
import { registerContinuationOpcodes } from "./continuation";
import { registerCPOperations } from "./cp";
import { registerDebugHandlers } from "./debug";
import { registerDictOperations } from "./dict";
import { registerMathOpcodes } from "./math";
import { registerStackOpcodes } from "./stack";
import { registerTupleOpcodes } from "./tuple";


//
// Definition of dispatch table
//

const table = new DispatchTable();

// Basic VM
registerStackOpcodes(table);
registerMathOpcodes(table);

// Extended basic VM
registerTupleOpcodes(table);
registerCellOperations(table);
registerDictOperations(table);


// Low Level and Debug
registerCPOperations(table);
registerDebugHandlers(table);
registerContinuationOpcodes(table);

//
// Export
//

export const allHandlers = table;