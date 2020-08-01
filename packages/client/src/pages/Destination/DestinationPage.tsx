import React from 'react';
import { CoverPhoto } from '../../components/CoverPhoto/CoverPhoto';
import './DestinationPage.scss';
import { Button } from '../../components/Button/Button';
import { RootState } from '../../redux';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { Marker, MarkerColor, StaticMap } from '../../components/Map/StaticMap';
import Destination, { getIcon, Rating } from '../../../../shared/models/destination';
import { getDestinationById } from '../../redux/Destinations/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDestModel } from '../../components/Map/mapHelper';
import Review from './Review/review';
import { isEmpty } from 'lodash';
import { fetchAssociatedTrecipesRequest } from '../../redux/TrecipeList/action';
import Trecipe from '../../../../shared/models/trecipe';
import TrecipeCard from '../MyTrecipes/TrecipeCard/TrecipeCard';
import { showModal } from '../../redux/Modal/action';
import TrecipePicker from '../../components/TrecipePicker/TrecipePicker';
import { CreateNewDestinationDTO } from '../../../../shared/models/createNewDestinationDTO';
import { NearbyDestCard } from './NearbyDestCard/NearbyDestCard';

/**
 * Destination props
 * placeId: place id of destination to display
 *          Since we want to be able to display places from Google as well as places from our database, using place id instead of uuid
 * associatedTrecipes: from redux store, list of all public trecipes containing this destination
 */
export type DestinationProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    RouteComponentProps<{ placeId: string }>;

/**
 * Destination state
 * nearbyDestinations: destinations nearby from Google Place API
 * destination: destination model
 * photos: photos of this destination from Google Place API
 * review: reviews from Google Place API
 */
export interface DestinationState {
    nearbyDestinations: Array<Destination>;
    destination: Destination | undefined;
    photos: Array<google.maps.places.PlacePhoto>;
    reviews: Array<google.maps.places.PlaceReview>;
}

class DestinationPage extends React.Component<DestinationProps, DestinationState> {
    private static SAVE_DESTINATION_BUTTON = 'Save';

    private map: google.maps.Map;
    private mapService: google.maps.places.PlacesService;

    constructor(props: DestinationProps) {
        super(props);
        this.map = new google.maps.Map(document.createElement('div'));
        // service used for calling Google Place API
        this.mapService = new google.maps.places.PlacesService(this.map);
        // until fetch from Google Place API completes, those field will be empty/undefined
        this.state = {
            nearbyDestinations: [],
            destination: undefined,
            photos: [],
            reviews: [],
        };
    }

    componentDidMount(): void {
        const placeId = this.props.match.params.placeId;
        // retrieve public trecipes containing this destination
        this.props.fetchAssociatedTrecipesRequest(placeId, 10);
        // use place id to fetch place details from Google
        this.initializeDestDetail(placeId);
    }

    componentDidUpdate(
        prevProps: Readonly<DestinationProps>,
        prevState: Readonly<DestinationState>,
        snapshot?: any
    ): void {
        // when we're looking at new destination, refetch destination details and associated trecipes
        const placeId = this.props.match.params.placeId;
        if (prevProps.match.params.placeId !== placeId) {
            this.props.fetchAssociatedTrecipesRequest(placeId, 10);
            this.initializeDestDetail(placeId);
        }
        // if destination in state has been defined, or when destination place id changes, refetch nearby destinations
        if (
            (!prevState.destination && this.state.destination) ||
            (prevState.destination &&
                this.state.destination &&
                prevState.destination.placeId !== this.state.destination.placeId)
        ) {
            this.initializeNearbyDestinations(this.state.destination);
        }
    }

    private initializeNearbyDestinations(destination: CreateNewDestinationDTO) {
        const center = new google.maps.LatLng(destination.geometry);
        const request = {
            location: center,
            radius: 500,
        };

        this.mapService.nearbySearch(request, this.processNearbySearchResults.bind(this));
    }

