import React from 'react';
import { CoverPhoto } from '../../components/CoverPhoto/CoverPhoto';
import './DestinationPage.scss';
import { Button } from '../../components/Button/Button';
import { RootState } from '../../redux';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { StaticMap } from '../../components/Map/StaticMap';
import Destination, { getIcon, Rating } from '../../../../shared/models/destination';
import { getDestinationById } from '../../redux/Destinations/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDestCategory } from '../../components/Map/mapHelper';
import { DestInfoWindow } from '../../components/DestinationInfo/DestInfoWindow';
import Review from './Review/review';
import { isEmpty } from 'lodash';

export type DestinationProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    RouteComponentProps<{ destId: string }>;

export interface DestinationState {
    nearbyDestinations: Array<Destination>;
    photos: Array<google.maps.places.PlacePhoto>;
    reviews: Array<google.maps.places.PlaceReview>;
}

class DestinationPage extends React.Component<DestinationProps, DestinationState> {
    private map: google.maps.Map;
    private mapService: google.maps.places.PlacesService;

    constructor(props: DestinationProps) {
        super(props);
        this.map = new google.maps.Map(document.createElement('div'));
        this.mapService = new google.maps.places.PlacesService(this.map);
        this.state = {
            nearbyDestinations: [],
            photos: [],
            reviews: [],
        };
    }

    componentDidMount(): void {
        const destId = this.props.match.params.destId;
        if (this.props.destination && this.props.destination.uuid === destId) {
            this.initializeDestDetail(this.props.destination);
            this.initializeNearbyDestinations(this.props.destination);
        } else {
            this.props.getDestinationById(destId);
        }
    }

    componentDidUpdate(
        prevProps: Readonly<DestinationProps>,
        prevState: Readonly<DestinationState>,
        snapshot?: any
    ): void {
        if (
            (!prevProps.destination && this.props.destination) ||
            (prevProps.destination &&
                this.props.destination &&
                prevProps.destination.uuid !== this.props.destination.uuid)
        ) {
            this.initializeDestDetail(this.props.destination);
            this.initializeNearbyDestinations(this.props.destination);
        }
    }

    private initializeNearbyDestinations(destination: Destination) {
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

    private getDestModel(placeResult: google.maps.places.PlaceResult): Destination {
        return {
            name: placeResult.name,
            category: getDestCategory(placeResult.types),
            geometry: {
                lat: placeResult.geometry ? placeResult.geometry.location.lat() : 0,
                lng: placeResult.geometry ? placeResult.geometry.location.lng() : 0,
            },
            formattedAddress: placeResult.formatted_address ? placeResult.formatted_address : '',
            formattedPhoneNumber: placeResult.formatted_phone_number
                ? placeResult.formatted_phone_number
                : '',
            rating: placeResult.rating
                ? (Math.max(5, Math.round(placeResult.rating)) as Rating)
                : 0,
            website: placeResult.website ? placeResult.website : '',
            placeId: placeResult.place_id ? placeResult.place_id : '',
            // dummy fields
            uuid: '',
            userRatings: [],
            description: '',
            photoRefs: placeResult.photos
                ? placeResult.photos.map((photo) => photo.getUrl({ maxHeight: 100 }))
                : [],
        };
    }

    private initializeDestDetail(destination: Destination) {
        let request: google.maps.places.PlaceDetailsRequest = {
            placeId: destination.placeId,
            fields: ['photos', 'reviews'],
        };
        this.mapService.getDetails(request, this.processPlaceDetailResult.bind(this));
    }

    private processPlaceDetailResult(
        result: google.maps.places.PlaceResult,
        status: google.maps.places.PlacesServiceStatus
    ) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.setState({
                photos: result.photos ? result.photos : [],
                reviews: result.reviews ? result.reviews : [],
            });
        }
    }

    private static SAVE_DESTINATION_BUTTON = 'Save';
    render() {
        const destination: Destination | undefined = this.props.destination;
        if (!destination) {
            return null;
        } else {
            const nearbys = this.state.nearbyDestinations.slice(0, 5);
            return (
                <div>
                    <div className="dest-page-header-container">
                        <CoverPhoto
                            imageSource={
                                isEmpty(this.state.photos)
                                    ? null
                                    : this.state.photos[0].getUrl({ maxHeight: 600 })
                            }
                            buttons={[
                                <Button
                                    key={DestinationPage.SAVE_DESTINATION_BUTTON}
                                    text={DestinationPage.SAVE_DESTINATION_BUTTON}
                                    icon={['far', 'star']}
                                    onClick={() => {
                                        return;
                                    }}
                                />,
                            ]}>
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
                                    {destination.category.map((item) => (
                                        <span className="dest-info-item" key={item}>
                                            <FontAwesomeIcon icon={getIcon(item)} />
                                            {item}
                                        </span>
                                    ))}
                                    <span className="dest-info-item">
                                        <FontAwesomeIcon icon="map-marker-alt" fixedWidth />
                                        {destination.formattedAddress}
                                    </span>
                                    {destination.formattedPhoneNumber && (
                                        <span className="dest-info-item">
                                            <FontAwesomeIcon icon="phone" fixedWidth />
                                            {destination.formattedPhoneNumber}
                                        </span>
                                    )}
                                    {destination.website && (
                                        <span className="dest-info-item">
                                            <FontAwesomeIcon
                                                icon={['far', 'window-maximize']}
                                                fixedWidth
                                            />
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={destination.website}>
                                                Website
                                            </a>
                                        </span>
                                    )}
                                    <h1 className="dest-page-title">Explore Nearby</h1>
                                    {nearbys.map((dest) => (
                                        <div className="nearby-dest-item">
                                            <DestInfoWindow key={dest.placeId} destination={dest} />
                                        </div>
                                    ))}
                                </div>
                                <div className="dest-map-wrapper">
                                    <StaticMap
                                        destinations={[destination, ...nearbys]}
                                        completedDests={new Set<string>([destination.uuid])}
                                        height={20}
                                    />
                                    {!isEmpty(this.state.reviews) && (
                                        <h1 className="dest-page-title">Reviews</h1>
                                    )}
                                    <div className="dest-ratings">
                                        {this.state.reviews.map((review) => (
                                            <Review review={review} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="associated-trecipes-wrapper"></div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{ destId: string }>) => {
    const destId = ownProps.match.params.destId;
    const destination = state.destinations.dests.find((dest) => dest.uuid === destId);
    return {
        destination: destination,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            getDestinationById,
        },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DestinationPage));
