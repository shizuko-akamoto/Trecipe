import React from 'react';
import './Map.scss';
import { DestinationCard } from './DestinationCard/DestinationCard';
import { CardMenu } from '../../components/CardMenu/CardMenu';
import { MenuItem } from '../../components/Menu/Menu';
import { GMap } from './GoogleMap/Gmap';
import { RootState } from '../../redux';
import { bindActionCreators, Dispatch } from 'redux';
import { showModal } from '../../redux/Modal/action';
import { deleteTrecipeRequest, duplicateTrecipeRequest } from '../../redux/TrecipeList/action';
import {
    getDestinationsByTrecipeId,
    addDestinationRequest,
    removeDestinationRequest,
} from '../../redux/Destinations/action';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import TrecipePopup, { TrecipePopupType } from '../../components/TrecipePopup/TrecipePopup';
import Trecipe, { DestWithStatus } from '../../../../shared/models/trecipe';
import { fetchTrecipeRequest, updateTrecipeRequest } from '../../redux/Trecipe/action';
import Destination from '../../../../shared/models/destination';
import { CreateNewDestinationDTO } from '../../../../shared/models/createNewDestinationDTO';
import { createErrorMessageSelector } from '../../redux/Error/selector';
import { DestinationsActionCategory } from '../../redux/Destinations/types';
import { TrecipeActionCategory } from '../../redux/Trecipe/types';
import { toast } from 'react-toastify';

export type MapProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    RouteComponentProps<{ trecipeId: string }>;

class Map extends React.Component<MapProps> {
    private trecipeEditMenuItems: MenuItem[] = [
        {
            id: 1,
            text: 'Edit',
            icon: 'edit',
            onClick: () => this.onTrecipeEditClick(),
        },
        {
            id: 2,
            text: 'Duplicate',
            icon: 'copy',
            onClick: () => this.onTrecipeCopyClick(),
        },
        {
            id: 3,
            text: 'Delete',
            icon: ['far', 'trash-alt'],
            onClick: () => this.onTrecipeDeleteClick(),
        },
    ];

    componentDidMount(): void {
        // fetch trecipe by id and destinations by trecipe id
        const trecipeId = this.props.match.params.trecipeId;
        this.props.fetchTrecipe(trecipeId);
        this.props.getDestinationsByTrecipeId(trecipeId);
    }

    private onDestCompleteClick(destId: string, e: React.MouseEvent) {
        e.preventDefault();
        if (this.props.trecipe) {
            const trecipe: Trecipe = this.props.trecipe;
            this.props.updateTrecipe(trecipe.uuid, {
                destinations: trecipe.destinations.map((dest) =>
                    dest.destUUID === destId ? { destUUID: destId, completed: true } : dest
                ),
            });
        }
    }

    private onDestCardDeleteClick(idToDelete: string) {
        if (this.props.trecipe) {
            this.props.removeDestination(this.props.trecipe, { destId: idToDelete });
        }
    }

    private onDestRemoveClick(idToDelete: string) {
        if (this.props.trecipe) {
            this.props.removeDestination(this.props.trecipe, { placeId: idToDelete });
        }
    }

    private onDestAddClick(destination: CreateNewDestinationDTO) {
        if (this.props.trecipe) {
            this.props.addDestination(this.props.trecipe, destination);
        }
    }

    private onTrecipeEditClick() {
        if (this.props.trecipe) {
            this.props.showModal(
                <TrecipePopup type={TrecipePopupType.Edit} trecipe={this.props.trecipe} />
            );
        }
    }

    private onTrecipeCopyClick() {
        if (this.props.trecipe) {
            this.props.duplicateTrecipe(this.props.trecipe.uuid);
            // TODO: Redirect to Map page of copied Trecipe
        }
    }

    private onTrecipeDeleteClick() {
        if (this.props.trecipe) {
            this.props.deleteTrecipe(this.props.trecipe.uuid);
            // TODO: Redirect back to My Trecipes page
        }
    }

    render() {
        const trecipe: Trecipe | undefined = this.props.trecipe;
        const destinations: Destination[] | undefined = this.props.destinations;
        if (!trecipe || !destinations) {
            return null;
        }

        const completed = new Set(
            trecipe.destinations.flatMap((dest: DestWithStatus) =>
                dest.completed ? [dest.destUUID] : []
            )
        );
        return (
            <div className="map-page-wrapper">
                <div className="map-page-content">
                    <aside className="map-side-bar">
                        <div className="trecipe-header">
                            <span>{trecipe.name}</span>
                            <CardMenu menuItems={this.trecipeEditMenuItems} />
                        </div>
                        <div>
                            <ul className="dest-card-list">
                                {destinations.map((dest, index) => (
                                    <Link
                                        className="router-link"
                                        to={`/destinations/${dest.placeId}`}
                                        target="_blank"
                                        key={dest.uuid}>
                                        <DestinationCard
                                            index={index}
                                            key={dest.uuid}
                                            destination={dest}
                                            isCompleted={completed.has(dest.uuid)}
                                            onClickDelete={this.onDestCardDeleteClick.bind(this)}
                                            onClickComplete={this.onDestCompleteClick.bind(this)}
                                        />
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </aside>
                    <div className="map-container">
                        <GMap
                            destinations={destinations}
                            completedDest={completed}
                            onDestAdd={this.onDestAddClick.bind(this)}
                            onDestRemove={this.onDestRemoveClick.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (
    state: RootState,
    ownProps: RouteComponentProps<{ trecipeId: string }>
) => {
    const trecipeId = ownProps.match.params.trecipeId;
    const destinations = state.destinations.destsByTrecipeId.get(trecipeId);
    return {
        trecipe: state.trecipe.trecipe,
        destinations: destinations,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            showModal,
            updateTrecipe: updateTrecipeRequest,
            deleteTrecipe: deleteTrecipeRequest,
            duplicateTrecipe: duplicateTrecipeRequest,
            getDestinationsByTrecipeId,
            addDestination: addDestinationRequest,
            removeDestination: removeDestinationRequest,
            fetchTrecipe: fetchTrecipeRequest,
        },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Map));
