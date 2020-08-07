import API from '../api';
import { AxiosResponse } from 'axios';
import Destination from '../../../shared/models/destination';
import Trecipe from '../../../shared/models/trecipe';
import { AutoComplete, getDestModel } from '../components/Map/mapHelper';
import { SearchResultModel } from '../../../shared/models/searchResult';

class SearchService {
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

    public performDestinationSearchGoogle(keyword: string): Promise<Array<Destination>> {
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
                const destiations: Array<Destination> = results.map((dest) => {
                    return {
                        ...getDestModel(dest),
                        uuid: '',
                        userRatings: [],
                        description: '',
                        photoRefs: dest.photos
                            ? dest.photos.map((photo) => photo.getUrl({ maxHeight: 500 }))
                            : [],
                    };
                });
                return Promise.resolve(destiations);
            })
            .catch((err: any) => {
                // resolve silently when google place request fails
                return Promise.resolve([]);
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
        let backendPromise: Promise<AxiosResponse<SearchResultModel>> = API.get(
            `${this.searchEndpoint}/${keyword}`,
            {
                params: {
                    limit: 10,
                    // if user wants to load more, we should increment offset
                    offset: offset,
                },
                transformResponse: [
                    (data): SearchResultModel => {
                        return JSON.parse(data);
                    },
                ],
            }
        );
        let destPromise: Promise<Destination[]> = this.performDestinationSearchGoogle(keyword);
        return Promise.all<AxiosResponse<SearchResultModel>, Destination[]>([
            backendPromise,
            destPromise,
        ])
            .then(
                ([backendResult, destResult]: [
                    AxiosResponse<SearchResultModel>,
                    Destination[]
                ]) => {
                    const mergedResult: SearchResultModel = backendResult.data;
                    mergedResult.googleDestinationResult = destResult;
                    return Promise.resolve(mergedResult);
                }
            )
            .catch((err) => {
                return Promise.reject(err);
            });
    }
}

export default new SearchService();
