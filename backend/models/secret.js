const mongoose = require('mongoose');

const secretSchema = new mongoose.Schema({
  keyShards: [String], // Array of key shards
  threshold: Number, // Minimum number of shards required to reconstruct the secret
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Secret', secretSchema);
