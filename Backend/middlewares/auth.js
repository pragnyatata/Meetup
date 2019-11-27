const _ = require("lodash");
const bcrypt = require("bcrypt");
const { Visitor } = require("../models/visitorSchema");
const {Host}=require("../models/hostSchema");
// const Joi = require("joi");
// const config = require('config');
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.post("/auth/visitor", async (req, res) => {
  let visitor = await Visitor.findOne({ email: req.body.email });
  if (!visitor) return res.status(400).send("Invalid username or password ");

  const validPassword = await bcrypt.compare(
    req.body.password,
    visitor.password
  );
  if (!validPassword)
    return res.status(400).send("Invalid username or password");

  const token = visitor.generateAuthToken();

  res.send(token);
});

router.post("/auth/host", async (req, res) => {
    let host = await Host.findOne({ email: req.body.email });
    if (!host) return res.status(400).send("Invalid username or password ");

    const validPassword = await bcrypt.compare(
        req.body.password,
        host.password
    );
    if (!validPassword)
        return res.status(400).send("Invalid username or password");

    const token = host.generateAuthToken();

    res.send(token);
});


module.exports = router;
