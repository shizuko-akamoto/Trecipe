export default interface Destination {
    uuid: string;
    name: string;
    category: Array<string>;
    geometry: {
        lat: number;
        lng: number;
    };
    formattedAddress: string;
    formattedPhoneNumber: string;
    website: string;
    rating: number;
    userRatings: Array<number>;
    description: String,
    placeId: string;
    photoRefs: Array<string>;
}
