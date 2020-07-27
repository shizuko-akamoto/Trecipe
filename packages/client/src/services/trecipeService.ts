import API from '../api';
import { AxiosResponse } from 'axios';
import Trecipe from '../../../shared/models/trecipe';
import CreateNewTrecipeDTO from '../../../shared/models/createNewTrecipeDTO';

/**
 * Trecipe service used to make server requests for trecipe CRUD actions
 */
class TrecipeService {
    private apiEndpoint = 'trecipes';

    /**
     * Fetches all trecipes from server.
     * @returns a promise of trecipe models array if successful, otherwise a promise rejection
     */
    public fetchAllTrecipes(): Promise<Array<Trecipe>> {
        return API.get<Array<Trecipe>>(this.apiEndpoint).then(
            (res: AxiosResponse<Array<Trecipe>>) => {
                return Promise.resolve(res.data);
            }
        );
    }

    /**
     * Sends request to server to create a new trecipe
     * @param trecipeData: partial trecipe model, typically has {name}, {description}, {isPrivate} defined
     * @returns a promise of created trecipe model if successful, otherwise a promise rejection
     */
    public createTrecipe(trecipeData: CreateNewTrecipeDTO): Promise<Trecipe> {
        return API.post<Trecipe>(this.apiEndpoint, trecipeData).then(
            (res: AxiosResponse<Trecipe>) => {
                return Promise.resolve(res.data);
            }
        );
    }

    /**
     * Sends request to server to duplicate a trecipe with give id
     * @param srcTrecipeId: id of trecipe to duplicate
     * @returns a promise of copied trecipe if successful, otherwise a promise rejection
     */
    public duplicateTrecipe(srcTrecipeId: string): Promise<Trecipe> {
        return API.post<Trecipe>(`${this.apiEndpoint}/copy`, null, {
            params: {
                id: srcTrecipeId,
            },
        }).then((res: AxiosResponse<Trecipe>) => {
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
    public updateTrecipe(idToUpdate: string, updatedTrecipe: Partial<Trecipe>): Promise<Trecipe> {
        return API.put<Trecipe>(`${this.apiEndpoint}/${idToUpdate}`, updatedTrecipe).then(
            (res: AxiosResponse<Trecipe>) => {
                return Promise.resolve(res.data);
            }
        );
    }

    /**
     * Sends a request to get a trecipe by its id
     * @param id: id of trecipe to retrieve
     * @returns a promise with the retrieved trecipe if successful, otherwise a promise rejection
     */
    public getTrecipe(id: string): Promise<Trecipe> {
        return API.get<Trecipe>(`${this.apiEndpoint}/${id}`).then((res: AxiosResponse<Trecipe>) => {
            return Promise.resolve(res.data);
        });
    }

    public fetchAssociatedTrecipes(placeId: string, limit?: number): Promise<Array<Trecipe>> {
        return API.get<Array<Trecipe>>(`${this.apiEndpoint}/associated`, {
            params: {
                placeId: placeId,
                limit: limit,
            },
        }).then((res: AxiosResponse<Array<Trecipe>>) => {
            return Promise.resolve(res.data);
        });
    }
}

export default new TrecipeService();
