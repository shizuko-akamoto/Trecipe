import React from 'react';

export interface PhotoUploaderProps{
    onChangeFile(event: React.ChangeEvent<HTMLInputElement>): void;
}

class PhotoUploader extends React.Component<PhotoUploaderProps> {
    public static defaultProps: Partial<PhotoUploaderProps> = {
        onChangeFile: () => {}
    };

    // If to be invoked from other component, use this ref's fileUploadAction.
    public readonly inputReference: React.RefObject<any>;

    constructor(props: any) {
        super(props);
        this.state = {selectedPhoto: ""};
        this.inputReference = React.createRef();
    }

    fileUploadAction(){
        this.inputReference.current.click();
    }

    render() {
        return (
            <div>
                <input id="photoSelector"
                       type="file"
                       ref={this.inputReference}
                       style={{display: 'none'}}
                       onChange={this.props.onChangeFile}
                />

                {/* Placeholder button */}
                <button onClick={this.fileUploadAction}>
                    Upload!
                </button>
            </div>
        );
    }
}


export default PhotoUploader;