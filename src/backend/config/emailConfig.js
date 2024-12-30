const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail", // Nếu sử dụng Gmail
    auth: {
        user: process.env.EMAIL_USER, // Địa chỉ email của bạn
        pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng (App Password)
    },
});

// Kiểm tra kết nối với SMTP server
transporter.verify((error, success) => {
    if (error) {
        console.error("Error connecting to email server:", error);
    } else {
        console.log("Email server is ready to send messages");
    }
});

module.exports = transporter;
