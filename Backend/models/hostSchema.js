let mongoose = require("mongoose");
const Schema = mongoose.Schema;

var hostSchema = new Schema({
  name: String,
  email: String,
  contact: Number,
  hostVisitors: [
    {
      type: Object
    }
  ]
});

var Host = mongoose.model("Host", hostSchema);
module.exports = Host;
