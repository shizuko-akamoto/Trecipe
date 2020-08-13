import React from 'react';
import './Map.scss';
import { DestinationCard } from './DestinationCard/DestinationCard';
import { CardMenu } from '../../components/CardMenu/CardMenu';
import { MenuItem } from '../../components/Menu/Menu';
import GMap from './GoogleMap/Gmap';
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
import { isEmpty } from 'lodash';
import { EmptyDestinations } from '../../components/EmptyText/EmptyDestinations';

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

    private trecipeSaveMenuItems: MenuItem[] = [
        {
            id: 1,
            text: 'Save',
            icon: ['far', 'star'],
            onClick: () => this.onTrecipeCopyClick(),
        },
    ];

    componentDidMount(): void {
        this.loadTrecipe();
    }

    componentDidUpdate(prevProps: Readonly<MapProps>): void {
        // when we're looking at new trecipe, refetch trecipe details and associated desetination
        const trecipeId = this.props.match.params.trecipeId;
        if (prevProps.match.params.trecipeId !== trecipeId) {
            this.loadTrecipe();
        }
    }

    // fetch trecipe by id and destinations by trecipe id
    private loadTrecipe(): void {
        const trecipeId = this.props.match.params.trecipeId;
        this.props.fetchTrecipe(trecipeId);
        this.props.getDestinationsByTrecipeId(trecipeId);
    }

    private onDestCompleteClick(destination: Destination, e: React.MouseEvent) {
        e.preventDefault();
        if (this.props.trecipe) {
            const trecipe: Trecipe = this.props.trecipe;
            this.props.updateTrecipe(trecipe.uuid, {
                destinations: trecipe.destinations.map((dest) =>
                    dest.destUUID === destination.uuid
                        ? { destUUID: destination.uuid, completed: true }
                        : dest
                ),
            });
        }
    }

    /**
     * Callback method when delete trecipe button on Destination card is clicked
     * @param idToDelete: destination uuid
     */
    private onDestCardDeleteClick(idToDelete: string) {
        if (this.props.trecipe) {
            this.props.removeDestination(this.props.trecipe, { destId: idToDelete });
        }
    }

    /**
     * Callback method when delete is called from search bar popup
     * NOTE: difference between this "onDestCardDeleteClick" is the id provided
     * @param placeIdToDelete: place id from Google Place api
     */
    private onDestRemoveClick(placeIdToDelete: string) {
        if (this.props.trecipe) {
            this.props.removeDestination(this.props.trecipe, { placeId: placeIdToDelete });
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
            this.props.duplicateTrecipe(this.props.trecipe.uuid, (uuid: string) => {
                // Redirect to Trecipe map page
                this.props.history.push(`/map/${uuid}`);
            });
        }
    }

    private onTrecipeDeleteClick() {
        if (this.props.trecipe) {
            this.props.deleteTrecipe(this.props.trecipe.uuid, () => {
                // Redirect to My Trecipe page after delete
                this.props.history.push('/mytrecipes');
            });
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
        // Show everything if user is signed in and is the owner/collaborator of the trecipe
        const user = this.props.user;
        const isAuthenticated = this.props.isAuthenticated;
        const canEdit = !!(trecipe && isAuthenticated && user.trecipes?.includes(trecipe.uuid));
        // Show the save button if user is signed in but is not the owner of the trecipe
        const canSave = trecipe && isAuthenticated && !user.trecipes?.includes(trecipe.uuid);
        return (
            <div className="map-page-wrapper">
                <div className="map-page-content">
                    <aside className="map-side-bar">
                        <div className="trecipe-header">
                            <span className="trecipe-title">{trecipe.name}</span>
                            {(canEdit || canSave) && (
                                <CardMenu
                                    menuItems={
                                        canEdit
                                            ? this.trecipeEditMenuItems
                                            : this.trecipeSaveMenuItems
                                    }
                                />
                            )}
                        </div>
                        {isEmpty(destinations) ? (
                            <div className="empty-text-wrapper">
                                <EmptyDestinations />
                            </div>
                        ) : (
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
                                            isReadOnly={!canEdit}
                                            isCompleted={canEdit && completed.has(dest.uuid)}
                                            // for DC, delete by destination uuid
                                            onClickDelete={this.onDestCardDeleteClick.bind(this)}
                                            onClickComplete={this.onDestCompleteClick.bind(this)}
                                        />
                                    </Link>
                                ))}
                            </ul>
                        )}
                    </aside>
                    <div className="map-container">
                        <GMap
                            destinations={destinations}
                            completedDest={completed}
                            onDestAdd={this.onDestAddClick.bind(this)}
                            // Since GMap deals with place ids instead of destination uuid, callback takes in placeId
                            onDestRemove={this.onDestRemoveClick.bind(this)}
                            readOnly={!canEdit}
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
    const user = state.user;
    return {
        trecipe: state.trecipe.trecipe,
        destinations: destinations,
        user: user.user,
        isAuthenticated: user.isAuthenticated,
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
