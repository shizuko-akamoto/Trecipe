import React from 'react';
import './fontawesome'
import './stylesheets/App.scss';
import './stylesheets/buttons.scss';
import {Button} from "./components/button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h1>Trecipe</h1>
          <Button text="Create New" icon="plus-circle"/>
      </header>
    </div>
  );
}

export default App;
