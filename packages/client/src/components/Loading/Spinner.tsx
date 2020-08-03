import React from 'react';
import './spinner.scss';
import { PositionProperty } from 'csstype';

/**
 * Spinner Props
 * positionStyle: Position css property
 */
export interface SpinnerProps {
    positionStyle: PositionProperty;
}

class Spinner extends React.Component<SpinnerProps> {
    static defaultProps = {
        positionStyle: 'relative',
    };

    render() {
        return (
            <div className="spinner-wrapper" style={{ position: this.props.positionStyle }}>
                <div className="spinner" />
            </div>
        );
    }
}

export default Spinner;
