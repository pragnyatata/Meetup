import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navBar";
import Host from "./components/host";
import Visitors from "./components/visitors";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home";
import NotFound from "./components/notFound";
import "antd/dist/antd.css";
import Register from "./components/register";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <div>
          <Switch>
            <Route path="/home" component={Home}></Route>
            <Route
              path="/visitors"
              render={props => <Visitors {...props} />}
            ></Route>
            <Route path="/host" render={props => <Host {...props} />}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/home"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
