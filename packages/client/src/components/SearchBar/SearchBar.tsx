import React, { RefObject } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './searchBar.scss';
import _ from 'lodash';
import searchService from '../../services/searchService';
import { Link } from 'react-router-dom';

/**
 * Search filters to filter search results by.
 */
enum SearchFilter {
    Place = 'placeFilter',
    Trecipe = 'trecipeFilter',
    User = 'userFilter',
}

/**
 * Search bar states
 * filter: Search filter currently selected
 * searchKey: Keyword to perform search with
 * results: Search results retrieved from backend call
 * loading: True if a search is being performed, false if no search currently performed
 * errMsg: Any error message from search
 */
export interface SearchBarState {
    filter: SearchFilter;
    searchKey: string;
    results: Array<SearchResultEntry>;
    resultsOpen: boolean;
    loading: boolean;
    errMsg: string;
}

export interface SearchResultEntry {
    name: string;
    href: string;
    info: string;
    uuid: string;
}

/**
 * A general search bar for searching up keywords with search filters
 */
export class SearchBar extends React.Component<{}, SearchBarState> {
    private container: RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    private timer: number = 0;

    public readonly state = {
        filter: SearchFilter.Trecipe,
        searchKey: '',
        resultsOpen: false,
        results: [],
        loading: false,
        errMsg: '',
    };

    componentDidMount(): void {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount(): void {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    private handleClickOutside = (event: MouseEvent) => {
        if (this.container.current && event.target instanceof Node) {
            if (!this.container.current.contains(event.target)) {
                this.setState({ resultsOpen: false });
            } else {
                this.setState({ resultsOpen: true });
            }
        }
    };

    private handleOnSearchInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const searchKey: string = e.target.value;
        if (_.isEmpty(searchKey)) {
            this.setState({ searchKey: searchKey, results: [], errMsg: '' });
        } else {
            if (this.timer) clearTimeout(this.timer);
            this.timer = window.setTimeout(() => {
                this.setState({ searchKey: searchKey, loading: true, errMsg: '' }, () =>
                    this.fetchSearchResults(searchKey, this.state.filter)
                );
            }, 500);
        }
    }

    private fetchSearchResults(searchKey: string, searchFilter: SearchFilter): void {
        new Promise<Array<SearchResultEntry>>(function (resolve, reject) {
            /** TODO: Modify logic here to make HTTP call to backend for fetching search results.
             *  Right now, it just returns dummy list of strings based on current search filter selected.
             */
            let result: SearchResultEntry[] = [];
            if (_.isEqual(searchFilter, SearchFilter.Trecipe)) {
                searchService.performTrecipeSearch(searchKey).then((searchResult) => {
                    result = searchResult.map((value) => {
                        return {
                            name: value.name,
                            href: '/' + value.uuid,
                            info: value.owner,
                            uuid: value.uuid,
                        };
                    });
                    return resolve(result);
                });
            } else {
                searchService.performDestinationSearchGoogle(searchKey).then((searchResult) => {
                    result = searchResult.map((value) => {
                        return {
                            name: value.name,
                            // TODO implement destination page so we could pass props to generate a new page.
                            href: 'placeholder',
                            info:
                                typeof value.formattedAddress === 'undefined'
                                    ? 'N/A'
                                    : value.formattedAddress,
                            uuid: value.placeId,
                        };
                    });
                    return resolve(result);
                });
            }
        })
            .then((results: SearchResultEntry[]) => {
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

    private renderSearchResults() {
        const results: SearchResultEntry[] = this.state.results;
        if (this.state.resultsOpen && _.isArray(results) && !_.isEmpty(results)) {
            return (
                <div className="results-container">
                    <ul className="results-list">
                        {results.map((result) => (
                            // temporarily using result as key. Change to some id later
                            // TODO: replace with valid href
                            <li className="results-entry" key={result.uuid}>
                                <Link to={result.href}>{result.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    private handleSearchFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ filter: e.target.value as SearchFilter });
    }

    render() {
        return (
            <div className="search-bar-wrapper" ref={this.container}>
                <form className="search-bar">
                    <div className="search-options">
                        <div className="option">
                            <input
                                type="radio"
                                value={SearchFilter.Trecipe}
                                id={SearchFilter.Trecipe}
                                checked={_.isEqual(this.state.filter, SearchFilter.Trecipe)}
                                onChange={this.handleSearchFilterChange.bind(this)}
                            />
                            <label htmlFor={SearchFilter.Trecipe}>
                                <FontAwesomeIcon icon={['far', 'star']} fixedWidth />
                                <span>Trecipes</span>
                            </label>
                        </div>
                        <div className="option">
                            <input
                                type="radio"
                                value={SearchFilter.Place}
                                id={SearchFilter.Place}
                                checked={_.isEqual(this.state.filter, SearchFilter.Place)}
                                onChange={this.handleSearchFilterChange.bind(this)}
                            />
                            <label htmlFor={SearchFilter.Place}>
                                <FontAwesomeIcon icon="map-marker-alt" fixedWidth />
                                <span>Places</span>
                            </label>
                        </div>
                    </div>
                    <input
                        type="search"
                        placeholder="Search for..."
                        className="search-input"
                        onChange={this.handleOnSearchInputChange.bind(this)}
                    />
                    <button type="submit" className="search-button">
                        <FontAwesomeIcon icon="search" fixedWidth />
                    </button>
                </form>
                {this.renderSearchResults()}
            </div>
        );
    }
}
