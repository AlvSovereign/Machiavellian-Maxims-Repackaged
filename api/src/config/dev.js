export const config = {
  secrets: {
    jwt: 'learneverything'
  },
  dbUrl: 'mongodb://localhost:27017/machiavellianMaxims',
  mongooseConfig: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};
