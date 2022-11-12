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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const bindcourse_1 = require("../controllers/bindcourse");
const courses_1 = require("../controllers/courses");
const firstLesson_1 = require("../controllers/firstLesson");
const support_1 = require("../controllers/support");
const user_1 = require("../controllers/user");
const authValidation_1 = require("../validationScheme/authValidation");
// const upload = multer(); // formdat
const router = (0, express_1.Router)();
router.post('/registration', authValidation_1.registerValidator, auth_1.registration);
router.post('/login', authValidation_1.loginValidator, auth_1.login);
router.delete('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send({ message: 'Ok' }).end();
}));
router.get('/user', user_1.getUserInfo);
router.post('/user', user_1.updateUserInfo);
// Courses Route
router.get('/course/', courses_1.getCourse);
router.get('/course/:id', courses_1.getCurrentCourse);
router.post('/course', courses_1.createCourse);
router.put('/course/:id', courses_1.editCourse);
router.delete('/course/:id', courses_1.deleteCourse);
// user + course route
router.post('/course/bindcourse', bindcourse_1.bindCourse);
// first lesson
router.post('/lesson', firstLesson_1.sendLessond);
// user order
// contact/help/improv
router.post('/support', support_1.sendSupport);
exports.default = router;
