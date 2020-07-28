import React, { ReactNodeArray } from 'react';
import PhotoUploader from '../PhotoUploader/PhotoUploader';
import { baseURL } from '../../api';

/**
 * CoverPhoto props
 * imageSource: if src is null, nothing will be displayed, otherwise will fetch image to display from given url
 * buttons (optional): any buttons we want to display on top right of cover photo
 * onFileChange (optional): when defined, file upload gets enabled
 */
export interface CoverPhotoProps {
    imageSource: string | null;
    buttons?: ReactNodeArray;
    onFileChange?: (filename: string) => void;
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
                     url(${this.props.imageSource})`
                            : `none`,
                    }}>
                    {this.props.children}
                </div>
                <div className="coverPhotoBtnsWrapper">
                    {this.props.buttons}
                    {this.props.onFileChange && (
                        <PhotoUploader changeFileCallback={this.props.onFileChange} />
                    )}
                </div>
            </div>
        );
    }
}
