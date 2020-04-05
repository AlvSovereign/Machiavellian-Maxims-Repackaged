import { User } from '../user/user.model';
import config from '../../config';
import { ErrorHandler, ResponseStatus } from '../../utils/ErrorHandler';

const userSession = ({ email, id }) => ({
  email,
  id
});

const controllers = {
  signIn: async (req, res, next) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ 'local.email': email }).exec();

    if (!userExists) {
      return next(
        new ErrorHandler(
          null,
          'User already exists. Try logging in.',
          ResponseStatus.UNAUTHORIZED,
          { inputName: 'email' },
          true
        )
      );
    }

    try {
      const match = await userExists.checkPassword(password);

      if (!match) {
        return next(
          new ErrorHandler(
            null,
            'Please provide valid email or password',
            ResponseStatus.UNAUTHORIZED,
            null,
            true
          )
        );
      }

      const { _id, local, savedMaxims } = userExists;
      const sessionizedUser = userSession({ id: _id, email: local.email });

      req.session.user = sessionizedUser;

      return res.status(201).send({ ...sessionizedUser, savedMaxims });
    } catch (err) {
      return next(
        new ErrorHandler(
          err,
          err.message,
          ResponseStatus.INTERNAL_ERROR,
          null,
          true
        )
      );
    }
  },
  signOut: async (req, res, next) => {
    try {
      const { session } = req;
      const { user } = session;

      if (user) {
        session.destroy(err => {
          if (err) {
            return next(
              new ErrorHandler(
                err,
                err.message,
                ResponseStatus.INTERNAL_ERROR,
                null,
                true
              )
            );
          }

          res.clearCookie(config.session.name);

          return res.status(201).end();
        });
      } else {
        return next(
          new ErrorHandler(
            null,
            'Session does not exist',
            ResponseStatus.BAD_REQUEST,
            null,
            true
          )
        );
      }
    } catch (err) {
      return next(
        new ErrorHandler(
          err,
          err.message,
          ResponseStatus.BAD_REQUEST,
          null,
          true
        )
      );
    }
  },
  signup: async (req, res, next) => {
    const { email } = req.body;

    const isRegistered = await User.findOne({ 'local.email': email }).exec();
    if (isRegistered) {
      return next(
        new ErrorHandler(
          null,
          'User already exists, please provide a different email',
          ResponseStatus.UNAUTHORIZED,
          { inputName: 'email' },
          true
        )
      );
    }

    try {
      const { email, password } = req.body;
      const { _id, savedMaxims } = await User.create({
        'local.email': email,
        'local.password': password
      });
      const sessionizedUser = userSession({ email, id: _id });

      req.session.user = sessionizedUser;
      return res.status(201).send({ ...sessionizedUser, savedMaxims });
    } catch (err) {
      return next(
        new ErrorHandler(
          err,
          `Failed creating user: ${err.message}. Please try again.`,
          ResponseStatus.BAD_REQUEST,
          { inputName: 'email' },
          true
        )
      );
    }
  }
};

export default controllers;
