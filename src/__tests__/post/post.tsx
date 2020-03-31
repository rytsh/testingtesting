import React from "react";
import {render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';

import Post from "components/posts/Post";
import store from "store/one";

function renderWithRedux(
  ui:any,
  storex:any = store
) {
  return {
    ...render(<Provider store={storex}>{ui}</Provider>),
    storex,
  };
}

function mockFetch(data:any) {
  return jest.fn().mockImplementation(()=>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  );
}

describe("Get Posts", ()=> {
  beforeAll(()=>{
    (global as any).fetch = mockFetch(
      [{
        id: 1,
        title: "hello"
      }]
    )
  });

  afterEach(()=>{
    cleanup();
  });

  it("Mock and list", async ()=>{
      const { container, getByPlaceholderText, getByText } = renderWithRedux(<Post />);
      // write something
      fireEvent.change(getByPlaceholderText(/posts/), { target: { value: 'abcd' } });
      fireEvent.click(getByText(/Get title data/));
      // await waitFor(()=>{}, {timeout: 100});
      await waitFor(()=>{container.querySelector('li')}, );
      // console.log(container.innerHTML);
      expect(getByText('hello')).toBeInTheDocument();
  });

})
