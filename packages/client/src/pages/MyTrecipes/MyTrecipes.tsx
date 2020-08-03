import React from 'react';
import './MyTrecipes.scss';
import { FilterButton } from './Filter/FilterButton';
import { Button } from '../../components/Button/Button';
import TrecipeCard from './TrecipeCard/TrecipeCard';
import { FilterSelector } from './Filter/FilterSelector';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { connect } from 'react-redux';
import { RootState } from '../../redux';
import { fetchMyTrecipesRequest } from '../../redux/TrecipeList/action';
import { bindActionCreators, Dispatch } from 'redux';
import { showModal } from '../../redux/Modal/action';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import TrecipePopup, { TrecipePopupType } from '../../components/TrecipePopup/TrecipePopup';
import Trecipe from '../../../../shared/models/trecipe';
import { createLoadingSelector } from '../../redux/Loading/selector';
import { TrecipeListActionCategory } from '../../redux/TrecipeList/types';
import OverlaySpinner from '../../components/Loading/OverlaySpinner';
import FullScreenLoader from '../../components/Loading/FullScreenLoader';

type MyTrecipesProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    RouteComponentProps;

class MyTrecipes extends React.Component<MyTrecipesProps, {}> {
    private static contextFilters: string[] = ['All Trecipes', 'Completed', 'In Progress', 'To Do'];

    componentDidMount(): void {
        this.props.fetchMyTrecipes();
    }

    private renderAddPopup = () => {
        this.props.showModal(<TrecipePopup type={TrecipePopupType.Add} />);
    };

    render() {
        return (
            <div className="mytrecipes-wrapper">
                <div className="content">
                    <h1 className="page-title">My Trecipes</h1>
                    <div className="buttons-wrapper">
                        <ul className="context-filters">
                            {MyTrecipes.contextFilters.map((filter) => (
                                <li className="filter-item" key={filter}>
                                    <FilterButton
                                        text={filter}
                                        icon="check"
                                        fontSize={1}
                                        onClick={() => {
                                            return;
                                        }}
                                        defaultDisabled={false}
                                    />
                                </li>
                            ))}
                            <FilterSelector
                                listItem={[
                                    { text: 'Any', icon: 'border-all' as IconProp },
                                    { text: 'Private', icon: 'lock' as IconProp },
                                    { text: 'Public', icon: 'lock-open' as IconProp },
                                ]}
                            />
                        </ul>
                        <div className="new-trecipe-button">
                            <Button
                                text="Create New"
                                icon="plus-circle"
                                onClick={this.renderAddPopup}
                            />
                        </div>
                    </div>
                    {this.props.isLoading ? (
                        <FullScreenLoader />
                    ) : (
                        <div className="cards-wrapper">
                            {this.props.trecipes.map((trecipe: Trecipe) => (
                                <div className="card-item" key={trecipe.uuid}>
                                    <Link className="router-link" to={`trecipes/${trecipe.uuid}`}>
                                        <TrecipeCard {...trecipe} />
                                    </Link>
                                </div>
                            ))}
                            {/*When updating trecipes, we want to use a spinner overlay instead for smoother experience*/}
                            {this.props.isUpdating && <OverlaySpinner size={50} />}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

// when fetching trecipes
const loadingSelector = createLoadingSelector([TrecipeListActionCategory.FETCH_MY_TRECIPES]);

// when updating trecipes in the list
const updatingSelector = createLoadingSelector([
    TrecipeListActionCategory.CREATE_TRECIPE,
    TrecipeListActionCategory.UPDATE_TRECIPE,
    TrecipeListActionCategory.DELETE_TRECIPE,
]);

const mapStateToProps = (state: RootState) => ({
    trecipes: state.trecipeList.myTrecipes,
    isLoading: loadingSelector(state),
    isUpdating: updatingSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            fetchMyTrecipes: fetchMyTrecipesRequest,
            showModal,
        },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyTrecipes));
