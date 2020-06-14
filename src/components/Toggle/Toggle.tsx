import React from "react";
import "./toggleSwitch.scss";

/**
 * Toggle Switch State
 * checked: true if on, false otherwise
 */
export interface ToggleState {
  checked: boolean;
}

/**
 * Toggle Switch Props
 * defaultChecked: default state at init.
 */
export interface ToggleProps {
  defaultChecked: boolean;
}

/**
 * A Toggle Switch component configured with ToggleProps
 */
export class ToggleSwitch extends React.Component<ToggleProps, ToggleState> {
  public static defaultProps: Partial<ToggleProps> = {
    defaultChecked: false,
  };

  public readonly state: Readonly<ToggleState> = {
    checked: this.props.defaultChecked,
  };

  /**
   * Toggle on and off the switch.
   */
  toggle() {
    this.setState((state) => ({
      checked: !state.checked,
    }));
  }

  render() {
    const className = `toggle-component ${this.state.checked ? " active" : ""}`;
    return (
      <div className={className} onClick={() => this.toggle()}>
        <div className="toggle-button" />
      </div>
    );
  }
}
