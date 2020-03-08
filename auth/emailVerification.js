const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const sendVerificationMail = async (req, res, next) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "alexandrulivanul13@gmail.com",
      pass: "e8tjRwzmzbee"
    }
  });

  // send mail with defined transport object


  await transporter.sendMail({
    from: process.env.GMAIL_SENDER_INFO, // sender address
    to: req.body.email, // list of receivers
    subject: 'Schoolink verification link', // Subject line
    html: `<a href="http://${req.hostname}:${process.env.SERVER_PORT}/api/register/student/verify/${req.body.token}">Click here to verify your Schoolink account </a>`
  }, (err, data) => {
    if (!err) {
      return next();
    } else return err;
  })
}

module.exports = sendVerificationMail;