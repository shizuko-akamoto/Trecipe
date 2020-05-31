import React, {MouseEvent} from 'react';
import "../stylesheets/filterbuttons.scss"
import {FilterSelectorEntry} from "./FilterSelectorEntry";
import {FilterButton} from "./FilterButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface FilterSelectorState {
    listOpen: boolean,
    selected: string
}

export class FilterSelector extends React.Component<{defaultText: string},FilterSelectorState> {
    constructor(props: any){
        super(props)
        this.state = {
            listOpen: false,
            // should make into enum later
            selected: "All"
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

    toggleSelected(key: string){
        console.log(key);
        this.setState({selected: key});
    }

    render() {
        const listOpen = this.state.listOpen;
        return (
            <div className = "contextFilterSelectorWrapper">
                <div className = "contextFilterSelector" onClick={this.toggleList.bind(this)}>
                    {this.state.selected}
                    {listOpen? <FontAwesomeIcon icon = "chevron-up" className="button-icon"/> : <FontAwesomeIcon icon="chevron-down" className="button-icon"/>}
                </div>
                {listOpen &&  <ul className="contextFilterSelectorList">
                    <li><FilterSelectorEntry icon = "border-all" text = "All" onClick={this.toggleSelected.bind(this)}/></li>
                    <li><FilterSelectorEntry icon = "unlock" text = "Public" onClick={this.toggleSelected.bind(this)}/></li>
                    <li><FilterSelectorEntry icon = "lock" text = "Private" onClick={this.toggleSelected.bind(this)}/></li>
                </ul>}
            </div>
        );
    }
}
