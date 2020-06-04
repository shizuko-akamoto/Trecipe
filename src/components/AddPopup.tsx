import React, { MouseEvent, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { isUndefined } from "lodash";

import "../stylesheets/AddPopup.scss"
import  { ToggleSwitch } from "./Toggle"
import { Button } from "./button";

export interface AddPopupState {
    disabled: boolean;
}

export class AddPopup extends React.Component {
    render() {
        return (
            <div className='AddPopup'>
                <h1 className="Title"> New Trecipe </h1>
                <h2> Trecipe Name *</h2>
                <input className="input" maxLength={50} placeholder="Enter Trecipe Name" />
                <h2> Description </h2>
                <textarea className="input" />
                <h2> Make Public</h2>
                <ToggleSwitch />
                <div className='btn'>
                    <Button text = {"Create"}/>
                    <Button text = {"Cancel"}/>
                </div>
            </div>
        )
    }
}

