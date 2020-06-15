import React from "react";
import { Image } from "../../../components/Image/Image";
import "./DestinationCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rating, RatingBar } from "../../../components/Rating/RatingBar";

/**
 * Destination Category
 */
export enum DestinationCategory {
  Food = "Food",
  Shopping = "Shopping",
  Accommodation = "Accommodation",
  Attraction = "Attraction",
}

/**
 * DestinationModal
 * id: destination unique id
 * name: destination name
 * category: destination category
 * rating: destination rating
 * imgSrc: destination image
 */
export interface DestinationModel {
  id: number;
  name: string;
  category: DestinationCategory;
  address: string;
  rating: Rating;
  description: string;
  imgSrc: string;
}

/**
 * DCProps
 * index: where in Destination card list this one is located (needed for Drag & Drop functionality)
 * destModal: destination model to render
 * onClickDelete: callback handler for delete button
 */
export interface DCProps {
  index: number;
  destModel: DestinationModel;
  onClickDelete: (e: React.MouseEvent) => void;
}

/**
 * DCState
 * isCompleted: true if destination is checked off, false otherwise
 * isInEdit: true if currently in edit, false otherwise
 */
export interface DCState {
  isCompleted: boolean;
  isInEdit: boolean;
}

export class DestinationCard extends React.Component<DCProps, DCState> {
  state: Readonly<DCState> = {
    isCompleted: false,
    isInEdit: false,
  };

  private handleCompletedCheck() {
    this.setState((state) => ({
      isCompleted: !state.isCompleted,
    }));
  }

  render() {
    return (
      <div className="dest-card-wrapper">
        <div className="dest-img">
          <Image src={this.props.destModel.imgSrc} />
        </div>
        <div className="dest-info">
          <h6 className="dest-category">{this.props.destModel.category}</h6>
          <h6 className="dest-address">{this.props.destModel.address}</h6>
          <h3 className="dest-name">{this.props.destModel.name}</h3>
          <RatingBar rating={this.props.destModel.rating} />
          <p className="dest-description">{this.props.destModel.description}</p>
        </div>
        {!this.state.isInEdit && (
          <div className="completed-checkbox">
            <input
              type="checkbox"
              id={this.props.destModel.id + "-completed"}
              onChange={this.handleCompletedCheck.bind(this)}
            />
            <label
              htmlFor={this.props.destModel.id + "-completed"}
              className="check-mark">
              <FontAwesomeIcon icon="check" />
            </label>
          </div>
        )}
        {this.state.isInEdit && (
          <div className="edit-options-wrapper">
            <span className="edit-option" id="dest-reorder">
              <FontAwesomeIcon icon="bars" />
            </span>
            <button
              className="edit-option"
              id="dest-delete"
              onClick={this.props.onClickDelete}>
              <FontAwesomeIcon icon={["far", "trash-alt"]} />
            </button>
          </div>
        )}
      </div>
    );
  }
}
