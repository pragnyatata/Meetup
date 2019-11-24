import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
class Input extends Component {
  render() {
    const { name, label, error, ...rest } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <TextField {...rest} id={name} name={name} className="form-control" />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Input;
