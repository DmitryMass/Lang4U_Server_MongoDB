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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserInfo = exports.getUserInfo = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../models/User"));
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        const verifyUser = (0, jsonwebtoken_1.verify)(authorization, process.env.SECRET_KEY);
        if (!verifyUser) {
            return res.status(401).send({ message: 'Bad verify' });
        }
        const user = yield User_1.default.findOne({ _id: verifyUser.id });
        return res.status(200).send(user);
    }
    catch (e) {
        return res.status(401).send({ message: 'Bad verify' });
    }
});
exports.getUserInfo = getUserInfo;
const updateUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, headers: { authorization }, } = req;
        const verifyUser = (0, jsonwebtoken_1.verify)(authorization, process.env.SECRET_KEY);
        if (!verifyUser) {
            return res.status(401).send({ message: 'Bad verify' });
        }
        const user = yield User_1.default.findOne({ _id: verifyUser.id });
        if (user) {
            yield user.updateOne(Object.assign({ user }, body));
            yield user.save();
            return res.status(200).send({ message: 'Ok' });
        }
        else {
            return res.status(401).send({ message: 'Bad Verify' });
        }
    }
    catch (e) {
        return res.status(401).send({ message: 'Not verified' });
    }
});
exports.updateUserInfo = updateUserInfo;
