import React from 'react';
import IslandImage from './404.png';
import './notFound.scss';
import { Link } from 'react-router-dom';

export function NotFound() {
    return (
        <div className="not-found-wrapper">
            <h1 className="error">404</h1>
            <h1 className="error-msg">Oops, seems like you are lost!</h1>
            <img src={IslandImage} className="island-image" alt="404img" />
            <p className="go-back-msg">
                It's lonely out here... Let's get you back{' '}
                <Link to="/" className="router-link home-link">
                    home
                </Link>
            </p>
        </div>
    );
}
