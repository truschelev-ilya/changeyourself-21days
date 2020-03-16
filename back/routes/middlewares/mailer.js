const nodemailer = require("nodemailer");


const registrationEmail = async () => {
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 587,
    secure: false,
    auth: {
      user: "go.21days@yandex.ru",
      pass: "89151004170"
    }
  });

  await transporter.sendMail({
    from: "<go.21days@yandex.ru>",
    to: newUser.email,
    subject: "Вы зарегистрированы! ",
    // text: "Информация о записе",
    html: `<b>Добро пожаловать на 21days.</b>`
  });
};

module.exports = registrationEmail;

