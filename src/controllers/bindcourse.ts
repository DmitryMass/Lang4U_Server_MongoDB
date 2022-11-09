import { RequestHandler } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import Course from '../models/Course';
import User from '../models/User';

export const bindCourse: RequestHandler = async (req, res) => {
    const {
        body: { course: currentCourse },
        headers: { authorization },
    } = req;
    const verifyUser: any = verify(authorization!, process.env.SECRET_KEY!);

    if (verifyUser) {
        const bindCourse = await Course.findOne({ link: currentCourse });
        const user = await User.findOne({ _id: verifyUser.id });

        if (user) {
            await user.update({
                user,
                course: [...user.course, bindCourse?._id],
            });
            await user.save();
            console.log(user);
            return res.status(200).send({ message: 'ok' });
        }
    } else {
        return res.status(401).send({ info: 'Not correct Token' });
    }
};
