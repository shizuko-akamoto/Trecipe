import React from 'react';
import './MyTrecipes.scss';
import { FilterButton, FilterButtonTypes } from './Filter/FilterButton';
import { Button } from '../../components/Button/Button';
import TrecipeCard from './TrecipeCard/TrecipeCard';
import { FilterSelector, FilterSelectorTypes } from './Filter/FilterSelector';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { connect } from 'react-redux';
import { RootState } from '../../redux';
import { fetchAllTrecipes } from '../../redux/TrecipeList/action';
import { bindActionCreators, Dispatch } from 'redux';
import { showModal } from '../../redux/Modal/action';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import TrecipePopup, { TrecipePopupType } from '../../components/TrecipePopup/TrecipePopup';
import Trecipe from '../../../../shared/models/trecipe';

type MyTrecipesProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    RouteComponentProps;

interface FilterWithState {
    filterName: string;
    selected: boolean;
}

export interface MyTrecipesState {
    filterStates: Array<FilterWithState>;
    privacyState: FilterSelectorTypes;
    filteredTrecipesWithProgress: Array<Trecipe>;
    filteredTrecipesWithPrivacy: Array<Trecipe>;
}

class MyTrecipes extends React.Component<MyTrecipesProps, MyTrecipesState> {
    private static contextFilters: string[] = ['All Trecipes', 'Completed', 'In Progress', 'To Do'];

    constructor(props: Readonly<MyTrecipesProps>) {
        super(props);
        let filterStates: Array<FilterWithState> = MyTrecipes.contextFilters.map((name) =>
            name === FilterButtonTypes.ALL
                ? { filterName: name, selected: true }
                : { filterName: name, selected: false }
        );
        this.state = {
            filteredTrecipesWithProgress: [],
            filteredTrecipesWithPrivacy: [],
            filterStates: filterStates,
            privacyState: FilterSelectorTypes.ANY,
        };
    }

    componentDidMount(): void {
        this.props.fetchAllTrecipes();
    }

    componentDidUpdate(
        prevProps: Readonly<MyTrecipesProps>,
        prevState: Readonly<MyTrecipesState>,
        snapshot?: any
    ) {
        if (prevProps.trecipes !== this.props.trecipes) {
            this.setState({
                filteredTrecipesWithProgress: this.props.trecipes,
                filteredTrecipesWithPrivacy: this.props.trecipes,
            });
        }
    }

    private renderAddPopup = () => {
        this.props.showModal(<TrecipePopup type={TrecipePopupType.Add} />);
    };

    private handleFilterOnClick(filterType: FilterButtonTypes, selected: boolean) {
        if (filterType === FilterButtonTypes.ALL && selected) {
            this.setState(
                (state) => ({
                    filterStates: state.filterStates.map((filter) =>
                        filter.filterName === filterType.valueOf()
                            ? { filterName: filter.filterName, selected: selected }
                            : { filterName: filter.filterName, selected: false }
                    ),
                }),
                this.filterTrecipeByProgress
            );
        } else {
            this.setState(
                (state) => ({
                    filterStates: state.filterStates.map((filter) =>
                        filter.filterName === filterType.valueOf()
                            ? { filterName: filter.filterName, selected: selected }
                            : filter.filterName === FilterButtonTypes.ALL
                            ? { filterName: filter.filterName, selected: false }
                            : filter
                    ),
                }),
                this.filterTrecipeByProgress
            );
        }
    }

