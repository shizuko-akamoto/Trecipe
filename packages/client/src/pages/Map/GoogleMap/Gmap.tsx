import React, { Component } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { DestinationModel } from '../../../redux/Destinations/types';
import { HoverMarker } from './HoverMarker';
import './gmap.scss';
import Spinner from '../../../components/Loading/Spinner';
import { mapColorStyle } from '../../../components/Map/mapHelper';
import { SearchBarPopup } from '../../../components/SearchBarPopup/SearchBarPopup';
import { CreateDestinationRequestDTO } from '../../../services/destinationService';

const mapOptions = {
    center: {
        lat: 49.2606,
        lng: -123.246,
    },
    mapStyle: {
        height: '100%',
        width: '100%',
    },
    className: 'GMap',
    zoom: 10,
    options: {
        styles: mapColorStyle,
        maxZoom: 18,
        zoomControlOptions: {
            position: 9,
        },
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
    },
};

interface GMapProps {
    destinations: Array<DestinationModel>;
    completedDest: Set<string>;
    onDestAdd: (destination: CreateDestinationRequestDTO) => void;
    onDestRemove: (destinationId: string) => void;
}

interface GMapState {
    loading: boolean;
    map: any;
}

export class GMap extends Component<GMapProps, GMapState> {
    public readonly state: Readonly<GMapState> = {
        loading: true,
        map: null,
    };

    private onMapLoad = (map: google.maps.Map) => {
        this.recenterMap(map);

        this.setState((state: GMapState) => ({
            loading: false,
            map: map,
        }));
    };

    // Recenter the map to ensure all markers are visible
    private recenterMap = (map: google.maps.Map) => {
        let mapBound = new google.maps.LatLngBounds();
        if (this.props.destinations.length !== 0) {
            this.props.destinations.forEach((dest) =>
                mapBound.extend({
                    lat: dest.geometry.lat,
                    lng: dest.geometry.lng,
                })
            );

            map.fitBounds(mapBound);
        }
    };

    // Callback function for adding a destination
    private newDestAdd = (destination: CreateDestinationRequestDTO) => {
        this.props.onDestAdd(destination);

        // Pan and zoom the map to newly added destination
        if (this.state.map) {
            this.state.map.panTo({
                lat: destination.geometry.lat,
                lng: destination.geometry.lng,
            });
            this.state.map.setZoom(15);
        }

        // Scroll to the new destination card
        let elementToView = document.getElementById(destination.placeId);
        elementToView?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
        });
    };

    render() {
        return (
            <div className="gmap-wrapper">
                {this.state.loading && <Spinner />}
                <GoogleMap
                    mapContainerStyle={mapOptions.mapStyle}
                    mapContainerClassName={mapOptions.className}
                    center={mapOptions.center}
                    zoom={mapOptions.zoom}
                    onLoad={this.onMapLoad}
                    options={mapOptions.options}>
                    {this.props.destinations.map((dest) => (
                        <HoverMarker
                            key={dest.uuid}
                            dest={dest}
                            completed={this.props.completedDest.has(dest.uuid)}
                        />
                    ))}
                </GoogleMap>
                <div className="gmap-search-bar">
                    <SearchBarPopup
                        minWidth={20}
                        onDestAdd={this.newDestAdd}
                        onDestRemove={this.props.onDestRemove}
                    />
                </div>
            </div>
        );
    }
}
