import React, { ReactNodeArray } from "react";
import Background from "../../pages/MyTrecipes/TrecipeCard/BetterDefaultImage.png";
import PhotoUploader from "../PhotoUploader/PhotoUploader";

export interface CoverphotoProps {
  trecipeCardID: number;
  imageSource: string;
  buttons?: ReactNodeArray;
}

export interface CoverphotoState {
  sourceImage: string;
  isOpen: boolean;
}

export class CoverPhoto extends React.Component<CoverphotoProps> {
  public static defaultProps: Partial<CoverphotoProps> = {
    trecipeCardID: 42,
    imageSource: "url(" + Background + ")",
    buttons: [],
  };

  public readonly state: Readonly<CoverphotoState> = {
    sourceImage: this.props.imageSource,
    isOpen: false,
  };

  fileUpdateCallback(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0].type.match(/image.*/)) {
      // Upload to server
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
        if (event.target) {
          this.setState({ sourceImage: "url(" + event.target.result + ")" });
        }
      });

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  toggle() {
    this.setState((state: CoverphotoState) => ({
      isOpen: !state.isOpen,
    }));
  }

  render() {
    return (
      <div className="coverPhotoWrapper">
        <div
          className="coverPhotoImage"
          style={{
            backgroundImage: `linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 35%), 
                     ${this.state.sourceImage}`,
          }}
          onClick={this.toggle.bind(this)}>
          {this.props.children}
        </div>
        <div className="coverPhotoBtnsWrapper">
          {this.props.buttons}
          <PhotoUploader
            changeFileCallback={this.fileUpdateCallback.bind(this)}
          />
        </div>
        {this.state.isOpen && (
          <dialog
            className="coverPhotoDialog"
            open
            onClick={this.toggle.bind(this)}>
            <div
              className="coverPhotoImageEnlarged"
              style={{ backgroundImage: this.state.sourceImage }}
            />
          </dialog>
        )}
      </div>
    );
  }
}
