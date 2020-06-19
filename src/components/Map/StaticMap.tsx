import React, { MouseEvent, Component } from "react";
import { Image } from "../Image/Image";
import { Button } from "../Button/Button";
import { MAP_KEY } from "./constant";
import "./StaticMap.scss";

/**
 * MarkerColor
 * Color (24-bit) for markers on the map
 */
export enum MarkerColor {
  Blue = "58a5fc",
  Grey = "82aabf",
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
  color?: MarkerColor;
}

/**
 * StaticMapProps
 * mapWidth: width of the map (maximum is 640px)
 * mapHeight: height of the map  (maximum is 640px)
 * mapScale: scale of the map (1 or 2), 2 will double the resolution
 * markers: array of Marker with latitude and longitude
 * markerSize: the size of the markers on the map ("tiny" | "small" | "mid")
 * Refer to Google static map API for more information
 */
export interface StaticMapProps {
  mapWidth: number;
  mapHeight: number;
  mapScale: 1 | 2;
  markers: Array<Marker>;
  markerSize: "tiny" | "small" | "mid";
  onClick: (e: MouseEvent<HTMLElement>) => void;
}

// TODO: Remove this before merging into master
const SAMPLE_LAT_LONG: Array<Marker> = [
  { lat: 49.2606, long: -123.246, color: MarkerColor.Grey },
  { lat: 49.22446, long: -123.11864, color: MarkerColor.Blue },
  { lat: 49.18056, long: -123.18021, color: MarkerColor.Grey },
  { lat: 49.28737, long: -123.12911 },
];

export class StaticMap extends Component<StaticMapProps> {
  public static defaultProps: StaticMapProps = {
    mapWidth: 640,
    mapHeight: 224,
    mapScale: 2,
    onClick: () => {},
    markerSize: "small",
    // TODO: Update this to empty array before merging into master
    markers: SAMPLE_LAT_LONG,
  };

  /**
   * Generate the google map API URL based on the map props and location of markers
   */
  private getMapUrl(mapProps: StaticMapProps): string {
    const baseUrl = new URL("https://maps.googleapis.com/maps/api/staticmap");

    const urlParams = new URLSearchParams({
      size: `${mapProps.mapWidth}x${mapProps.mapHeight}`,
      scale: `${mapProps.mapScale}`,
      key: `${MAP_KEY}`,
    });

    const markersParams = this.getMarkerParams(mapProps.markers);
    markersParams.forEach((param) => {
      urlParams.append("markers", param);
    });

    // Center the map at a location when there is no marker
    if (this.props.markers.length === 0) {
      urlParams.append("center", "vancouver");
    }

    baseUrl.search = `?${urlParams.toString()}`;
    return baseUrl.toString();
  }

  /**
   * To define markers with different style, we have to supply multiple Markers parameter in the URL
   * Each parameter will be defined by a color followed by size and coordinates of markers
   * This function forms the parameters and return them in a array
   */
  private getMarkerParams(markers: Array<Marker>): string[] {
    let paramsMap: any = {};

    const markerColors = Object.values(MarkerColor);
    markerColors.forEach((color) => {
      paramsMap[color] = "";
    });

    markers.forEach((marker) => {
      if (marker.color) {
        paramsMap[marker.color] = `${paramsMap[marker.color]}|${marker.lat},${
          marker.long
        }`;
      } else {
        paramsMap[MarkerColor.Grey] = `${paramsMap[MarkerColor.Grey]}|${
          marker.lat
        },${marker.long}`;
      }
    });

    markerColors.forEach((color) => {
      if (paramsMap[color] !== "") {
        paramsMap[color] = `|size:${this.props.markerSize}${paramsMap[color]}`;
        paramsMap[color] = `color:0x${color}${paramsMap[color]}`;
      } else {
        delete paramsMap[color];
      }
    });

    return Object.values(paramsMap);
  }

  render() {
    return (
      <div className="static-map-wrapper">
        <div className="static-map-image">
          <Image src={this.getMapUrl(this.props)} />
        </div>
        <div
          className="static-map-overlay"
          onClick={(e) => this.props.onClick(e)}>
          <Button icon="expand" text="Expand View" />
        </div>
      </div>
    );
  }
}
