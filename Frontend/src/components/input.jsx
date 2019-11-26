import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
class formInput extends Component {
  render() {
    const { name, label, error, ...rest } = this.props;
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <Input id={name} name={name} />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default formInput;
