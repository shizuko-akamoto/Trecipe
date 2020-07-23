import React from 'react';
import './destInfoWindow.scss';
import { Image } from '../../../components/Image/Image';
import { RatingBar } from '../../../components/Rating/RatingBar';
import Destination from '../../../../../shared/models/destination';
import { isEmpty } from 'lodash';

interface InfoWindowProps {
    destination: Destination;
}

export class DestInfoWindow extends React.Component<InfoWindowProps> {
    render() {
        return (
            <div className="iw-wrapper">
                <div className="iw-image">
                    <Image
                        src={
                            isEmpty(this.props.destination.photoRefs)
                                ? ''
                                : this.props.destination.photoRefs[0]
                        }
                        imgStyle={{ borderRadius: '8px 0 0 8px' }}
                    />
                </div>
                <div className="iw-content">
                    <div className="iw-title">{this.props.destination.name}</div>
                    <div className="iw-rating">
                        <RatingBar rating={this.props.destination.rating} />
                    </div>
                </div>
            </div>
        );
    }
}
