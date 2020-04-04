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
        `Please provide valid ${!validatedEmail ? 'email' : 'password'}`,
        ResponseStatus.UNAUTHORIZED,
        { inputName: !validatedEmail ? 'email' : 'password' },
        true
      )
    );
  } else {
    return next();
  }
};

router.post('/signin', formValidator, controllers.signIn);
router.post('/signup', formValidator, controllers.signup);
router.delete('/signout', controllers.signOut);

router.get('/twitter', twitterAuth);
router.get('/google', googleAuth);

router.get('/twitter/callback', twitterAuth, (req, res, next) => {
  console.log('twitter');
  res.redirect('/maxims');
});
router.get('/google/callback', googleAuth, (req, res, next) => {
  console.log(111);
  res.redirect('/maxims' + req.user.token);
});

export default router;
