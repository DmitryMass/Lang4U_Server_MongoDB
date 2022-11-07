import * as dotenv from 'dotenv';
dotenv.config();

import { RequestHandler } from 'express';
import Support from '../models/Support';
import { transporter } from '../sendMailer/sendmailer';

export const sendSupport: RequestHandler = async (req, res) => {
    try {
        const body = req.body;
        const { email, message } = body;
        const support = new Support({
            ...body,
        });
        await support.save();

        const mailForUser = {
            from: 'yourhoneyparadise@gmail.com',
            to: email,
            subject: 'Вас вітає Lang4U.',
            text: `Дякую за відгук. Очікуйте на зворотній зв'язок`,
        };
        const mailForAdmin = {
            from: 'yourhoneyparadise@gmail.com',
            to: 'yourhoneyparadise@gmail.com',
            subject: `Клієнт: ${email}`,
            text: `Повідомлення від клієнта: ${message}`,
        };
        transporter.sendMail(mailForUser);
        transporter.sendMail(mailForAdmin);

        return res.status(200).send({ message: 'OK' });
    } catch (e) {
        return res
            .status(404)
            .send({ message: 'Не вдалось відправити заявку' });
    }
};
