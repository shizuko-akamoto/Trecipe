import React, {MouseEvent} from 'react';
import "../stylesheets/filterbuttons.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FilterButtonProps} from "./FilterButton";
import {IconProp} from "@fortawesome/fontawesome-svg-core";


export interface FilterSelectorEntryProps {
    text: string,
    icon: IconProp,
    onClick: (text: string) => void
}


export class FilterSelectorEntry extends React.Component<FilterSelectorEntryProps> {
    public static defaultProps: Partial<FilterButtonProps> = {
        text: 'Filter',
        icon: undefined,
        onClick: () => {}
    };

    handleClick(){
        console.log(this.props);
        this.props.onClick(this.props.text);
    }

    render() {
        return (
            <button className = "contextFilterSelectorEntry" onClick={this.handleClick.bind(this)}>
                <span className="button-icon"><FontAwesomeIcon icon={this.props.icon} fixedWidth/></span>
                {this.props.text}
            </button>
        );
    }
}
