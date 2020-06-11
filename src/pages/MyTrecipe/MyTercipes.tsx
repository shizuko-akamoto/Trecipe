import React from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import "./MyTrecipes.scss";
import { FilterButton } from "./Filter/FilterButton";
import { Button } from "../../components/Button/Button";
import TrecipeCard from "./TrecipeCard/TrecipeCard";
import { FilterSelector } from "./Filter/FilterSelector";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { AddPopup } from "./AddPopup/AddPopup";
import { connect } from "react-redux";
import { RootState } from "../../redux";
import {
  createNewTrecipe,
  deleteTrecipe,
  loadTrecipes,
  updateTrecipe,
} from "../../redux/TrecipeList/action";
import { newTrecipeModel, TrecipeModel } from "../../redux/TrecipeList/types";
import { bindActionCreators, Dispatch } from "redux";

type MyTrecipesProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

/**
 * addPopupOpen: true if create new modal dialog should open, false otherwise
 * trecipeCards: all TC with its props to display in page
 */
interface MyTrecipesState {
  addPopupOpen: boolean;
}

class MyTrecipes extends React.Component<MyTrecipesProps, MyTrecipesState> {
  private static contextFilters: string[] = [
    "All Trecipes",
    "Completed",
    "In Progress",
    "To Do",
  ];

  public readonly state: MyTrecipesState = {
    addPopupOpen: false,
  };

  componentDidMount(): void {
    this.props.loadTrecipes();
  }

  private renderAddPopup = () => {
    this.setState({ addPopupOpen: true });
  };

  private closeAddPopup = (e: React.MouseEvent<HTMLElement>) => {
    this.setState({ addPopupOpen: false });
  };

  private createTrecipe = (
    e: React.MouseEvent<HTMLElement>,
    tcProps: Partial<TrecipeModel>
  ) => {
    const newTrecipeModal: TrecipeModel = Object.assign(
      newTrecipeModel(),
      tcProps
    );
    this.props.createNewTrecipe(newTrecipeModal);
    this.closeAddPopup(e);
  };

  render() {
    return (
      <div>
        <Header />
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
                  <TrecipeCard {...trecipe} />
                </div>
              ))}
            </div>
            {this.state.addPopupOpen && (
              <div className="modal">
                <AddPopup
                  onClose={this.closeAddPopup}
                  onCreate={this.createTrecipe}
                />
              </div>
            )}
            {this.state.addPopupOpen && (
              <div className="modal-overlay" onClick={this.closeAddPopup} />
            )}
          </div>
          <Footer />
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
      createNewTrecipe,
      deleteTrecipe,
      updateTrecipe,
      loadTrecipes,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTrecipes);
