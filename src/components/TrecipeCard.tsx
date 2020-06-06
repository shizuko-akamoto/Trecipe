import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import "../stylesheets/TrecipeCard.scss"
import { url } from 'inspector';

import Background from "../images/DefaultImage.png"


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
                    <FontAwesomeIcon icon={["fas", "ellipsis-h"]} className='icon ellipsis'/>
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