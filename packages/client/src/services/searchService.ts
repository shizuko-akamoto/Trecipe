import API from '../api';
import { AxiosResponse } from 'axios';
import Destination from '../../../shared/models/destination';
import User from 'server/server/api/user/user.interface';
import Trecipe from '../../../shared/models/trecipe';
import { AutoComplete, getDestModel } from '../components/Map/mapHelper';
import { CreateNewDestinationDTO } from '../../../shared/models/createNewDestinationDTO';
import { SearchResultModel } from '../../../shared/models/searchResult';

class searchService {
    private searchEndpoint = 'search';
    private trecipeSearchEndpoint = 'search/trecipes';
    private destinationSearchEndpoint = 'search/destinations';

    public performDestinationSearch(keyword: string): Promise<Array<Destination>> {
        return API.get(`${this.destinationSearchEndpoint}/${keyword}`, {
            params: {
                limit: 3,
            },
            transformResponse: [
                (data): Array<Destination> => {
                    return JSON.parse(data);
                },
            ],
        })
            .then((res: AxiosResponse<Array<Destination>>) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    public performDestinationSearchGoogle(
        keyword: string
    ): Promise<Array<CreateNewDestinationDTO>> {
        let autocomplete: AutoComplete = new AutoComplete();
        return autocomplete
            .getPredictions(keyword)
            .then((predictions: Array<google.maps.places.AutocompletePrediction>) => {
                let detailPromises = predictions.map(
                    (prediction: google.maps.places.AutocompletePrediction) => {
                        return autocomplete.getPlaceDetails(prediction.place_id);
                    }
                );
                return Promise.all(detailPromises);
            })
            .then((results: Array<google.maps.places.PlaceResult>) => {
                return Promise.resolve(results.map((dest) => getDestModel(dest)));
            })
            .catch((err: any) => {
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
            ],
        })
            .then((res: AxiosResponse<Array<Trecipe>>) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    public performSearch(keyword: string, offset: number): Promise<SearchResultModel> {
        let backendPromise = API.get(`${this.searchEndpoint}/${keyword}`, {
            params: {
                limit: 5,
                // if user wants to load more, we should increment offset
                offset: offset,
            },
            transformResponse: [
                (data): SearchResultModel => {
                    return JSON.parse(data);
                },
            ],
        });
        let destPromise = this.performDestinationSearchGoogle(keyword);
        return Promise.all([backendPromise, destPromise])
            .then((res) => {
                let result = res[0].data;
                result.googleDestinationResult = res[1];
                return Promise.resolve(result);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }
}

export default new searchService();
