import React from 'react';
import './fontawesome'
import './stylesheets/App.scss';
import {NavBar} from "./components/NavBar";
import {SearchBar} from "./components/SearchBar";
import {FilterSelector} from "./components/FilterSelector";
import {IconName} from "@fortawesome/fontawesome-svg-core";
import {Button} from "./components/Button";
import {FilterButton} from "./components/FilterButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h1 className="App-logo">Trecipe</h1>
          {/*Below nav bar and search bar for demo purpose in this branch only. Will be removed before merging in*/}
          <NavBar links={[{text: 'About', url: ''},
              {text: 'My Trecipes', url: ''},
              {text: 'Account', url: ''}]}/>
          <SearchBar/>
          <Button icon='check'/>
          <FilterButton text="All Trecipes" icon='check' fontSize={1} onClick={() => {}}/>
          <FilterSelector listItem={[
              {text: 'All', icon: 'check' as IconName},
              {text: "Private", icon: 'lock' as IconName},
              {text: "Public", icon: 'unlock' as IconName}]}/>
      </header>
    </div>
  );
}

export default App;
