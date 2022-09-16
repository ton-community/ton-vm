import { testVM, testVMSteps } from "./utils/testVm";

describe('math', () => {
    testVMSteps('should process math', 'math.fif');
});