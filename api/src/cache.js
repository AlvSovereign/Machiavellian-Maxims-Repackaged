import { createClient } from 'redis';
import util from 'util';
import { ErrorHandler, ResponseStatus } from './utils/ErrorHandler';
import config from './config';

const redisClient = createClient(config.redis);
const getMaxim = util.promisify(redisClient.get).bind(redisClient);
const getMultipleMaxims = util.promisify(redisClient.mget).bind(redisClient);
const setMaximInCache = util.promisify(redisClient.set).bind(redisClient);

redisClient.on('connect', function() {
  console.log('Redis client connected');
});

redisClient.on('error', function(err) {
  throw new ErrorHandler(
    'Connecting to Redis failed',
    ResponseStatus.BAD_REQUEST,
    null,
    false
  );
});

export { getMaxim, getMultipleMaxims, setMaximInCache, redisClient };
