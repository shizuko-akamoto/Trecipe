import React from 'react';
import './nearbyDestCard.scss';
import { Image } from '../../../components/Image/Image';
import { isEmpty } from 'lodash';
import Destination from '../../../../../shared/models/destination';
import { RatingBar } from '../../../components/Rating/RatingBar';

interface NearbyDestCardProps {
    index: number;
    destination: Destination;
}

export class NearbyDestCard extends React.Component<NearbyDestCardProps> {
    render() {
        return (
            <div className="nearby-dest-wrapper">
                <div className="nearby-dest-image">
                    <Image
                        src={
                            isEmpty(this.props.destination.photoRefs)
                                ? null
                                : // for nearby destinations, photoRefs store URLs that we can directly use to fetch
                                  // photos from client side
                                  this.props.destination.photoRefs[0]
                        }
                        imgStyle={{ borderRadius: '8px 0 0 8px' }}
                    />
                </div>
                <div className="nearby-dest-content">
                    <div className="nearby-dest-title">{this.props.destination.name}</div>
                    <div className="nearby-dest-rating">
                        <RatingBar rating={this.props.destination.rating} />
                    </div>
                </div>
                <span className="nearby-dest-index">{this.props.index}</span>
            </div>
        );
    }
}
