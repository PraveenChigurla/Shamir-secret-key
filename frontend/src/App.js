import React from 'react';
import SecretSplitter from './components/SecretSplitter';
import SecretCombiner from './components/SecretCombiner';

function App() {
  return (
    <div>
      <h1>Shamir's Secret Sharing</h1>
      <SecretSplitter />
      <SecretCombiner />
    </div>
  );
}

export default App;
