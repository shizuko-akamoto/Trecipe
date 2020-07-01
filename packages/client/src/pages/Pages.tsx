import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MyTrecipes from './MyTrecipes/MyTrecipes';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import Trecipe from './Trecipe/Trecipe';

const Pages = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route path="/" exact component={MyTrecipes} />
                <Route path="/:trecipeId" component={Trecipe} />
            </Switch>
            <Footer />
        </div>
    );
};

export default Pages;
