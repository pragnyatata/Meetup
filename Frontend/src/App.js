import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navBar";
import Host from "./components/host";
import Visitors from "./components/visitors";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/home";
import NotFound from "./components/notFound";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

import Register from "./components/register";
import Checkout from "./components/checkout";
import HostVisitors from "./components/hostVisitors";
import { getCurrentUser } from "./services/auth";
import Logout from "./components/logout";
class App extends Component {
  state = {};
  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }
  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user}></NavBar>
        <div>
          <ToastContainer></ToastContainer>
          <Switch>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/home" component={Home}></Route>
            <Route
              path="/visitors"
              render={props => <Visitors {...props} />}
            ></Route>
            <Route path="/host/:id" component={HostVisitors} />
            <Route path="/host" render={props => <Host {...props} />}></Route>

            <Route path="/checkout" component={Checkout}></Route>
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
