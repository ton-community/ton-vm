import { testVM, testVMSteps } from "./utils/testVm";

describe('stack', () => {
    testVMSteps('should process stack', 'stack.fif');
    testVMSteps('should handle reverse', 'stack_reverse.fif');
    testVMSteps('should handle blkswap', 'stack_blkswap.fif');
    testVMSteps('should handle blkswpx', 'stack_blkswap_x.fif');
});