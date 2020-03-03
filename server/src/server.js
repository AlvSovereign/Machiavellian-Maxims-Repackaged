import express from 'express';
import mongoose from 'mongoose';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import config from './config';

export const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ thing: 'Hellow' }).send();
});

const connect = (url, config) => mongoose.connect(url, config);

export const start = async () => {
  try {
    await connect(config.dbUrl, config.mongooseConfig);
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/maxims`);
    });
  } catch (e) {
    console.error(e);
  }
};
