const secrets = require('secrets.js-grempe');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to split secret into shares
function splitSecret(secret) {
    const hexSecret = Buffer.from(secret, 'utf8').toString('hex');
    const shares = secrets.share(hexSecret, 5, 3);
    console.log('\n🔑 Generated Key Shards:\n');
    shares.forEach((share, index) => {
        console.log(`Shard ${index + 1}: ${share}`);
    });
    return shares;
}

// Function to reconstruct the secret
function reconstructSecret(shares) {
    const reconstructedHex = secrets.combine(shares);
    const originalSecret = Buffer.from(reconstructedHex, 'hex').toString('utf8');
    return originalSecret;
}

// Start input process
rl.question('Enter the secret to split: ', (inputSecret) => {
    const shares = splitSecret(inputSecret);

    console.log('\nEnter 3 correct shards to reconstruct the original secret:\n');

    let inputShares = [];
    rl.on('line', (line) => {
        inputShares.push(line.trim());

        if (inputShares.length === 3) {
            try {
                const originalSecret = reconstructSecret(inputShares);
                console.log('\n✅ Original Secret:', originalSecret);
            } catch (error) {
                console.log('\n❌ Error: Invalid shards! Could not reconstruct the secret.');
            }
            rl.close();
        }
    });
});
