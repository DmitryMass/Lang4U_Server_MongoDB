"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSupport = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const Support_1 = __importDefault(require("../models/Support"));
const sendmailer_1 = require("../sendMailer/sendmailer");
const sendSupport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { email, message } = body;
        const support = new Support_1.default(Object.assign({}, body));
        yield support.save();
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
        sendmailer_1.transporter.sendMail(mailForUser);
        sendmailer_1.transporter.sendMail(mailForAdmin);
        return res.status(200).send({ message: 'OK' });
    }
    catch (e) {
        return res
            .status(404)
            .send({ message: 'Не вдалось відправити заявку' });
    }
});
exports.sendSupport = sendSupport;
