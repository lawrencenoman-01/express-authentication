const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  }
})

const sendForgotPasswordEmail = (to, resetToken) => {
  const mailOptions = {
    from: 'olengantengsekali@gmail.com',
    to,
    subject: 'Reset Password',
    text: `Your New Passsword: ${resetToken}`
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  })
}

module.exports = sendForgotPasswordEmail