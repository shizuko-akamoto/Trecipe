import React from "react";
import "./destInfoWindow.scss";
import { DestinationModel } from "../../../redux/Destinations/types";
import { Image } from "../../../components/Image/Image";
import { RatingBar } from "../../../components/Rating/RatingBar";

interface infoWindowProps {
  destModel: DestinationModel;
}

export class DestInfoWindow extends React.Component<infoWindowProps> {
  render() {
    return (
      <div className="iw-wrapper">
        <div className="iw-image">
          <Image
            src={this.props.destModel.imgSrc}
            imgStyle={{ borderRadius: "8px 0 0 8px" }}
          />
        </div>
        <div className="iw-content">
          <div className="iw-title">{this.props.destModel.name}</div>
          <div className="iw-rating">
            <RatingBar rating={this.props.destModel.rating} />
          </div>
        </div>
      </div>
    );
  }
}
