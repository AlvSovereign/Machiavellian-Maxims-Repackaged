import mongoose from 'mongoose';
import { User } from './user.model';

const controllers = {
  updateMaxims: async (req, res, next) => {
    const { userId, maxims } = req.body;

    try {
      const { savedMaxims } = await User.findByIdAndUpdate(
        { _id: userId },
        {
          $set: {
            savedMaxims: maxims
          }
        },
        (err, result) => {
          if (err) {
            return next({
              error: err,
              message: 'Error savim Maxim to user. Please try again',
              status: 500
            });
          }
        }
      )
        .lean()
        .exec();

      return res.status(201).send({ savedMaxims });
    } catch (err) {
      next({
        error: err,
        message: 'Error savim Maxim. Please try again',
        status: 500
      });
    }
  }
};

export default controllers;
