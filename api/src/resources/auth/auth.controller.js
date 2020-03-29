import { User } from '../user/user.model';

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

      const { savedMaxims } = userExists;
      const sessionizedUser = userSession(userExists);

      req.session.user = sessionizedUser;

      return res.status(201).send({ user: sessionizedUser, savedMaxims });
    } catch (err) {
      return next({
        status: 400,
        err,
        message: err.message
      });
    }
  },
  signOut: async (req, res, next) => {
    console.log('req: ', req.session);
    return res.status(201).redirect('/');
  }
};

export default controllers;
