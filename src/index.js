import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Tag from "./views/tags";
import MergeTags from "./views/tags/mergeTags";
import { Provider } from "react-redux";
import store from "./config/store";
const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route exact path="/" component={Tag} />
        <Route path="/mergeTags" component={MergeTags} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
