import React from 'react';
import MachineImage from './errorFallback.png';
import './errorFallback.scss';

export function ErrorFallback() {
    return (
        <div className="error-fallback-wrapper">
            <h1 className="error">Uh oh...</h1>
            <h2 className="error-desc">Something went wrong :(</h2>
            <img src={MachineImage} className="machine-image" alt="errorImg" />
            <p className="error-msg"> Sorry, it's not you. We probably broke something</p>
            <p className="error-msg">
                Please try again later or contact us if the problem persists
            </p>
        </div>
    );
}
