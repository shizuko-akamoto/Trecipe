import React from "react";
import "./MyTrecipes.scss";
import { FilterButton } from "./Filter/FilterButton";
import { Button } from "../../components/Button/Button";
import TrecipeCard from "./TrecipeCard/TrecipeCard";
import { FilterSelector } from "./Filter/FilterSelector";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import AddPopup from "./AddPopup/AddPopup";
import { connect } from "react-redux";
import { RootState } from "../../redux";
import { reloadTrecipes } from "../../redux/TrecipeList/action";
import { TrecipeModel } from "../../redux/TrecipeList/types";
import { bindActionCreators, Dispatch } from "redux";
import { showModal } from "../../redux/Modal/action";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { getDestModelsByTrecipeId } from "../../redux/Destinations/action";

type MyTrecipesProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

class MyTrecipes extends React.Component<MyTrecipesProps, {}> {
  private static contextFilters: string[] = [
    "All Trecipes",
    "Completed",
    "In Progress",
    "To Do",
  ];

  componentDidMount(): void {
    // TODO: Commenting this out while backend is getting set up as this wipes out frontend redux data
    //this.props.reloadTrecipes();
  }

  private renderAddPopup = () => {
    this.props.showModal(<AddPopup />);
  };

  render() {
    return (
      <div className="content-wrapper">
        <div className="content">
          <h1 className="page-title">My Trecipes</h1>
          <div className="buttons-wrapper">
            <ul className="context-filters">
              {MyTrecipes.contextFilters.map((filter) => (
                <li className="filter-item" key={filter}>
                  <FilterButton
                    text={filter}
                    icon="check"
                    fontSize={1}
                    onClick={() => {}}
                    defaultDisabled={false}
                  />
                </li>
              ))}
              <FilterSelector
                listItem={[
                  { text: "Any", icon: "border-all" as IconProp },
                  { text: "Private", icon: "lock" as IconProp },
                  { text: "Public", icon: "unlock" as IconProp },
                ]}
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
            {this.props.trecipes.map((trecipe: TrecipeModel) => (
              <div className="card-item" key={trecipe.id}>
                <Link className="router-link" to={trecipe.id}>
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
      reloadTrecipes,
      showModal,
      loadDestsByTrecipeId: getDestModelsByTrecipeId,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyTrecipes)
);
