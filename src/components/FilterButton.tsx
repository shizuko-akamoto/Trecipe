import React from 'react';
import "../stylesheets/filterbuttons.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ButtonProps, ButtonState} from "./button";

export interface FilterButtonState extends ButtonState {
    selected: boolean;
}

export class FilterButton extends React.Component<ButtonProps, FilterButtonState> {
    public readonly state: Readonly<FilterButtonState> = {disabled: false, selected: true};

    render() {
        return (
            <button className = {this.state.selected? "contextFilterButtons active" : "contextFilterButtons"} onClick={this.props.onClick}>
                {this.props.text}
                {this.state.selected &&
                <span className="button-icon"><FontAwesomeIcon icon={this.props.icon} fixedWidth/></span>}
            </button>
        );
    }

    // callback used to change the state after parent finished processing onClick.
    public toggle() {
        this.setState((state: FilterButtonState) => ({
            selected: !state.selected
        }))
    }
}
