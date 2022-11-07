import { check } from 'express-validator';

export const registerValidator = [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 4 символов').isLength({
        min: 4,
    }),
];
export const loginValidator = [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
];
