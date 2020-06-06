import React, {MouseEvent, Component} from "react";
import "../stylesheets/buttons.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {isUndefined} from "lodash";

/**
 * Button props
 * text: text to display on button
 * icon: font awesome icon name [optional]
 * fontSize: button text font size in rem [optional]
 * onClick: onClick handler function
 */
export interface ButtonProps {
    text: string;
    icon: IconProp;
    fontSize: number;
    onClick(e: MouseEvent<HTMLElement>): void;
    defaultDisabled: boolean;
}

/**
 * Button state
 * disabled: true if button is diabled, false otherwise.
 */
export interface ButtonState {
    disabled: boolean;
}

/**
 * A Button component configured with ButtonProps
 */
export class Button extends Component<ButtonProps, ButtonState> {
    public static defaultProps: Partial<ButtonProps> = {
        text: 'Button item',
        icon: undefined,
        fontSize: 0.875,
        onClick: () => {},
        defaultDisabled: false
    };
    public readonly state: Readonly<ButtonState> = {disabled: this.props.defaultDisabled};

    render() {
        return (
            <div>
                <button className={(this.props.text === '' && !isUndefined(this.props.icon))?
                        "iconButton" : "button"} 
                        onClick={this.props.onClick} disabled={this.state.disabled}
                        style={{fontSize: `${this.props.fontSize}rem`}}>
                    {this.props.text}
                    {!isUndefined(this.props.icon) &&
                    <span className={this.props.text === '' ? "icon" : "button-icon"}>
                        <FontAwesomeIcon icon={this.props.icon} fixedWidth/></span>}
                </button>
            </div>
        );
    }

    /**
     * Toggle on and off button
     */
    public toggle() {
        this.setState((state: ButtonState) => ({
            disabled: !state.disabled
        }))
    }
}