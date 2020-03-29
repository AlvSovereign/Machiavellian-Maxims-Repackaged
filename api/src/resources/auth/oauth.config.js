import config from '../../config';

const providers = ['twitter', 'google', 'facebook'];
const urls = providers.map(provider => {
  return process.env.NODE_ENV === 'production'
    ? `https://react-auth-twitter.herokuapp.com/${provider}/callback`
    : `http://localhost:4000/auth/${provider}/callback`;
});

const [twitterURL, googleURL, facebookURL] = urls;

const GOOGLE_CONFIG = {
  clientID: config.keys.googleClientID,
  clientSecret: config.keys.googleClientSecret,
  callbackURL: googleURL
};

const TWITTER_CONFIG = {
  consumerKey: config.keys.twitterApiKey,
  consumerSecret: config.keys.twitterApiSecret,
  callbackURL: twitterURL
};

export { GOOGLE_CONFIG, TWITTER_CONFIG };
