import React from 'react';
import { CardMenu } from '../../../components/CardMenu/CardMenu';
import { RatingBar } from '../../../components/Rating/RatingBar';
import './destinationCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash';
import { getIcon } from '../../../../../shared/models/destination';
import { baseURL } from '../../../api';
import { DCProps } from '../../Trecipe/DestinationCard/DestinationCard';

export class DestinationCard extends React.Component<DCProps> {
    render() {
        const destModel = this.props.destination;
        return (
            <div className="dest-card-item-wrapper" id={destModel.uuid}>
                <div
                    className="dest-card-header-container"
                    style={{
                        backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.5) 100%)${
                            isEmpty(destModel.photoRefs)
                                ? ''
                                : `, url(${baseURL}photos/${destModel.photoRefs[0]})`
                        }`,
                    }}>
                    <div className="dest-card-header">
                        <span id="dest-card-title">{destModel.name}</span>
                        {this.props.isCompleted && (
                            <span id="dest-check-icon">
                                <FontAwesomeIcon icon="check" />
                            </span>
                        )}
                        <span className="dest-card-edit" onClick={(e) => e.preventDefault()}>
                            <CardMenu
                                menuItems={[
                                    {
                                        id: 1,
                                        text: 'Complete',
                                        icon: 'check',
                                        onClick: (e) => {
                                            if (this.props.onClickComplete) {
                                                this.props.onClickComplete(destModel, e);
                                            }
                                        },
                                        disabled: this.props.isCompleted,
                                    },
                                    {
                                        id: 2,
                                        text: 'Remove',
                                        icon: ['far', 'trash-alt'],
                                        onClick: (e) => {
                                            if (this.props.onClickDelete) {
                                                this.props.onClickDelete(
                                                    this.props.destination.uuid,
                                                    e
                                                );
                                            }
                                        },
                                    },
                                ]}
                            />
                        </span>
                    </div>
                </div>
                <div className="dest-card-body">
                    <div className="dest-metadata">
                        <span>
                            <h6 id="dest-category">
                                <FontAwesomeIcon
                                    className="dest-category-icon"
                                    // NOTE: category field will never be empty as we assign the "Others" category by default
                                    icon={getIcon(destModel.category[0])}
                                    fixedWidth
                                />
                                <span className="dest-category-text">{destModel.category}</span>
                            </h6>
                        </span>
                        <RatingBar rating={destModel.rating} />
                    </div>
                    <div className="dest-description">
                        {this.props.destination.formattedAddress && (
                            <span className="dest-info-item">
                                <FontAwesomeIcon icon="map-marker-alt" fixedWidth />
                                <p className="info-text">
                                    {this.props.destination.formattedAddress}
                                </p>
                            </span>
                        )}
                        {this.props.destination.formattedPhoneNumber && (
                            <span className="dest-info-item">
                                <FontAwesomeIcon icon="phone" fixedWidth />
                                <p className="info-text">
                                    {this.props.destination.formattedPhoneNumber}
                                </p>
                            </span>
                        )}
                        {this.props.destination.website && (
                            <span className="dest-info-item">
                                <FontAwesomeIcon icon={['far', 'window-maximize']} fixedWidth />
                                <a
                                    className="router-link info-text"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={this.props.destination.website}>
                                    Website
                                </a>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
