import React from "react";
import { Router } from 'react-router-dom'
import {render, screen, fireEvent, getByTestId} from '@testing-library/react';
import { createMemoryHistory } from 'history';

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

test('full app rendering/navigating', () => {
  const {container} = renderWithRouter(<Layout/>);
  // normally I'd use a data-testid, but just wanted to show this is also possible
  // expect(container.getElementsByClassName('content')[0].innerHTML).toMatch('You are home');
  expect(getByTestId(container, "title").textContent).toMatch("Welcome React-Redux Test Bench");
  const leftClick = {button: 0};
  fireEvent.click(screen.getByText(/Calculator/i), leftClick);
  // normally I'd use a data-testid, but just wanted to show this is also possible
  expect(getByTestId(container, "title").textContent).toMatch("Calculator with history");
})
