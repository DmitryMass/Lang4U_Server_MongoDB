import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import Course from '../models/Course';
import User from '../models/User';

export const bindCourse: RequestHandler = async (req, res) => {
    const {
        body: { course: currentCourse },
        headers: { authorization },
    } = req;
    const verifyUser: any = verify(authorization!, process.env.SECRET_KEY!);

    if (verifyUser) {
        const user = await User.findOne({ _id: verifyUser.id });
        const bindCourse: any = await Course.findOne({
            link: currentCourse,
        });
        if (user) {
            const checker = user?.course.reduce((acc: any, curr: any) => {
                acc[curr] = curr;
                return acc;
            }, {});
            if (checker[bindCourse?._id.toString()]) {
                return res
                    .status(401)
                    .send({ message: 'Ви вже маєте такий курс' });
            }
            await user.updateOne({
                user,
                course: [...user.course, bindCourse?._id],
            });
            await user.save();
            return res.status(200).send({ message: 'ok' });
        }
    } else {
        return res.status(401).send({ info: 'Not correct Token' });
    }
};
