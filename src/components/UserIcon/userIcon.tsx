import "./userIcon.scss";
import SampleAvatar from "./sample.png";
import React, { MouseEvent, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface userIconProps {
  imageSource: string;
  onClick(e: MouseEvent<HTMLElement>): void;
}

export class UserIcon extends React.Component<userIconProps, {}> {
  public static defaultProps: Partial<userIconProps> = {
    imageSource: SampleAvatar,
    onClick: () => {},
  };

  render() {
    return (
      <div>
        <img className="avatar" src={this.props.imageSource} />
      </div>
    );
  }
}
