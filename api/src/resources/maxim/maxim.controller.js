import { Maxim } from './maxim.model';

const controllers = {
  getMaximByMaximNumber: async (req, res) => {
    try {
      const maximNumber = req.params.maximNumber;
      const fetchedMaxim = await Maxim.findOne({ maximNumber })
        .lean()
        .exec();

      console.log('fetchedMaxim: ', fetchedMaxim);
      res.status(200).json({ data: fetchedMaxim });
    } catch (err) {
      console.error('err: ', err);
      res.status(400).end();
    }
  }
};

export default controllers;
