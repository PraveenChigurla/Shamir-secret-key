const mongoose = require('mongoose');

const shardSchema = new mongoose.Schema({
    shard: {
        type: String,
        required: true
    }
});

const Shard = mongoose.model('Shard', shardSchema);

module.exports = Shard;
