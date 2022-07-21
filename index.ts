// const express = require('express');
import 'dotenv/config';
import express, { Request } from 'express';
import cors from 'cors';
import colors from 'colors';

// local imports
import router from './routes';
import connectDB from './config/connectDb';
import reqLoggerMiddleware from './middleware/reqlogger.middleware';
import authMiddleware from './middleware/auth.middleaware';
import accessController from './controllers/access.controller';

colors.enable();

// constants
const port: number | string = process.env.PORT || 5000;

// app
const app = express();

app.use(cors());
app.use(reqLoggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);
app.use(accessController);
// var request: Request = app.request;
// app.request.newFunc = (code: number) => {
//   return code;
// };

// connect to mongoDB
connectDB();

app.listen(port, () => console.log(`Server running on port ${port}`));

app.use('/', router);
