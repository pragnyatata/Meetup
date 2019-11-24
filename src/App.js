import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navBar";
import Host from "./components/host";
import Visitors from "./components/visitors";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home";
import NotFound from "./components/notFound";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/host" component={Host}></Route>
          <Route path="/visitors" component={Visitors}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/home"></Redirect>
          <Redirect to="/not-found"></Redirect>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
