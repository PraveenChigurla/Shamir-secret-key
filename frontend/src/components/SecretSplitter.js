import { useState } from 'react';
import styles from './SecretSplitter.module.css';

const SecretSplitter = () => {
  const [secret, setSecret] = useState('');
  const [shares, setShares] = useState(5);
  const [threshold, setThreshold] = useState(3);
  const [keyShards, setKeyShards] = useState([]);

  const handleSplit = async () => {
    try {
      const response = await fetch('/api/shamir/split', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, shares, threshold }),
      });

      if (!response.ok) throw new Error(`Failed to split secret: ${response.statusText}`);

      const data = await response.json();
      setKeyShards(data.shares);
      alert('Secret split successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🔐 Secret Splitter</h2>
      <input
        type="text"
        className={styles.input}
        placeholder="Enter Secret"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />
      <input
        type="number"
        className={styles.input}
        placeholder="Number of Shares"
        value={shares}
        onChange={(e) => setShares(Number(e.target.value))}
      />
      <input
        type="number"
        className={styles.input}
        placeholder="Threshold"
        value={threshold}
        onChange={(e) => setThreshold(Number(e.target.value))}
      />
      <button className={styles.button} onClick={handleSplit}>
        Split Secret
      </button>

      {keyShards.length > 0 && (
        <div className={styles.keyShardList}>
          <h3>🔑 Key Shards:</h3>
          <ul>
            {keyShards.map((shard, index) => (
              <li key={index} className={styles.keyShardItem}>
                <code>{shard}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SecretSplitter;
