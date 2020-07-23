import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MyTrecipes from './MyTrecipes/MyTrecipes';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import TrecipePage from './Trecipe/TrecipePage';
import Map from './Map/Map';
import DestinationPage from './Destination/DestinationPage';
import { LoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const Pages = () => {
    return (
        <div>
            <Header />
            <Switch>
                <LoadScript
                    googleMapsApiKey={`${process.env.REACT_APP_MAP_API_KEY}`}
                    libraries={libraries}>
                    <Route path="/trecipes" exact component={MyTrecipes} />
                    <Route path="/trecipes/:trecipeId" exact component={TrecipePage} />
                    <Route path="/destinations/:destId" exact component={DestinationPage} />
                    <Route path="/map/:trecipeId" component={Map} />
                </LoadScript>
            </Switch>
            <Footer />
        </div>
    );
};

export default Pages;
