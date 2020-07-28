import React from 'react';
import { Button } from '../Button/Button';
import { Menu, MenuItem } from '../Menu/Menu';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 * CardMenuProps
 * menuItem: List of menu items (each with onClick callback) to display in menu
 */
export interface CardMenuProps {
    menuItems: MenuItem[];
    icon: IconProp;
    buttonSize: number;
    menuHeight: number;
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
    public static defaultProps: Partial<CardMenuProps> = {
        icon: 'ellipsis-h',
        buttonSize: 1.8,
        menuHeight: 2.5,
    };
    state: CardMenuState = { originElement: null };

    handleClose = () => {
        this.setState({
            originElement: null,
        });
    };

    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.currentTarget;
        this.setState((state) => ({
            originElement: state.originElement ? null : target,
        }));
    };

    render() {
        const { menuItems, icon, buttonSize, menuHeight } = this.props;
        return (
            <div className="card-menu">
                <Button onClick={this.handleClick} icon={icon} fontSize={buttonSize} text="" />
                {Boolean(this.state.originElement) && (
                    <Menu
                        menuItems={menuItems}
                        originElement={this.state.originElement as HTMLElement}
                        onClose={this.handleClose}
                        position="left"
                        width={10}
                        buttonHeight={menuHeight}
                    />
                )}
            </div>
        );
    }
}
