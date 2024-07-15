import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

const transporter=nodemailer.createTransport({
    service: 'gmail',
    host:"smtp.gmail.com",
    secure:'true',
    port: 465,
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
    },
});

export default transporter;
