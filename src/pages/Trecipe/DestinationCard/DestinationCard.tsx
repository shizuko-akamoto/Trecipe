import React from "react";
import { Image } from "../../../components/Image/Image";
import "./DestinationCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RatingBar } from "../../../components/Rating/RatingBar";
import { Draggable } from "react-beautiful-dnd";
import { DestinationModel, getIcon } from "../../../redux/TrecipeList/types";

/**
 * DCProps
 * index: where in Destination card list this one is located (needed for Drag & Drop functionality)
 * destModal: destination model to render
 * onClickDelete: callback handler for delete button
 * isInEdit: true if currently in edit, false otherwise
 */
export interface DCProps {
  index: number;
  destModel: DestinationModel;
  isCompleted: boolean;
  onClickDelete: (destId: number) => void;
  onClickComplete: (destId: number, isCompleted: boolean) => void;
  isInEdit: boolean;
}

export class DestinationCard extends React.Component<DCProps> {
  render() {
    return (
      <Draggable
        draggableId={String(this.props.destModel.id)}
        index={this.props.index}
        isDragDisabled={!this.props.isInEdit}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <div className="dest-card-wrapper">
              <div className="dest-img">
                <Image
                  src={this.props.destModel.imgSrc}
                  imgStyle={{ borderRadius: "8px 0 0 8px" }}
                />
              </div>
              <div className="dest-info">
                <h6 className="dest-category">
                  {this.props.destModel.category}
                  <FontAwesomeIcon
                    className="dest-category-icon"
                    icon={getIcon(this.props.destModel.category)}
                  />
                </h6>
                <h6 className="dest-address">{this.props.destModel.address}</h6>
                <h3 className="dest-name">{this.props.destModel.name}</h3>
                <RatingBar rating={this.props.destModel.rating} />
                <p className="dest-description">
                  {this.props.destModel.description}
                </p>
              </div>
              {!this.props.isInEdit && (
                <div className="completed-checkbox">
                  <input
                    type="checkbox"
                    id={this.props.destModel.id + "-completed"}
                    onChange={() =>
                      this.props.onClickComplete(
                        this.props.destModel.id,
                        !this.props.isCompleted
                      )
                    }
                    checked={this.props.isCompleted}
                  />
                  <label
                    htmlFor={this.props.destModel.id + "-completed"}
                    className="check-mark">
                    <FontAwesomeIcon icon="check" />
                  </label>
                </div>
              )}
              <div
                className={`edit-options-wrapper ${
                  this.props.isInEdit ? "in-edit" : ""
                }`}>
                <span
                  {...provided.dragHandleProps}
                  className="edit-option"
                  id="dest-reorder">
                  <FontAwesomeIcon icon="bars" />
                </span>
                <button
                  className="edit-option"
                  id="dest-delete"
                  onClick={() =>
                    this.props.onClickDelete(this.props.destModel.id)
                  }>
                  <FontAwesomeIcon icon={["far", "trash-alt"]} />
                </button>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}
