import React from 'react';
import './legend.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Legend extends React.Component {
    render() {
        return (
            <div className="legend-wrapper">
                <div className="legend-content">
                    <div className="legend">
                        <div className="legend-icon">
                            <FontAwesomeIcon icon="map-marker" color="#489fb5" fixedWidth />
                        </div>
                        <div className="legend-text">Completed</div>
                    </div>
                    <div className="legend">
                        <div className="legend-icon">
                            <FontAwesomeIcon icon="map-marker" color="#52575c" fixedWidth />
                        </div>
                        <div className="legend-text">Incomplete</div>
                    </div>
                </div>
            </div>
        );
    }
}
