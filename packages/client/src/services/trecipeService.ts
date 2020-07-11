import API from '../api';
import { TrecipeModel } from '../redux/TrecipeList/types';
import axios, { AxiosResponse, AxiosTransformer } from 'axios';

interface TrecipeDTO {
    uuid: string;
    name: string;
    description: string;
    owner: string;
    isPrivate: boolean;
    collaborators: Array<string>;
    image: string | null;
    destinations: Array<{ destUUID: string; completed: boolean }>;
    createdAt: string;
    updatedAt: string;
}

/**
 * Trecipe service used to make server requests for trecipe CRUD actions
 */
class TrecipeService {
    private apiEndpoint = 'trecipes';

    /**
     * Fetches all trecipes from server.
     * @returns a promise of trecipe models array if successful, otherwise a promise rejection
     */
    public fetchAllTrecipes(): Promise<Array<TrecipeModel>> {
        return API.get<Array<TrecipeModel>>(this.apiEndpoint, {
            transformResponse: [
                (data): Array<TrecipeModel> => {
                    return JSON.parse(data).map((response: TrecipeDTO) =>
                        this.toTrecipeModel(response)
                    );
                },
            ],
        }).then((res: AxiosResponse<Array<TrecipeModel>>) => {
            return Promise.resolve(res.data);
        });
    }

    /**
     * Sends request to server to create a new trecipe
     * @param trecipeData: partial trecipe model, typically has {name}, {description}, {isPrivate} defined
     * @returns a promise of created trecipe model if successful, otherwise a promise rejection
     */
    public createTrecipe(trecipeData: Partial<TrecipeModel>): Promise<TrecipeModel> {
        return API.post<TrecipeModel>(this.apiEndpoint, trecipeData, {
            transformResponse: [(data): TrecipeModel => this.toTrecipeModel(JSON.parse(data))],
        }).then((res: AxiosResponse<TrecipeModel>) => {
            return Promise.resolve(res.data);
        });
    }

    /**
     * Sends a delete request to server for given trecipe uuid to delete
     * @param idToDelete: uuid of trecipe to be deleted
     * @returns a promise with the number of trecipe deleted if successful, otherwise a promise rejection
     */
    public deleteTrecipe(idToDelete: string): Promise<number> {
        return API.delete(`${this.apiEndpoint}/${idToDelete}`).then((res) => {
            const deletedCount: number = res.data.deletedCount;
            return Promise.resolve(deletedCount);
        });
    }

    /**
     * Sends request to server for updating a trecipe with new data
     * @param idToUpdate: uuid of the trecipe to update
     * @param updatedTrecipe: partial trecipe model containing some updated data
     * @returns a promise of updated trecipe model if successful, otherwise a promise rejection
     */
    public updateTrecipe(
        idToUpdate: string,
        updatedTrecipe: Partial<TrecipeModel>
    ): Promise<TrecipeModel> {
        return API.put<TrecipeModel>(`${this.apiEndpoint}/${idToUpdate}`, updatedTrecipe, {
            transformRequest: [
                (data, headers) => this.fromTrecipeModel(data),
                ...(axios.defaults.transformRequest as AxiosTransformer[]),
            ],
            transformResponse: [(data): TrecipeModel => this.toTrecipeModel(JSON.parse(data))],
        }).then((res: AxiosResponse<TrecipeModel>) => {
            return Promise.resolve(res.data);
        });
    }

    private toTrecipeModel(data: TrecipeDTO): TrecipeModel {
        const {
            uuid,
            name,
            description,
            owner,
            isPrivate,
            collaborators,
            image,
            destinations,
            updatedAt,
        } = data;

        // splitting destination response into client format for convenience in client use
        const completedDests: Set<string> = new Set(
            destinations.flatMap((destWithStatus) =>
                destWithStatus.completed ? [destWithStatus.destUUID] : []
            )
        );
        return {
            id: uuid,
            name: name,
            image: image,
            date: new Date(updatedAt),
            owner: owner,
            description: description,
            isPrivate: isPrivate,
            collaborators: collaborators,
            destinations: destinations.map((destWithStatus) => destWithStatus.destUUID),
            completed: completedDests,
        };
    }

    private fromTrecipeModel(data: TrecipeModel): Partial<TrecipeDTO> {
        const { destinations, completed, ...rest } = data;
        const dto: Partial<TrecipeDTO> = rest;
        if (destinations && completed) {
            dto.destinations = destinations.map((dest) => {
                return {
                    destUUID: dest,
                    completed: completed.has(dest),
                };
            });
        }
        return dto;
    }
}

export default new TrecipeService();
