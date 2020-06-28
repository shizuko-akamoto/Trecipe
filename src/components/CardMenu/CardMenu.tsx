import React from "react";
import { Button } from "../Button/Button";
import { Menu, MenuItem } from "../Menu/Menu";

/**
 * CardMenuProps
 * menuItem: List of menu items (each with onClick callback) to display in menu
 */
export interface CardMenuProps {
  menuItems: MenuItem[];
}

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
      originElement: Boolean(state.originElement) ? null : target,
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
