import React, {MouseEvent, Component} from "react";
import '../stylesheets/buttons.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export interface ButtonProps {
    text: string;
    icon: IconProp;
    onClick(e: MouseEvent<HTMLElement>): void;
}

export interface ButtonState {
    disabled: boolean;
}

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
                    {(this.props.icon !== undefined) &&
                    <span className="button-icon"><FontAwesomeIcon icon={this.props.icon} fixedWidth/></span>}
                </button>
            </div>
        );
    }

    public disable() {
        this.setState({disabled: true})
    }

    public enable() {
        this.setState({disabled: false})
    }
}