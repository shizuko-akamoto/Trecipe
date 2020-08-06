import React from 'react';
import './navBar.scss';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

export interface LinkProps {
    text: string;
    path: string;
}
export interface NavigationProps {
    links: Array<LinkProps>;
}

type NavBarProps = NavigationProps & RouteComponentProps;

class NavBar extends React.Component<NavBarProps, {}> {
    render() {
        return (
            <nav className="nav-bar">
                {this.props.links.map((link) => (
                    <Link
                        className="nav-item"
                        to={{ pathname: link.path, state: { from: this.props.location } }}
                        key={link.text}>
                        {link.text}
                    </Link>
                ))}
            </nav>
        );
    }
}

export default withRouter(NavBar);
