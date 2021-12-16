const nodemailer = require("nodemailer");  // пакет 'nodemailer' работает с любым почтовым сервером. Посредник, кот. позволяет подключаться к почтовым серверам компании.
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465, // 25, 465 и 2255   // 465 код требует шифрование, 25 и 2255 - не требуют
    secure: true,
    auth: {
        user: "barishovaliana@gmail.com",
        pass: META_PASSWORD
    }
};

const transporter = nodemailer.createTransport(nodemailerConfig);  // объект, который занимается доставкой

const email = {
    to: "rolona3999@leanrights.com",
    from: "barishovaliana@gmail.com",
    subject: "Новая заявка с сайта",
    html: "<p>С сайта пришла новая заявка</p>"
};

transporter.sendMail(email)
    .then(() => console.log("Email send success"))
    .catch(error => console.log(error.message))