    private filterTrecipeByProgress() {
        let allFilter = this.state.filterStates.find(
            (filter) => filter.filterName === FilterButtonTypes.ALL
        );
        if (allFilter && allFilter.selected) {
            this.setState({ filteredTrecipesWithProgress: this.props.trecipes });
        } else {
            let newTrecipeList: Array<Trecipe>;
            newTrecipeList = this.state.filterStates.reduce(
                (acc: Array<Trecipe>, filter: FilterWithState) => {
                    if (filter.selected) {
                        switch (filter.filterName) {
                            case FilterButtonTypes.COMPLETED:
                                acc = acc.concat(
                                    this.props.trecipes.filter((trecipe) =>
                                        MyTrecipes.isCompletedTrecipe(trecipe)
                                    )
                                );
                                break;
                            case FilterButtonTypes.IN_PROGRESS:
                                acc = acc.concat(
                                    this.props.trecipes.filter((trecipe) =>
                                        MyTrecipes.isInProgressTrecipe(trecipe)
                                    )
                                );
                                break;
                            case FilterButtonTypes.TODO:
                                acc = acc.concat(
                                    this.props.trecipes.filter((trecipe) =>
                                        MyTrecipes.isTodoTrecipe(trecipe)
                                    )
                                );
                                break;
                        }
                    }
                    return acc;
                },
                []
            );
            this.setState(
                { filteredTrecipesWithProgress: newTrecipeList },
                this.filterTrecipeByPrivacy
            );
        }
    }

    private onPrivacySelectorChange(type: FilterSelectorTypes) {
        this.setState({ privacyState: type }, this.filterTrecipeByPrivacy);
    }

    private filterTrecipeByPrivacy() {
        let trecipes = this.state.filteredTrecipesWithProgress;
        switch (this.state.privacyState) {
            case FilterSelectorTypes.PUBLIC:
                trecipes = trecipes.filter((trecipe) => !trecipe.isPrivate);
                break;
            case FilterSelectorTypes.PRIVATE:
                trecipes = trecipes.filter((trecipe) => trecipe.isPrivate);
                break;
        }

        this.setState({ filteredTrecipesWithPrivacy: trecipes });
    }

    private static isCompletedTrecipe(trecipe: Trecipe): boolean {
        return trecipe.destinations.reduce((acc: boolean, dest) => acc && dest.completed, true);
    }

    private static isInProgressTrecipe(trecipe: Trecipe): boolean {
        let len = trecipe.destinations.filter((dest) => dest.completed).length;
        return len !== 0 && len !== trecipe.destinations.length;
    }

    private static isTodoTrecipe(trecipe: Trecipe): boolean {
        return trecipe.destinations.filter((dest) => dest.completed).length === 0;
    }

    render() {
        return (
            <div className="mytrecipes-wrapper">
                <div className="content">
                    <h1 className="page-title">My Trecipes</h1>
                    <div className="buttons-wrapper">
                        <ul className="context-filters">
                            {this.state.filterStates.map((filter) => (
                                <li className="filter-item" key={filter.filterName}>
                                    <FilterButton
                                        text={filter.filterName}
                                        icon="check"
                                        fontSize={1}
                                        filterType={filter.filterName as FilterButtonTypes}
                                        selected={filter.selected}
                                        onClick={() => {
                                            return;
                                        }}
                                        filterOnClick={this.handleFilterOnClick.bind(this)}
                                        defaultDisabled={false}
                                    />
                                </li>
                            ))}
                            <FilterSelector
                                listItem={[
                                    {
                                        text: 'Any',
                                        icon: 'border-all' as IconProp,
                                        selectorType: FilterSelectorTypes.ANY,
                                    },
                                    {
                                        text: 'Public',
                                        icon: 'lock-open' as IconProp,
                                        selectorType: FilterSelectorTypes.PUBLIC,
                                    },
                                    {
                                        text: 'Private',
                                        icon: 'lock' as IconProp,
                                        selectorType: FilterSelectorTypes.PRIVATE,
                                    },
                                ]}
                                onClick={this.onPrivacySelectorChange.bind(this)}
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
                    <div className="cards-wrapper">
                        {this.state.filteredTrecipesWithPrivacy.map((trecipe: Trecipe) => (
                            <div className="card-item" key={trecipe.uuid}>
                                <Link className="router-link" to={trecipe.uuid}>
                                    <TrecipeCard {...trecipe} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    trecipes: state.trecipeList.trecipes,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            fetchAllTrecipes,
            showModal,
        },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyTrecipes));
