import React from "react";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import './stylesheets/MyTrecipes.scss'
import {FilterButton} from "./components/FilterButton";
import {Button} from "./components/Button";
import {TrecipeCard} from "./components/TrecipeCard";
import {FilterSelector} from "./components/FilterSelector";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface MyTrecipesState {
    addPopupOpen: boolean;
}

export class MyTrecipes extends React.Component<{}, MyTrecipesState>{
    private static contextFilters: string[] = ["All Trecipes", "Completed", "In Progress", "To Do"];

    private renderAddPopup = () => {
        this.setState({addPopupOpen: true})
    };

    render() {
        return (<div>
                <Header/>
                <div className="body-wrapper">
                    <body className="body">
                    <h1 className="page-title">Trecipes</h1>
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
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                            <div className="card-item"><TrecipeCard/></div>
                        ))}
                    </div>
                    </body>
                </div>
                <Footer/>
            </div>
        )
    }
}