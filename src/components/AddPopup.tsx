import React from "react";
import "../stylesheets/addPopup.scss"
import  { ToggleSwitch } from "./Toggle"
import { Button } from "./Button";

export interface AddPopupProps {
    onClose: (e: React.MouseEvent<HTMLElement>) => void;
    onCreate: (e: React.MouseEvent<HTMLElement>, name: string, description: string) => void;
}

/**
 * Add Popup state
 * content: The content inside the Trecipe Name input box.
 */
export interface AddPopupState {
    content: string;
}

/**
 * An Add Popup component
 */
export class AddPopup extends React.Component<AddPopupProps, AddPopupState> {

    constructor(props: AddPopupProps){
        super(props);
        this.createButtonRef = React.createRef();
        this.currLength = 0;
    }

    public readonly state: Readonly<AddPopupState> = {content: ""};
    private createButtonRef: React.RefObject<Button>;
    private currLength: number;

    /**
    *  Enable and Disable the 'Create Button' according to the content in Trecipe Name Input Box.
    */
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let tempLength: number = value.length;
        if ((tempLength > 0 && this.currLength < 1) || (tempLength < 1 && this.currLength > 0)){
            this.createButtonRef.current?.toggle();
        }
        this.currLength = value.length;
        this.setState({ content: value });
    }

    render() {
        return (
            <div className='addPopup'>
                <div className="contents">
                <h1 className="title"> New Trecipe </h1>
                <label htmlFor="name">Trecipe Name *</label>
                    <input id="name" className="input" maxLength={50} placeholder="Enter Trecipe Name" value={this.state.content} onChange={this.handleChange}/>
                <label htmlFor="description">Description</label>
                    <textarea id="description" className="input" placeholder="Enter a Description"/>
                <label>Make Public
                        <ToggleSwitch/>
                </label>
                <div className='btn'>
                    <Button text={"Create"} ref={this.createButtonRef} defaultDisabled={true}
                            onClick={(e) => this.props.onCreate(e, this.state.content, "")}/>
                    <Button text = {"Cancel"} onClick={(e) => this.props.onClose(e)}/>
                </div>
                </div>
            </div>
        )
    }
}
