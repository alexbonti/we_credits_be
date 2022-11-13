/**
 * Please use appLogger for logging in this file try to abstain from console
 * levels of logging:
 * - TRACE - ‘blue’
 * - DEBUG - ‘cyan’
 * - INFO - ‘green’
 * - WARN - ‘yellow’
 * - ERROR - ‘red’
 * - FATAL - ‘magenta’
 */
 const nodemailer = require('nodemailer');
const hbs = require('handlebars');

const templates = {
  generic: require('./mailTemplates/genericMail'),
  otpverification: require('./mailTemplates/otpVerify'),
  passwordreset: require('./mailTemplates/passwordreset')
};

// To be used when using internal deakin SMTP server

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.NODEMAILER_USER,
//     pass: process.env.NODEMAILER_PASSWORD
//   }
// });


const defaultMailOptions = {
  from: "" + process.env.APPNAME + "<" + process.env.NODEMAILER_USER + ">",
  to: "",
  subject: "Reset password for the " + process.env.APPNAME + " app",
  //text: 'This is an automated email to confirm your OTP which is :'
  html: templates.generic.htmlPage
};

/**
 * 
 * @param {String} to email which the mail needs to be sent 
 * @param {String} subject subject of the email
 * @param {any} data 
 * @param {String} templateToUse generic | newaccount | otpverification | passwordreset
 */
const sendMail = (to, subject, data, templateToUse) => {
  if (process.env.NODEMAILER_USER === undefined && process.env.NODEMAILER_PASSWORD === undefined) {
    console.error('ERROR : Nodemailer Imp ERROR')
    return;
  } if (process.env.NODEMAILER_USER === '' && process.env.NODEMAILER_PASSWORD === '') {
    console.error('ERROR : Nodemailer Impemention ERROR')
    return;
  }
  if (to === undefined) throw "Recipient required";
  let selectedTemplate = Object.keys(templates).includes(templateToUse.toLowerCase()) ? templates[templateToUse.toLowerCase()] : templates.generic;
  const template = hbs.compile(selectedTemplate.htmlPage);
  let mailOptions = defaultMailOptions;
  mailOptions.subject = subject;
  mailOptions.to = to;
  mailOptions.html = template(data);
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}


module.exports = {
  sendMail: sendMail,
};