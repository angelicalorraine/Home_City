const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // get logged in user info
    me: async (parent, args, context) => {
      // user is logged in
      if (context.user) {
        try {
          // find a user matching logged in user id and return user
          const user = await User.findOne({ _id: context.user._id })//.populate('savedCities');
          return user;
        } catch (err) {
          console.log('Unable to find user data', err);
        }
      }

      // user is not logged in
      throw new AuthenticationError('Please log in');
    },
  },

  Mutation: {

    login: async (parent, { email, password }) => {
      try {
        // find a user matching provided email
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('No user associated with this email address');
        }
        // check if password is correct
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password');
        }
        // create token from user and return both
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.log('Login error', err)
      }
    },
    addUser: async (parent, { username, email, password }) => {
      try {
        // create user using provided username, email, and password
        const user = await User.create({ username, email, password });
        // create token from user and return both
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.log('Sign up error', err);
      }

      const token = signToken(user);

      return { token, user };
    },
    saveCity: async (parent, { city }, context) => {
      //console.log(context.user);
      console.log('args', city);
      //console.log('contextID', context.user._id);

      if (context.user) {
        //const user = await User.findById(context.user._id);
        try {
          const user = await User.findOne({ _id: context.user._id });
          await User.findOneAndUpdate(
            { _id: context.user._id },
            //changed to accept city object
            { $addToSet: { savedCities: { ...city } } }
          );
          console.log(user);
          return user;
        } catch (err) {
          console.log(err);
        }
      }

      throw new AuthenticationError('You need to be logged in!');

    },
    removeCity: async (parent, { cityId }, context) => {
      if (context.user) {
        try {
          // find and update user matching logged in user id
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedCities: { cityId } } },
            { new: true }
          );

          return user;
        } catch (err) {
          console.log('Remove city error', err);
        }
      }
      throw new AuthenticationError('you need to be logged in!');

    },
    saveHomeCity: async (parent, {homeCity}, context) => {
      //const city = args.input;
      
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { homeCity: { ...homeCity } },
          { new: true }
        )
        return updatedUser;
      }
      throw new AuthenticationError('you need to be logged in!');
    }

  },
};

module.exports = resolvers;
