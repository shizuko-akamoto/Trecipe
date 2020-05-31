import React, {MouseEvent} from 'react';
import "../stylesheets/filterbuttons.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export interface FilterButtonProps {
    text: string;
    icon: IconProp;
    onClick(e: MouseEvent<HTMLElement>): void;
}

export interface FilterButtonState {
    selected: boolean;
}

export class FilterButton extends React.Component<FilterButtonProps, FilterButtonState> {
    public static defaultProps: Partial<FilterButtonProps> = {
        text: 'Filter',
        icon: undefined,
        onClick: () => {}
    };

    public readonly state: Readonly<FilterButtonState> = {selected: false};

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
