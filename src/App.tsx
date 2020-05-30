import React from 'react';
import './stylesheets/App.scss';
import './stylesheets/common/buttons.scss';
import {Button} from "./components/button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h1>Trecipe</h1>
          <Button text="All Trecipes" icon="plus-circle"/>
      </header>
    </div>
  );
}

export default App;
