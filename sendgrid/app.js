const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const email = {
    to: "rolona3999@leanrights.com",    // взяли с temp email
    from: "barishovaliana@gmail.com",
    subject: "Новая заявка с сайта",
    html: "<p>С сайта пришла новая заявка</p>"   // Верстка писем - отдельное направление. При верстке писем не работает половина css св-в, flex и т.д.
};

sgMail.send(email)
    .then(() => console.log('Email send success'))
    .catch(error => console.log(error.message))