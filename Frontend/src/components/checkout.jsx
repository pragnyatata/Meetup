import React, { Component } from "react";
import Joi from "joi-browser";
import { Form, Icon, Input, Button, Checkbox, Alert } from "antd";
import { checkoutVisitor } from "../services/user";
import { toast } from "react-toastify";
class Checkout extends Component {
  state = {
    data: { name: "", email: "" },
    errors: {}
  };
  schema = {
    name: Joi.string()
      .max(30)
      .required()
      .label("Name"),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .label("Email")
  };
  validate = () => {
    //console.log("I am validate");
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    //console.log("I am validate property");
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    if (!error) return null;
    return error.details[0].message;
  };
  handleChange = ({ currentTarget: input }) => {
    //console.log("I am handle change");
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

  doSubmit = async () => {
    try {
      console.log(this.state.data);
      await checkoutVisitor(this.state.data);
      toast.success("Successfully Checked-Out");
      this.props.history.push("/home");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  componentDidMount() {
    toast.configure({
      autoClose: 8000,
      draggable: false,
      position: toast.POSITION.TOP_CENTER
      //etc you get the idea
    });
  }
  render() {
    const style = {
      marginLeft: 10
    };

    return (
      <>
        <div
          style={{
            margin: "20px 450px 20px"
          }}
        >
          <h1 style={{ color: "white", fontSize: "200%" }}>
            Check-Out from here!
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
                id={this.state.data.name}
                name="name"
                Placeholder="Name"
                value={this.state.data.name}
                onChange={this.handleChange}
              />
              {this.state.errors.name && (
                <Alert message={this.state.errors.name} type="error" showIcon />
              )}

              <Input
                style={{ marginTop: "20px" }}
                size="large"
                name="email"
                id={this.state.data.email}
                Placeholder="Email"
                value={this.state.data.email}
                onChange={this.handleChange}
              />
              {this.state.errors.email && (
                <Alert
                  message={this.state.errors.email}
                  type="error"
                  showIcon
                />
              )}

              <Button
                size="large"
                type={this.validate() ? "danger" : "primary"}
                htmlType="submit"
                className="login-form-button"
                style={{ width: "400px", margin: "30px auto" }}
              >
                Checkout
              </Button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Checkout;
