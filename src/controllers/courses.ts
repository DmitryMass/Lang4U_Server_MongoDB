import * as dotenv from 'dotenv';
dotenv.config();
import { RequestHandler } from 'express';
import Course from '../models/Course';

export const getCourse: RequestHandler = async (req, res) => {
    try {
        const course = await Course.find({});
        if (course) {
            return res.status(200).send(course);
        }
        return res.status(404).send({ message: 'Помилка' });
    } catch (e) {
        return res
            .status(404)
            .send({ message: 'Не вдалося отримати список курсів' });
    }
};

export const createCourse: RequestHandler = async (req, res) => {
    try {
        const body = req.body;
        const course = new Course({
            ...body,
        });
        await course.save();
        return res.status(200).send({ message: 'Ok' });
    } catch (e) {
        return res.status(404).send({ message: 'Не вдалося створити курс' });
    }
};

export const getCurrentCourse: RequestHandler = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;

        const course = await Course.findOne({ link: id }).exec();
        if (course) {
            return res.status(200).send(course);
        }
        const idCourse = await Course.findOne({ _id: id });
        if (idCourse) {
            return res.status(200).send(idCourse);
        }
        return res.status(404).send({ message: 'Такого курсу немає' });
    } catch (e) {
        return res.status(404).send({ message: 'Такого курсу немає' });
    }
};

export const editCourse: RequestHandler = async (req, res) => {
    try {
        const {
            body,
            params: { id },
        } = req;
        const course = await Course.findOne({ id });
        if (course) {
            await course.updateOne({ ...body });
            await course.save();
            return res.status(200).send({ message: 'Ok' });
        }
    } catch (e) {
        return res.status(404).send({ message: 'Не вдалося змінити курс' });
    }
};

export const deleteCourse: RequestHandler = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const course = await Course.findOne({ id });

        if (course) {
            await course.remove();
            await course.save();
            return res.status(200).send({ message: 'Курс видалений' });
        }
    } catch (e) {
        return res.status(404).send({ message: 'Не вдалося видалити курс' });
    }
};
