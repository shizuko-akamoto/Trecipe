import React, { MouseEvent, Component } from "react";


import "../stylesheets/AddPopup.scss"
import  { ToggleSwitch } from "./Toggle"
import { Button } from "./button";

export interface AddPopupState {
    content: string;
}

export class AddPopup extends React.Component<{}, AddPopupState> {

    constructor(props:any){
        super(props);
        this.createButtonRef = React.createRef();
        this.currLength = 0;
    }

    public readonly state: Readonly<AddPopupState> = {content: ""};
    private createButtonRef: React.RefObject<Button>;
    private currLength: number;

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let tempLenth: number = value.length;
        if ((tempLenth > 0 && this.currLength < 1) || (tempLenth < 1 && this.currLength > 0)){
            this.createButtonRef.current?.toggle();
        }
        this.currLength = value.length;
        this.setState({ content: value });
    }


    render() {
        return (
            <div className='AddPopup'>
                <div className="contents">
                <h1 className="Title"> New Trecipe </h1>
                <label htmlFor="name">Trecipe Name *</label>
                <input className="input" maxLength={50} placeholder="Enter Trecipe Name" value={this.state.content} onChange={this.handleChange}/>
                <label htmlFor="description">Description</label>
                <textarea className="input" placeholder="Enter a Description"/>
                <label>Make Public
                        <ToggleSwitch/>
                </label>
                <div className='btn'>
                    <Button text={"Create"} ref={this.createButtonRef} disabled = {true}/>
                    <Button text = {"Cancel"}/>
                </div>
                </div>
            </div>
        )
    }
}

