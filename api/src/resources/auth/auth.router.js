import { Router } from 'express';
import passport from 'passport';
import { validators } from '../../utils/validators';
import { ErrorHandler, ResponseStatus } from '../../utils/ErrorHandler';
import controllers from './auth.controller';

const router = Router();
const googleAuth = passport.authenticate('google', {
  scope: ['profile'],
  session: false
});
const twitterAuth = passport.authenticate('twitter');
const facebookAuth = passport.authenticate('facebook');

const formValidator = (req, res, next) => {
  const { email, password } = req.body;
  const {
    value: { email: validatedEmail },
    error
  } = validators.authForm.validate({
    email,
    password
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

router.post('/signin', isGuestCheck, formValidator, controllers.signIn);
router.post('/signup', isGuestCheck, formValidator, controllers.signup);
router.post('/signout', controllers.signOut);

router.get('/twitter', twitterAuth);
router.get('/google', googleAuth);

router.get('/twitter/redirect', twitterAuth, (req, res, next) => {
  console.log('twitter');
  res.redirect('/maxims');
});
router.get('/google/redirect', googleAuth, (req, res, next) => {
  console.log(111);
  res.redirect('/maxims' + req.user.token);
});

export default router;
