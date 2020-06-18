import React from "react";
import "../Trecipe/Trecipe.scss";
import { DestinationCard } from "./DestinationCard/DestinationCard";
import {
  DragDropContext,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import {
  DestinationModel,
  newTrecipeModel,
  TrecipeModel,
} from "../../redux/TrecipeList/types";
import { CoverPhoto } from "../../components/CoverPhoto/CoverPhoto";
import { Button } from "../../components/Button/Button";
import { RootState } from "../../redux";
import { connect } from "react-redux";
import { isUndefined } from "lodash";
import { bindActionCreators, Dispatch } from "redux";
import { showModal } from "../../redux/Modal/action";
import TrecipePopup, {
  TrecipePopupType,
} from "../../components/TrecipePopup/TrecipePopup";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";

type TrecipeProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<TrecipeOwnProps>;

type TrecipeOwnProps = {
  trecipeId: string;
};

/**
 * Trecipe State
 * destination: destination models in the Trecipe
 * visibleTo: stores the index of destinations in list currently visible (used for "Show More")
 * isInEdit: true if destinations are currently in edit
 */
export interface TrecipeState {
  destinations: Array<DestinationModel>;
  visibleTo: number;
  isInEdit: boolean;
}

class Trecipe extends React.Component<TrecipeProps, TrecipeState> {
  private static DEFAULT_VISIBLE = 5;

  constructor(props: Readonly<TrecipeProps>) {
    super(props);
    this.state = {
      destinations: props.trecipe.destinations,
      visibleTo: Trecipe.DEFAULT_VISIBLE,
      isInEdit: false,
    };
  }

  private onDestDragEnd(result: DropResult, provided: ResponderProvided) {
    if (result.destination) {
      const dests: Array<DestinationModel> = Trecipe.reorder(
        this.state.destinations,
        result.source.index,
        result.destination.index
      );
      this.setState({ destinations: dests });
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
      this.state.visibleTo < this.state.destinations.length
    );
  }

  private getDestinationsList() {
    if (this.state.isInEdit) {
      return this.state.destinations;
    } else {
      return this.state.destinations.slice(0, this.state.visibleTo);
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
    this.props.showModal(
      <TrecipePopup
        type={TrecipePopupType.Edit}
        trecipeId={parseInt(this.props.match.params.trecipeId)}
      />
    );
  }

  private onDestAddClick() {
    // TODO: open destination add popup
  }

  private onDestEditClick() {
    this.toggleEdit();
  }

  render() {
    const trecipe: TrecipeModel = this.props.trecipe;
    return (
      <div>
        <Header />
        <div className="tc-header-container">
          <CoverPhoto
            buttons={[
              <Button
                key="Edit Trecipe"
                text="Edit Trecipe"
                icon="edit"
                onClick={this.onTrecipeEditClick.bind(this)}
              />,
            ]}>
            <div className="tc-header-text">
              <div className="tc-header-title">
                <h1 className="tc-header-name">{trecipe.name}</h1>
                <FontAwesomeIcon
                  className="tc-header-privacy"
                  icon={trecipe.isPrivate ? "lock" : "lock-open"}
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
            <span className="title-with-btns">
              <h1 className="page-title">Places</h1>
              <span className="dest-edit-btn-wrapper">
                <Button text="Add" onClick={this.onDestAddClick.bind(this)} />
                <Button
                  text={this.state.isInEdit ? "Done" : "Edit"}
                  onClick={this.onDestEditClick.bind(this)}
                />
              </span>
            </span>
            <ProgressBar
              total={trecipe.totalDest}
              completed={trecipe.completedDest}
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
                          index={index}
                          onClickDelete={() => {}}
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
            <h1 className="page-title">See places on the map</h1>
            <div className="trecipe-map" />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps<TrecipeOwnProps>
) => {
  const trecipeWithId = state.trecipeList.trecipes.find(
    (trecipe: TrecipeModel) =>
      trecipe.id === parseInt(ownProps.match.params.trecipeId)
  );
  return {
    trecipe: isUndefined(trecipeWithId) ? newTrecipeModel() : trecipeWithId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      showModal,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Trecipe)
);
