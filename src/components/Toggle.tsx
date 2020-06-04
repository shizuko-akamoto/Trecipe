import React, { Component } from "react";

import "../stylesheets/ToggleSwitch.scss"

export interface ToggleState {
    checked: boolean;
}

export class ToggleSwitch extends React.Component {
    // state = { checked: true };

    render() {
        return (
            <div className="toggle-switch">
                <input
                    type="checkbox"
                    className="toggle-switch-checkbox"
                // name={this.props.Name}
                // id={this.props.Name}
                />
                <label className="toggle-switch-label">
                    {/* <label className="toggle-switch-label" htmlFor={this.props.Name}> */}
                    <span className="toggle-switch-inner" />
                    <span className="toggle-switch-switch" />
                </label>
            </div>
        )
    }
}