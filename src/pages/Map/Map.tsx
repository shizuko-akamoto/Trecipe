import React from "react";
import "./map.scss";
import { DestinationCard } from "./DestinationCard/DestinationCard";
import { CardMenu } from "../../components/CardMenu/CardMenu";
import { MenuItem } from "../../components/Menu/Menu";
import { RootState } from "../../redux";
import { newTrecipeModel, TrecipeModel } from "../../redux/TrecipeList/types";
import { isUndefined } from "lodash";
import { bindActionCreators, Dispatch } from "redux";
import { showModal } from "../../redux/Modal/action";
import { updateTrecipe } from "../../redux/TrecipeList/action";
import { getDestModelsByTrecipeId } from "../../redux/Destinations/action";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";

export type MapProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<{ trecipeId: string }>;

class Map extends React.Component<MapProps> {
  private trecipeEditMenuItems: MenuItem[] = [
    {
      id: 1,
      text: "Edit",
      icon: "edit",
      onClick: () => {},
    },
    {
      id: 2,
      text: "Duplicate",
      icon: "copy",
      onClick: () => {},
    },
    {
      id: 3,
      text: "Delete",
      icon: ["far", "trash-alt"],
      onClick: () => {},
    },
  ];

  componentDidMount(): void {
    // load destinations by trecipe id before rendering
    this.props.getDestModelsByTrecipeId(this.props.trecipe.id);
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
                    onClickDelete={() => {}}
                    onClickComplete={() => {}}
                  />
                ))}
              </ul>
            </div>
          </aside>
          <div className="map-container" />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Map));
