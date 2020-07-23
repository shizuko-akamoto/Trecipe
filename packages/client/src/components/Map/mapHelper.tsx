import { intersection } from 'lodash';
import { CreateNewDestinationDTO } from '../../../../shared/models/createNewDestinationDTO';
import { DestinationCategory, Rating } from '../../../../shared/models/destination';

// Start a autocomplete service and place details service
export class AutoComplete {
    autoCompleteService: google.maps.places.AutocompleteService;
    placeService: google.maps.places.PlacesService;
    sessionToken: google.maps.places.AutocompleteSessionToken;

    constructor() {
        let divElement = document.createElement('div');
        this.autoCompleteService = new google.maps.places.AutocompleteService();
        this.sessionToken = new google.maps.places.AutocompleteSessionToken();
        this.placeService = new google.maps.places.PlacesService(divElement);
    }

    // Each session consists of multiple auto complete requests and ends with a place details request
    // Autocomplete requests is free if place details request is used shortly after
    refreshSessionToken() {
        this.sessionToken = new google.maps.places.AutocompleteSessionToken();
    }

    getPredictions(input: string): any {
        let request: google.maps.places.AutocompletionRequest = {
            input: input,
            sessionToken: this.sessionToken,
        };

        return new Promise<Array<google.maps.places.AutocompletePrediction>>((resolve, reject) => {
            this.autoCompleteService.getPlacePredictions(
                request,
                (
                    predictions: Array<google.maps.places.AutocompletePrediction>,
                    status: google.maps.places.PlacesServiceStatus
                ) => {
                    if (status !== google.maps.places.PlacesServiceStatus.OK) {
                        reject(`Response's status is not OK`);
                    }
                    resolve(predictions);
                }
            );
        });
    }

    getPlaceDetails(placeId: string) {
        let request: google.maps.places.PlaceDetailsRequest = {
            placeId: placeId,
            sessionToken: this.sessionToken,
            fields: ['ALL'],
        };

        this.refreshSessionToken();

        return new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
            this.placeService.getDetails(
                request,
                (
                    result: google.maps.places.PlaceResult,
                    status: google.maps.places.PlacesServiceStatus
                ) => {
                    if (status !== google.maps.places.PlacesServiceStatus.OK) {
                        reject(`Response's status is not OK`);
                    }
                    resolve(result);
                }
            );
        });
    }
}

// Convert google place result to our destination model
export const getDestModel = (
    placeResult: google.maps.places.PlaceResult
): CreateNewDestinationDTO => {
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
        rating: placeResult.rating ? (Math.max(5, Math.round(placeResult.rating)) as Rating) : 0,
        website: placeResult.website ? placeResult.website : '',
        placeId: placeResult.place_id ? placeResult.place_id : '',
    };
};

// Get destination category based on the types return by the google's place API
export const getDestCategory = (types: Array<string> | undefined): Array<DestinationCategory> => {
    let categories: DestinationCategory[] = [];
    if (types) {
        for (const [key, value] of Object.entries(destTypes)) {
            if (intersection(types, value).length > 0) {
                categories.push(key as DestinationCategory);
            }
        }
    }
    // if no category match is found, assign "Others" by default
    if (categories.length === 0) {
        categories = [DestinationCategory.Others];
    }
    return categories;
};

export const destTypes = {
    [DestinationCategory.Food]: ['bar', 'cafe', 'meal_delivery', 'meal_takeaway', 'restaurant'],
    [DestinationCategory.Shopping]: [
        'bakery',
        'bicycle_store',
        'book_store',
        'clothing_store',
        'convenience_store',
        'department_store',
        'drugstore',
        'electronics_store',
        'furniture_store',
        'hardware_store',
        'home_goods_store',
        'jewelry_store',
        'liquor_store',
        'pet_store',
        'shoe_store',
        'shopping_mall',
        'store',
        'supermarket',
    ],
    [DestinationCategory.Accommodation]: ['lodging', 'rv_park'],
    [DestinationCategory.Attraction]: [
        'amusement_park',
        'aquarium',
        'art_gallery',
        'bowling_alley',
        'campground',
        'casino',
        'museum',
        'park',
        'tourist_attraction',
        'zoo',
        'natural_feature',
    ],
};

