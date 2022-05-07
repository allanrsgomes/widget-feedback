import express from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';

export const routes = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b175f81e5b83a0",
      pass: "30f74572e14819"
    }
});

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    
    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }

    })

    await transport.sendMail({
        from: 'Equipe Gomes Technologic Solutions <allan@gomestechnologicsolutions.com>',
        to: 'Allan Gomes <allan@gomestechnologicsolution.com>',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111; ">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `<div/>`
        ].join('\n')
    });

    return res.status(201).json({ data: feedback });
})