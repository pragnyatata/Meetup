const Host = require("./models/hostSchema");
const Visitor = require("./models/visitorSchema");
const mongoose = require("mongoose");
const config = {
  jwtPrivateKey: "unsecureKey",
  db: "mongodb://localhost/visitor_app",
  port: "3900",
  requiresAuth: false,
  email: "test.email.visitorapp@gmail.com",
  password: "visitorapp@1234"
};

const hostData = [
  {
    name: "Prajwal",
    email: "prajwal714singh@gmail.com",
    password: "admin",
    contact: 8307057596,
    hostVisitors: []
  },
  {
    name: "Pragnya",
    email: "pragnya25012000@gmail.com",
    password: "admin",
    contact: 9705073030,
    hostVisitors: []
  }
];

async function seed() {
  await mongoose.connect(config.db);

  await Host.deleteMany({});
  await Visitor.deleteMany({});
  // for (let host of hostData) {
  //   await new Host({
  //     name: host.name,
  //     email: host.email,
  //     password: host.password,
  //     contact: host.contact
  //   }).save();
  // }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
