import React from 'react';
import Background from "../images/DefaultImage.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../stylesheets/trecipeCard.scss"
import {CardMenu} from "./CardMenu";

/**
 * Trecipe Props
 * name: Trecipe Title
 * imageSrc: Backgroud Image source
 * author: Owner of the Trecipe
 * isPrivate: true if the Trecipe is a private one, false otherwise
 * totalDest: total number of destination in this Trecipe
 * completedDest: number of destination that has been checked off
 */
export interface TCProps {
    name: string;
    imageSrc?: string;
    date: string;
    author: string;
    description: string;
    isPrivate: boolean;
    totalDest: number;
    completedDest: number;
}


export class TrecipeCard extends React.Component<TCProps> {
    public static defaultProps: Partial<TCProps> = {
        name: 'trecipe title',
        imageSrc: "url(" + Background + ")",
        date: '2020-01-01', // maybe change it to Date
        author: "team2",
        description: "This is a description.",
        isPrivate: true,
        totalDest: 0,
        completedDest: 0
    }

    private calcPercentage = (totalDest: number, completedDest: number) => {
        return (totalDest === 0) ? 0 : completedDest / totalDest * 100;
    }

    render() {
        return (
            <div className='trecipeCard'>
                <div className="tcHeaderContainer" style={{backgroundImage: this.props.imageSrc}}>
                    <div className="tcHeader">
                        <label className="tcTitle">
                            {this.props.name}
                            <FontAwesomeIcon icon={(this.props.isPrivate) ? "lock" : "unlock"} className='tcPrivacy'/>
                        </label>
                        <div className="tcEdit"><CardMenu/></div>
                    </div>
                </div>
                <div className="tcBody">
                    <div className='tcMetaData'>
                        <div className='tcDate'>{this.props.date}</div>
                        <div className='tcAuthor'>by: {this.props.author}</div>
                    </div>
                    <div className="tcDescription"><p>{this.props.description}</p></div>
                </div>
                <div className="tcProgressBar">
                    <div className="tcFiller" style={
                        {width: this.calcPercentage(this.props.totalDest, this.props.completedDest) + "%"}}/>
                </div>
            </div>
        );
    }
}