import React from "react";
import "./Map.scss";
import { DestinationCard } from "./DestinationCard/DestinationCard";
import { CardMenu } from "../../components/CardMenu/CardMenu";
import { MenuItem } from "../../components/Menu/Menu";
import { GMap } from "./GoogleMap/Gmap";
import { RootState } from "../../redux";
import { newTrecipeModel, TrecipeModel } from "../../redux/TrecipeList/types";
import { isUndefined } from "lodash";
import { bindActionCreators, Dispatch } from "redux";
import { showModal } from "../../redux/Modal/action";
import {
  createNewTrecipe,
  deleteTrecipe,
  updateTrecipe,
} from "../../redux/TrecipeList/action";
import {
  getDestModelsByTrecipeId,
  addDestination,
  removeDestination,
} from "../../redux/Destinations/action";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import TrecipePopup, {
  TrecipePopupType,
} from "../../components/TrecipePopup/TrecipePopup";
import { DestinationModel } from "../../redux/Destinations/types";

export type MapProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<{ trecipeId: string }>;

class Map extends React.Component<MapProps> {
  private trecipeEditMenuItems: MenuItem[] = [
    {
      id: 1,
      text: "Edit",
      icon: "edit",
      onClick: () => this.onTrecipeEditClick(),
    },
    {
      id: 2,
      text: "Duplicate",
      icon: "copy",
      onClick: () => this.onTrecipeCopyClick(),
    },
    {
      id: 3,
      text: "Delete",
      icon: ["far", "trash-alt"],
      onClick: () => this.onTrecipeDeleteClick(),
    },
  ];

  componentDidMount(): void {
    // load destinations by trecipe id before rendering
    this.props.getDestModelsByTrecipeId(this.props.trecipe.id);
  }

  private onDestCompleteClick(destId: string, isCompleted: boolean) {
    const trecipe: TrecipeModel = this.props.trecipe;
    this.props.updateTrecipe(trecipe.id, {
      completed: trecipe.completed.add(destId),
    });
  }

  private onDestDeleteClick(idToDelete: string) {
    const trecipe: TrecipeModel = this.props.trecipe;
    this.props.updateTrecipe(trecipe.id, {
      destinations: trecipe.destinations.filter(
        (destId) => destId !== idToDelete
      ),
    });
    this.props.removeDestination(trecipe.id, idToDelete);
  }

  private onDestAddClick(destination: DestinationModel) {
    const trecipe: TrecipeModel = this.props.trecipe;
    this.props.updateTrecipe(trecipe.id, {
      destinations: [...trecipe.destinations, destination.id],
    });
    this.props.addDestination(trecipe.id, destination);
  }

  private onTrecipeEditClick() {
    this.props.showModal(
      <TrecipePopup
        type={TrecipePopupType.Edit}
        trecipeId={this.props.trecipe.id}
      />
    );
  }

  private onTrecipeCopyClick() {
    // copying everything except for id
    const { id, ...copy } = this.props.trecipe;
    this.props.createNewTrecipe(Object.assign(newTrecipeModel(), copy));
    // TODO: Redirect to Map page of copied Trecipe
  }

  private onTrecipeDeleteClick() {
    this.props.deleteTrecipe(this.props.trecipe.id);
    // TODO: Redirect back to My Trecipes page
  }

  render() {
    const trecipe = this.props.trecipe;
    return (
      <div className="map-page-wrapper">
        <div className="map-page-content">
          <aside className="map-side-bar">
            <div className="trecipe-header">
              <span>{this.props.trecipe.name}</span>
              <CardMenu menuItems={this.trecipeEditMenuItems} />
            </div>
            <div>
              <ul className="dest-card-list">
                {this.props.destinations.map((dest, index) => (
                  <DestinationCard
                    index={index}
                    key={dest.id}
                    destModel={dest}
                    isCompleted={trecipe.completed.has(dest.id)}
                    onClickDelete={this.onDestDeleteClick.bind(this)}
                    onClickComplete={this.onDestCompleteClick.bind(this)}
                  />
                ))}
              </ul>
            </div>
          </aside>
          <div className="map-container">
            <GMap
              destinations={this.props.destinations}
              completedDest={this.props.trecipe.completed}
              onDestAdd={this.onDestAddClick.bind(this)}
              onDestRemove={this.onDestDeleteClick.bind(this)}
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
      deleteTrecipe,
      createNewTrecipe,
      getDestModelsByTrecipeId,
      addDestination,
      removeDestination,
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Map));
