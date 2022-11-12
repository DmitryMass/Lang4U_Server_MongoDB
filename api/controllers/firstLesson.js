"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLessond = void 0;
const sendmailer_1 = require("../sendMailer/sendmailer");
const sendLessond = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
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
            sendmailer_1.transporter.sendMail(mailForUser);
            sendmailer_1.transporter.sendMail(mailForAdmin);
            return res.status(200).send({ message: 'Ok' });
        }
    }
    catch (e) {
        return res.status(404).send({ message: 'Виникла помилка.' });
    }
});
exports.sendLessond = sendLessond;
