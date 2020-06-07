import React from 'react';
import './fontawesome'
import './stylesheets/App.scss';
import {Coverphoto} from "./components/Coverphoto";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Coverphoto/>
      </header>
    </div>
  );
}

export default App;
