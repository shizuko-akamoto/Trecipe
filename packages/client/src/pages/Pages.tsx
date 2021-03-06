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
import { NotFound } from './NotFound/NotFound';
import Landing from './Landing/Landing';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './Error/ErrorFallback';
import FullScreenLoader from '../components/Loading/FullScreenLoader';

const libraries = ['places'];

type PagesProps = ReturnType<typeof mapDispatchToProps>;

const Pages = (props: PagesProps) => {
    useEffect(() => {
        props.getUser();
    });
    return (
        <div>
            {/*ErrorBoundary used to catch any exception thrown directly from children's component lifecycle*/}
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Header />
                <LoadScript
                    googleMapsApiKey={`${process.env.REACT_APP_MAP_API_KEY}`}
                    libraries={libraries}
                    loadingElement={<FullScreenLoader />}>
                    <Switch>
                        <Route path="/" exact component={Landing} />
                        <PrivateRoute path="/mytrecipes" exact component={MyTrecipes} />
                        <Route path="/trecipes/:trecipeId" exact component={TrecipePage} />
                        <Route path="/map/:trecipeId" exact component={Map} />
                        <Route path="/destinations/:placeId" exact component={DestinationPage} />
                        <Route path="/user/login" exact component={Login} />
                        <Route path="/search" component={SearchResult} />
                        <Route component={NotFound} />
                    </Switch>
                </LoadScript>
                <Footer />
            </ErrorBoundary>
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
