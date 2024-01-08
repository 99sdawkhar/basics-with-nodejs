import express from "express"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middleware/error.js";
import cors from 'cors'

dotenv.config({
    path: './data/config.env',
});

export const app = express();

// middleware
app.use(express.json()); // middleware to access req.body as we don't have a form in BE
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FE_URL],
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // to allow cookies data to be set on FE from BE, w need to also set withCredentials in FE to allow this
}))

app.use('/api/v1/users', userRouter); // /users is the default prefix, so that we don't need to add it in user.ks in router
app.use('/api/v1/task', taskRouter);

// error middleware
app.use(errorMiddleware)