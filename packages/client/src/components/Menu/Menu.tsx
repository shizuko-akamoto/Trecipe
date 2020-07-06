import React, { CSSProperties, RefObject } from 'react';
import './menu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 * Menu Item
 * id: Used as keys when creating a list
 * text: Text on the menu item
 * icon: Icon on the menu item
 * onClick: Menu item onClick function handler
 */
export type MenuItem = {
    id: number;
    text: string;
    icon: IconProp;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

/**
 * Menu Props
 * menuItems: Items in the menu
 * originElement: HTML element that toggle the menu
 * onClose: Menu onClose function handler
 * position?: Location of the menu ("right" or "bottom")
 * width?: Width of the menu (in rem)
 * buttonHeight?: Height of each button in the menu (in rem)
 */
export type MenuProps = typeof Menu.defaultProps & {
    menuItems: MenuItem[];
    originElement: HTMLElement;
    onClose: () => void;
};

export class Menu extends React.Component<MenuProps, {}> {
    menuRef: RefObject<HTMLDivElement> = React.createRef();

    static defaultProps = {
        position: 'right',
        width: 10,
        buttonHeight: 2.5,
    };

    /**
     * Calculate the position of the menu based on the HTML element that toggle it
     *    And move the menu if it ever goes off screen
     * position: Location of the menu ("right" or "bottom")
     * originElement: HTML element that toggle the menu
     */
    private getPosition = (position: string, originElement: HTMLElement) => {
        const menuStyle = {} as CSSProperties;

        // Get the browser default font size
        const fontSize = parseInt(getComputedStyle(document.documentElement).fontSize);

        /**
         * Calculate the menu size by converting rem to px
         * Both +1 so that it does not stick to the edge
         * Height also included the padding of the menu
         * */

        const menuWidth = (this.props.width + 1) * fontSize;
        const menuHeight = (this.props.buttonHeight * this.props.menuItems.length + 2) * fontSize;

        // Get coordinate of the HTML element relative to the document
        const coords = originElement.getBoundingClientRect();

        // Return the menu position within the window
        function getBoundingPos(
            menuCoord: number,
            menuSize: number,
            windowSize: number,
            windowOffset: number
        ): number {
            if (menuCoord + menuSize > windowSize) {
                return windowSize - menuSize + windowOffset;
            } else {
                return menuCoord + windowOffset;
            }
        }

        switch (position) {
            case 'right': {
                menuStyle.left = getBoundingPos(
                    coords.right,
                    menuWidth,
                    window.innerWidth,
                    window.pageXOffset
                );
                menuStyle.top = getBoundingPos(
                    coords.top,
                    menuHeight,
                    window.innerHeight,
                    window.pageYOffset
                );
                break;
            }
            case 'bottom': {
                menuStyle.left = getBoundingPos(
                    coords.left,
                    menuWidth,
                    window.innerWidth,
                    window.pageXOffset
                );
                menuStyle.top = getBoundingPos(
                    coords.bottom,
                    menuHeight,
                    window.innerHeight,
                    window.pageYOffset
                );
                break;
            }
            default: {
                menuStyle.left = getBoundingPos(
                    coords.right,
                    menuWidth,
                    window.innerWidth,
                    window.pageXOffset
                );
                menuStyle.top = getBoundingPos(
                    coords.top,
                    menuHeight,
                    window.innerHeight,
                    window.pageYOffset
                );
                break;
            }
        }

        // Function to convert px into rem string for css properties
        function convertPxToRem(px: number): string {
            return (px / fontSize).toString() + 'rem';
        }

        menuStyle.left = convertPxToRem(menuStyle.left as number);
        menuStyle.top = convertPxToRem(menuStyle.top as number);
        menuStyle.width = this.props.width + 'rem';
        menuStyle.position = 'absolute';

        return menuStyle;
    };

    handleClickOutside = (event: MouseEvent): void => {
        if (
            this.menuRef.current &&
            event.target instanceof Node &&
            !this.menuRef.current.contains(event.target)
        ) {
            this.props.onClose();
        }
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    render() {
        const style = this.getPosition(this.props.position, this.props.originElement);
        return (
            <div className="menu" ref={this.menuRef} style={style}>
                {
                    <ul className="menu-list">
                        {this.props.menuItems.map((item) => {
                            return (
                                <li key={item.id}>
                                    <button
                                        className="menu-list-entry"
                                        style={{ height: this.props.buttonHeight + 'rem' }}
                                        onClick={(event) => {
                                            item.onClick(event);
                                            this.props.onClose();
                                        }}>
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
        );
    }
}
