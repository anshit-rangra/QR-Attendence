const { getRedisClient, initRedis } = require('../config/redis.config');

let client;

/**
 * Initialize Redis client once
 */
const initClient = async () => {
  if (!client) {
    await initRedis(); // Redis connect
    client = getRedisClient();
  }
  return client;
};

/**
 * Set key with expiry
 * @param {string} value
 */
const setKey = async (key , value) => {
  const client = await initClient(); // ensure Redis is initialized
  return await client.set(key, value, { EX: 600 }); // 10 min expiry
};

/**
 * Get key
 */
const getKey = async (key) => {
  const client = await initClient();
  return await client.get(key);
};

const deleteKey = async(key) => {
  const client = await initClient()
  return await client.del(key)
}

module.exports = { setKey, getKey, deleteKey };
