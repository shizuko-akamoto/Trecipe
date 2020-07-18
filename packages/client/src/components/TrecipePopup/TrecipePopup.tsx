import React from 'react';
import './trecipePopup.scss';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isUndefined } from 'lodash';
import { Button } from '../Button/Button';
import { ToggleSwitch } from '../Toggle/Toggle';
import { createTrecipeRequest } from '../../redux/TrecipeList/action';
import { hideModal } from '../../redux/Modal/action';
import Modal from '../Modal/Modal';
import { TrecipeException } from '../../exceptions/Exceptions';
import Trecipe from '../../../../shared/models/trecipe';
import CreateNewTrecipeDTO from '../../../../shared/models/createNewTrecipeDTO';
import { updateTrecipeRequest } from '../../redux/Trecipe/action';

/**
 * Trecipe Popup Type
 * Edit: edit trecipe information
 * Add: create new trecipe
 */
export enum TrecipePopupType {
    Edit = 'Edit',
    Add = 'Add',
}

export type TrecipePopupProps = ReturnType<typeof mapDispatchToProps> & TrecipePopupOwnProps;

/**
 * Trecipe Popup Own Props
 * type: popup type: Edit/Add
 * trecipeId: id required if edit
 */
export interface TrecipePopupOwnProps {
    type: TrecipePopupType;
    trecipe?: Trecipe;
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
class TrecipePopup extends React.Component<TrecipePopupProps, TrecipePopupState> {
    // reference to create button (for disabling the button when name input is empty)
    private createButtonRef: React.RefObject<Button> = React.createRef();
    private currLength: number;

    // reference to toggle switch (for getting its checked state)
    private toggleSwitchRef: React.RefObject<ToggleSwitch> = React.createRef();

    constructor(props: Readonly<TrecipePopupProps>) {
        super(props);
        if (this.props.trecipe) {
            this.state = {
                name: this.props.trecipe.name,
                description: this.props.trecipe.description,
            };
            this.currLength = this.state.name.length;
        } else {
            this.state = {
                name: '',
                description: '',
            };
            this.currLength = 0;
        }
    }

    /**
     *  Enable and Disable the 'Create Button' according to the content in Trecipe Name Input Box.
     */
    private handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const tempLength: number = value.length;
        if ((tempLength > 0 && this.currLength < 1) || (tempLength < 1 && this.currLength > 0)) {
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
        trecipeData: CreateNewTrecipeDTO
    ) => {
        if (this.props.type === TrecipePopupType.Add) {
            this.props.createNewTrecipe(trecipeData);
        } else if (!isUndefined(this.props.trecipe)) {
            this.props.updateTrecipe(this.props.trecipe.uuid, trecipeData);
        } else {
            // trecipe id not given for Edit type popup
            throw new TrecipeException(`trecipe id undefined for ${this.props.type}`);
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
                                ? 'New Trecipe'
                                : 'Edit Trecipe'}
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
                                defaultChecked={
                                    this.props.type === TrecipePopupType.Edit && this.props.trecipe
                                        ? !this.props.trecipe.isPrivate
                                        : false
                                }
                                ref={this.toggleSwitchRef}
                            />
                        </label>
                        <div className="btn">
                            <Button
                                text={
                                    this.props.type === TrecipePopupType.Add ? 'Create' : 'Update'
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
                            <Button text={'Cancel'} onClick={() => this.closeTrecipePopup()} />
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            createNewTrecipe: createTrecipeRequest,
            updateTrecipe: updateTrecipeRequest,
            hideModal,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(TrecipePopup);
