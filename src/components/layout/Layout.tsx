import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "store/one";

import Calculator from "components/calculator/View";
import Home from "components/text/info";
import Post from "components/posts/Post";
import Todo from "components/todo/Todo";

export default function Layout() {
  return (
    <Router>
      <div className="layout">
        <div className="sideBar">
          <div className="title">Test Bench</div>
            <nav>
              <NavLink exact={true} to="/">Home</NavLink>
              <NavLink to="/calc">Calculator</NavLink>
              <NavLink to="/post">Post</NavLink>
              <NavLink to="/todo">Todo</NavLink>
            </nav>
        </div>
        <div className="content">
          <Provider store={store}>
            <Switch>
                <Route path="/todo">
                  <Todo />
                </Route>
                <Route path="/calc">
                  <Calculator />
                </Route>
                <Route path="/post">
                  <Post/>
                </Route>
                <Route path="/">
                  <Home/>
                </Route>
            </Switch>
          </Provider>
        </div>
      </div>
    </Router>
  )
}
