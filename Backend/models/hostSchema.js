let mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const config = {
  jwtPrivateKey: "unsecureKey",
  db: "mongodb://localhost/visitor_app",
  port: "3900",
  requiresAuth: false,
  email: "test.email.visitorapp@gmail.com",
  password: "visitorapp@1234"
};
var hostSchema = new Schema({
  name: String,
  email: String,
  contact: Number,
  password: String,
  hostVisitors: [
    {
      type: Object
    }
  ]
});

hostSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isHost: this.isHost
    },
    config.jwtPrivateKey
  );
  return token;
};

let Host = mongoose.model("Host", hostSchema);
module.exports = Host;
