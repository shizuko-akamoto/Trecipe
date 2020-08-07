import React from 'react';
import './footer.scss';

export class Footer extends React.Component<{}, {}> {
    render() {
        return (
            <footer className="footer">
                <div className="footer-contents">
                    <div className="footer-logo">
                        <h2>Trecipe</h2>
                        <p>CPSC432I(2020S) Team2</p>
                    </div>
                </div>
            </footer>
        );
    }
}
