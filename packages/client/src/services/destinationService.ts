import Destination from '../../../shared/models/destination';
import API from '../api';
import { AxiosResponse } from 'axios';
import { CreateNewDestinationDTO } from '../../../shared/models/createNewDestinationDTO';
import { UpdateDestinationRatingDTO } from '../../../shared/models/updateDestinationRatingDTO';

type GetDestinationsResponse = Array<{
    destUUID: string;
    completed: boolean;
    destination: Destination;
}>;

class DestinationService {
    private apiEndpoint = 'destinations';

    public getDestinationsByTrecipeId(
        trecipeId: string,
        isPublic?: boolean
    ): Promise<Array<Destination>> {
        const endpoint = isPublic ? '/in-public' : '/in';
        return API.get<GetDestinationsResponse>(`${this.apiEndpoint}${endpoint}`, {
            params: {
                id: trecipeId,
            },
        })
            .then((res: AxiosResponse<GetDestinationsResponse>) => {
                return Promise.resolve(res.data.map((destItem) => destItem.destination));
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    public createDestination(destData: CreateNewDestinationDTO): Promise<Destination> {
        return API.post<Destination>(this.apiEndpoint, destData).then(
            (res: AxiosResponse<Destination>) => {
                return Promise.resolve(res.data);
            }
        );
    }

    public getDestinationById(destId: string): Promise<Destination> {
        return API.get<Destination>(`${this.apiEndpoint}/${destId}`)
            .then((res: AxiosResponse<Destination>) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    public getDestinationByPlaceId(placeId: string): Promise<Destination> {
        return API.get<Destination>(this.apiEndpoint, {
            params: {
                placeId: placeId,
            },
        })
            .then((res: AxiosResponse<Destination>) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    public updateDestinationRating(
        destId: string,
        updateRatingData: UpdateDestinationRatingDTO
    ): Promise<Destination> {
        return API.post<Destination>(`${this.apiEndpoint}/rate/${destId}`, updateRatingData).then(
            (res: AxiosResponse<Destination>) => {
                return Promise.resolve(res.data);
            }
        );
    }
}

export default new DestinationService();
