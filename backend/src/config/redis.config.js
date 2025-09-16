const  { createClient } = require('redis');

let client;

/**
 * Initialize Cloud Redis connection
 */
 const initRedis = async () => {
  if (client) return client; // already initialized

  client = createClient({
    username: 'default', // Redis Cloud username
    password: process.env.REDIS_PASSWORD, // Redis Cloud password
    socket: {
      host: process.env.REDIS_HOST, // Redis Cloud host
      port: process.env.REDIS_PORT
    }
  });

  client.on('connect', () => console.log('✅ Connected to Cloud Redis'));
  client.on('ready', () => console.log('✅ Cloud Redis ready to use'));
  client.on('error', (err) => console.error('❌ Redis error:', err));

  await client.connect();
  return client;
};

/**
 * Get Redis client instance
 */
 const getRedisClient = () => {
  if (!client) {
    throw new Error('Redis not initialized. Call initRedis() first.');
  }
  return client;
};

module.exports = {
  initRedis,
  getRedisClient
};