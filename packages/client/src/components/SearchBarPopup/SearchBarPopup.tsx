import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal/Modal';
import './searchBarPopup.scss';
import _ from 'lodash';

interface Destination {
    id: number;
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

/**
 * A popup to search for places and to be added into a Trecipe
 */
export class SearchBarPopup extends React.Component<{}, SearchBarState> {
    state = {
        searchKey: '',
        resultsOpen: false,
        results: [
            { id: 1, name: 'Place 1', address: 'City, County', isAdded: false },
            { id: 2, name: 'Place 2', address: 'City, County', isAdded: false },
            { id: 3, name: 'Place 3', address: 'City, County', isAdded: false },
        ],
        loading: false,
        errMsg: '',
    };

    private handleOnSearchInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const searchKey: string = e.target.value;
        if (_.isEmpty(searchKey)) {
            this.setState({ searchKey: searchKey, results: [], errMsg: '' });
        } else {
            this.setState({ searchKey: searchKey, loading: true, errMsg: '' }, () =>
                this.fetchSearchResults(searchKey)
            );
        }
    }

    private fetchSearchResults(searchInput: string): void {
        new Promise<Array<Destination>>(function (resolve, reject) {
            /** TODO: Modify logic here to make HTTP call to backend for fetching search results.
             *  Update DB if the previous result list has been changed.
             */

            const results: Destination[] = [
                { id: 1, name: 'Place 1', address: 'City, County', isAdded: false },
                { id: 2, name: 'Place 2', address: 'City, County', isAdded: false },
                { id: 3, name: 'Place 3', address: 'City, County', isAdded: false },
            ];
            resolve(results);
        })
            .then((results: Destination[]) => {
                this.setState({ resultsOpen: true, results: results, loading: false });
            })
            .catch((err) => {
                this.setState({
                    resultsOpen: false,
                    loading: false,
                    errMsg: err.toString(),
                });
            });
    }

    private addRemovePlace(id: number) {
        this.setState((state) => ({
            results: state.results.map((dest) =>
                dest.id === id ? { ...dest, isAdded: !dest.isAdded } : dest
            ),
        }));
    }

    private renderSearchResults() {
        const { results } = this.state;
        if (this.state.resultsOpen && _.isArray(results) && !_.isEmpty(results)) {
            return (
                <div className="results-container">
                    <ul className="results-list">
                        {results.map((result) => (
                            // temporarily using result as key. Change to some id later
                            <li
                                className="results-entry"
                                key={result['name']}
                                onClick={() => this.addRemovePlace(result['id'])}>
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
            <Modal>
                <div className="searchBarPopup">
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
            </Modal>
        );
    }
}
