import React from 'react';
import '../Trecipe/Trecipe.scss';
import { DestinationCard } from './DestinationCard/DestinationCard';
import { DragDropContext, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CoverPhoto } from '../../components/CoverPhoto/CoverPhoto';
import { Button } from '../../components/Button/Button';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { showModal } from '../../redux/Modal/action';
import { RootState } from '../../redux';
import { RouteComponentProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import {
    addDestinationRequest,
    getDestinationsByTrecipeId,
    rateDestinationRequest,
    removeDestinationRequest,
} from '../../redux/Destinations/action';
import TrecipePopup, { TrecipePopupType } from '../../components/TrecipePopup/TrecipePopup';
import { SearchBarPopup } from '../../components/SearchBarPopup/SearchBarPopup';
import { Marker, MarkerColor, StaticMap } from '../../components/Map/StaticMap';
import Modal from '../../components/Modal/Modal';
import Trecipe, { DestWithStatus } from '../../../../shared/models/trecipe';
import { fetchTrecipe, updateTrecipeRequest } from '../../redux/Trecipe/action';
import Destination, { Rating } from '../../../../shared/models/destination';
import { CreateNewDestinationDTO } from '../../../../shared/models/createNewDestinationDTO';
import { Legend } from '../Map/GoogleMap/Legend';
import { baseURL } from '../../api';
import RatingPopup from '../../components/RatingPopup/RatingPopup';
import { UpdateDestinationRatingDTO } from '../../../../shared/models/updateDestinationRatingDTO';

/**
 * TrecipeProps
 * mapStateToProps gives trecipe model
 * mapDispatchToProps give action creators needed by Trecipe page
 * RouteComponentProps gives trecipe id
 */
export type TrecipeProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    RouteComponentProps<{ trecipeId: string }>;

/**
 * Trecipe State
 * destination: destination models in the Trecipe
 * visibleTo: stores the index of destinations in list currently visible (used for "Show More")
 * isInEdit: true if destinations are currently in edit
 */
export interface TrecipeState {
    destinationsInEdit: Array<Destination>;
    visibleTo: number;
    isInEdit: boolean;
}

class TrecipePage extends React.Component<TrecipeProps, TrecipeState> {
    // By default, show 5 destination cards
    private static DEFAULT_VISIBLE = 5;
    // Reference to add destination button, used to disable it
    private addDestButtonRef: React.RefObject<Button> = React.createRef();

    constructor(props: Readonly<TrecipeProps>) {
        super(props);
        this.state = {
            destinationsInEdit: [],
            visibleTo: TrecipePage.DEFAULT_VISIBLE,
            isInEdit: false,
        };
    }

    componentDidMount(): void {
        // load destinations by trecipe id before rendering
        const trecipeId = this.props.match.params.trecipeId;
        this.props.fetchTrecipe(trecipeId);
        this.props.getDestinationsByTrecipeId(trecipeId);
    }

    private onDestDragEnd(result: DropResult, provided: ResponderProvided) {
        if (result.destination) {
            const dests: Array<Destination> = TrecipePage.reorder(
                this.state.destinationsInEdit,
                result.source.index,
                result.destination.index
            );
            this.setState({ destinationsInEdit: dests });
        }
    }

    private onShowMore() {
        if (!this.state.isInEdit) {
            this.setState((state) => {
                return { visibleTo: state.visibleTo + TrecipePage.DEFAULT_VISIBLE };
            });
        }
    }

    private canExpand(): boolean {
        if (this.props.destinations) {
            return !this.state.isInEdit && this.state.visibleTo < this.props.destinations.length;
        } else {
            return false;
        }
    }

    private getDestinationsList(): Array<Destination> {
        if (!this.props.destinations) return [];

        if (this.state.isInEdit) {
            return this.state.destinationsInEdit;
        } else {
            return this.props.destinations.slice(0, this.state.visibleTo);
        }
    }

    private toggleEdit() {
        this.setState((state) => ({ isInEdit: !state.isInEdit }));
    }

    private static reorder(
        list: Array<Destination>,
        startIndex: number,
        endIndex: number
    ): Array<Destination> {
        const listCopy = Array.from(list);
        const [removed] = listCopy.splice(startIndex, 1);
        listCopy.splice(endIndex, 0, removed);
        return listCopy;
    }

    private onTrecipeEditClick() {
        this.props.showModal(
            <TrecipePopup type={TrecipePopupType.Edit} trecipe={this.props.trecipe} />
        );
    }

    private onDestAddClick() {
        // TODO: Modal is moved to here from SearchBarPopup so that the searchbar can be reused in map
        // Might be a good idea to refactor SearchBarPopup and rename it
        this.props.showModal(
            <Modal>
                <SearchBarPopup
                    onDestAdd={this.onDestAdded.bind(this)}
                    onDestRemove={this.onDestRemoved.bind(this)}
                />
            </Modal>
        );
    }

    private onDestAdded(destination: CreateNewDestinationDTO): void {
        if (this.props.trecipe) {
            this.props.addDestinationRequest(this.props.trecipe, destination);
        }
    }

    private onDestRemoved(idToDelete: string): void {
        if (this.props.trecipe) {
            this.props.removeDestinationRequest(this.props.trecipe, { destId: idToDelete });
        }
    }

    private onDestEditClick() {
        // if exiting from editing, update TrecipeModel with the changes to destination,
        // else if entering editing, reset destinationsInEdit state to store's destinations
        if (!this.props.trecipe || !this.props.destinations) {
            return;
        }
        if (this.state.isInEdit) {
            const trecipe: Trecipe = this.props.trecipe;
            const completed = new Set(
                trecipe.destinations.flatMap((dest: DestWithStatus) =>
                    dest.completed ? [dest.destUUID] : []
                )
            );
            this.props.updateTrecipe(this.props.trecipe.uuid, {
                destinations: this.state.destinationsInEdit.map((dest) => {
                    return { destUUID: dest.uuid, completed: completed.has(dest.uuid) };
                }),
            });
        } else {
            this.setState({ destinationsInEdit: this.props.destinations });
        }
        this.addDestButtonRef.current?.toggle(); // disable add while in edit
        this.toggleEdit(); // toggle edit button
    }

    private onDestDeleteClick(idToDelete: string, e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        if (this.state.isInEdit) {
            this.setState((state) => ({
                destinationsInEdit: state.destinationsInEdit.filter(
                    (dest) => dest.uuid !== idToDelete
                ),
            }));
        }
    }

    private onDestCompleteClick(destination: Destination) {
        if (this.props.trecipe) {
            const trecipe: Trecipe = this.props.trecipe;
            if (
                trecipe.destinations.find(
                    (dest) => dest.destUUID === destination.uuid && !dest.completed
                )
            ) {
                if (this.props.user.username) {
                    this.props.showModal(
                        <RatingPopup
                            onClickHandler={this.updateTrecipeDestOnComplete.bind(this)}
                            dest={destination}
                            trecipeId={this.props.trecipe.uuid}
                            userId={this.props.user.username}
                        />
                    );
                } else {
                    // TODO Throw unauthenticated error!
                    // For now pass a stub here
                    this.updateTrecipeDestOnComplete(destination.uuid, true, undefined);
                }
            }
        }
    }

    private updateTrecipeDestOnComplete(
        id: string,
        skip: boolean,
        updateDestinationRatingDTO: UpdateDestinationRatingDTO | undefined
    ) {
        if (this.props.trecipe) {
            const trecipe: Trecipe = this.props.trecipe;
            if (!skip && updateDestinationRatingDTO) {
                this.props.rateDestination(id, updateDestinationRatingDTO);
            }
            this.props.updateTrecipe(trecipe.uuid, {
                destinations: trecipe.destinations.map((dest) =>
                    dest.destUUID === id ? { destUUID: id, completed: true } : dest
                ),
            });
        }
    }

    private onCoverPhotoChange(updatedFilename: string) {
        if (this.props.trecipe) {
            const trecipe: Trecipe = this.props.trecipe;
            this.props.updateTrecipe(trecipe.uuid, {
                image: updatedFilename,
            });
        }
    }

    private getMarker(destination: Destination, completed: boolean): Marker {
        return {
            lat: destination.geometry.lat,
            long: destination.geometry.lng,
            color: completed ? MarkerColor.Blue : MarkerColor.Grey,
        };
    }

    render() {
        const trecipe: Trecipe | undefined = this.props.trecipe;
        const destinations: Destination[] | undefined = this.props.destinations;
        const editTrecipeBtnString = 'Edit Trecipe';
        if (!trecipe || !destinations) {
            return null;
        } else {
            const completed = new Set(
                trecipe.destinations.flatMap((dest: DestWithStatus) =>
                    dest.completed ? [dest.destUUID] : []
                )
            );
            return (
                <div>
                    <div className="tc-header-container">
                        <CoverPhoto
                            imageSource={`${baseURL}upload/${trecipe.image}`}
                            buttons={[
                                <Button
                                    key={editTrecipeBtnString}
                                    text={editTrecipeBtnString}
                                    icon="edit"
                                    onClick={this.onTrecipeEditClick.bind(this)}
                                />,
                            ]}
                            onFileChange={this.onCoverPhotoChange.bind(this)}>
                            <div className="tc-header-text">
                                <div className="tc-header-title">
                                    <h1 className="tc-header-name">{trecipe.name}</h1>
                                    <FontAwesomeIcon
                                        icon={trecipe.isPrivate ? 'lock' : 'lock-open'}
                                        className="tc-header-privacy"
                                    />
                                </div>
                                <h3 className="tc-header-time">
                                    {new Date(trecipe.updatedAt).toLocaleString()}
                                </h3>
                            </div>
                        </CoverPhoto>
                        <svg
                            className="border"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none">
                            <path d="M 0 0 Q 50 50 100 0 V 100 H 0 Z" />
                        </svg>
                    </div>
                    <div className="trecipe-content-wrapper">
                        <div className="content">
                            <p>{trecipe.description}</p>
                            <span className="title-with-btns">
                                <h1 className="trecipe-page-title">Places</h1>
                                <span className="dest-edit-btn-wrapper">
                                    <Button
                                        text="Add"
                                        onClick={this.onDestAddClick.bind(this)}
                                        ref={this.addDestButtonRef}
                                    />
                                    <Button
                                        text={this.state.isInEdit ? 'Done' : 'Edit'}
                                        onClick={this.onDestEditClick.bind(this)}
                                    />
                                </span>
                            </span>
                            <ProgressBar
                                total={destinations.length}
                                completed={completed.size}
                                showText={true}
                                barStyle={{ height: '1rem' }}
                            />
                            <div>
                                <DragDropContext onDragEnd={this.onDestDragEnd.bind(this)}>
                                    <Droppable droppableId="droppable">
                                        {(provided) => (
                                            <ul
                                                className="destination-cards"
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}>
                                                {this.getDestinationsList().map((dest, index) => (
                                                    <Link
                                                        className="router-link"
                                                        to={`/destinations/${dest.placeId}`}
                                                        target="_blank"
                                                        key={dest.uuid}>
                                                        <DestinationCard
                                                            key={dest.uuid}
                                                            destination={dest}
                                                            isCompleted={completed.has(dest.uuid)}
                                                            index={index}
                                                            onClickDelete={this.onDestDeleteClick.bind(
                                                                this
                                                            )}
                                                            onClickComplete={this.onDestCompleteClick.bind(
                                                                this
                                                            )}
                                                            isInEdit={this.state.isInEdit}
                                                        />
                                                    </Link>
                                                ))}
                                                {provided.placeholder}
                                            </ul>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                                {this.canExpand() && (
                                    <button
                                        className="show-more-btn"
                                        onClick={this.onShowMore.bind(this)}>
                                        Show More
                                        <FontAwesomeIcon id="show-more-icon" icon="chevron-down" />
                                    </button>
                                )}
                            </div>
                            <h1 className="trecipe-page-title">See places on the map</h1>
                            <div className="trecipe-map-wrapper">
                                <Link to={`/map/${trecipe.uuid}`}>
                                    <StaticMap
                                        markers={destinations.map((dest) =>
                                            this.getMarker(dest, completed.has(dest.uuid))
                                        )}
                                    />
                                    <div className="static-map-legend">
                                        <Legend />
                                    </div>
                                    <div className="static-map-overlay">
                                        <Button icon="external-link-alt" text="Expand View" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (
    state: RootState,
    ownProps: RouteComponentProps<{ trecipeId: string }>
) => {
    const trecipeId = ownProps.match.params.trecipeId;
    const destinations = state.destinations.destsByTrecipeId.get(trecipeId);
    const user = state.user.user;
    return {
        trecipe: state.trecipe.trecipe,
        destinations: destinations,
        user: user,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            showModal,
            updateTrecipe: updateTrecipeRequest,
            getDestinationsByTrecipeId,
            rateDestination: rateDestinationRequest,
            fetchTrecipe,
            addDestinationRequest,
            removeDestinationRequest,
        },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrecipePage));
