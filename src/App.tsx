import React from 'react';
import logo from './logo.svg';
import Grid from './grid/';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SimplyWallSt test</h1>
      </header>
      <main>
        <Grid />
      </main>
    </div>
  );
}

export default App;
