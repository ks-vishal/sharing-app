const transporter = require("../configs/mailer");

const sendMail = async ({ emailTo, emailFrom, link, fileName, size }) => {
  await transporter.sendMail({
    from: emailFrom,
    to: emailTo,
    subject: "Download your file!",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <p>Hello,</p>
        <p>Your file <strong>${fileName}</strong> (${(size / 1024).toFixed(2)} KB) is ready to download.</p>
        <p><a href="${link}" style="background:#4CAF50;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">Download File</a></p>
        <p>This link will expire in 24 hours.</p>
        <p>This is an auto generated mail.</p>
      </div>
    `,
  });
};

module.exports = sendMail;
