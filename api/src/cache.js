import redis from 'redis';
import util from 'util';
import config from './config';

const redisClient = redis.createClient(config.redis);
const getMaximFromRedis = util.promisify(redisClient.get).bind(redisClient);
const setMaximInRedis = util.promisify(redisClient.setex).bind(redisClient);

redisClient.on('connect', function() {
  console.log('Redis client connected');
});
redisClient.on('error', function(err) {
  console.log('Something went wrong ' + err);
});

export { getMaximFromRedis, setMaximInRedis, redisClient };
