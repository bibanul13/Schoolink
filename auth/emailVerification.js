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
    html: `
    <!DOCTYPE html>
    <html>

    <head>
        <style>
            .button {
                display: inline-block;
                border-radius: 4px;
                background-color: #f4511e;
                border: none;
                color: #FFFFFF;
                text-align: center;
                font-size: 28px;
                padding: 20px;
                width: 200px;
                transition: all 0.5s;
                cursor: pointer;
                margin: 5px;
                vertical-align:middle;
            }

            .button span {
                cursor: pointer;
                display: inline-block;
                position: relative;
                transition: 0.5s;
            }

            .button span:after {
                content: '\\00bb';
                position: absolute;
                opacity: 0;
                top: 0;
                right: -20px;
                transition: 0.5s;
            }

            .button:hover span {
                padding-right: 25px;
            }

            .button:hover span:after {
                opacity: 1;
                right: 0;
            }
        </style>
    </head>

    <body>

        <h2>Schoolink verification email</h2>

        <p style : "vertical-align:center">Click the button to verify the Schoolink account</p>
        <a class="button" href="http://${req.hostname}:${process.env.SERVER_PORT}/api/register/student/verify/${req.body.token}"><span>Verify account </span></a>

    </body>`
  }, (err, data) => {
    if (!err) {
      return next();
    } else return err;
  })
}

module.exports = sendVerificationMail;