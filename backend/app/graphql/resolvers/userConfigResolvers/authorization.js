// Adapted from https://github.com/academind/yt-graphql-react-event-booking-api/tree/10-auth-middleware
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sanitizeInputs } = require('../helper');

const signUp = async (username, password) => {
  try {
    const existingUser = await User.findOne({ username: username });

    if (existingUser) throw new Error('This username is taken');

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      username: username,
      password: hashedPassword,
    });

    const result = await user.save();

    return { ...result._doc, password: null, _id: result.id };
  } catch (err) {
    throw err;
  }
};

const signIn = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('Invalid username/password');
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw new Error('Invalid username/password');
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.SECRET_KEY,
    {
      expiresIn: '1h',
    }
  );

  return { userId: user.id, token: token, tokenExpiration: 1 };
};

module.exports = {
  signup: async (args) => {
    sanitizeInputs(args);
    const result = signUp(args.username, args.password);
    return result;
  },
  signin: async (args) => {
    sanitizeInputs(args);
    const result = signIn(args.username, args.password);
    return result;
  },
};
