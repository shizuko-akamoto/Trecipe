import React, { Component } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { HoverMarker } from './HoverMarker';
import './gmap.scss';
import { mapColorStyle } from '../../../components/Map/mapHelper';
import { SearchBarPopup } from '../../../components/SearchBarPopup/SearchBarPopup';
import { Legend } from './Legend';
import { CreateNewDestinationDTO } from '../../../../../shared/models/createNewDestinationDTO';
import Destination from '../../../../../shared/models/destination';
import OverlaySpinner from '../../../components/Loading/OverlaySpinner';

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
    destinations: Array<Destination>;
    completedDest: Set<string>;
    onDestAdd: (destination: CreateNewDestinationDTO) => void;
    onDestRemove: (destinationId: string) => void;
    readOnly: boolean;
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
    private newDestAdd = (destData: CreateNewDestinationDTO) => {
        this.props.onDestAdd(destData);

        // Pan and zoom the map to newly added destination
        if (this.state.map) {
            this.state.map.panTo({
                lat: destData.geometry.lat,
                lng: destData.geometry.lng,
            });
            this.state.map.setZoom(15);
        }

        // Scroll to the new destination card
        let elementToView = document.getElementById(destData.placeId);
        elementToView?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
        });
    };

    render() {
        return (
            <div className="gmap-wrapper">
                {this.state.loading && <OverlaySpinner size={50} />}
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
                            completed={
                                !this.props.readOnly
                                    ? this.props.completedDest.has(dest.uuid)
                                    : true
                            }
                        />
                    ))}
                </GoogleMap>
                {!this.props.readOnly && (
                    <div className="gmap-search-bar">
                        <SearchBarPopup
                            minWidth={20}
                            addedDests={this.props.destinations}
                            onDestAdd={this.newDestAdd}
                            onDestRemove={this.props.onDestRemove}
                        />
                    </div>
                )}
                {!this.props.readOnly && (
                    <div className="gmap-legend">
                        <Legend />
                    </div>
                )}
            </div>
        );
    }
}
