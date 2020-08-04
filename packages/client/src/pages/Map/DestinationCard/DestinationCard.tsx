import React from 'react';
import { CardMenu } from '../../../components/CardMenu/CardMenu';
import { RatingBar } from '../../../components/Rating/RatingBar';
import './destinationCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash';
import Destination, { getIcon } from '../../../../../shared/models/destination';
import { baseURL } from '../../../api';
import destination from '../../../../../shared/models/destination';

export interface DCProps {
    index: number;
    destination: Destination;
    isReadOnly: boolean;
    isCompleted?: boolean;
    onClickDelete?: (destId: string, e: React.MouseEvent<HTMLElement>) => void;
    onClickComplete?: (destId: destination, e: React.MouseEvent<HTMLElement>) => void;
    isInEdit?: boolean;
}

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
                        <span id="dest-card-title">
                            {destModel.name}
                            {this.props.isCompleted && (
                                <FontAwesomeIcon className="dest-check-icon" icon="check" />
                            )}
                        </span>
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
                                {destModel.category}
                                <FontAwesomeIcon
                                    className="dest-category-icon"
                                    // NOTE: category field will never be empty as we assign the "Others" category by default
                                    icon={getIcon(destModel.category[0])}
                                />
                            </h6>
                            <h6 id="dest-location">{destModel.formattedAddress}</h6>
                        </span>
                        <RatingBar rating={destModel.rating} />
                    </div>
                    <div className="dest-description">
                        <p>{this.props.destination.formattedPhoneNumber}</p>
                        <p>{this.props.destination.website}</p>
                    </div>
                </div>
            </div>
        );
    }
}
