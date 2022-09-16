import { testVM } from "./utils/testVm";

describe('stack', () => {
    it('should process stack', async () => {
        await testVM('stack.fif');
    });
});