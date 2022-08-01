import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import colors from 'colors';

// local imports
import router from './routes';
import connectDB from './config/connectDb';
import reqLoggerMiddleware from './middleware/reqlogger.middleware';
import authMiddleware from './middleware/auth.middleaware';
import accessController from './middleware/access_conrol.middleware';

colors.enable();

// constants
const port: number | string = process.env.PORT || 3000;

// app
const app = express();

app.use(express.static('public'));

app.use(cors());
app.use(reqLoggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);
app.use(accessController);

// connect to mongoDB
connectDB();

app.listen(port, () => console.log(`Server running on port ${port}`));

app.use('/', router);
