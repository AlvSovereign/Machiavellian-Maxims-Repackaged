import mongoose from 'mongoose';
import { User } from './user.model';
import { ResponseStatus } from '../../utils/ErrorHandler';

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
            return next(
              new ErrorHandler(
                err,
                'Error savim Maxim to user. Please try again',
                ResponseStatus.INTERNAL_ERROR,
                null,
                true
              )
            );
          }
        }
      )
        .lean()
        .exec();

      return res.status(201).send({ savedMaxims });
    } catch (err) {
      next(
        new ErrorHandler(
          err,
          'Error savim Maxim. Please try again',
          ResponseStatus.INTERNAL_ERROR,
          null,
          true
        )
      );
    }
  }
};

export default controllers;
