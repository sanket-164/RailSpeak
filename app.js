import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import createHttpError from 'http-errors';
import morgan from 'morgan';
import connectToDatabase from './database.js';

import { errorHandler } from './Middleware/errorHandler.js';
import { loginBroadcaster } from './Controller/loginBroadcaster.js';
import broadcasterRoutes from './routes.js';

const app = express();

connectToDatabase();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.listen(3000,()=>{
  console.log("Server listening on port 3000");
});

app.use('/audio', express.static('./uploads'));

app.get('/', (req, res) => {
    res.json({ message: "Hello World!" });
});

app.use('/broadcaster', broadcasterRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, req.url + " URL not found"));
});

app.use(errorHandler);