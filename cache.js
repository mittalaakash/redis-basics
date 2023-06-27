const { createClient } = require('redis');
let client;
(async () => {
  client = createClient();
  await client.connect();
})();

const DEFAULT_EXPIRATION = 3600;

client.on('error', err => console.log('Redis Client Error', err));

function cache(key, callback) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await client.get(key);

      if (data != null) resolve(JSON.parse(data));
      else {
        const data = await callback();
        client.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(data));
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { cache };
