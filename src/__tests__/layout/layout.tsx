import React from "react";
import { Router } from 'react-router-dom'
import {render, screen, fireEvent, waitFor, waitForElement, getByAltText} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import cheerio from "cheerio";

import Layout from "components/layout/Layout";

interface params {
  route?: string;
  history?: any;
}

function renderWithRouter(
  ui:any,
  {route = '/', history = createMemoryHistory({initialEntries: [route]})}:params = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

test('full app rendering/navigating', async () => {
  const mockText = Promise.resolve(
    '# hello'
  );
  const mockFetchPromise = Promise.resolve({
    ok: true,
    text: () => mockText
  });

  jest.spyOn(global as any, 'fetch').mockImplementation(() => mockFetchPromise);

  const {container, getByText } = renderWithRouter(<Layout/>);
  // expect(container.getElementsByClassName('content')[0].innerHTML).toMatch('You are home');
  const leftClick = {button: 0};
  fireEvent.click(getByText(/Calculator/i), leftClick);
  let $ = cheerio.load(container.innerHTML);
  expect($('.title').children('p').text()).toBe("Calculator with history");

  fireEvent.click(getByText(/Home/), leftClick);
  await waitFor(()=>{container.querySelector('h1')}, );
  // console.log(container.innerHTML);
  $ = cheerio.load(container.innerHTML);
  expect($('h1').text()).toBe("hello");
})
