import React from 'react';
import './fontawesome'
import './stylesheets/App.scss';
import { TrecipeCard } from './components/TrecipeCard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TrecipeCard />
      </header>
    </div>
  );
}

export default App;
