import React, { Component } from "react";
import { getMeetings } from "../services/user";
import { getCurrentUser } from "../services/auth";

class HostVisitors extends Component {
  state = { meetings: [] };
  async componentDidMount() {
    const currentHost = getCurrentUser();
    const meetings = await getMeetings(currentHost);
    console.log(meetings.data);

    this.setState({ meetings: meetings.data });
  }
  render() {
    const { meetings } = this.state;
    return meetings.map(m => <h2>{m}</h2>);
  }
}

export default HostVisitors;
