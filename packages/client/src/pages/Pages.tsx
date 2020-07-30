import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MyTrecipes from './MyTrecipes/MyTrecipes';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import Trecipe from './Trecipe/TrecipePage';
import Map from './Map/Map';
import SearchResult from './SearchResult/SearchResult';
import { LoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const Pages = () => {
    return (
        <div>
            <Header />
            <LoadScript
                googleMapsApiKey={`${process.env.REACT_APP_MAP_API_KEY}`}
                libraries={libraries}>
                <Switch>
                    <Route path="/" exact component={MyTrecipes} />
                    <Route path="/search" component={SearchResult} />
                    <Route path="/:trecipeId" component={Trecipe} />
                    <Route path="/map/:trecipeId" component={Map} />
                </Switch>
            </LoadScript>

            <Footer />
        </div>
    );
};

export default Pages;
