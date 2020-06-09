import React from "react";
import "../stylesheets/navBar.scss";

export interface Link {
  text: string;
  url: string;
}
export interface NavigationProps {
  links: Array<Link>;
}

export class NavBar extends React.Component<NavigationProps, {}> {
  render() {
    return (
      <nav className="nav-bar">
        {this.props.links.map((link) => (
          <a className="nav-item" href={link.url} key={link.text}>
            {link.text}
          </a>
        ))}
      </nav>
    );
  }
}
