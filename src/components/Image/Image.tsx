import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Image.scss";
export interface ImageProps {
  src: string | null;
}

export class Image extends React.Component<ImageProps> {
  render() {
    return (
      <div className="img-wrapper">
        {this.props.src !== null ? (
          <img src={this.props.src} alt="displayedImage" />
        ) : (
          <div className="empty-img">
            <FontAwesomeIcon id="empty-img-icon" icon="question" />
          </div>
        )}
      </div>
    );
  }
}
