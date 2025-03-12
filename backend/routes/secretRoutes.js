const express = require('express');
const router = express.Router();
const secrets = require('secrets.js-grempe');
const Shard = require('../models/Shard');

router.post('/split', async (req, res) => {
    const { secret } = req.body;

    if (!secret) return res.status(400).json({ error: 'Secret is required' });

    try {
        const hexSecret = Buffer.from(secret, 'utf8').toString('hex');
        const shares = secrets.share(hexSecret, 5, 3);

        // Save shards to MongoDB
        await Shard.deleteMany(); // Clear old shards
        for (let share of shares) {
            await new Shard({ shard: share }).save();
        }

        res.status(200).json({ shares });
    } catch (error) {
        res.status(500).json({ error: 'Failed to split secret' });
    }
});

router.post('/reconstruct', async (req, res) => {
    const { shards } = req.body;

    if (shards.length < 3) {
        return res.status(400).json({ error: 'Need at least 3 shards to reconstruct' });
    }

    try {
        const reconstructedHex = secrets.combine(shards);
        const secret = Buffer.from(reconstructedHex, 'hex').toString('utf8');
        res.status(200).json({ secret });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reconstruct secret' });
    }
});

module.exports = router;
