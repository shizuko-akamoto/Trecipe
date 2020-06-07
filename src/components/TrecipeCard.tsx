import React from 'react';
import Background from "../images/DefaultImage.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../stylesheets/TrecipeCard.scss"

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


export class TrecipeCard extends React.Component<TCProps>{
    public static defaultProps: Partial<TCProps> = {
        name: 'trecipe title',
        imageSrc: "url(" + Background + ")",
        date: '2020-01-01', // maybe change it to Date
        author: "team2",
        description: "This is a description.",
        isPrivate: true,
        totalDest: 10,
        completedDest: 3
    }

    private percentage:number = this.props.completedDest/this.props.totalDest * 100;

    render() {
        return (
            <div className='TrecipeCard'>
                <div className="Image" style={{ backgroundImage: this.props.imageSrc}}>
                    <label> {this.props.name}</label>
                    {this.props.isPrivate ? <FontAwesomeIcon icon="lock" className='icon' /> : null}
                    <div className='icon ellipsis' ><FontAwesomeIcon icon={["fas", "ellipsis-h"]}/></div>
                </div>
                <div className="Text">
                    <div className='MetaData'>
                        <div className='date'>{this.props.date}</div>
                        <div className='author'>by: {this.props.author}</div>
                    </div>
                    <div className="Description">
                        <p>{this.props.description}</p>
                    </div>
                </div>
                <div className="ProgressBar">
                    <div className="Filler" style={{ width: (this.percentage + "%")}}></div>
                </div>
            </div>
        );
    }
}