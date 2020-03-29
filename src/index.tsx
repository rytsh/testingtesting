import React from "react";
import ReactDOM from "react-dom";

import Layout from "components/layout/Layout";

import "style.scss";

export default function App() {
  return (
      <Layout/>
  )
}

ReactDOM.render(<App/>, document.querySelector('#root'));
