const dns = require('dns');
const mongoose = require('mongoose');
const env = require('./env');

// mongodb+srv:// needs SRV lookups, which some host resolvers refuse; use public resolvers unless overridden.
dns.setDefaultResultOrder('ipv4first');
if (env.dnsServers.length) dns.setServers(env.dnsServers);

// Fail fast instead of queueing when the database is down so controllers can use the local fallback store.
mongoose.set('bufferCommands', false);

const isReady = () => mongoose.connection.readyState === 1;

// Connects in the background and keeps retrying; the API stays up while the database is unreachable.
function connect(onConnected) {
  if (!env.mongo.uri) {
    console.warn('[db] MONGODB_URI not set; running with the local file fallback only');
    return;
  }
  const attempt = () =>
    mongoose
      .connect(env.mongo.uri, { dbName: env.mongo.db, serverSelectionTimeoutMS: 8000 })
      .then(() => {
        console.log(`[db] connected to "${env.mongo.db}"`);
        return onConnected && onConnected();
      })
      .catch((err) => {
        console.error('[db] connection failed, retrying in 10s:', err.message);
        setTimeout(attempt, 10000);
      });
  attempt();
}

module.exports = { connect, isReady };
