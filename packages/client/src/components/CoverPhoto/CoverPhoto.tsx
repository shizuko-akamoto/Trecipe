import React, { ReactNodeArray } from 'react';
import PhotoUploader from '../PhotoUploader/PhotoUploader';
import { baseURL } from '../../api';

export interface CoverPhotoProps {
    imageSource: string | null;
    buttons?: ReactNodeArray;
    onFileChange: (filename: string) => void;
}

export class CoverPhoto extends React.Component<CoverPhotoProps> {
    render() {
        return (
            <div className="coverPhotoWrapper">
                <div
                    className="coverPhotoImage"
                    style={{
                        backgroundImage: this.props.imageSource
                            ? `linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 35%), 
                     url(${baseURL}upload/${this.props.imageSource})`
                            : `none`,
                    }}>
                    {this.props.children}
                </div>
                <div className="coverPhotoBtnsWrapper">
                    {this.props.buttons}
                    <PhotoUploader changeFileCallback={this.props.onFileChange} />
                </div>
            </div>
        );
    }
}
