const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'oussemabenbouali.bouyahia@gmail.com',
    pass: ''
  }
});



module.exports={transporter}