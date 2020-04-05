import express from 'express';
import mongoose from 'mongoose';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import connectStore from 'connect-mongo';
import config from './config';
import authRouter from './resources/auth/auth.router';
import maximRouter from './resources/maxim/maxim.router';
import userRouter from './resources/user/user.router';
import initOauth from './resources/auth/oauth.init';
import {
  ErrorHandler,
  ErrorMiddleware,
  ResponseStatus
} from './utils/ErrorHandler';

const connect = (url, config) => mongoose.connect(url, config);

export const start = async () => {
  try {
    await connect(config.dbUrl, config.mongoose);
    console.log('MongoDB connected');

    const app = express();
    const MongoSessionStore = connectStore(session);

    app.disable('x-powered-by');
    app.use(
      cors({
        credentials: true
      })
    );
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(morgan('dev'));
    app.use(
      session({
        cookie: {
          sameSite: true,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: parseInt(config.session.lifetime)
        },
        name: config.session.name,
        resave: false,
        secret: config.session.secret,
        saveUninitialized: false,
        store: new MongoSessionStore({
          mongooseConnection: mongoose.connection,
          collection: 'sessions',
          ttl: parseInt(config.session.lifetime) / 1000
        })
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    initOauth();

    app.use('/auth', authRouter);
    app.use('/maxim', maximRouter);
    app.use('/user', userRouter);
    app.use(ErrorMiddleware);
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}`);
    });
  } catch (err) {
    throw new ErrorHandler(
      err,
      'Express App failed to run',
      ResponseStatus.INTERNAL_ERROR,
      null,
      false
    );
  }
};
