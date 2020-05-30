import React from "react";
import '../stylesheets/common/buttons.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export interface ButtonProps {
    icon: IconProp;
    text: string;
}

export class Button extends React.Component<ButtonProps, {}> {
    static defaultProps = {
        icon: undefined,
        text: 'Button item'
    };

    render() {
        return (
            <div>
                <button className="button">
                    {this.props.text}
                    {(this.props.icon !== undefined) && <FontAwesomeIcon icon={this.props.icon}/>}
                </button>
            </div>
        );
    }
}