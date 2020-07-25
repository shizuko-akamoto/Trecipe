import Destination from '../../../shared/models/destination';
import API, { baseURL } from "../api";
import { AxiosResponse } from 'axios';
import { CreateNewDestinationDTO } from '../../../shared/models/createNewDestinationDTO';

type GetDestinationsResponse = Array<{
    destUUID: string;
    completed: boolean;
    destination: Destination;
}>;

class DestinationService {
    private apiEndpoint = 'destinations';

    public getDestinationsByTrecipeId(trecipeId: string): Promise<Array<Destination>> {
        return API.get<GetDestinationsResponse>(`${baseURL}/${this.apiEndpoint}`, {
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
        return API.post<Destination>(`${baseURL}/${this.apiEndpoint}`, destData).then(
            (res: AxiosResponse<Destination>) => {
                return Promise.resolve(res.data);
            }
        );
    }
}

export default new DestinationService();
