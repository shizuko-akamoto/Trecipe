import React from 'react';
import './components/fontawesome';
import './App.scss';
import ModalContainer from './components/Modal/ModalContainer';
import Pages from './pages/Pages';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Route component={Pages} />
                <ModalContainer />
            </div>
        </Router>
    );
}

export default App;
