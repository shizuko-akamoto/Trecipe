import React from 'react';
import '../CoverPhoto/coverPhoto.scss';
import { Button } from '../Button/Button';
import UploadService from '../../services/uploadService';
import { toast } from 'react-toastify';

export interface PhotoUploaderProps {
    changeFileCallback(filename: string): void;
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

    onFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0].type.match(/image.*/)) {
            UploadService.uploadFile(event.target.files[0])
                .then((filename) => {
                    // Toast upload success message
                    toast('Upload complete!', { type: toast.TYPE.INFO });
                    this.props.changeFileCallback(filename);
                })
                .catch((err) => {
                    // Toast failure message
                    toast(`Failed to upload image [${err.toString()}]`, { type: toast.TYPE.ERROR });
                });
        }
    }

    render() {
        return (
            <div>
                <input
                    className="coverPhotoSelector"
                    type="file"
                    ref={this.inputReference}
                    accept="image/*"
                    onChange={this.onFileSelected.bind(this)}
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
