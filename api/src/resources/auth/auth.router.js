import { Router } from 'express';
import { validators } from '../../utils/validators';
import { ErrorHandler, ResponseStatus } from '../../utils/ErrorHandler';
import controllers from './auth.controller';

const authRouter = Router();

const formValidator = (req, res, next) => {
  const { email, password } = req.body;
  const {
    value: { email: validatedEmail },
    error,
  } = validators.authForm.validate({
    email,
    password,
  });

  if (error) {
    return next(
      new ErrorHandler(
        error,
        'Please provide valid email and password',
        ResponseStatus.UNAUTHORIZED,
        { inputName: !validatedEmail ? 'email' : 'password' },
        true
      )
    );
  } else {
    return next();
  }
};

const isGuestCheck = (req, res, next) => {
  if (req.session.user) {
    next(
      new ErrorHandler(
        null,
        'User already logged in.',
        ResponseStatus.FORBIDDEN,
        null,
        true
      )
    );
  } else {
    next();
  }
};

authRouter.post('/signin', isGuestCheck, formValidator, controllers.signIn);
authRouter.post('/signup', isGuestCheck, formValidator, controllers.signup);
authRouter.post('/signout', controllers.signOut);

export { authRouter };
