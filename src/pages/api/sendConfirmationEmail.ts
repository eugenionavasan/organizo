import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, date, time, service } = req.body;

        // Validating the request body
        if (!name || !email || !date || !time || !service) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Transported object using SMTP server details
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Booking Confirmation',
            html: `<p>Dear ${name},</p>
                  <p>Thank you for your booking.</p>
                  <p><strong>Service:</strong> ${service}</p>
                  <p><strong>Date:</strong> ${date}</p>
                  <p><strong>Time:</strong> ${time}</p>
                  <p>We look forward to serving you!</p>`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Confirmation email sent successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error sending confirmation email' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}