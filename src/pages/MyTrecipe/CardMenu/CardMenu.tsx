import React from "react";
import { Button } from "../../../components/Button/Button";
import { Menu, MenuItem } from "../../../components/Menu/Menu";

/**
 * TODO
 * update the onClick function to do something
 */
export interface CardMenuProps {
  menuItems: MenuItem[]
}

/**
 *  { id: 1, text: "Edit", icon: "edit", onClick: () => {} },
 { id: 2, text: "Duplicate", icon: "copy", onClick: () => {} },
 { id: 3, text: "Delete", icon: "trash", onClick: () => {} },
 */

/**
 * Card Menu State
 * originElement: HTML element that toggle the menu
 *     Used to calculate the positiion of the menu
 */
export interface CardMenuState {
  originElement: null | HTMLElement;
}

export class CardMenu extends React.Component<CardMenuProps, CardMenuState> {
  state: CardMenuState = { originElement: null };

  handleClose = () => {
    this.setState({
      originElement: null,
    });
  };

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    this.setState((state) => ({
      originElement: Boolean(state.originElement)
        ? null
        : target,
    }));
  };

  render() {
    return (
      <div className="cardMenu">
        <Button
          onClick={this.handleClick}
          icon="ellipsis-h"
          fontSize={1.8}
          text=""
        />
        {Boolean(this.state.originElement) && (
          <Menu
            menuItems={this.props.menuItems}
            originElement={this.state.originElement as HTMLElement}
            onClose={this.handleClose}
            position="right"
            width={10}
            buttonHeight={2.5}
          />
        )}
      </div>
    );
  }
}
