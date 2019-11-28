import React, { Component } from "react";

import "./home.css";
class Home extends Component {
  componentDidMount() {
    console.log("I am cdm from home");
  }
  render() {
    return (
      <div className="home">
        <h1 style={{ color: "White", textAlign: "center" }}>
          Meet-up is an Entry Management System which provides a seamless way of
          managing your visits and visitors. It helps in planning your visits in
          a way that aligns with your schedule. In the Navigator there are two
          options - Host and Visitor. If you are the Host, you can login and
          take a quick look at the scheduled meetups (along with the past
          meetings). As for a visitor, you can check-in, select your host from a
          host of options and schedule your meet-up. Meet-up wishes you happy
          and productive meetings :)
        </h1>
      </div>
    );
  }
}

export default Home;
