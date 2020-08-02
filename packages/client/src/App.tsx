import React from 'react';
import './components/fontawesome';
import './App.scss';
import ModalContainer from './components/Modal/ModalContainer';
import Pages from './pages/Pages';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="App">
                <Route component={Pages} />
                <ModalContainer />
            </div>
        </Router>
    );
}

export default App;
