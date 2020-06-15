import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Image.scss";

/**
 * ImageProps
 * src: src string of image to render
 */
export interface ImageProps {
  src: string | null;
}

export class Image extends React.Component<ImageProps> {
  render() {
    return (
      <div className="img-wrapper">
        {/*if src is set to null, renders an empty gray background with ?*/}
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
