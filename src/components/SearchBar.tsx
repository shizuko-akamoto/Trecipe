import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../stylesheets/searchBar.scss';
import _ from "lodash";

/**
 * Search filters to filter search results by.
 */
enum SearchFilter {
    Place= "placeFilter", Trecipe = "trecipeFilter", User = "userFilter",
}

/**
 * Search nar states
 * filter: Search filter currently selected
 * searchKey: Keyword to perform search with
 * results: Search results retrieved from backend call
 * loading: True if a search is being performed, false if no search currently performed
 * errMsg: Any error message from search
 */
export interface SearchBarState {
    filter: SearchFilter,
    searchKey: string;
    results: Array<string>;
    loading: boolean;
    errMsg: string;
}

/**
 * A general search bar for searching up keywords with search filters
 */
export class SearchBar extends React.Component<{}, SearchBarState> {
    public readonly state = {
        filter: SearchFilter.Trecipe,
        searchKey: '',
        results: [],
        loading: false,
        errMsg: ''
    };

    private handleOnSearchInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const searchKey: string = e.target.value;
        if (_.isEmpty(searchKey)) {
            this.setState({searchKey: searchKey, results: [], errMsg: ''});
        } else {
            this.setState(
                {searchKey: searchKey, loading: true, errMsg: ''},
                () => this.fetchSearchResults(searchKey, this.state.filter));
        }
    }

    private fetchSearchResults(searchKey: string, searchFilter: SearchFilter): void {
        new Promise<Array<string>>(function (resolve, reject) {
            /** TODO: Modify logic here to make HTTP call to backend for fetching search results.
             *  Right now, it just returns dummy list of strings based on current search filter selected.
             */
            let result: string[] = [];
            if (_.isEqual(searchFilter, SearchFilter.Trecipe)) {
                result = ['Trecipe1', 'Trecipe2', 'Trecipe3'];
            } else {
                result = ['Place1', 'Place2', 'Place3'];
            }
            resolve(result);
        }).then((results: string[]) => {
            this.setState({results: results, loading: false});
        }).catch((err) => {
            this.setState({loading: false, errMsg: err.toString()})
        });
    }

    private renderSearchResults() {
        const {results} = this.state;
        if (_.isArray(results) && !_.isEmpty(results)) {
            return (
                <div className="results-container">
                    <ul className="results-list">
                        {results.map((result) => (
                            <li className="results-entry"><a href="#">{result}</a></li>)
                        )}
                    </ul>
                </div>
            );
        }
    }

    private handleSearchFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({filter: e.target.value as SearchFilter})
    }

    render() {
        return (<div>
            <form className="search-bar">
                <div className="search-options">
                    <div className="option">
                        <input type="radio" value={SearchFilter.Trecipe} id={SearchFilter.Trecipe}
                               checked={_.isEqual(this.state.filter, SearchFilter.Trecipe)}
                               onChange={this.handleSearchFilterChange.bind(this)}/>
                        <label htmlFor={SearchFilter.Trecipe}>
                            <FontAwesomeIcon icon={["far", "star"]} fixedWidth/>
                            <span>Trecipes</span>
                        </label>
                    </div>
                    <div className="option">
                        <input type="radio" value={SearchFilter.Place} id={SearchFilter.Place}
                               checked={_.isEqual(this.state.filter, SearchFilter.Place)}
                               onChange={this.handleSearchFilterChange.bind(this)}/>
                        <label htmlFor={SearchFilter.Place}>
                            <FontAwesomeIcon icon="map-marker-alt" fixedWidth/>
                            <span>Places</span>
                        </label>
                    </div>
                </div>
                <input type="search" placeholder="Search for..." className="search-input"
                       onChange={this.handleOnSearchInputChange.bind(this)}/>
                <button type="submit" className="search-button">
                    <FontAwesomeIcon icon="search" fixedWidth/>
                </button>
            </form>
            {this.renderSearchResults()}
        </div>)
    }
}