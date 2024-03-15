import nodemailer from 'nodemailer';

export const otpEmailSend = async (email:string, otp:string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        let info = await transporter.sendMail({
            from: 'rifshmuhammed@gmail.com',
            to: email,
            subject: `Your otp is ${otp}`,
            html: `
            <p>Please use this OTP to login</p>
        `
        });
        console.log('Email info: ', info);
        return info;
    } catch (error) {
        console.log(error);
    }
}

export const sentMail = async (email: string, text?: string) => {
    console.log(email);

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        let info = await transporter.sendMail({
            from: 'rifshmuhammed@gmail.com',
            to: email,
            subject: text,
            html: `
            <p>You have requested a password reset for your account.</p>
            <p>Click the link below to reset your password:</p>
            <a href="http://localhost:4200/reset-password?token=ldsklksl">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
        `
        });
        console.log('Email info: ', info);
        return info;
    } catch (error) {
        console.log(error);
    }
}

export default sentMail