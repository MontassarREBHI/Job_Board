var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "montassar.rebhi+230824111025@etudiant-fst.utm.tn",
    pass: "cdlyennlgpngknoa",
  },
});

module.exports = { transporter };
