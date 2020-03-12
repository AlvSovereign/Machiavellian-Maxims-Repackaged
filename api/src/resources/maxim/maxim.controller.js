import { Maxim } from './maxim.model';
import { getMaximFromRedis, setMaximInRedis } from '../../cache';

const checkCache = async key => {
  try {
    const cachedMaxim = await getMaximFromRedis(key);
    if (cachedMaxim) {
      return JSON.parse(cachedMaxim);
    }
  } catch (err) {
    console.error('err: ', err);
    res.status(400).end();
  }
};

const controllers = {
  getMaximByMaximNumber: async (req, res) => {
    try {
      // query redis cache first,
      const maximNumber = req.params.maximNumber;
      const maximFromCache = await checkCache(maximNumber);
      // if maxim exists in redis cache, return it
      if (maximFromCache) {
        console.log('from redis cache!');
        return res.status(200).json({ data: maximFromCache });
      }
      // else query mondodb
      const fetchedMaxim = await Maxim.findOne({ maximNumber })
        .lean()
        .exec();
      // then save result to redis cache
      setMaximInRedis(maximNumber, 3600, JSON.stringify(fetchedMaxim));

      res.status(200).json({ data: fetchedMaxim });
    } catch (err) {
      console.error('err: ', err);
      res.status(400).end();
    }
  }
};

export default controllers;
