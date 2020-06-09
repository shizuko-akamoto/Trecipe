import React from "react";
import "../stylesheets/filterButtons.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonProps, ButtonState } from "./Button";

export interface FilterButtonState extends ButtonState {
  selected: boolean;
}

export class FilterButton extends React.Component<
  ButtonProps,
  FilterButtonState
> {
  public readonly state: Readonly<FilterButtonState> = {
    disabled: false,
    selected: false,
  };

  private handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.setState((state: FilterButtonState) => ({
      selected: !state.selected,
    }));
    this.props.onClick(e);
  }

  render() {
    return (
      <button
        className={
          this.state.selected
            ? "contextFilterButtons active"
            : "contextFilterButtons"
        }
        onClick={(e) => this.handleClick(e)}
      >
        {this.props.text}
        <span
          className={
            this.state.selected ? "button-icon" : "button-icon icon-hidden"
          }
        >
          <FontAwesomeIcon icon={this.props.icon} fixedWidth />
        </span>
      </button>
    );
  }

  // callback used to change the state after parent finished processing onClick.
  public toggle() {
    this.setState((state: FilterButtonState) => ({
      selected: !state.selected,
    }));
  }
}
