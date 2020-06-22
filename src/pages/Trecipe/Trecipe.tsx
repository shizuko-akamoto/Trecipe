import React from "react";
import "../Trecipe/Trecipe.scss";
import { DestinationCard } from "./DestinationCard/DestinationCard";
import {
  DragDropContext,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { newTrecipeModel, TrecipeModel } from "../../redux/TrecipeList/types";
import { CoverPhoto } from "../../components/CoverPhoto/CoverPhoto";
import { Button } from "../../components/Button/Button";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { updateTrecipe } from "../../redux/TrecipeList/action";
import { showModal } from "../../redux/Modal/action";
import { RootState } from "../../redux";
import { intersection, isUndefined } from "lodash";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { DestinationModel } from "../../redux/Destinations/types";
import { getDestModelsByTrecipeId } from "../../redux/Destinations/action";

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
  destinationsInEdit: Array<DestinationModel>;
  visibleTo: number;
  isInEdit: boolean;
}

class Trecipe extends React.Component<TrecipeProps, TrecipeState> {
  // By default, show 5 destination cards
  private static DEFAULT_VISIBLE = 5;
  // Reference to add destination button, used to disable it
  private addDestButtonRef: React.RefObject<Button> = React.createRef();

  constructor(props: Readonly<TrecipeProps>) {
    super(props);
    this.state = {
      destinationsInEdit: [],
      visibleTo: Trecipe.DEFAULT_VISIBLE,
      isInEdit: false,
    };
  }

  componentDidMount(): void {
    // load destinations by trecipe id before rendering
    this.props.getDestModelsByTrecipeId(this.props.trecipe.id);
  }

  private onDestDragEnd(result: DropResult, provided: ResponderProvided) {
    if (result.destination) {
      const dests: Array<DestinationModel> = Trecipe.reorder(
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
        return { visibleTo: state.visibleTo + Trecipe.DEFAULT_VISIBLE };
      });
    }
  }

  private canExpand() {
    return (
      !this.state.isInEdit &&
      this.state.visibleTo < this.props.destinations.length
    );
  }

  private getDestinationsList(): Array<DestinationModel> {
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
    list: Array<DestinationModel>,
    startIndex: number,
    endIndex: number
  ): Array<DestinationModel> {
    const listCopy = Array.from(list);
    const [removed] = listCopy.splice(startIndex, 1);
    listCopy.splice(endIndex, 0, removed);
    return listCopy;
  }

  private onTrecipeEditClick() {
    // this.props.showModal(
    //   <TrecipePopup
    //     type={TrecipePopupType.Edit}
    //     trecipeId={parseInt(this.props.match.params.trecipeId)}
    //   />
    // );
  }

  private onDestAddClick() {
    // this.props.showModal(<SearchBarPopup />);
  }

  private onDestEditClick() {
    // if exiting from editing, update TrecipeModel with the changes to destination,
    // else if entering editing, reset destinationsInEdit state to store's destinations
    if (this.state.isInEdit) {
      const destIds = this.state.destinationsInEdit.map((dest) => dest.id);
      const updatedCompleted = new Set(
        intersection(destIds, Array.from(this.props.trecipe.completed))
      );
      this.props.updateTrecipe(this.props.trecipe.id, {
        destinations: destIds,
        completed: updatedCompleted,
      });
    } else {
      this.setState({ destinationsInEdit: this.props.destinations });
    }
    this.addDestButtonRef.current?.toggle(); // disable add while in edit
    this.toggleEdit(); // toggle edit button
  }

  private onDestDeleteClick(idToDelete: string) {
    if (this.state.isInEdit) {
      this.setState((state) => ({
        destinationsInEdit: state.destinationsInEdit.filter(
          (dest) => dest.id !== idToDelete
        ),
      }));
    }
  }

  private onDestCompleteClick(id: string) {
    const trecipe: TrecipeModel = this.props.trecipe;
    this.props.updateTrecipe(trecipe.id, {
      completed: trecipe.completed.add(id),
    });
  }

  render() {
    const trecipe: TrecipeModel = this.props.trecipe;
    const editTrecipeBtnString = "Edit Trecipe";
    return (
      <div>
        <div className="tc-header-container">
          <CoverPhoto
            buttons={[
              <Button
                key={editTrecipeBtnString}
                text={editTrecipeBtnString}
                icon="edit"
                onClick={this.onTrecipeEditClick.bind(this)}
              />,
            ]}>
            <div className="tc-header-text">
              <div className="tc-header-title">
                <h1 className="tc-header-name">{trecipe.name}</h1>
                <FontAwesomeIcon
                  icon={trecipe.isPrivate ? "lock" : "lock-open"}
                  className="tc-header-privacy"
                />
              </div>
              <h3 className="tc-header-time">{trecipe.date}</h3>
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
        <div className="content-wrapper">
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
                  text={this.state.isInEdit ? "Done" : "Edit"}
                  onClick={this.onDestEditClick.bind(this)}
                />
              </span>
            </span>
            <ProgressBar
              total={this.props.destinations.length}
              completed={trecipe.completed.size}
              showText={true}
              barStyle={{ height: "1rem" }}
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
                        <DestinationCard
                          key={dest.id}
                          destModel={dest}
                          isCompleted={trecipe.completed.has(dest.id)}
                          index={index}
                          onClickDelete={this.onDestDeleteClick.bind(this)}
                          onClickComplete={this.onDestCompleteClick.bind(this)}
                          isInEdit={this.state.isInEdit}
                        />
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
  const maybeTrecipeWithId = state.trecipeList.trecipes.find(
    (trecipe: TrecipeModel) => trecipe.id === trecipeId
  );
  const maybeUnsortedDestModels = state.destinations.destsByTrecipeId.get(
    trecipeId
  );

  const trecipeWithId = isUndefined(maybeTrecipeWithId)
    ? newTrecipeModel()
    : maybeTrecipeWithId;
  const unsortedDestModels = isUndefined(maybeUnsortedDestModels)
    ? []
    : maybeUnsortedDestModels;
  return {
    // TODO: Proper Error handling (should show Error Not Found page if trecipe id is not found)
    trecipe: trecipeWithId,
    destinations: trecipeWithId.destinations.flatMap((destId) => {
      return unsortedDestModels.filter((model) => destId === model.id);
    }),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      showModal,
      updateTrecipe,
      getDestModelsByTrecipeId,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Trecipe)
);
