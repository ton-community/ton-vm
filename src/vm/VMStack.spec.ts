import BN from "bn.js";
import { VMStack } from "./VMStack";

describe('VMStack', () => {
    it('should reverse', () => {
        let stack = new VMStack();
        stack.push({ type: 'int', value: new BN(2) });
        stack.push({ type: 'int', value: new BN(1) });
        stack.push({ type: 'int', value: new BN(0) });
        stack.reverse(0, 2);
        expect(stack.dump()).toMatchInlineSnapshot(`
[
  {
    "type": "int",
    "value": "01",
  },
  {
    "type": "int",
    "value": "00",
  },
  {
    "type": "int",
    "value": "02",
  },
]
`);
    });

    it('should push and pop', () => {
        let stack = new VMStack();
        stack.push({ type: 'int', value: new BN(2) });
        stack.push({ type: 'int', value: new BN(1) });
        stack.push({ type: 'int', value: new BN(0) });
        expect(stack.pop()).toMatchInlineSnapshot(`
{
  "type": "int",
  "value": "00",
}
`);
        expect(stack.pop()).toMatchInlineSnapshot(`
{
  "type": "int",
  "value": "01",
}
`);
        expect(stack.pop()).toMatchInlineSnapshot(`
{
  "type": "int",
  "value": "02",
}
`);
    });
});