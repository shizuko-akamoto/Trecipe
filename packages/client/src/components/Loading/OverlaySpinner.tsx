import React from 'react';
import './spinner.scss';
import { PositionProperty } from 'csstype';
/**
 * Spinner Props
 * positionStyle: Position css property
 */
export interface SpinnerProps {
    color: string;
}

class OverlaySpinner extends React.Component<SpinnerProps> {
    static defaultProps = {
        color: 'white',
    };

    render() {
        return (
            <div className="overlay-spinner-wrapper">
                <div className="sk-chase">
                    <div className="sk-chase-dot" />
                    <div className="sk-chase-dot" />
                    <div className="sk-chase-dot" />
                    <div className="sk-chase-dot" />
                    <div className="sk-chase-dot" />
                    <div className="sk-chase-dot" />
                </div>
            </div>
        );
    }
}

export default OverlaySpinner;
