import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    local: {
      firstName: {
        type: String,
        trim: true
      },
      email: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      password: {
        type: String,
        required: true
      }
    },
    facebook: {
      id: { type: String },
      token: { type: String },
      email: { type: String },
      name: { type: String }
    },
    savedMaxims: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'maxim'
    }
  },

  { timestamps: true }
);

userSchema.pre('save', function(next) {
  if (!this.isModified('local.password')) {
    return next();
  }

  bcrypt.hash(this.local.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.local.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function(password) {
  const passwordHash = this.local.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

export const User = mongoose.model('user', userSchema);
