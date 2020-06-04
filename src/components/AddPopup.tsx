import React, { MouseEvent, Component } from "react";


import "../stylesheets/AddPopup.scss"
import  { ToggleSwitch } from "./Toggle"
import { Button } from "./button";

export interface AddPopupState {
    content: string;
}

export class AddPopup extends React.Component<{}, AddPopupState> {

    public readonly state: Readonly<AddPopupState> = {content: ""};

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ content: e.target.value });
        console.log(this.state.content)
    }


    render() {
        return (
            <div className='AddPopup'>
                <h1 className="Title"> New Trecipe </h1>
                <h2> Trecipe Name *</h2>
                <input className="input" maxLength={50} placeholder="Enter Trecipe Name" value={this.state.content} onChange={this.handleChange}/>
                <h2> Description </h2>
                <textarea className="input" />
                <h2> Make Public</h2>
                <ToggleSwitch />
                <div className='btn'>
                    <Button text={"Create"} disabled={!this.state.content}/>
                    <Button text = {"Cancel"}/>
                </div>
            </div>
        )
    }
}

