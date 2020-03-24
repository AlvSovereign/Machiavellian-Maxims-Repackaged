import { User } from '../resources/user/user.model';

const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: 'Please provide valid email and/or password' });
  }

  try {
    const isRegistered = await User.findOne({ 'local.email': email }).exec();
    if (isRegistered) {
      return res.status(400).send({
        message: 'User already exists, please provide a different email'
      });
    }
  } catch (err) {
    console.error('err: ', err);
    return res.status(400).send({ message: err.message });
  }

  try {
    const { local, savedMaxims } = await User.create({
      'local.email': email,
      'local.password': password
    });

    const { email } = local;

    return res.status(201).send({ email, savedMaxims });
  } catch (err) {
    console.error('err: ', err);
    return res
      .status(400)
      .send({ message: `Failed creating user: ${err.message}` });
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next({
      status: 401,
      message: 'Please provide valid email and/or password'
    });
  }

  const userExists = await User.findOne({ 'local.email': email }).exec();

  if (!userExists) {
    return next({
      status: 401,
      message: 'Please provide valid email and/or password'
    });
  }

  try {
    const match = await userExists.checkPassword(password);

    if (!match) {
      return next({
        status: 401,
        message: 'Please provide valid email and/or password'
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