// Generated using https://mapstyle.withgoogle.com/
export const staticMapStyle = `&style=feature:administrative%7Celement:labels.text.fill%7Ccolor:0x6195a0
&style=feature:administrative.province%7Celement:geometry.stroke%7Cvisibility:off
&style=feature:landscape%7Celement:geometry%7Ccolor:0xf5f5f2%7Csaturation:0%7Clightness:0%7Cgamma:1
&style=feature:landscape.man_made%7Clightness:-3%7Cgamma:1.00
&style=feature:landscape.natural.terrain%7Cvisibility:off
&style=feature:poi%7Cvisibility:off
&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0xbae5ce%7Cvisibility:on
&style=feature:road%7Csaturation:-100%7Clightness:45%7Cvisibility:simplified
&style=feature:road.arterial%7Celement:labels.icon%7Cvisibility:off
&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x787878
&style=feature:road.highway%7Cvisibility:simplified
&style=feature:road.highway%7Celement:geometry.fill%7Ccolor:0xfac9a9%7Cvisibility:simplified
&style=feature:road.highway%7Celement:labels.text%7Ccolor:0x4e4e4e
&style=feature:transit%7Cvisibility:simplified
&style=feature:transit.station.airport%7Celement:labels.icon%7Chue:0x0a00ff%7Csaturation:-77%7Clightness:0%7Cgamma:0.57
&style=feature:transit.station.rail%7Celement:labels.icon%7Chue:0xff6c00%7Csaturation:-68%7Clightness:4%7Cgamma:0.75
&style=feature:transit.station.rail%7Celement:labels.text.fill%7Ccolor:0x43321e
&style=feature:water%7Ccolor:0xeaf6f8%7Cvisibility:on
&style=feature:water%7Celement:geometry.fill%7Ccolor:0xc7eced
&style=feature:water%7Celement:labels.text.fill%7Csaturation:-53%7Clightness:-49%7Cgamma:0.79`;

// Copied from https://snazzymaps.com/style/14889/flat-pale
export const mapColorStyle: google.maps.MapTypeStyle[] = [
    {
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#6195a0',
            },
        ],
    },
    {
        featureType: 'administrative.province',
        elementType: 'geometry.stroke',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            {
                lightness: 0,
            },
            {
                saturation: 0,
            },
            {
                color: '#f5f5f2',
            },
            {
                gamma: 1,
            },
        ],
    },
    {
        featureType: 'landscape.man_made',
        elementType: 'all',
        stylers: [
            {
                lightness: -3,
            },
            {
                gamma: 1.0,
            },
        ],
    },
    {
        featureType: 'landscape.natural.terrain',
        elementType: 'all',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'all',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#bae5ce',
            },
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'all',
        stylers: [
            {
                saturation: -100,
            },
            {
                lightness: 45,
            },
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'all',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#fac9a9',
            },
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text',
        stylers: [
            {
                color: '#4e4e4e',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#787878',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'all',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'transit.station.airport',
        elementType: 'labels.icon',
        stylers: [
            {
                hue: '#0a00ff',
            },
            {
                saturation: -77,
            },
            {
                gamma: 0.57,
            },
            {
                lightness: 0,
            },
        ],
    },
    {
        featureType: 'transit.station.rail',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#43321e',
            },
        ],
    },
    {
        featureType: 'transit.station.rail',
        elementType: 'labels.icon',
        stylers: [
            {
                hue: '#ff6c00',
            },
            {
                lightness: 4,
            },
            {
                gamma: 0.75,
            },
            {
                saturation: -68,
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'all',
        stylers: [
            {
                color: '#eaf6f8',
            },
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#c7eced',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            {
                lightness: -49,
            },
            {
                saturation: -53,
            },
            {
                gamma: 0.79,
            },
        ],
    },
];
