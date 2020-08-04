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

type SearchResultProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    RouteComponentProps<{ searchKey: string }>;
class SearchResult extends React.Component<SearchResultProps, {}> {
    componentDidMount(): void {
        let searchKey = this.props.location.search;
        console.log('1');
        console.log(searchKey);
        searchKey = searchKey.substring(3);
        console.log('2');
        console.log(searchKey);
        this.props.fetchResultRequest(searchKey);
    }
    render() {
        console.log('here');
        return (
            <div className="search-result-wrapper">
                <div className="content">
                    <div className="result-wrapper">
                        <h1 className="page-title">Trecipes</h1>
                        <div className="cards-wrapper">
                            <ul className="card-list">
                                {this.props.results?.trecipeResult.map((trecipe: Trecipe) => (
                                    <li className="card-item" key={trecipe.uuid}>
                                        <Link className="router-link" to={trecipe.uuid}>
                                            <TrecipeCard
                                                trecipe={{ ...trecipe }}
                                                isReadOnly={true}
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <h1 className="page-title">Destinations</h1>
                        <div className="cards-wrapper">
                            <ul className="card-list">
                                {this.props.results?.destinationResult.map(
                                    (destination: Destination, index) => (
                                        <li className="card-item" key={destination.uuid}>
                                            <Link className="router-link" to={destination.uuid}>
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
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (
    state: RootState,
    ownProps: RouteComponentProps<{ searchKey: string }>
) => ({
    results: state.searchResult.result,
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
