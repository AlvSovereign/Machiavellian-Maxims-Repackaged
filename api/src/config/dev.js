export const devConfig = {
  keys: {
    jwt: process.env.JWT_SECRET,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    twitterApiKey: process.env.TWITTER_API_KEY,
    twitterApiSecret: process.env.TWITTER_API_SECRET
  },
  dbUrl: 'mongodb://localhost:27017/machiavellianMaxims',
  mongoose: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    retry_strategy: () => 1000
  },
  session: {
    name: 'session',
    secret: process.env.SESSION_SECRET,
    lifetime: 1000 * 60 * 60 * 2
  }
};
