import React from "react";

import "../stylesheets/ToggleSwitch.scss"


export interface ToggleState {
    checked: boolean;
}

export interface ToggleProps {
    defaultChecked: boolean;
}

export class ToggleSwitch extends React.Component<ToggleProps, ToggleState> {
    public static defaultProps: Partial<ToggleProps> = {
        defaultChecked: false
    };

    public readonly state: Readonly<ToggleState> = {
        checked: this.props.defaultChecked
    };

    toggle() {
        this.setState({ checked: !this.state.checked })
    }

    render() {
        const className = `toggle-component ${this.state.checked ? ' active' : ''}`
        return (
            <div
                className={className}
                onClick={() => this.toggle()}>
                <div className='toggle-button' />
            </div>
        )
    }
}
