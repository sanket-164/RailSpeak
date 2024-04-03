import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import createHttpError from 'http-errors';
import morgan from 'morgan';
import connectToDatabase from './database.js';

import { langTranslation } from './Controller/langTranslation.js';
import { errorHandler } from './Middleware/errorHandler.js';

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

app.use('/audio', express.static('./Audio'));

app.get('/', (req, res) => {
    res.json({ message: "Hello World!" });
});

app.post('/translate', langTranslation);

app.use((req, res, next) => {
    next(createHttpError(404, req.url + " URL not found"));
});

app.use(errorHandler);