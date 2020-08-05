import React, { RefObject } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './searchBarPopup.scss';
import { debounce, isEmpty, isArray } from 'lodash';
import { AutoComplete, getDestModel } from '../Map/mapHelper';
import { CreateNewDestinationDTO } from '../../../../shared/models/createNewDestinationDTO';
import OverlaySpinner from '../Loading/OverlaySpinner';
import { toast } from 'react-toastify';

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
    onDestAdd: (destData: CreateNewDestinationDTO) => void;
    onDestRemove: (destinationId: string) => void;
}

/**s
 * A popup to search for places and to be added into a Trecipe
 */
export class SearchBarPopup extends React.Component<SearchBarProps, SearchBarState> {
    private container: RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    constructor(props: any) {
        super(props);
        this.fetchSearchResults = debounce(this.fetchSearchResults, 500);
    }

    public static defaultProps: Partial<SearchBarProps> = {
        minWidth: 31.25,
    };

    private autoComplete: AutoComplete = new AutoComplete();

    state = {
        searchKey: '',
        resultsOpen: false,
        results: [] as Destination[],
        loading: false,
        errMsg: '',
    };

    componentDidMount(): void {
        // Register event listener to handle click outside
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount(): void {
        // Unregister event listener
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    private handleOnSearchInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const searchKey: string = e.target.value;
        if (isEmpty(searchKey)) {
            // when no search key given, empty results and set loading to false
            this.setState({ searchKey: searchKey, results: [], loading: false, errMsg: '' });
        } else {
            // when search key is given, set loading to true
            this.setState({ searchKey: searchKey, loading: true, errMsg: '' });
        }
        this.fetchSearchResults(searchKey);
    }

    private fetchSearchResults(searchInput: string): void {
        if (isEmpty(searchInput)) {
            return;
        }

        this.autoComplete
            .getPredictions(searchInput)
            .then((predictions: Array<google.maps.places.AutocompletePrediction>) => {
                // Convert predictions into destinations and store them in state
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
                    results: newResult,
                    loading: false,
                });
            })
            .catch((err: any) => {
                this.setState({
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
                    toast.error(`Failed to fetch search results [${err.toString()}]`);
                    this.setState({
                        results: [],
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
        if (isArray(results) && !isEmpty(results)) {
            return (
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
            );
        } else {
            return <p className="empty-result-text">No results</p>;
        }
    }

    // Clicking outside the search bar closes the results section
    private handleClickOutside = (event: MouseEvent) => {
        if (this.container.current && event.target instanceof Node) {
            if (!this.container.current.contains(event.target)) {
                this.setState({ resultsOpen: false });
            } else {
                this.setState({ resultsOpen: true });
            }
        }
    };

    render() {
        return (
            <div
                className="searchBarPopup"
                style={{ minWidth: `${this.props.minWidth}rem` }}
                ref={this.container}>
                <div className="contents">
                    <h1 className="title"> Find and add places </h1>
                    <input
                        type="search"
                        placeholder="Search for..."
                        className="search-input"
                        onChange={this.handleOnSearchInputChange.bind(this)}
                        onFocus={() => this.setState({ resultsOpen: true })}
                    />
                </div>
                {this.state.resultsOpen && (
                    <div className="results-container">
                        {this.state.loading ? <OverlaySpinner /> : this.renderSearchResults()}
                    </div>
                )}
            </div>
        );
    }
}
