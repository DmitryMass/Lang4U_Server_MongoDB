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
exports.deleteCourse = exports.editCourse = exports.getCurrentCourse = exports.createCourse = exports.getCourse = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const Course_1 = __importDefault(require("../models/Course"));
const getCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield Course_1.default.find({});
        if (course) {
            return res.status(200).send(course);
        }
        return res.status(404).send({ message: 'Помилка' });
    }
    catch (e) {
        return res
            .status(404)
            .send({ message: 'Не вдалося отримати список курсів' });
    }
});
exports.getCourse = getCourse;
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const course = new Course_1.default(Object.assign({}, body));
        yield course.save();
        return res.status(200).send({ message: 'Ok' });
    }
    catch (e) {
        return res.status(404).send({ message: 'Не вдалося створити курс' });
    }
});
exports.createCourse = createCourse;
const getCurrentCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, } = req;
        const course = yield Course_1.default.findOne({ link: id }).exec();
        if (course) {
            return res.status(200).send(course);
        }
        const idCourse = yield Course_1.default.findOne({ _id: id });
        if (idCourse) {
            return res.status(200).send(idCourse);
        }
        return res.status(404).send({ message: 'Такого курсу немає' });
    }
    catch (e) {
        return res.status(404).send({ message: 'Такого курсу немає' });
    }
});
exports.getCurrentCourse = getCurrentCourse;
const editCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, params: { id }, } = req;
        const course = yield Course_1.default.findOne({ id });
        if (course) {
            yield course.updateOne(Object.assign({}, body));
            yield course.save();
            return res.status(200).send({ message: 'Ok' });
        }
    }
    catch (e) {
        return res.status(404).send({ message: 'Не вдалося змінити курс' });
    }
});
exports.editCourse = editCourse;
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, } = req;
        const course = yield Course_1.default.findOne({ id });
        if (course) {
            yield course.remove();
            yield course.save();
            return res.status(200).send({ message: 'Курс видалений' });
        }
    }
    catch (e) {
        return res.status(404).send({ message: 'Не вдалося видалити курс' });
    }
});
exports.deleteCourse = deleteCourse;
