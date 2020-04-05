import { Maxim } from './maxim.model';
import { getMaxim, getMultipleMaxims, setMaximInCache } from '../../cache';
import { ResponseStatus } from '../../utils/ErrorHandler';

const checkRedisCache = async (key, next) => {
  try {
    let cachedData;
    if (Array.isArray(key)) {
      cachedData = await getMultipleMaxims(key);
      return cachedData.map(data => JSON.parse(data));
    } else {
      cachedData = await getMaxim(key);
      return JSON.parse(cachedData);
    }
  } catch (err) {
    return next(
      new ErrorHandler(
        err,
        'Error fetching Maxim from Cache. Please try again',
        ResponseStatus.INTERNAL_ERROR,
        null,
        true
      )
    );
  }
};

const controllers = {
  getMaximByMaximNumber: async (req, res, next) => {
    try {
      // query redis cache first,
      const maximNumber = req.params.maximNumber;
      const maximFromCache = await checkRedisCache(maximNumber);
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
      await setMaximInCache(maximNumber, JSON.stringify(fetchedMaxim));

      res.status(200).json({ data: fetchedMaxim });
    } catch (err) {
      return next(
        new ErrorHandler(
          err,
          'Error fetching Maxim. Please try again',
          ResponseStatus.INTERNAL_ERROR,
          null,
          true
        )
      );
    }
  },
  getMaxims: async (req, res, next) => {
    const { maxims } = req.body;
    const maximsFromCache = await checkRedisCache(maxims, next);

    try {
      // where maxims arent in cache (returned as null), go fetch from DB
      const batchMaximsToFetchFromDB = await maximsFromCache.reduce(
        (acc, curr, index, arr) => {
          return curr === null ? [...acc, maxims[index]] : acc;
        },
        []
      );
      const response = await Maxim.find()
        .where('maximNumber')
        .in(batchMaximsToFetchFromDB)
        .lean()
        .exec();

      await response.forEach(item =>
        setMaximInCache(item.maximNumber, JSON.stringify(item))
      ); //yuck - need to know how to mset in redis

      res.status(200).send([...maximsFromCache, ...response]);
    } catch (err) {
      return next(
        new ErrorHandler(
          err,
          'Error fetching Maxims. Please try again',
          ResponseStatus.INTERNAL_ERROR,
          null,
          true
        )
      );
    }
  }
};

export default controllers;
