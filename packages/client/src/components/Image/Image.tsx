import React, { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Image.scss';

/**
 * ImageProps
 * src: src string of image to render
 * imgStyle: optional style to be applied on this image on top of default look
 */
export interface ImageProps {
    src: string | null;
    imgStyle?: CSSProperties;
}

export class Image extends React.Component<ImageProps> {
    render() {
        const imgStyle = this.props.imgStyle ? this.props.imgStyle : {};
        return (
            <div className="img-wrapper">
                {/*if src is set to null, renders an empty gray background with ?*/}
                {this.props.src !== null ? (
                    <img src={this.props.src} style={imgStyle} alt="displayedImage" />
                ) : (
                    <div className="empty-img" style={imgStyle}>
                        <FontAwesomeIcon id="empty-img-icon" icon="question" />
                    </div>
                )}
            </div>
        );
    }
}
