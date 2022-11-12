"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidator = [
    (0, express_validator_1.check)('email', 'Некорректный email').isEmail(),
    (0, express_validator_1.check)('password', 'Минимальная длина пароля 4 символов').isLength({
        min: 4,
    }),
];
exports.loginValidator = [
    (0, express_validator_1.check)('email', 'Введите корректный email').normalizeEmail().isEmail(),
    (0, express_validator_1.check)('password', 'Введите пароль').exists(),
];
