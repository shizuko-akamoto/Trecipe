import React from 'react';
import './components/fontawesome';
import './App.scss';
import ModalContainer from './components/Modal/ModalContainer';
import Pages from './pages/Pages';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    toast.configure({
        position: 'bottom-center',
        limit: 5,
        newestOnTop: true,
        autoClose: 3000,
    });
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
