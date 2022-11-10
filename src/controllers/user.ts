import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import User from '../models/User';

export const getUserInfo: RequestHandler = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const verifyUser: any = verify(authorization!, process.env.SECRET_KEY!);

        if (!verifyUser) {
            return res.status(401).send({ message: 'Bad verify' });
        }
        const user = await User.findOne({ _id: verifyUser.id });
        return res.status(200).send(user);
    } catch (e) {
        return res.status(401).send({ message: 'Bad verify' });
    }
};
