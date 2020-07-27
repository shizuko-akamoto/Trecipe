import Modal from '../Modal/Modal';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchAllTrecipes, fetchAssociatedTrecipesRequest } from '../../redux/TrecipeList/action';
import Trecipe from '../../../../shared/models/trecipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './trecipePicker.scss';
import {
    addDestination,
    addDestinationRequest,
    getDestinationByPlaceId,
    removeDestination,
    removeDestinationRequest,
} from '../../redux/Destinations/action';
import Destination from '../../../../shared/models/destination';
import { CreateNewDestinationDTO } from '../../../../shared/models/createNewDestinationDTO';
import { hideModal } from '../../redux/Modal/action';

export interface TrecipePickerOwnProps {
    destination: Destination;
}

export type TrecipePickerProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    TrecipePickerOwnProps;

class TrecipePicker extends React.Component<TrecipePickerProps> {
    componentDidMount(): void {
        this.props.fetchAllTrecipes();
        this.props.fetchCheckedTrecipes(this.props.destination.placeId);
    }

    private onTrecipeClick(trecipeId: string) {
        const trecipe = this.props.trecipes.find((trecipe) => trecipe.uuid === trecipeId);
        if (!trecipe) {
            return;
        }
        if (this.props.checkedTrecipes.has(trecipeId)) {
            this.props.removeDestination(trecipe, { placeId: this.props.destination.placeId });
        } else {
            this.props.addDestination(trecipe, this.props.destination);
        }
        this.props.hideModal();
    }

    render() {
        return (
            <Modal>
                <div className="trecipe-picker">
                    <h1 className="picker-title">Save to a Trecipe</h1>
                    <div className="trecipe-list-wrapper">
                        <ul className="trecipe-list">
                            {this.props.trecipes.map((trecipe: Trecipe) => (
                                <li
                                    className="trecipe-item"
                                    key={trecipe.uuid}
                                    onClick={() => this.onTrecipeClick(trecipe.uuid)}>
                                    <span className="item-info">
                                        <p className="trecipe-name">{trecipe.name}</p>
                                        <FontAwesomeIcon
                                            className="privacy-icon"
                                            icon={trecipe.isPrivate ? 'lock' : 'lock-open'}
                                            fixedWidth
                                        />
                                    </span>
                                    <FontAwesomeIcon
                                        className={`trecipe-check ${
                                            this.props.checkedTrecipes.has(trecipe.uuid)
                                                ? 'checked'
                                                : 'unchecked'
                                        }`}
                                        icon="check"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        trecipes: state.trecipeList.myTrecipes,
        checkedTrecipes: new Set(
            state.trecipeList.associatedTrecipes.map((trecipe) => trecipe.uuid)
        ),
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            fetchAllTrecipes,
            fetchCheckedTrecipes: fetchAssociatedTrecipesRequest,
            addDestination: addDestinationRequest,
            removeDestination: removeDestinationRequest,
            hideModal,
        },
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(TrecipePicker);
