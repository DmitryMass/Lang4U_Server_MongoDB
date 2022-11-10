import { Request, Response, Router } from 'express';
import { login, registration } from '../controllers/auth';
import { bindCourse } from '../controllers/bindcourse';
import {
    createCourse,
    deleteCourse,
    editCourse,
    getCourse,
    getCurrentCourse,
} from '../controllers/courses';
import { sendLessond } from '../controllers/firstLesson';
import { sendSupport } from '../controllers/support';
import { getUserInfo } from '../controllers/user';
import {
    loginValidator,
    registerValidator,
} from '../validationScheme/authValidation';

// const upload = multer(); // formdat
const router = Router();

router.post('/registration', registerValidator, registration);
router.post('/login', loginValidator, login);
router.delete('/logout', async (req: Request, res: Response) => {
    return res.status(200).send({ message: 'Ok' }).end();
});

router.get('/user', getUserInfo);
// Courses Route
router.get('/course/', getCourse);
router.get('/course/:id', getCurrentCourse);
router.post('/course', createCourse);
router.put('/course/:id', editCourse);
router.delete('/course/:id', deleteCourse);

// user + course route
router.post('/course/bindcourse', bindCourse);

// first lesson
router.post('/lesson', sendLessond);
// user order

// contact/help/improv
router.post('/support', sendSupport);

export default router;
