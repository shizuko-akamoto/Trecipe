import React from 'react';
import '../CoverPhoto/coverPhoto.scss';
import { Button } from '../Button/Button';

export interface PhotoUploaderProps {
    changeFileCallback(event: React.ChangeEvent<HTMLInputElement>): void;
}

class PhotoUploader extends React.Component<PhotoUploaderProps> {
    public static defaultProps: Partial<PhotoUploaderProps> = {
        changeFileCallback: () => {
            return;
        },
    };

    // If to be invoked from other component, use this ref's fileUploadAction.
    public readonly inputReference: React.RefObject<any>;

    constructor(props: any) {
        super(props);
        this.inputReference = React.createRef();
    }

    fileUploadAction() {
        this.inputReference.current.click();
    }

    render() {
        return (
            <div>
                <input
                    className="coverPhotoSelector"
                    type="file"
                    ref={this.inputReference}
                    accept="image/*"
                    onChange={this.props.changeFileCallback}
                />

                {/* Placeholder button */}
                <Button
                    text="Change Cover"
                    icon="camera-retro"
                    onClick={this.fileUploadAction.bind(this)}
                />
            </div>
        );
    }
}

export default PhotoUploader;
