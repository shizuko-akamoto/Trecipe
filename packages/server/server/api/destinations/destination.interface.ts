export enum DestinationCategory {
    FOOD = 'food',
    ACCOMMODATION = 'accommodation',
    ENTERTAINMENT = 'entertainment',
    SHOPPING = 'shopping',
    SIGHTSEEING = 'sightseeing',
}

export default interface Destination {
    uuid: string;
    name: string;
    category: DestinationCategory;
    geometry: {
        lat: number;
        lon: number;
    };
    formattedAddress: string;
    formattedPhoneNumber: string;
    website: string;
    rating: number;
    userRatings: Array<number>;
    placeId: string;
    photoRefs: Array<string>;
}
