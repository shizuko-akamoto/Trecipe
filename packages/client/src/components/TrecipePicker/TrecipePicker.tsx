import Modal from '../Modal/Modal';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
    fetchMyAssociatedTrecipesRequest,
    fetchMyTrecipes,
    fetchMyTrecipesRequest,
} from '../../redux/TrecipeList/action';
import Trecipe from '../../../../shared/models/trecipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './trecipePicker.scss';
import { addDestinationRequest, removeDestinationRequest } from '../../redux/Destinations/action';
import Destination from '../../../../shared/models/destination';
import { hideModal } from '../../redux/Modal/action';

/**
 * Trecipe Picker own props
 * destination: the destination model to save
 */
export interface TrecipePickerOwnProps {
    destination: Destination;
}

export type TrecipePickerProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    TrecipePickerOwnProps;

class TrecipePicker extends React.Component<TrecipePickerProps> {
    componentDidMount(): void {
        // fetches all trecipes owned by the user
        this.props.fetchMyTrecipes();
        // fetches all user's trecipes containing this destination
        this.props.fetchCheckedTrecipes(this.props.destination.placeId);
    }

    private onTrecipeClick(trecipeId: string) {
        const trecipe = this.props.trecipes.find((trecipe) => trecipe.uuid === trecipeId);
        if (!trecipe) {
            return;
        }
        // if trecipe is already checked (ie. destination is saved already), clicking it will request remove destination,
        // otherwise, request add destination
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
            state.trecipeList.myAssociatedTrecipes.map((trecipe) => trecipe.uuid)
        ),
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            fetchMyTrecipes: fetchMyTrecipesRequest,
            fetchCheckedTrecipes: fetchMyAssociatedTrecipesRequest,
            addDestination: addDestinationRequest,
            removeDestination: removeDestinationRequest,
            hideModal,
        },
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(TrecipePicker);
