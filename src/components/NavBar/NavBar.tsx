import React from "react";
import "./navBar.scss";
import { Link } from "react-router-dom";

export interface LinkProps {
  text: string;
  path: string;
}
export interface NavigationProps {
  links: Array<LinkProps>;
}

export class NavBar extends React.Component<NavigationProps, {}> {
  render() {
    return (
      <nav className="nav-bar">
        {this.props.links.map((link) => (
          <Link
            className="nav-item"
            to={{ pathname: link.path }}
            key={link.text}>
            {link.text}
          </Link>
        ))}
      </nav>
    );
  }
}
