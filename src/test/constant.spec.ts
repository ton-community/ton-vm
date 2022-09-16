import { testVM, testVMSteps } from "./utils/testVm";

describe('stack', () => {
    testVMSteps('should process stack', 'constant.fif');
});