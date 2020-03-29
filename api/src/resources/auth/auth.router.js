import { Router } from 'express';
import passport from 'passport';
import controllers from './auth.controller';

const router = Router();
const twitterAuth = passport.authenticate('twitter');
const googleAuth = passport.authenticate('google', {
  scope: ['profile'],
  session: false
});
const facebookAuth = passport.authenticate('facebook');

router.post('/signin', controllers.signIn);
router.get('/signout', controllers.signOut);
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
