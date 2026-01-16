// connect.js (CommonJS)
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    // Quick health check
    await client.db('admin').command({ ping: 1 });
    console.log('✅ Connected to MongoDB and ping succeeded!');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  } finally {
    await client.close();
  }
}

run();
