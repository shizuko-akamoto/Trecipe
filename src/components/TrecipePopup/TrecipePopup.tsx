import React from "react";
import "./trecipePopup.scss";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { isUndefined } from "lodash";
import { Button } from "../Button/Button";
import { ToggleSwitch } from "../Toggle/Toggle";
import { newTrecipeModel, TrecipeModel } from "../../redux/TrecipeList/types";
import { RootState } from "../../redux";
import {
  createNewTrecipe,
  updateTrecipe,
} from "../../redux/TrecipeList/action";
import { hideModal } from "../../redux/Modal/action";
import Modal from "../Modal/Modal";

export enum TrecipePopupType {
  Edit,
  Add,
}

export type TrecipePopupProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  TrecipePopupOwnProps;

export interface TrecipePopupOwnProps {
  type: TrecipePopupType;
  trecipeId?: number;
}

/**
 * Trecipe Popup state
 * content: The content inside the Trecipe Name input box.
 */
export interface TrecipePopupState {
  name: string;
  description: string;
}

/**
 * An TrecipePopup component
 */
class TrecipePopup extends React.Component<
  TrecipePopupProps,
  TrecipePopupState
> {
  // reference to create button (for disabling the button when name input is empty)
  private createButtonRef: React.RefObject<Button> = React.createRef();
  private currLength: number;

  // reference to toggle switch (for getting its checked state)
  private toggleSwitchRef: React.RefObject<ToggleSwitch> = React.createRef();

  constructor(props: Readonly<TrecipePopupProps>) {
    super(props);
    this.state = {
      name: this.props.name,
      description: this.props.description,
    };
    this.currLength = this.state.name.length;
  }

  /**
   *  Enable and Disable the 'Create Button' according to the content in Trecipe Name Input Box.
   */
  private handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  private handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ description: e.target.value });
  };

  private handleTrecipeAction = (
    e: React.MouseEvent<HTMLElement>,
    model: Partial<TrecipeModel>
  ) => {
    if (this.props.type === TrecipePopupType.Add) {
      const newTrecipeModal: TrecipeModel = Object.assign(
        newTrecipeModel(),
        model
      );
      this.props.createNewTrecipe(newTrecipeModal);
    } else if (!isUndefined(this.props.trecipeId)) {
      this.props.updateTrecipe(this.props.trecipeId, model);
    } else {
      // TODO: Handle exception for when trecipeId is not given
    }
    this.closeTrecipePopup();
  };

  private closeTrecipePopup = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <Modal>
        <div className="trecipePopup">
          <div className="contents">
            <h1 className="title">
              {this.props.type === TrecipePopupType.Add
                ? "New Trecipe"
                : "Edit Trecipe"}
            </h1>
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
              <ToggleSwitch
                defaultChecked={!this.props.isPrivate}
                ref={this.toggleSwitchRef}
              />
            </label>
            <div className="btn">
              <Button
                text={
                  this.props.type === TrecipePopupType.Add ? "Create" : "Update"
                }
                ref={this.createButtonRef}
                defaultDisabled={this.currLength === 0}
                onClick={(e) =>
                  this.handleTrecipeAction(e, {
                    name: this.state.name,
                    description: this.state.description,
                    isPrivate: this.toggleSwitchRef.current
                      ? !this.toggleSwitchRef.current.state.checked
                      : false,
                  })
                }
              />
              <Button
                text={"Cancel"}
                onClick={() => this.closeTrecipePopup()}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps(state: RootState, ownProps: TrecipePopupOwnProps) {
  let trecipeWithId = undefined;
  if (ownProps.type === TrecipePopupType.Edit && ownProps.trecipeId) {
    trecipeWithId = state.trecipeList.trecipes.find(
      (trecipe: TrecipeModel) => trecipe.id === ownProps.trecipeId
    );
  }
  const { name, description, isPrivate } = isUndefined(trecipeWithId)
    ? { name: "", description: "", isPrivate: true }
    : trecipeWithId;
  return {
    name: name,
    description: description,
    isPrivate: isPrivate,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      createNewTrecipe,
      updateTrecipe,
      hideModal,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TrecipePopup);
