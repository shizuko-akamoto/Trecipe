import React from 'react';
import './SearchResult.scss';
import TrecipeCard from '../../components/TrecipeCard/TrecipeCard';
import { RootState } from '../../redux';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { fetchResultRequest } from '../../redux/SearchResult/action';
import Trecipe from '../../../../shared/models/trecipe';
import Destination from '../../../../shared/models/destination';
import { DestinationCard } from '../Map/DestinationCard/DestinationCard';
import { transform, isEmpty } from 'lodash';
import { SearchResultModel } from '../../../../shared/models/searchResult';

type SearchResultProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    RouteComponentProps<{ searchKey: string }>;
class SearchResult extends React.Component<SearchResultProps, {}> {
    componentDidMount(): void {
        let searchKey = this.props.location.search;

        // search key from Router comes with "?q=", removing the first three characters corresponding to this
        searchKey = searchKey.substring(3);
        this.props.fetchResultRequest(searchKey);
    }

    render() {
        return (
            <div className="search-result-wrapper">
                <div className="content">
                    <div className="result-row">
                        <h1 className="page-title">Trecipes</h1>
                        {isEmpty(this.props.trecipeResults) ? (
                            <p className="empty-text">No matching trecipes found</p>
                        ) : (
                            <div className="cards-wrapper">
                                <ul className="card-list">
                                    {this.props.trecipeResults.map((trecipe: Trecipe) => (
                                        <li className="card-item" key={trecipe.uuid}>
                                            <Link
                                                className="router-link"
                                                to={trecipe.uuid}
                                                target="_blank">
                                                <TrecipeCard
                                                    trecipe={{ ...trecipe }}
                                                    isReadOnly={true}
                                                />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="result-row">
                        <h1 className="page-title">Destinations</h1>
                        {isEmpty(this.props.mergedDestResults) ? (
                            <p className="empty-text">No matching destinations found</p>
                        ) : (
                            <div className="cards-wrapper">
                                <ul className="card-list">
                                    {this.props.mergedDestResults.map(
                                        (destination: Destination, index) => (
                                            <li className="card-item" key={destination.uuid}>
                                                <Link
                                                    className="router-link"
                                                    to={`/destinations/${destination.placeId}`}
                                                    target="_blank">
                                                    <DestinationCard
                                                        key={destination.uuid}
                                                        destination={destination}
                                                        index={index}
                                                        isReadOnly={true}
                                                    />
                                                </Link>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

// Merge google place search result with database result. Priority goes to search result from database
const destResultsMerger = (state: RootState) => {
    const searchResult: SearchResultModel | undefined = state.searchResult.result;
    const localResults: Destination[] = searchResult ? searchResult.destinationResult : [];
    const googleResults: Destination[] = searchResult ? searchResult.googleDestinationResult : [];
    return transform(
        googleResults,
        (resultAcc: Destination[], googleResult: Destination) => {
            if (!resultAcc.find((result) => result.placeId === googleResult.placeId)) {
                resultAcc.push(googleResult);
            }
        },
        localResults
    );
};

const mapStateToProps = (
    state: RootState,
    ownProps: RouteComponentProps<{ searchKey: string }>
) => ({
    trecipeResults: state.searchResult.result ? state.searchResult.result.trecipeResult : [],
    mergedDestResults: destResultsMerger(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            fetchResultRequest,
        },
        dispatch
    );
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResult));
