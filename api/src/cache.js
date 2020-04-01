import redis from 'redis';
import util from 'util';
import config from './config';

const redisClient = redis.createClient(config.redis);
const getMaxim = util.promisify(redisClient.get).bind(redisClient);
const getMultipleMaxims = util.promisify(redisClient.mget).bind(redisClient);
const setMaximInCache = util.promisify(redisClient.set).bind(redisClient);

redisClient.on('connect', function() {
  console.log('Redis client connected');
});
redisClient.on('error', function(err) {
  console.log('Something went wrong ' + err);
});

export { getMaxim, getMultipleMaxims, setMaximInCache, redisClient };
