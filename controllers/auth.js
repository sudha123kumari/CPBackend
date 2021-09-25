require("dotenv").config();
const { json } = require("body-parser");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.Register = async (req, res) => {
  const { email, storage, ram } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: `${process.env.EMAIL_ID}`,
      pass: `${process.env.PASSWORD}`,
    },
  });

  User.find().exec((err, user) => {
    if (user) {
      const pid = user.length + 1;

      User.findOne({ email }).exec(async (err, user) => {
        if (user) {
          user.storage = storage;
          user.ram = ram;
          await user.save(async (err) => {
            if (err) {
              return res.json({
                error: "problem while saving data to database",
              });
            } else {
              console.log("data updated");

              const mailOptions = {
                from: `${process.env.EMAIL_ID}`,
                to: email,
                subject: "Updated request for realme 5 ",
                html: `
                <h2>Hello, you have  updated request for realme 5, Specification included ${storage}, ${ram} </h2>
                <p> your Registration no. is <strong>${user.pid}</strong></p>`,
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                  console.log(
                    "error while sending the mail check controller/auth"
                  );
                } else {
                  console.log("Email sent: " + info.response);
                }
              });

              return res.status(200).json({ user });
            }
          });
        } else {
          let user = new User({ email, storage, ram, pid });
          await user.save((err, success) => {
            if (err) {
              console.log("error occured in while creating new user.");
              return res.status(400).json({ error: err });
            } else {
              const mailOptions = {
                from: `${process.env.EMAIL_ID}`,
                to: email,
                subject: "Request made for for realme 5",
                html: `
              
                    <h2>Hello, you have made a new request for realme 5, Specification included ${storage} internal Storage, ${ram} RAM </h2>
                    <p>Registration no. <strong>${user.pid}</strong></p>`,
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                  console.log(
                    "error while sending the mail check controller/auth"
                  );
                } else {
                  console.log("Email sent: " + info.response);
                }
              });

              console.log("successfully created the user");
              return res.status(200).json({ user });
            }
          });
        }
      });
    }
  });
};
