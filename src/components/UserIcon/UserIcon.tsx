import "./userIcon.scss";
import SampleAvatar from "./sample.png";
import React, { MouseEvent } from "react";

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
        <img className="avatar" src={this.props.imageSource} alt="userIcon" />
      </div>
    );
  }
}
