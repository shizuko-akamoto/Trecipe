import React from 'react';
import "../stylesheets/filterbuttons.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";


export interface FilterSelectorProps{
    listItem: Array<{text: string, icon: IconProp}>;
}

export interface FilterSelectorState {
    listOpen: boolean,
    selected: string
}

export class FilterSelector extends React.Component<FilterSelectorProps, FilterSelectorState> {
    public readonly state: Readonly<FilterSelectorState> = {listOpen: false, selected: "All"};

    constructor(props: any){
        super(props);
        this.state = {
            listOpen: false,
            // should make into enum later
            selected: "Any"
        }
    }

    // called from parent component
    handleClickOutside(){
        this.setState({
            listOpen: false
        })
    }

    toggleList(){
        this.setState((prevState: FilterSelectorState) => ({
            listOpen: !prevState.listOpen
        }))
    }

    toggleSelected(event: any){
        this.setState({listOpen: false, selected: event.target.innerText});
    }

    render() {
        const listOpen = this.state.listOpen;
        return (
            <div className = "contextFilterSelectorWrapper">
                <div className = "contextFilterSelector" onClick={this.toggleList.bind(this)}>
                    {this.state.selected}
                    {listOpen?
                        <FontAwesomeIcon icon = "chevron-up" className="button-icon" fixedWidth/> :
                        <FontAwesomeIcon icon="chevron-down" className="button-icon" fixedWidth/>}
                </div>
                {listOpen &&  <ul className="contextFilterSelectorList">
                    {this.props.listItem.map(item => {
                        return (
                            <li><button className = "contextFilterSelectorEntry" onClick={this.toggleSelected.bind(this)}>
                                <span className="button-icon"><FontAwesomeIcon icon={item.icon} fixedWidth/></span>
                                {item.text}
                            </button></li>)})}
                </ul>}
            </div>
        );
    }
}
