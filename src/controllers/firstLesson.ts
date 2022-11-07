import { RequestHandler } from 'express';
import { transporter } from '../sendMailer/sendmailer';

interface ISendMailer {
    email: string;
    rules: boolean;
}

export const sendLessond: RequestHandler = async (req, res) => {
    try {
        const { email } = req.body as ISendMailer;
        if (email) {
            const mailForUser = {
                from: 'yourhoneyparadise@gmail.com',
                to: email,
                subject: 'Вас вітає Lang4U.',
                text: 'Дякуємо за інтерес. Вашу заявку було прийнято. Очікуйте на додаткове повідомлення про підключення безкоштовного уроку. Гарного дня!',
            };
            const mailForAdmin = {
                from: 'yourhoneyparadise@gmail.com',
                to: 'yourhoneyparadise@gmail.com',
                subject: `Клієнт: ${email}`,
                text: `Залишив заявку на безкоштовний урок.`,
            };
            transporter.sendMail(mailForUser);
            transporter.sendMail(mailForAdmin);
            return res.status(200).send({ message: 'Ok' });
        }
    } catch (e) {
        return res.status(404).send({ message: 'Виникла помилка.' });
    }
};
