const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const getTime = require("./helpers/getTime");
const nodemailer = require("nodemailer");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Nexmo = require("nexmo");
const ejs = require("ejs");
const socketio = require("socket.io");

const config = {
  jwtPrivateKey: "unsecureKey",
  db: "mongodb://localhost/visitor_app",
  port: "3900",
  requiresAuth: false,
  email: "test.email.visitorapp@gmail.com",
  password: "visitorapp@1234"
};
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email,
    pass: config.password
  }
});
const nexmo = new Nexmo(
  {
    apiKey: "8d3eb829",
    apiSecret: "c2K6VeqFfYGOuCJ5"
  },
  { debug: true }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

const visitor = require("./models/visitorSchema");
const host = require("./models/hostSchema");
const auth = require("./middlewares/auth");

mongoose
  .connect(config.db)
  .then(res => console.log("DB connected successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("<h1>Hello from Visitor app backend</h1>");
});

app.post("/hostDetails", (req, res) => {
  console.log(req.body);
  return res.status(200);
});

app.post("/userCheckin", async (req, res) => {
  console.log(req.body);
  const { name, email, contact, hostEmail } = req.body;
  //console.log(email);
  //check if submitted host exist in DB, if yes only then proceeed
  let existingUser = await visitor.findOne({ email: email });
  console.log(existingUser);
  if (existingUser) {
    return res.status(400).send("User Already Checked-In");
  } else {
    let visitorObj = new visitor({
      name: name,
      email: email,
      contact: contact,
      hostEmail: hostEmail,
      checkin: getTime(),

      checkout: null
    });

    let mailOptions = {
      from: config.email,
      to: hostEmail,
      subject: "Sending details to Host for check-In Details",
      text:
        "A meeting has been setup and the details are as follows: Name:" +
        visitorObj.name +
        " email:" +
        visitorObj.email +
        " Phone:" +
        visitorObj.contact
    };

    //send email to host
    await host.findOneAndUpdate(
      { email: visitorObj.hostEmail },
      { $push: { hostVisitors: visitorObj } }
    );
    //Nexmo code has been commented since it needs some Virtualphone no to send the messages.
    // const text ="A meeting has been setup and the details are as follows: Name:" +
    // visitorObj.name +
    // " email:" +
    // visitorObj.email +
    // " Phone:" +
    // visitorObj.contact
    // const from=someno;
    // const to = hostno;
    // await nexmo.message.sendSms(from, to, text, function(err, res) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(res);
    //   }
    // });
    await transporter
      .sendMail(mailOptions)
      .then(res => {
        console.log("Email sent: " + res.response);
      })
      .catch(err => console.log(err));
    visitorObj = await visitorObj.save();
    return res.status(200).send("Checkin succesfull");

    //console.log("Checkin time: ", checkintime);
  }
});

app.post("/userCheckout", async (req, res) => {
  //send details of session to the user via  email
  console.log(req.body);
  const currentUser = await visitor.findOne({ email: req.body.email });

  if (!currentUser) {
    return res.status(400).send("User Already Checked out");
  }
  currentUser.checkout = getTime();
  await host.findOneAndUpdate(
    {
      email: currentUser.hostEmail,
      "hostVisitors.email": currentUser.email
    },
    {
      $set: { "hostVisitors.$.checkout": currentUser.checkout }
    }
  );
  console.log("Updated visitor list of Host");
  await visitor.findByIdAndDelete(currentUser._id);
  console.log("Deleted current Visitor from DB");

  let mailOptions = {
    from: config.email,
    to: currentUser.email,
    subject: "Sending details to Visitor for Meeting Details",
    text:
      "Here are your checkoutdetails as follows" +
      " Name : " +
      currentUser.name +
      " contact: " +
      currentUser.contact +
      " email: " +
      currentUser.email +
      " check in date: " +
      currentUser.checkin.date +
      "|" +
      currentUser.checkin.month +
      "|" +
      currentUser.checkin.year +
      " check in time " +
      currentUser.checkin.hours +
      ":" +
      currentUser.checkin.minutes +
      " check out date: " +
      currentUser.checkout.date +
      "|" +
      currentUser.checkout.month +
      "|" +
      currentUser.checkout.year +
      " check out time " +
      currentUser.checkout.hours +
      ":" +
      currentUser.checkout.minutes
  };

  //send email to host
  await transporter
    .sendMail(mailOptions)
    .then(res => {
      console.log("Email sent: " + res.response);
    })
    .catch(err => console.log(err));
  return res.status(200).send("Successfully checked-out");
});

app.get("/host", async (req, res) => {
  const hosts = await host.find().sort("name");
  res.send(hosts);
});

app.post("/registerHost", async (req, res) => {
  console.log(req.body);
  let existingHost = await host.findOne({ email: req.body.email });

  if (existingHost) {
    return res.status(400).send("Host Already Registered");
  }

  let hostObj = new host({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    contact: req.body.contact
  });
  console.log(hostObj);
  //let salt = await bcrypt.genSalt(10);
  hostObj.password = await bcrypt.hash(hostObj.password, 10);

  const token = hostObj.generateAuthToken();
  // console.log(token);
  hostObj = await hostObj.save();

  return res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(hostObj, ["_id", "name", "email"]));
});

app.post("/auth/host", async (req, res) => {
  let currentHost = await host.findOne({ email: req.body.email });

  if (!currentHost) return res.status(400).send("You are Not Registered");

  const validPassword = await bcrypt.compare(
    req.body.password,
    currentHost.password
  );
  if (!validPassword)
    return res.status(400).send("Invalid username or password");

  const token = currentHost.generateAuthToken();

  return res.status(200).send(token);
});

app.get("/meetingScheduled/:id", async (req, res) => {
  let currentHost = await host.findById(req.params.id);

  if (!currentHost) {
    return res.status(400).send("Host Does not Exist");
  }

  let currentMeetings = currentHost.hostVisitors;

  return res.send(currentMeetings);
});

const port = process.env.PORT || config.port;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
