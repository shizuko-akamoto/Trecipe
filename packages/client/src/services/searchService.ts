import API from '../api';
import {AxiosResponse} from 'axios';
import {DestinationModel} from "../redux/Destinations/types";
import {TrecipeModel} from "../redux/TrecipeList/types";
import User from "server/server/api/user/user.interface";
import Trecipe from "server/server/api/trecipe/trecipe.interface";

export interface searchResultModel {
    trecipeResult: TrecipeModel[];
    destinationResult: DestinationModel[];
    userResult: User[];
}

class searchService {
    private searchEndpoint = 'search';
    private trecipeSearchEndpoint = 'search/trecipes';
    private destinationSearchEndpoint = 'search/destinations';

    public performDestinationSearch(keyword: string): Promise<Array<DestinationModel>> {
        return API.get(`${this.destinationSearchEndpoint}/${keyword}`, {
            params: {
                limit: 3,
            },
            transformResponse: [
                (data): Array<DestinationModel> => {
                    return JSON.parse(data);
                },
            ]
        })
            .then((res: AxiosResponse<Array<DestinationModel>>) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    public performTrecipeSearch(keyword: string): Promise<Array<Trecipe>> {
        return API.get(`${this.trecipeSearchEndpoint}/${keyword}`, {
            params: {
                limit: 3,
            },
            transformResponse: [
                (data): Array<Trecipe> => {
                    return JSON.parse(data);
                },
            ]
        })
            .then((res: AxiosResponse<Array<Trecipe>>) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    public performSearch(keyword: string, offset: number): Promise<searchResultModel> {
        return API.get(`${this.searchEndpoint}/${keyword}`, {
            params: {
                limit: 5,
                // if user wants to load more, we should increment offset
                offset: offset
            },
            transformResponse: [
                (data): searchResultModel => {
                    return JSON.parse(data);
                },
            ]
        })
            .then((res: AxiosResponse<searchResultModel>) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

}

export default new searchService();