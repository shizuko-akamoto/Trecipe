export interface CreateNewDestinationDTO {
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
    placeId: string;
}
