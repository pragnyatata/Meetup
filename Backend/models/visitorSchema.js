let mongoose = require("mongoose");
const Schema = mongoose.Schema;

var visitorSchema = new Schema({
  name: String,
  email: String,
  hostEmail: String,
  contact:Number,
  checkin: { type: Object,default: null},
  checkout: {type: Object,default: null}
});

var Visitor = mongoose.model("Visitor", visitorSchema);
module.exports = Visitor;
