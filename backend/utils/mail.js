import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import Logger from "../logger/winston.logger.js";
/**
 *
 * @param {{email: string; subject: string; mailgenContent: Mailgen.Content; }} options
 */
const sendEmail = async (options) => {
  //* Iniciate the mailGen instance with default theme
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Expense Tracker",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const htmlTextual = mailGenerator.generate(options.mailgenContent);
  const transporter = nodemailer.createTransport({
    host: "",
    port: "",
    auth: {
      user: "",
      pass: "",
    },
  });

  const mail = {
    from: "",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: htmlTextual,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    // As sending email is not strongly coupled to the business logic it is not worth to raise an error when email sending fails
    // So it's better to fail silently rather than breaking the app
    Logger.error(
      "Email service failed silently. Make sure you have provided your MAILTRAP credentials in the .env file"
    );
    Logger.error("Error: ", error);
  }
};

// /**
//  *
//  * @param {string} username
//  * @param {string} verificationUrl
//  * @returns {Mailgen.Content}
//  * @description It designs the email verification mail
//  */
// const emailVerificationMailgenContent = (username, verificationUrl) => {
//   return {
//     body: {
//       name: username,
//       intro: "Welcome to our app! We're very excited to have you on board.",
//       action: {
//         instructions:
//           "To verify your email please click on the following button:",
//         button: {
//           color: "#22BC66", // Optional action button color
//           text: "Verify your email",
//           link: verificationUrl,
//         },
//       },
//       outro:
//         "Need help, or have questions? Just reply to this email, we'd love to help.",
//     },
//   };
// };
/**
 *
 * @param {string} username
 * @param {string} verificationUrl
 * @returns {Mailgen.Content}
 * @description It designs the forgot password mail
 */
const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of our account",
      action: {
        instructions:
          "To reset your password click on the following button or link:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Reset password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export {
  sendEmail,
  //   emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
};
