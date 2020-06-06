import React from "react";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import './stylesheets/MyTrecipes.scss'
import {FilterButton} from "./components/FilterButton";
import {Button} from "./components/Button";
import {TrecipeCard} from "./components/TrecipeCard";
import {FilterSelector} from "./components/FilterSelector";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {AddPopup} from "./components/AddPopup";

interface MyTrecipesState {
    addPopupOpen: boolean;
}

export class MyTrecipes extends React.Component<{}, MyTrecipesState> {
    private static contextFilters: string[] = ["All Trecipes", "Completed", "In Progress", "To Do"];

    private renderAddPopup = () => {
        this.setState({addPopupOpen: true})
    };

    private closeAddPopup = (e: React.MouseEvent<HTMLElement>) => {
        this.setState({addPopupOpen: false})
    };

    private createTrecipe = (e: React.MouseEvent<HTMLElement>, name: string, description: string) => {
        this.closeAddPopup(e)
    };

    public readonly state: MyTrecipesState = {
        addPopupOpen: false
    };

    render() {
        return (<div>
                <Header/>
                <div className="content-wrapper">
                    <div className="content">
                    <h1 className="page-title">My Trecipes</h1>
                    <div className="buttons-wrapper">
                        <ul className="context-filters">
                            {MyTrecipes.contextFilters.map((filter) =>
                                <li className="filter-item" key={filter}>
                                    <FilterButton text={filter} icon="check" fontSize={1} onClick={() => {}}
                                                  defaultDisabled={false}/>
                                </li>
                            )}
                            <FilterSelector listItem={[{text: "Any", icon: "border-all" as IconProp},
                                {text: "Private", icon: "lock" as IconProp},
                                {text: "Public", icon: "unlock" as IconProp}]}/>
                        </ul>
                        <div className="new-trecipe-button">
                            <Button text="Create New" icon="plus-circle" onClick={this.renderAddPopup}/>
                        </div>
                    </div>
                    <div className="cards-wrapper">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                            <div className="card-item" key={index}><TrecipeCard/></div>
                        ))}
                    </div>
                    {this.state.addPopupOpen && <div className="modal">
                        <AddPopup onClose={this.closeAddPopup} onCreate={this.createTrecipe}/>
                    </div>}
                    {this.state.addPopupOpen && <div className="modal-overlay" onClick={this.closeAddPopup}/>}
                </div>
                <Footer/>
            </div>
            </div>
        )
    }
}