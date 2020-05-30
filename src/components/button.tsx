import React, {MouseEvent, Component} from "react";
import "../stylesheets/buttons.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {isUndefined} from "lodash";

/**
 * Button props
 * text: text to display on button
 * icon: font awesome icon name [optional]
 * onClick: onClick handler function
 */
export interface ButtonProps {
    text: string;
    icon: IconProp;
    onClick(e: MouseEvent<HTMLElement>): void;
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
        onClick: () => {}
    };
    public readonly state: Readonly<ButtonState> = {disabled: false};

    render() {
        return (
            <div>
                <button className="button" onClick={this.props.onClick} disabled={this.state.disabled}>
                    {this.props.text}
                    {isUndefined(this.props.icon) &&
                    <span className="button-icon"><FontAwesomeIcon icon={this.props.icon} fixedWidth/></span>}
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