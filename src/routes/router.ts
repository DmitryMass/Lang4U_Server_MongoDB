import { Request, Response, Router } from 'express';
import multer from 'multer';
import { login, registration } from '../controllers/auth';
import {
    createCourse,
    deleteCourse,
    editCourse,
    getCourse,
    getCurrentCourse,
} from '../controllers/courses';
import { sendLessond } from '../controllers/firstLesson';
import { sendSupport } from '../controllers/support';
import {
    loginValidator,
    registerValidator,
} from '../validationScheme/authValidation';

const upload = multer(); // formdat
const router = Router();

router.post('/registration', registerValidator, registration);
router.post('/login', loginValidator, login);
router.delete('/logout', async (req: Request, res: Response) => {
    return res.status(200).send({ message: 'Ok' });
});

// Courses Route
router.get('/course/', getCourse);
router.get('/course/:id', getCurrentCourse);
router.post('/course', createCourse);
router.put('/course/:id', editCourse);
router.delete('/course/:id', deleteCourse);

// first lesson
router.post('/lesson', sendLessond);
// user order

// contact/help/improv
router.post('/support', sendSupport);

export default router;
