import { useState } from 'react';
import styles from './SecretCombiner.module.css';

const SecretCombiner = () => {
  const [numShards, setNumShards] = useState(3);
  const [shards, setShards] = useState(Array(numShards).fill(''));
  const [recoveredSecret, setRecoveredSecret] = useState('');

  const handleNumShardsChange = (value) => {
    const newNumShards = Math.max(1, Number(value));
    setNumShards(newNumShards);
    setShards(Array(newNumShards).fill(''));
  };

  const handleShardChange = (index, value) => {
    const newShards = [...shards];
    newShards[index] = value;
    setShards(newShards);
  };

  const handleCombine = async () => {
    try {
      const validShards = shards.filter((shard) => shard.trim() !== '');
      if (validShards.length < 2) {
        alert('At least two shards are required to combine the secret.');
        return;
      }

      const response = await fetch('/api/shamir/combine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shares: validShards }),
      });

      if (!response.ok) throw new Error(`Failed to combine secret: ${response.statusText}`);

      const data = await response.json();
      setRecoveredSecret(data.secret);
      alert('Secret combined successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🔓 Secret Combiner</h2>
      
      {/* ✅ Dynamic Number of Shards Input */}
      <input
        type="number"
        className={styles.input}
        placeholder="Number of Shards"
        value={numShards}
        onChange={(e) => handleNumShardsChange(e.target.value)}
      />

      {/* ✅ Generate input fields dynamically */}
      {shards.map((shard, index) => (
        <input
          key={index}
          type="text"
          className={styles.input}
          placeholder={`Shard ${index + 1}`}
          value={shard}
          onChange={(e) => handleShardChange(index, e.target.value)}
        />
      ))}

      <button className={styles.button} onClick={handleCombine}>
        Combine Secret
      </button>

      {recoveredSecret && (
        <div className={styles.result}>
          <h3>✅ Recovered Secret:</h3>
          <code>{recoveredSecret}</code>
        </div>
      )}
    </div>
  );
};

export default SecretCombiner;
