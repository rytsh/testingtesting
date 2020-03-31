import React from "react";
import {render, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';

import Calculator from "components/calculator/View";
import store from "store/one";

interface calculatorObject {
  history: Array<any>
};

interface storeObject {
  calculator: calculatorObject
}

function renderWithRedux(
  ui:any,
  storex:any = store
) {
  return {
    ...render(<Provider store={storex}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    storex,
  }
}

describe("Press and History Tests", ()=> {
  afterEach(()=>{
    cleanup();
  });

  it("Press 9+2 and equal should be 11", ()=>{
      const { container, getByText } = renderWithRedux(<Calculator />);
      fireEvent.click(getByText('9'));
      fireEvent.click(getByText('+'));
      fireEvent.click(getByText('2'));
      fireEvent.click(getByText('='));
      let calcScreen = document.getElementById("calcScreen") as HTMLInputElement;
      expect(calcScreen.value).toBe("11");

      let check = store.getState() as storeObject;
      expect(check.calculator.history[check.calculator.history.length-1].calc).toMatch("9+2 = 11");
  })

})