    private processNearbySearchResults(
        results: Array<google.maps.places.PlaceResult>,
        status: google.maps.places.PlacesServiceStatus
    ) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.setState({
                nearbyDestinations: results.map((place: google.maps.places.PlaceResult) =>
                    this.getDestModel(place)
                ),
            });
        }
    }

    private initializeDestDetail(placeId: string) {
        let request: google.maps.places.PlaceDetailsRequest = {
            placeId: placeId,
            fields: ['ALL'],
        };
        this.mapService.getDetails(request, this.processPlaceDetailResult.bind(this));
    }

    private processPlaceDetailResult(
        result: google.maps.places.PlaceResult,
        status: google.maps.places.PlacesServiceStatus
    ) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.setState({
                destination: this.getDestModel(result),
                photos: result.photos ? result.photos : [],
                reviews: result.reviews ? result.reviews : [],
            });
        }
    }

    private openTrecipePicker() {
        if (this.state.destination) {
            const dest = this.state.destination;
            this.props.showModal(<TrecipePicker destination={dest} />);
        }
    }

    private getDestModel(place: google.maps.places.PlaceResult) {
        return {
            ...getDestModel(place),
            uuid: '',
            userRatings: [],
            description: '',
            photoRefs: place.photos
                ? place.photos.map((photo) => photo.getUrl({ maxHeight: 100 }))
                : [],
            rating: place.rating ? (Math.min(5, Math.round(place.rating)) as Rating) : 0,
        };
    }

    private getMarkers(dest: Destination, nearbys: Array<Destination>): Array<Marker> {
        const nearbyMarkers: Marker[] = nearbys.map((nearbyDest, index) => {
            return {
                lat: nearbyDest.geometry.lat,
                long: nearbyDest.geometry.lng,
                color: MarkerColor.Grey,
                label: `${index + 1}`,
            };
        });
        const destMarker: Marker = {
            lat: dest.geometry.lat,
            long: dest.geometry.lng,
            color: MarkerColor.Blue,
        };
        return [destMarker, ...nearbyMarkers];
    }

    render() {
        const destination: Destination | undefined = this.state.destination;
        if (!destination) {
            return null;
        } else {
            // display up to 5 nearby locations and reviews
            const nearbys = this.state.nearbyDestinations.slice(0, 5);
            const reviews = this.state.reviews.slice(0, 5);
            return (
                <div>
                    <div className="dest-page-header-container">
                        <CoverPhoto
                            imageSource={
                                isEmpty(this.state.photos)
                                    ? null
                                    : this.state.photos[0].getUrl({ maxHeight: 600 })
                            }
                            buttons={
                                this.props.isAuthenticated
                                    ? [
                                          <Button
                                              key={DestinationPage.SAVE_DESTINATION_BUTTON}
                                              text={DestinationPage.SAVE_DESTINATION_BUTTON}
                                              icon={['far', 'star']}
                                              onClick={this.openTrecipePicker.bind(this)}
                                          />,
                                      ]
                                    : []
                            }>
                            <div className="dest-page-header-text">
                                <h1 className="dest-name">{destination.name}</h1>
                            </div>
                        </CoverPhoto>
                        <svg
                            className="border"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none">
                            <path d="M 0 0 Q 50 50 100 0 V 100 H 0 Z" />
                        </svg>
                    </div>
                    <div className="dest-page-content-wrapper">
                        <div className="content">
                            <div className="dest-details">
                                <div className="dest-info">
                                    <h1 className="dest-page-title">Location and Contact</h1>
                                    <span className="dest-info-item">
                                        <FontAwesomeIcon
                                            icon={getIcon(destination.category[0])}
                                            fixedWidth
                                        />
                                        <p className="info-text">
                                            {destination.category.join(', ')}
                                        </p>
                                    </span>
                                    <span className="dest-info-item">
                                        <FontAwesomeIcon icon="map-marker-alt" fixedWidth />
                                        <p className="info-text">{destination.formattedAddress}</p>
                                    </span>
                                    {destination.formattedPhoneNumber && (
                                        <span className="dest-info-item">
                                            <FontAwesomeIcon icon="phone" fixedWidth />
                                            <p className="info-text">
                                                {destination.formattedPhoneNumber}
                                            </p>
                                        </span>
                                    )}
                                    {destination.website && (
                                        <span className="dest-info-item">
                                            <FontAwesomeIcon
                                                icon={['far', 'window-maximize']}
                                                fixedWidth
                                            />
                                            <a
                                                className="router-link info-text"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={destination.website}>
                                                Website
                                            </a>
                                        </span>
                                    )}
                                    <h1 className="dest-page-title">Explore Nearby</h1>
                                    {nearbys.map((dest, index) => (
                                        <div className="nearby-dest-item" key={dest.placeId}>
                                            <Link
                                                to={`/destinations/${dest.placeId}`}
                                                className="router-link">
                                                <NearbyDestCard
                                                    destination={dest}
                                                    index={index + 1}
                                                />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                                <div className="dest-map-wrapper">
                                    <StaticMap
                                        markers={this.getMarkers(destination, nearbys)}
                                        markerSize={'mid'}
                                        height={isEmpty(reviews) ? 50 : 20}
                                    />
                                    {!isEmpty(reviews) && (
                                        <h1 className="dest-page-title">Reviews</h1>
                                    )}
                                    <div className="dest-ratings">
                                        {reviews.map((review) => (
                                            <Review key={review.author_name} review={review} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {!isEmpty(this.props.associatedTrecipes) && (
                                <div className="associated-trecipes-wrapper">
                                    <h1 className="dest-page-title">Explore Trecipes</h1>

                                    <ul className="associated-trecipes-list">
                                        {this.props.associatedTrecipes.map((trecipe: Trecipe) => (
                                            <li
                                                key={trecipe.uuid}
                                                className="associated-trecipe-item">
                                                <TrecipeCard {...trecipe} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{ placeId: string }>) => {
    return {
        associatedTrecipes: state.trecipeList.associatedTrecipes,
        isAuthenticated: state.user.isAuthenticated,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            getDestinationById,
            fetchAssociatedTrecipesRequest,
            showModal,
        },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DestinationPage));
