import { User } from '../resources/user/user.model';

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next({
      status: 401,
      message: `Please provide valid ${!email ? 'email' : 'password'}`,
      inputName: !email ? 'email' : 'password'
    });
  }

  const isRegistered = await User.findOne({ 'local.email': email }).exec();
  if (isRegistered) {
    return next({
      status: 401,
      message: 'User already exists, please provide a different email',
      inputName: 'email'
    });
  }

  try {
    const { email, password } = req.body;
    const { local, savedMaxims } = await User.create({
      'local.email': email,
      'local.password': password
    });

    return res.status(201).send({ email: local.email, savedMaxims });
  } catch (err) {
    console.error('err: ', err);
    return res.status(400).send({
      message: `Failed creating user: ${err.message}. Please try again.`
    });
  }
};

const signin = async (req, res, next) => {
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

    const { local, savedMaxims } = userExists;
    const { email } = local;

    return res.status(201).send({ email, savedMaxims });
  } catch (err) {
    return next({
      status: 400,
      err,
      message: err.message
    });
  }
};

export { signin, signup };
