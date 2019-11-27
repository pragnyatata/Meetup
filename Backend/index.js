const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const getTime = require("./helpers/getTime");
const nodemailer = require("nodemailer");

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

const visitor = require("./models/visitorSchema");
const host = require("./models/hostSchema");

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
      text: JSON.stringify(visitorObj)
    };
    //send email to host
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
    { email: currentUser.hostEmail },
    { $push: { hostVisitors: currentUser } }
  );
  console.log("Updated visitor list of Host");
  await visitor.findByIdAndDelete(currentUser._id);
  console.log("Deleted current Visitor from DB");

  let mailOptions = {
    from: config.email,
    to: currentUser.email,
    subject: "Sending details to Visitor for Meeting Details",
    text: JSON.stringify(currentUser)
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
    return res.status(400).send("Host Already Exists");
  }
  let hostObj = new host({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact
  });

  hostObj = await hostObj.save();
  return res.status(200).send("Successfully Registered Host");
});

const port = process.env.PORT || config.port;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
