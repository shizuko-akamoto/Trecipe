import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./trecipeCard.scss";
import { CardMenu } from "../CardMenu/CardMenu";
import { MenuItem } from "../../../components/Menu/Menu";
import { bindActionCreators, Dispatch } from "redux";
import {
  createNewTrecipe,
  deleteTrecipe,
} from "../../../redux/TrecipeList/action";
import { connect } from "react-redux";
import {
  newTrecipeModel,
  TrecipeModel,
} from "../../../redux/TrecipeList/types";
import { ProgressBar } from "../../../components/ProgressBar/ProgressBar";

type TCProps = TrecipeModel & ReturnType<typeof mapDispatchToProps>;

class TrecipeCard extends React.Component<TCProps> {
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
      icon: ["far", "trash-alt"],
      onClick: () => {
        this.deleteTrecipe();
      },
    },
  ];

  private duplicateTrecipe = () => {
    // copying everything except for id
    const { id, ...copy } = this.props;
    this.props.createNewTrecipe(Object.assign(newTrecipeModel(), copy));
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
                icon={this.props.isPrivate ? "lock" : "lock-open"}
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
        <ProgressBar
          total={this.props.totalDest}
          completed={this.props.completedDest}
          showText={false}
          barStyle={{ borderRadius: "0 0 8px 8px" }}
        />
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
