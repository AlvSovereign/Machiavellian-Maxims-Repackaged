import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import GoogleStrategy from 'passport-google-oauth20';
import { GOOGLE_CONFIG, TWITTER_CONFIG } from './oauth.config';

const initOauth = () => {
  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));

  // The callback that is invoked when an OAuth provider sends back user
  // information. Normally, you would save the user to the database
  // in this callback and it would be customized for each provider
  const callback = (accessToken, refreshToken, profile, cb) => {
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);
    console.log('profile: ', profile);

    return cb(null, profile);
  };

  // Adding each OAuth provider's strategy to passport
  passport.use(new TwitterStrategy(TWITTER_CONFIG, callback));
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback));
  // passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback));
};

export default initOauth;
