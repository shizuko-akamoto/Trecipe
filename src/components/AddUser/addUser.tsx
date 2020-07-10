import "./addUser.scss";
import React, { MouseEvent, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface userIconProps {
  onClick(e: MouseEvent<HTMLElement>): void;
}

export class AddUserIcon extends React.Component<userIconProps, {}> {
  public static defaultProps: Partial<userIconProps> = {
    onClick: () => {},
  };

  render() {
    return (
      <div className="addUser">
        <FontAwesomeIcon icon={["fas", "plus"]} fixedWidth />
      </div>
    );
  }
}
