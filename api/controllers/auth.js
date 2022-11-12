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
exports.login = exports.registration = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
function jwtToken(id, email) {
    return (0, jsonwebtoken_1.sign)({
        id,
        email,
    }, process.env.SECRET_KEY, { expiresIn: '24h' });
}
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationErrors = (0, express_validator_1.validationResult)(req);
        if (!validationErrors.isEmpty()) {
            return res.status(404).send({
                errors: validationErrors.array(),
                message: 'Incorrect data (email or password)',
            });
        }
        const { email, password } = req.body;
        const checkUser = yield User_1.default.findOne({ email }).exec();
        if (checkUser) {
            return res
                .status(404)
                .send({ message: 'Вибачте такий користувач вже існує.' });
        }
        const user = new User_1.default({
            email,
            password: yield (0, bcrypt_1.hash)(password, 10),
        });
        yield user.save();
        return res.status(200).send({ message: 'Ok' });
    }
    catch (e) {
        return res
            .status(500)
            .send({ message: 'Xай йому грець тому серверу. Вибачте.' });
    }
});
exports.registration = registration;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationErrors = (0, express_validator_1.validationResult)(req);
        if (!validationErrors.isEmpty()) {
            return res.status(404).send({
                errors: validationErrors.array(),
                message: 'Incorrect data (email or password)',
            });
        }
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email }).exec();
        if (!user) {
            return res.status(404).send({ message: 'Користувача не знайдено' });
        }
        if (user &&
            password === process.env.ADMIN &&
            (yield (0, bcrypt_1.compare)(password, user.password))) {
            const token = jwtToken(user.id, email);
            return res
                .status(200)
                .send({ message: 'Ok', role: 'Admin', token });
        }
        if (user && (yield (0, bcrypt_1.compare)(password, user.password))) {
            const token = jwtToken(user.id, email);
            return res.status(200).send({ message: 'Ok', role: 'User', token });
        }
    }
    catch (e) {
        return res
            .status(500)
            .send({ message: 'Xай йому грець тому серверу. Вибачте.' });
    }
    return res
        .status(500)
        .send({ message: 'Xай йому грець тому серверу. Вибачте.' });
});
exports.login = login;
