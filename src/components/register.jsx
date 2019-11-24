import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Alert } from "antd";
import Joi from "joi-browser";
class Register extends Component {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };
  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .min(1)
      .label("Name")
  };
  validate = () => {
    console.log("I am validate");
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    console.log("I am validate property");
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    if (!error) return null;
    return error.details[0].message;
  };
  handleChange = ({ currentTarget: input }) => {
    console.log("I am handle change");
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log("I worked");
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };
  doSubmit = () => {};
  render() {
    return (
      <>
        <div
          style={{
            margin: "20px 450px 20px"
          }}
        >
          <h1 style={{ color: "white", fontSize: "200%" }}>
            Register to Check-out your Visitors!
          </h1>
          <div
            style={{
              width: "400px"
            }}
          >
            <form onSubmit={this.handleSubmit} className="login-form">
              <Input
                style={{ marginTop: "20px" }}
                size="large"
                id={this.state.data.username}
                name="username"
                Placeholder="Username"
                value={this.state.data.username}
                onChange={this.handleChange}
              />
              {this.state.errors.username && (
                <Alert
                  message={this.state.errors.username}
                  type="error"
                  showIcon
                />
              )}

              <Input
                type="password"
                style={{ marginTop: "20px" }}
                size="large"
                name="password"
                id={this.state.data.password}
                Placeholder="Password"
                value={this.state.data.password}
                onChange={this.handleChange}
              />
              {this.state.errors.password && (
                <Alert
                  message={this.state.errors.password}
                  type="error"
                  showIcon
                />
              )}
              <Input
                style={{ marginTop: "20px" }}
                size="large"
                name="name"
                id={this.state.data.name}
                Placeholder="Name"
                value={this.state.data.name}
                onChange={this.handleChange}
              />
              {this.state.errors.name && (
                <Alert message={this.state.errors.name} type="error" showIcon />
              )}
              <Button
                size="large"
                type={this.validate() ? "danger" : "primary"}
                htmlType="submit"
                className="login-form-button"
                style={{ width: "400px", margin: "30px auto" }}
              >
                Register
              </Button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
