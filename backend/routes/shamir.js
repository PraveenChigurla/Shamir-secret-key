const express = require('express');
const router = express.Router();
const secrets = require('secrets.js-grempe');

// 🔹 Split Secret Route
router.post('/split', (req, res) => {
  const { secret, shares, threshold } = req.body;

  if (!secret || !shares || !threshold) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Convert secret to hex
    const hexSecret = secrets.str2hex(secret);
    
    // Split into shares
    const sharesArray = secrets.share(hexSecret, shares, threshold);

    res.status(200).json({ shares: sharesArray });
  } catch (error) {
    console.error('Error splitting secret:', error);
    res.status(500).json({ error: 'Failed to split secret' });
  }
});

// 🔹 Combine Secret Route
router.post('/combine', (req, res) => {
  const { shares } = req.body;

  if (!shares || shares.length === 0) {
    return res.status(400).json({ error: 'Missing shares' });
  }

  try {
    // Combine shares to get the original hex secret
    const combinedHex = secrets.combine(shares);
    
    // Convert hex back to string
    const originalSecret = secrets.hex2str(combinedHex);

    res.status(200).json({ secret: originalSecret });
  } catch (error) {
    console.error('Error combining shares:', error);
    res.status(500).json({ error: 'Failed to combine shares' });
  }
});

module.exports = router;
