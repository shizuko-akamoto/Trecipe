import React, { CSSProperties, RefObject } from "react";
import "./menu.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

/**
 * Menu Item
 * id: Used as keys when creating a list
 * text: Text on the menu item
 * icon: Icon on the menu item
 * onClick: Menu item onClick function handler
 * disabled: Whether to disable this menu item
 */
export type MenuItem = {
  id: number;
  text: string;
  icon: IconProp;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
};

/**
 * Menu Props
 * menuItems: Items in the menu
 * originElement: HTML element that toggle the menu
 * onClose: Menu onClose function handler
 * position?: Location of the menu ("left" or "right")
 * width?: Width of the menu (in rem)
 * buttonHeight?: Height of each button in the menu (in rem)
 */
export type MenuProps = {
  menuItems: MenuItem[];
  originElement: HTMLElement;
  onClose: () => void;
  position: "left" | "right";
  width: number;
  buttonHeight: number;
};

export class Menu extends React.Component<MenuProps, {}> {
  menuRef: RefObject<HTMLDivElement> = React.createRef();

  static defaultProps = {
    position: "left",
    width: 10,
    buttonHeight: 2.5,
  };

  /**
   * Calculate the position of the menu based on the HTML element that toggle it
   *    And move the menu if it ever goes off screen
   * position: Location of the menu ("left" or "right")
   * originElement: HTML element that toggle the menu
   */
  private getPosition = (position: string, originElement: HTMLElement) => {
    const menuStyle = {} as CSSProperties;

    // Get the browser default font size
    const fontSize = parseInt(
      getComputedStyle(document.documentElement).fontSize
    );

    // Calculate the menu size by converting rem to px
    const menuWidth = this.props.width * fontSize;
    const menuHeight =
      this.props.buttonHeight * this.props.menuItems.length * fontSize;

    // Get coordinate of the HTML element relative to the document
    const coords = originElement.getBoundingClientRect();

    // Return the menu position within the window
    function getBoundingPos(
      menuCoord: number,
      menuSize: number,
      windowSize: number
    ): number | string {
      return menuCoord + menuSize > windowSize ? 0 : "auto";
    }

    switch (position) {
      case "right": {
        menuStyle.right = getBoundingPos(
          coords.right,
          menuWidth,
          window.innerWidth
        );
        menuStyle.bottom = getBoundingPos(
          coords.top,
          menuHeight,
          window.innerHeight
        );
        break;
      }
      default: {
        menuStyle.right = "0";
        menuStyle.bottom = "auto";
        break;
      }
    }

    menuStyle.width = this.props.width + "rem";

    return menuStyle;
  };

  handleClickOutside = (event: MouseEvent): void => {
    if (
      this.menuRef.current &&
      event.target instanceof Node &&
      !this.menuRef.current.contains(event.target) &&
      !this.props.originElement.contains(event.target)
    ) {
      this.props.onClose();
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    const style = this.getPosition(
      this.props.position,
      this.props.originElement
    );
    return (
      <div className="menuContainer" ref={this.menuRef}>
        <div className="menu" style={style}>
          {
            <ul className="menu-list">
              {this.props.menuItems.map((item) => {
                return (
                  <li key={item.id}>
                    <button
                      className="menu-list-entry"
                      style={{ height: this.props.buttonHeight + "rem" }}
                      onClick={(event) => {
                        item.onClick(event);
                        this.props.onClose();
                      }}
                      disabled={item.disabled}>
                      <span className="button-icon">
                        <FontAwesomeIcon icon={item.icon} fixedWidth />
                      </span>
                      {item.text}
                    </button>
                  </li>
                );
              })}
            </ul>
          }
        </div>
      </div>
    );
  }
}
