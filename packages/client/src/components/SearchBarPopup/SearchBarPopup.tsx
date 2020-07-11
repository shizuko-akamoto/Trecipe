import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './searchBarPopup.scss';
import _ from 'lodash';
import { AutoComplete, getDestModel } from '../Map/mapHelper';
import { DestinationModel } from '../../redux/Destinations/types';
import { CreateDestinationRequestDTO } from '../../services/destinationService';

interface Destination {
    id: string;
    name: string;
    address: string;
    isAdded: boolean;
}

/**
 * Search bar states
 * searchKey: Keyword to perform search with
 * results: Search results retrieved from backend call
 * loading: True if a search is being performed, false if no search currently performed
 * errMsg: Any error message from search
 */
export interface SearchBarState {
    searchKey: string;
    results: Array<Destination>;
    resultsOpen: boolean;
    loading: boolean;
    errMsg: string;
}

export interface SearchBarProps {
    minWidth: number;
    onDestAdd: (destination: CreateDestinationRequestDTO) => void;
    onDestRemove: (destinationId: string) => void;
}

/**s
 * A popup to search for places and to be added into a Trecipe
 */
export class SearchBarPopup extends React.Component<SearchBarProps, SearchBarState> {
    constructor(props: any) {
        super(props);
        this.fetchSearchResults = _.debounce(this.fetchSearchResults, 500);
    }

    public static defaultProps: Partial<SearchBarProps> = {
        minWidth: 31.25,
    };

    private autoComplete: AutoComplete = new AutoComplete();

    state = {
        searchKey: '',
        resultsOpen: false,
        results: [
            { id: '1', name: 'Place 1', address: 'City, County', isAdded: false },
            { id: '2', name: 'Place 2', address: 'City, County', isAdded: false },
            { id: '3', name: 'Place 3', address: 'City, County', isAdded: false },
        ],
        loading: false,
        errMsg: '',
    };

    private handleOnSearchInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const searchKey: string = e.target.value;
        if (_.isEmpty(searchKey)) {
            this.setState({ searchKey: searchKey, results: [], errMsg: '' });
        } else {
            this.setState({ searchKey: searchKey, loading: true, errMsg: '' });
        }
        this.fetchSearchResults(searchKey);
    }

    private fetchSearchResults(searchInput: string): void {
        if (_.isEmpty(searchInput)) {
            return;
        }

        this.autoComplete
            .getPredictions(searchInput)
            .then((predictions: Array<google.maps.places.AutocompletePrediction>) => {
                // Connvert predictions into destinations and store them in state
                let newResult = predictions.map(
                    (prediction: google.maps.places.AutocompletePrediction) => {
                        return {
                            id: prediction.place_id,
                            name: prediction.structured_formatting.main_text,
                            address: prediction.structured_formatting.secondary_text,
                            isAdded: false,
                        };
                    }
                );
                this.setState({
                    resultsOpen: true,
                    results: newResult,
                    loading: false,
                });
            })
            .catch((err: any) => {
                this.setState({
                    resultsOpen: false,
                    loading: false,
                    errMsg: err.toString(),
                });
            });
    }

    // Add destination if it has not been added, and remove if already exist
    private addRemovePlace(destinationId: string) {
        let destAdded;
        this.state.results.forEach((dest) => {
            if (dest.id === destinationId) {
                destAdded = dest.isAdded;
            }
        });

        this.setState((state) => ({
            results: state.results.map((dest) =>
                dest.id === destinationId ? { ...dest, isAdded: !dest.isAdded } : dest
            ),
        }));

        if (!destAdded) {
            this.autoComplete
                .getPlaceDetails(destinationId)
                .then((result: google.maps.places.PlaceResult) => {
                    this.props.onDestAdd(getDestModel(result));
                })
                .catch((err: any) => {
                    this.setState({
                        resultsOpen: false,
                        loading: false,
                        errMsg: err.toString(),
                    });
                });
        } else {
            // TODO: I just realized it might be unnecessary to remove dest from destinations store
            // All we need is to remove destination id from the trecipe store
            this.props.onDestRemove(destinationId);
        }
    }

    private renderSearchResults() {
        const { results } = this.state;
        if (this.state.resultsOpen && _.isArray(results) && !_.isEmpty(results)) {
            return (
                <div className="results-container">
                    <ul className="results-list">
                        {results.map((result) => (
                            <li
                                className="results-entry"
                                key={result.id}
                                onClick={() => this.addRemovePlace(result.id)}>
                                <div className="result">
                                    <span className="placeName">{result['name']}</span>
                                    <span className="address">{result['address']}</span>
                                </div>
                                {result.isAdded && <FontAwesomeIcon icon="check" />}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="searchBarPopup" style={{ minWidth: `${this.props.minWidth}rem` }}>
                <div className="contents">
                    <h1 className="title"> Find and add places </h1>
                    <input
                        type="search"
                        placeholder="Search for..."
                        className="search-input"
                        onChange={this.handleOnSearchInputChange.bind(this)}
                    />
                </div>
                {this.renderSearchResults()}
            </div>
        );
    }
}
