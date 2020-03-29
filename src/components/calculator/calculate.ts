import {Decimal} from 'decimal.js';

function operatorCalc(value1: any, value2: any, operator: any) {
  let result;
  switch (operator) {
    case "+":
      result = Decimal.add(value2, value1);
      break;
    case "-":
      result = Decimal.sub(value2, value1);
      break;
    case "x":
      result = Decimal.mul(value2, value1);
      break;
    case "/":
      result = Decimal.div(value2, value1);
      break;
    default:
      result = 0;
      break;
  }
  return result
}

function getPrio() {
  let prio = new Map();
  prio.set('/', 15);
  prio.set('x', 15);
  prio.set('+', 10);
  prio.set('-', 10);
  return prio;
}

let priority = getPrio();
let pkeys = Array.from(priority.keys()).join('');

function string2array(fullvalue: string, pkeys: string) {
  let turnVal = fullvalue;
  let result = [];
  while (true) {
    let keyS = turnVal.search(`[${pkeys}]`);
    if (keyS === -1) break;
    result.push(turnVal.slice(0, keyS));
    result.push(turnVal[keyS]);
    turnVal = turnVal.slice(keyS+1);
  }
  if (turnVal !== "") result.push(turnVal);
  return result;
}

function in2post(fullValue: string) {
  // priority data
  let stack = [];
  let getValue = "";
  let postfix = [];

  for (let el of string2array(fullValue, pkeys)) {
    if (el.match(`[${pkeys}]`)) {
      postfix.push(Number(getValue));
      getValue = "";
      while (priority.get(stack[stack.length - 1]) >= priority.get(el)) {
        postfix.push(stack.pop());
      }
      stack.push(el);
    } else {
      getValue += el;
    }
  }
  getValue && postfix.push(Number(getValue));
  for (let x = stack.pop(); x !== undefined; x = stack.pop()) postfix.push(x);
  return postfix;
}

function exePostfix(postfix: Array<any>) {
  let numbers = [] as any;
  for (let el of postfix) {
    if (typeof el == "number") {
      numbers.push(el);
    } else {
      numbers.push(operatorCalc(numbers.pop(), numbers.pop(), el));
    }
  }
  return numbers[0];
}

function calculateInfix(fullValue: string):string {
  // check 2 value and 2 operator
  let postfix = in2post(fullValue);
  let calculated = exePostfix(postfix);

  return calculated.toString();
}

export { calculateInfix, pkeys };
