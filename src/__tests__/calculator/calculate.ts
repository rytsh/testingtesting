import { calculateInfix } from "components/calculator/calculate";

/*
.toBe
.toBeUndefined
.toEqual
*/

describe("Execute infix", ()=>{
  it("Calculation test 1", () => {
    expect(calculateInfix('2+1x3+2')).toStrictEqual("7");
  });

  it("Calculation test 2", () => {
    expect(calculateInfix('2+3/2+2')).toStrictEqual("5.5");
  });

  it("Calculation test 3", () => {
    expect(calculateInfix('2.1+2')).toStrictEqual("4.1");
  });
});

