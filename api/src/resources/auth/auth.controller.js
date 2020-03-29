import { User } from '../user/user.model';
import config from '../../config';

const userSession = user => ({
  userId: user.id,
  email: user.local.email || ''
});

const controllers = {
  signIn: async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next({
        status: 401,
        message: `Please provide valid ${!email ? 'email' : 'password'}`,
        inputName: !email ? 'email' : 'password'
      });
    }

    const userExists = await User.findOne({ 'local.email': email }).exec();

    if (!userExists) {
      return next({
        status: 401,
        message: 'Please provide valid email',
        inputName: 'email'
      });
    }

    try {
      const match = await userExists.checkPassword(password);

      if (!match) {
        return next({
          status: 401,
          message: 'Please provide valid password',
          inputName: 'password'
        });
      }

      const { local, savedMaxims } = userExists;
      const sessionizedUser = userSession(userExists);

      req.session.user = sessionizedUser;

      return res.status(201).send({ email: local.email, savedMaxims });
    } catch (err) {
      return next({
        status: 400,
        err,
        message: err.message
      });
    }
  },
  signOut: async (req, res, next) => {
    try {
      const { session } = req;
      const { user } = session;
      if (user) {
        session.destroy(err => {
          if (err) {
            return next({
              status: 400,
              err,
              message: err.message
            });
          }

          res.clearCookie(config.session.name);

          return res.status(201).send(user);
        });
      } else {
        return next({
          status: 400,
          err: null,
          message: 'Session does not exist'
        });
      }
    } catch (err) {
      return next({
        status: 400,
        err,
        message: err.message
      });
    }
  },
  signup: async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next({
        status: 401,
        message: `Please provide valid ${!email ? 'email' : 'password'}`,
        inputName: !email ? 'email' : 'password'
      });
    }

    const isRegistered = await User.findOne({ 'local.email': email }).exec();
    if (isRegistered) {
      return next({
        status: 401,
        message: 'User already exists, please provide a different email',
        inputName: 'email'
      });
    }

    try {
      const { email, password } = req.body;
      const { local, savedMaxims } = await User.create({
        'local.email': email,
        'local.password': password
      });

      return res.status(201).send({ email: local.email, savedMaxims });
    } catch (err) {
      return next({
        status: 400,
        message: `Failed creating user: ${err.message}. Please try again.`,
        inputName: 'email'
      });
    }
  }
};

export default controllers;
