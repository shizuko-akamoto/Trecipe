import React from 'react';
import './spinner.scss';
/**
 * Spinner Props
 * backgroundColor: background color of spinner
 * size: size in px of spinner
 */
export interface SpinnerProps {
    backgroundColor: string;
    size: number;
}

class OverlaySpinner extends React.Component<SpinnerProps> {
    static defaultProps = {
        backgroundColor: `rgba(255, 255, 255, 0.8)`,
        size: 30,
    };

    render() {
        return (
            <div
                className="overlay-spinner-wrapper"
                style={{ backgroundColor: this.props.backgroundColor }}>
                {/*Refereed to spinner provided by https://github.com/tobiasahlin/SpinKit*/}
                <div
                    className="sk-chase"
                    style={{ width: `${this.props.size}px`, height: `${this.props.size}px` }}>
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
