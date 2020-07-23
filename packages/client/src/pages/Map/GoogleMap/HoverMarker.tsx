import React, { Component } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { DestInfoWindow } from './DestInfoWindow';
import { UnreachableCaseException } from '../../../exceptions/Exceptions';
import Destination, { DestinationCategory } from '../../../../../shared/models/destination';

interface markerProps {
    dest: Destination;
    completed: boolean;
}

interface markerState {
    onHover: boolean;
    isActive: boolean;
}

export class HoverMarker extends Component<markerProps, markerState> {
    public readonly state: Readonly<markerState> = {
        onHover: false,
        isActive: false,
    };

    private getIconUrl(category: DestinationCategory, completed: boolean) {
        const baseURL = 'https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?';
        let result = '';

        if (completed) {
            result = `${baseURL}background=489fb5`;
        } else {
            result = `${baseURL}background=52575c`;
        }

        switch (category) {
            case DestinationCategory.Food:
                return `${result}&icon=fa-utensils`;
            case DestinationCategory.Shopping:
                return `${result}&icon=fa-shopping-cart`;
            case DestinationCategory.Accommodation:
                return `${result}&icon=fa-bed`;
            case DestinationCategory.Attraction:
                return `${result}&icon=fa-binoculars`;
            case DestinationCategory.Others:
                return `${result}&icon=fa-circle`;
            default:
                throw new UnreachableCaseException(category);
        }
    }

    private onMouseEnter = () => {
        this.setState((state: markerState) => ({
            onHover: true,
        }));
    };

    private onMouseExit = () => {
        this.setState((state: markerState) => ({
            onHover: false,
        }));
    };

    private toggleMarker = () => {
        this.setState((state: markerState) => ({
            isActive: !state.isActive,
        }));
    };

    private onClick = () => {
        let elementToView = document.getElementById(this.props.dest.uuid);
        elementToView?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
        });
        this.toggleMarker();
    };

    // Override the default google map's info window style dynamically
    // Can't use a scss file because they get wiped whenever the map is closed (side effect of library)
    private onDomReady = () => {
        let eles = document.getElementsByClassName('gm-style-iw-c');
        Array.prototype.forEach.call(eles, function (ele, index) {
            ele.style.padding = '0';
        });

        eles = document.getElementsByClassName('gm-style-iw-d');
        Array.prototype.forEach.call(eles, function (ele, index) {
            ele.style.overflow = 'auto';
        });
    };

    render() {
        const dest = this.props.dest;
        const completed = this.props.completed;
        const destLatLong = {
            lat: dest.geometry.lat,
            lng: dest.geometry.lng,
        };
        // NOTE: Destination category will always be nonempty with Others category
        const iconURL = this.getIconUrl(dest.category[0], completed);
        const showInfoWindow = this.state.isActive || this.state.onHover;
        return (
            <Marker
                position={destLatLong}
                title={dest.name}
                icon={iconURL}
                onMouseOver={this.onMouseEnter}
                onMouseOut={this.onMouseExit}
                onClick={this.onClick}>
                {showInfoWindow && (
                    <InfoWindow onDomReady={this.onDomReady} onCloseClick={this.toggleMarker}>
                        <DestInfoWindow destination={dest} />
                    </InfoWindow>
                )}
            </Marker>
        );
    }
}
