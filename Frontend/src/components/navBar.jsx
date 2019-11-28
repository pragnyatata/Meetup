import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { PageHeader, Button } from "antd";

class NavBar extends Component {
  state = {};
  render() {
    const user = this.props.user;
    //console.log(user);
    return (
      <div
        style={{
          backgroundColor: "#F5FF5"
        }}
      >
        <PageHeader
          ghost={false}
          style={{
            background: "white",

            fontFamily: "Roboto",
            opacity: 0.7
          }}
          title="Meetup"
          subTitle="A perfect place for meeting!"
          extra={
            <React.Fragment>
              {!user
                ? [
                    <Button key="3">
                      <NavLink to="/host">Host</NavLink>
                    </Button>,
                    <Button key="2">
                      <NavLink to="/visitors">Visitor</NavLink>
                    </Button>,
                    <Button key="1">
                      <NavLink to="/home">About</NavLink>
                    </Button>
                  ]
                : [
                    <Button key="2">
                      <NavLink to="/logout">Logout</NavLink>
                    </Button>,
                    <Button key="1">
                      <NavLink to="/home">About</NavLink>
                    </Button>
                  ]}
            </React.Fragment>
          }
        ></PageHeader>
      </div>
    );
  }
}

export default NavBar;
