import mongoose from 'mongoose';

const maximSchema = new mongoose.Schema({
  maxim: {
    type: String,
    required: true
  },
  maximNumber: {
    type: Number,
    required: true
  }
});

export const Maxim = mongoose.model('maxim', maximSchema);
