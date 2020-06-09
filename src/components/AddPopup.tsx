import React from "react";
import "../stylesheets/addPopup.scss";
import { ToggleSwitch } from "./Toggle";
import { Button } from "./Button";
import { TCProps } from "./TrecipeCard";

export interface AddPopupProps {
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
  onCreate: (
    e: React.MouseEvent<HTMLElement>,
    tcProps: Partial<TCProps>
  ) => void;
}

/**
 * Add Popup state
 * content: The content inside the Trecipe Name input box.
 */
export interface AddPopupState {
  name: string;
  description: string;
}

/**
 * An Add Popup component
 */
export class AddPopup extends React.Component<AddPopupProps, AddPopupState> {
  public readonly state: Readonly<AddPopupState> = {
    name: "",
    description: "",
  };
  // reference to create button (for disabling the button when name input is empty)
  private createButtonRef: React.RefObject<Button> = React.createRef();
  private currLength: number = 0;

  // reference to toggle switch (for getting its checked state)
  private toggleSwitchRef: React.RefObject<ToggleSwitch> = React.createRef();

  /**
   *  Enable and Disable the 'Create Button' according to the content in Trecipe Name Input Box.
   */
  handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let tempLength: number = value.length;
    if (
      (tempLength > 0 && this.currLength < 1) ||
      (tempLength < 1 && this.currLength > 0)
    ) {
      this.createButtonRef.current?.toggle();
    }
    this.currLength = value.length;
    this.setState({ name: value });
  };

  handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ description: e.target.value });
  };

  render() {
    return (
      <div className="addPopup">
        <div className="contents">
          <h1 className="title"> New Trecipe </h1>
          <label htmlFor="name">Trecipe Name *</label>
          <input
            id="name"
            className="input"
            maxLength={50}
            placeholder="Enter Trecipe name"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="input"
            placeholder="Enter a Description"
            value={this.state.description}
            onChange={this.handleDescChange}
          />
          <label>
            Make Public
            <ToggleSwitch ref={this.toggleSwitchRef} />
          </label>
          <div className="btn">
            <Button
              text={"Create"}
              ref={this.createButtonRef}
              defaultDisabled={true}
              onClick={(e) =>
                this.props.onCreate(e, {
                  name: this.state.name,
                  description: this.state.description,
                  isPrivate: this.toggleSwitchRef.current
                    ? !this.toggleSwitchRef.current.state.checked
                    : false,
                })
              }
            />
            <Button text={"Cancel"} onClick={(e) => this.props.onClose(e)} />
          </div>
        </div>
      </div>
    );
  }
}
