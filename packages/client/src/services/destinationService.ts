import {
    DestinationCategory,
    DestinationModel,
    Geometry,
    Rating,
} from '../redux/Destinations/types';
import API from '../api';
import { AxiosResponse } from 'axios';

interface DestByTrecipeIdResponse {
    destinations: Array<{
        destUUID: string;
        completed: boolean;
        destination: DestinationModel;
    }>;
}

export interface CreateDestinationRequestDTO {
    name: string;
    category: Array<DestinationCategory>;
    geometry: Geometry;
    address?: string;
    phone?: string;
    website?: string;
    description: string;
    rating: Rating;
    userRatings: Array<Rating>;
    photoRefs: Array<string>;
    placeId: string;
}

class DestinationService {
    private apiEndpoint = 'destinations';

    public getDestinationsByTrecipeId(trecipeId: string): Promise<Array<DestinationModel>> {
        return API.get(this.apiEndpoint, {
            params: {
                id: trecipeId,
            },
            transformResponse: (data): Array<DestinationModel> => {
                const response: DestByTrecipeIdResponse = JSON.parse(data);
                return response.destinations.map((dest) => dest.destination);
            },
        })
            .then((res: AxiosResponse<Array<DestinationModel>>) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    public createDestination(destData: CreateDestinationRequestDTO): Promise<DestinationModel> {
        return API.post(this.apiEndpoint, destData)
            .then((res: AxiosResponse<DestinationModel>) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }
}

export default new DestinationService();
