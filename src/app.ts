import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

import fileUpload from 'express-fileupload';
import router from './routes/router';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(fileUpload());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);
app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI!);
        app.listen(process.env.PORT || 3005, () => {
            console.log(`Server on port ${process.env.PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
