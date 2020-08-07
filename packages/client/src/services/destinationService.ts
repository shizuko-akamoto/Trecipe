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

    /**
     * Gets destinations contained in a trecipe
     * @param trecipeId: uuid of trecipe
     */
    public getDestinationsByTrecipeId(trecipeId: string): Promise<Array<Destination>> {
        return API.get<GetDestinationsResponse>(`${this.apiEndpoint}/in`, {
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

    /**
     * Creates a new destination
     * @param destData: Destination data for this destination
     */
    public createDestination(destData: CreateNewDestinationDTO): Promise<Destination> {
        return API.post<Destination>(this.apiEndpoint, destData)
            .then((res: AxiosResponse<Destination>) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    /**
     * Gets destination by google place id
     * @param placeId: google place id to fetch destination data for
     */
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

    /**
     * Updates destination with new rating entry
     * @param destId: destination uuid
     * @param updateRatingData: new rating
     */
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
