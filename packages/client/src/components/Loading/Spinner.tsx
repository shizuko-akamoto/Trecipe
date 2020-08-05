import React from 'react';
import './spinner.scss';

/**
 * Spinner Props
 * positionStyle: Position css property
 */
export interface SpinnerProps {
    positionStyle: string;
}

class Spinner extends React.Component<SpinnerProps> {
    static defaultProps = {
        positionStyle: 'relative',
    };

    render() {
        return (
            <div className="spinner-wrapper" style={{ position: 'static' }}>
                <div className="spinner"></div>
            </div>
        );
    }
}

export default Spinner;
