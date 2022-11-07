import * as dotenv from 'dotenv';
dotenv.config();

import { RequestHandler } from 'express';
import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';

import { validationResult } from 'express-validator';
import User from '../models/User';

interface IAuth {
    email: string;
    password: string;
    confirm?: string;
}

function jwtToken(id: string | number, email: string) {
    return sign(
        {
            id,
            email,
        },
        process.env.SECRET_KEY as string,
        { expiresIn: '24h' }
    );
}

export const registration: RequestHandler = async (req, res) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(404).send({
                errors: validationErrors.array(),
                message: 'Incorrect data (email or password)',
            });
        }

        const { email, password } = req.body as IAuth;

        const checkUser = await User.findOne({ email }).exec();
        if (checkUser) {
            return res
                .status(404)
                .send({ message: 'Вибачте такий користувач вже існує.' });
        }

        const user = new User({
            email,
            password: await hash(password, 10),
        });

        await user.save();

        return res.status(200).send({ message: 'Ok' });
    } catch (e) {
        return res
            .status(500)
            .send({ message: 'Xай йому грець тому серверу. Вибачте.' });
    }
};

export const login: RequestHandler = async (req, res) => {
    try {
        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            return res.status(404).send({
                errors: validationErrors.array(),
                message: 'Incorrect data (email or password)',
            });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();

        if (!user) {
            return res.status(404).send({ message: 'Користувача не знайдено' });
        }
        if (
            user &&
            password === process.env.ADMIN &&
            (await compare(password, user.password!))
        ) {
            const token = jwtToken(user.id, email);
            return res
                .status(200)
                .send({ message: 'Ok', role: 'Admin', token });
        }

        if (user && (await compare(password, user.password!))) {
            const token = jwtToken(user.id, email);

            return res.status(200).send({ message: 'Ok', role: 'User', token });
        }
    } catch (e) {
        return res
            .status(500)
            .send({ message: 'Xай йому грець тому серверу. Вибачте.' });
    }
    return res
        .status(500)
        .send({ message: 'Xай йому грець тому серверу. Вибачте.' });
};
