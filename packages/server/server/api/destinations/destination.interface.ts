export default interface Destination {
    uuid: string;
    name: string;
    category: string[];
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
