import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./trecipeCard.scss";
import { CardMenu } from "../CardMenu/CardMenu";
import { MenuItem } from "../../../components/Menu/Menu";
import { bindActionCreators, Dispatch } from "redux";
import {
  createNewTrecipe,
  deleteTrecipe,
  loadTrecipes,
  updateTrecipe,
} from "../../../redux/TrecipeList/action";
import { connect } from "react-redux";
import {
  newTrecipeModel,
  TrecipeModel,
} from "../../../redux/TrecipeList/types";

/**
 * Trecipe Props
 * name: Trecipe Title
 * imageSrc: Backgroud Image source
 * author: Owner of the Trecipe
 * isPrivate: true if the Trecipe is a private one, false otherwise
 * totalDest: total number of destination in this Trecipe
 * completedDest: number of destination that has been checked off
 */
// export interface TCProps {
//   id: number;
//   name: string;
//   imageSrc: string | null;
//   date: string;
//   author: string;
//   description: string;
//   isPrivate: boolean;
//   totalDest: number;
//   completedDest: number;
// }

type TCProps = TrecipeModel & ReturnType<typeof mapDispatchToProps>;

export class TrecipeCard extends React.Component<TCProps> {
  private cardMenuItems: MenuItem[] = [
    { id: 1, text: "Edit", icon: "edit", onClick: () => {} },
    {
      id: 2,
      text: "Duplicate",
      icon: "copy",
      onClick: () => {
        this.duplicateTrecipe();
      },
    },
    {
      id: 3,
      text: "Delete",
      icon: "trash",
      onClick: () => {
        this.deleteTrecipe();
      },
    },
  ];

  private calcPercentage = (totalDest: number, completedDest: number) => {
    return totalDest === 0 ? 0 : (completedDest / totalDest) * 100;
  };

  private duplicateTrecipe = () => {
    this.props.createNewTrecipe(Object.assign(newTrecipeModel(), this.props));
  };

  private deleteTrecipe = () => {
    this.props.deleteTrecipe(this.props.id);
  };

  render() {
    return (
      <div className="trecipeCard">
        <div
          className="tcHeaderContainer"
          style={{
            backgroundImage: this.props.imageSrc ? this.props.imageSrc : "none",
          }}>
          <div className="tcHeader">
            <label className="tcTitle">
              {this.props.name}
              <FontAwesomeIcon
                icon={this.props.isPrivate ? "lock" : "unlock"}
                className="tcPrivacy"
              />
            </label>
            <div className="tcEdit">
              <CardMenu menuItems={this.cardMenuItems} />
            </div>
          </div>
        </div>
        <div className="tcBody">
          <div className="tcMetaData">
            <div className="tcDate">{this.props.date}</div>
            <div className="tcAuthor">by: {this.props.author}</div>
          </div>
          <div className="tcDescription">
            <p>{this.props.description}</p>
          </div>
        </div>
        <div className="tcProgressBar">
          <div
            className="tcFiller"
            style={{
              width:
                this.calcPercentage(
                  this.props.totalDest,
                  this.props.completedDest
                ) + "%",
            }}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      createNewTrecipe,
      deleteTrecipe,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(TrecipeCard);
