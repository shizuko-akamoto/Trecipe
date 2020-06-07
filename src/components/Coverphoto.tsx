import React from 'react';
import Background from "../images/BetterDefaultImage.png"
import PhotoUploader from "./PhotoUploader";

export interface CoverphotoProps{
    trecipeCardID: number;
    imageSource: string;
}

export interface CoverphotoState {
    sourceImage: string;
    isOpen: boolean;
}

export class Coverphoto extends React.Component<CoverphotoProps> {
    public static defaultProps: Partial<CoverphotoProps> = {
        trecipeCardID: 42,
        imageSource: "url(" + Background + ")"
    };

    public readonly state: Readonly<CoverphotoState> = {sourceImage: this.props.imageSource, isOpen: false};

    fileUpdateCallback(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0].type.match(/image.*/)) {
            // Upload to server
            const reader = new FileReader();

            reader.addEventListener('load', (event) => {
                if(event.target) {
                    this.setState({sourceImage: "url(" + event.target.result + ")"});
                }
            });

            reader.readAsDataURL(event.target.files[0]);
        }
    }

    toggle() {
        this.setState((state: CoverphotoState) => ({
            isOpen: !state.isOpen
        }))
    }

    render() {
        return (
            <div className ="coverPhotoWrapper">
                <div className ="coverPhotoImage" style={{ backgroundImage: this.state.sourceImage}} onClick={this.toggle.bind(this)}></div>
                <PhotoUploader changeFileCallback={this.fileUpdateCallback.bind(this)}/>
                {this.state.isOpen && (
                    <dialog
                        className="dialog"
                        style={{ position: "absolute" }}
                        open
                        onClick={this.toggle.bind(this)}
                    >
                        <div
                            className="coverPhotoImageEnlarged"
                            style={{ backgroundImage: this.state.sourceImage}}
                        />
                    </dialog>
                )}
            </div>
        );
    }
}