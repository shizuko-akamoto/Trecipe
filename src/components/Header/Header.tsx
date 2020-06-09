import React from "react";
import { NavBar } from "../NavBar/NavBar";
import { SearchBar } from "../SearchBar/SearchBar";
import "./header.scss";

export class Header extends React.Component<{}, {}> {
  render() {
    return (
      <header className="header">
        <h1 className="header-logo">Trecipe</h1>
        <div className="header-search-bar">
          <SearchBar />
        </div>
        <div className="header-nav-bar">
          <NavBar
            links={[
              { text: "About", url: "" },
              { text: "My Trecipes", url: "" },
              { text: "Account", url: "" },
            ]}
          />
        </div>
      </header>
    );
  }
}
