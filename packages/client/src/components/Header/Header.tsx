import React from 'react';
import { NavBar } from '../NavBar/NavBar';
import { SearchBar } from '../SearchBar/SearchBar';
import './header.scss';
import { connect } from 'react-redux';
import { RootState } from '../../redux';
import Avatar from '../Avatar/Avatar';

type HeaderProps = ReturnType<typeof mapStateToProps>;

class Header extends React.Component<HeaderProps, {}> {
    render() {
        const linkArray = [{ text: 'About', path: '' }];
        linkArray.push(
            this.props.isAuthenticated
                ? { text: 'My Trecipes', path: '/' }
                : { text: 'Login', path: '/user/login' }
        );
        return (
            <header className="header">
                <h1 className="header-logo">Trecipe</h1>
                <div className="header-search-bar">
                    <SearchBar />
                </div>
                <div className="header-nav-bar">
                    <NavBar links={linkArray} />
                </div>
                {this.props.isAuthenticated && <Avatar />}
            </header>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        isAuthenticated: state.user.isAuthenticated,
    };
};

export default connect(mapStateToProps)(Header);
