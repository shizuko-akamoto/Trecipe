import React, { Component, RefObject } from 'react';
import { Image } from '../Image/Image';
import './StaticMap.scss';
import { staticMapStyle } from './mapHelper';
import { isEmpty } from 'lodash';

/**
 * MarkerColor
 * Color (24-bit) for markers on the map
 */
export enum MarkerColor {
    Blue = '489fb5',
    Grey = '52575c',
}

/**
 * Marker
 * lat: latitude of the marker
 * long: longitude of the marker
 * color: (Optional) Color of the marker
 */
export interface Marker {
    lat: number;
    long: number;
    color?: string;
    label?: string;
}

/**
 * StaticMapProps
 * height: height of the static map (in rem)
 * mapScale: scale of the map (1 or 2), 2 will double the resolution
 * markers: array of Marker with latitude and longitude
 * markerSize: the size of the markers on the map ("tiny" | "small" | "mid")
 * Refer to Google static map API for more information
 */
export interface StaticMapProps {
    height: number;
    mapScale: 1 | 2;
    markerSize: 'tiny' | 'small' | 'mid';
    markers: Array<Marker>;
}

/**
 * StaticMapState
 * mapWidth: width of the map
 * mapHeight: height of the map
 */
export interface StaticMapState {
    mapWidth: number;
    mapHeight: number;
}

export class StaticMap extends Component<StaticMapProps, StaticMapState> {
    public static defaultProps: StaticMapProps = {
        height: 31.25,
        mapScale: 2,
        markerSize: 'small',
        markers: [],
    };

    public readonly state = {
        mapWidth: 640,
        mapHeight: 640,
    };

    /**
     * mapRef: a reference of the map container
     * timer: amount of time left before calling another function
     * timeInterval: time between each function call
     */
    private mapRef: RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    private timer: any = null;
    private timeInterval = 100;

    componentDidMount() {
        this.setMapSize();
        window.addEventListener('resize', this.startTimer.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.startTimer.bind(this));
    }

    // Using timer to reduce the amount of function call on window resize
    private startTimer() {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.setMapSize.bind(this), this.timeInterval);
    }

    private setMapSize() {
        if (this.mapRef.current) {
            this.setState({
                mapWidth: this.mapRef.current.clientWidth,
                mapHeight: this.mapRef.current.clientHeight,
            });
        }
    }

    private getMapSize(): [number, number] {
        const width = this.state.mapWidth;
        const height = this.state.mapHeight;

        // Maximun map size is 640, scale it down if it is larger than 640
        if (height > 640 || width > 640) {
            const ratio = width / height;
            return width > height ? [640, 640 / ratio] : [640 * ratio, 640];
        } else {
            return [width, height];
        }
    }

    /**
     * Generate the google map API URL based on the map props and location of markers
     */
    private getMapUrl(mapProps: StaticMapProps): string {
        const baseUrl = new URL('https://maps.googleapis.com/maps/api/staticmap');

        const mapSize = this.getMapSize();
        const urlParams = new URLSearchParams({
            size: `${Math.round(mapSize[0])}x${Math.round(mapSize[1])}`,
            scale: `${mapProps.mapScale}`,
            key: `${process.env.REACT_APP_MAP_API_KEY}`,
        });

        const markersParams = this.getMarkerParams(this.props.markers);
        markersParams.forEach((param) => {
            urlParams.append('markers', param);
        });

        // Center the map at a location when there is no marker
        if (this.props.markers.length === 0) {
            urlParams.append('center', 'vancouver');
        }

        baseUrl.search = `?${urlParams.toString()}`;
        return baseUrl.toString() + staticMapStyle;
    }

    /**
     * To define markers with different style, we have to supply multiple Markers parameter in the URL
     * Each parameter will be defined by a color followed optionally by label, then size and coordinates of markers
     * This function forms the parameters and return them in a array
     */
    private getMarkerParams(markers: Array<Marker>): string[] {
        let configs: Array<string>;
        return markers.map((marker) => {
            configs = [];
            if (marker.color) {
                configs.push(`color:0x${marker.color}`);
            }
            if (marker.label && !isEmpty(marker.label)) {
                configs.push(`label:${marker.label[0]}`);
            }
            configs.push(`size:${this.props.markerSize}`, `${marker.lat},${marker.long}`);
            return configs.join('|');
        });
    }

    render() {
        return (
            <div
                className="static-map-wrapper"
                ref={this.mapRef}
                style={{ height: `${this.props.height}rem` }}>
                <div className="static-map-image">
                    <Image src={this.getMapUrl(this.props)} imgStyle={{ borderRadius: '8px' }} />
                </div>
            </div>
        );
    }
}
