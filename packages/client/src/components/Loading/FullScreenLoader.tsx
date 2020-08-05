import React from 'react';
import './spinner.scss';

class FullScreenLoader extends React.Component {
    render() {
        return (
            // https://codepen.io/CCG/pen/KrANmJ used as reference for css
            <div className="loader-wrapper">
                <div className="loader-container">
                    <div className="loader">
                        <ul className="hexagon-container">
                            <li className="hexagon hex_1" />
                            <li className="hexagon hex_2" />
                            <li className="hexagon hex_3" />
                            <li className="hexagon hex_4" />
                            <li className="hexagon hex_5" />
                            <li className="hexagon hex_6" />
                            <li className="hexagon hex_7" />
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default FullScreenLoader;
