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
    const createdUser = await User.create({
      'local.email': email,
      'local.password': password
    });

    return res.status(201).send({ email });
  } catch (err) {
    console.error('err: ', err);
    return res
      .status(400)
      .send({ message: `Failed creating user: ${err.message}` });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: 'Please provide valid email and/or password' });
  }

  const userExists = await User.findOne({ 'local.email': email }).exec();

  if (!userExists) {
    return res
      .status(401)
      .send({ message: 'Please provide valid email and/or password' });
  }

  try {
    const match = await userExists.checkPassword(password);

    if (!match) {
      return res.status(401).send({
        message: 'Please provide valid email and/or password'
      });
    }

    return res.status(201).send({ message: 'success' });
  } catch (err) {
    console.error('err: ', err);
    return res.status(400).send({ message: err.message });
  }
};

export { signin, signup };
