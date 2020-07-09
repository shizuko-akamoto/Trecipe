import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MyTrecipes from './MyTrecipes/MyTrecipes';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import Trecipe from './Trecipe/Trecipe';
import Map from './Map/Map';

const Pages = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route path="/" exact component={MyTrecipes} />
                <Route path="/:trecipeId" exact component={Trecipe} />
                <Route path="/map/:trecipeId" component={Map} />
            </Switch>
            <Footer />
        </div>
    );
};

export default Pages;
