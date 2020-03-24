import express from 'express';
import mongoose from 'mongoose';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import config from './config';
import maximRouter from './resources/maxim/maxim.router';
import { signin, signup } from './utils/auth';
import { logErrors } from './utils/logErrors';
import { genericErrorHandler } from './utils/genericErrorHandler';

export const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/signup', signup);
app.post('/signin', signin);
app.use('/maxim', maximRouter);
app.use(logErrors);
app.use(genericErrorHandler);

const connect = (url, config) => mongoose.connect(url, config);

export const start = async () => {
  try {
    await connect(config.dbUrl, config.mongoose);

    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error(err);
  }
};
