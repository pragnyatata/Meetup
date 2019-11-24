import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Visitors extends Component {
  state = {
    data: { name: "", email: "", contact: "" },
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
      .label("Email"),
    contact: Joi.string()
      .required()
      .label("Contact")
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

  handleSubmit = event => {
    event.preventDefault();
    console.log("A name was submitted: ");
  };
  //console.log("I worked");
  // e.preventDeafult();
  // const errors = this.validate();
  // this.setState({ errors: errors || {} });
  // if (errors) return;

  // this.doSubmit();

  doSubmit = () => {
    console.log("Submitted");
  };
  render() {
    return (
      <div>
        <h1>Vistor's Form</h1>
        <form onSubmit={() => console.log("I am handle submit from form")}>
          <Input
            type="text"
            name="name"
            label="Name"
            value={this.state.data.name}
            onChange={this.handleChange}
            error={this.state.errors.name}
          />
          <Input
            type="text"
            name="email"
            label="Email"
            value={this.state.data.email}
            onChange={this.handleChange}
            error={this.state.errors.email}
          />
          <Input
            type="text"
            name="contact"
            label="Contact"
            value={this.state.data.contact}
            onChange={this.handleChange}
            error={this.state.errors.contact}
          />
        </form>
        <button disabled={this.validate()} className="btn btn-primary">
          Submit
        </button>
      </div>
    );
  }
}

export default Visitors;
