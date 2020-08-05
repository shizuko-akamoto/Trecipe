import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import MyTrecipes from './MyTrecipes/MyTrecipes';
import Header from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import TrecipePage from './Trecipe/TrecipePage';
import Map from './Map/Map';
import DestinationPage from './Destination/DestinationPage';
import SearchResult from './SearchResult/SearchResult';
import { LoadScript } from '@react-google-maps/api';
import Login from './Login/Login';
import PrivateRoute from '../components/Route/PrivateRoute';
import { getUser } from '../redux/User/action';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

const libraries = ['places'];

type PagesProps = ReturnType<typeof mapDispatchToProps>;

const Pages = (props: PagesProps) => {
    useEffect(() => {
        props.getUser();
    });
    return (
        <div>
            <Header />
            <LoadScript
                googleMapsApiKey={`${process.env.REACT_APP_MAP_API_KEY}`}
                libraries={libraries}>
                <Switch>
                    <Route path="/search" component={SearchResult} />
                    <PrivateRoute path="/" exact component={MyTrecipes} />
                    <PrivateRoute path="/:trecipeId" exact component={TrecipePage} />
                    <PrivateRoute path="/map/:trecipeId" component={Map} />
                    <Route path="/destinations/:placeId" exact component={DestinationPage} />
                    <Route path="/user/login" exact component={Login} />
                </Switch>
            </LoadScript>
            <Footer />
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            getUser,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(Pages);
