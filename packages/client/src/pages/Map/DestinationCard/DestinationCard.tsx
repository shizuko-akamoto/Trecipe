import React from 'react';
import { CardMenu } from '../../../components/CardMenu/CardMenu';
import { RatingBar } from '../../../components/Rating/RatingBar';
import { DCProps } from '../../Trecipe/DestinationCard/DestinationCard';
import './destinationCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash';
import { getIcon } from '../../../../../shared/models/destination';

export class DestinationCard extends React.Component<DCProps> {
    render() {
        const destModel = this.props.destination;
        return (
            <div className="dest-card-item-wrapper" id={destModel.uuid}>
                <div
                    className="dest-card-header-container"
                    style={{
                        backgroundImage: isEmpty(destModel.photoRefs)
                            ? 'none'
                            : `linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.5) 100%),
      url(${destModel.photoRefs[0]})`,
                    }}>
                    <div className="dest-card-header">
                        <span id="dest-card-title">
                            {destModel.name}
                            {this.props.isCompleted && (
                                <FontAwesomeIcon className="dest-check-icon" icon="check" />
                            )}
                        </span>
                        <span className="dest-card-edit">
                            <CardMenu
                                menuItems={[
                                    {
                                        id: 1,
                                        text: 'Complete',
                                        icon: 'check',
                                        onClick: () => {
                                            this.props.onClickComplete(
                                                destModel.uuid,
                                                !this.props.isCompleted
                                            );
                                        },
                                        disabled: this.props.isCompleted,
                                    },
                                    {
                                        id: 2,
                                        text: 'Remove',
                                        icon: ['far', 'trash-alt'],
                                        onClick: () => {
                                            this.props.onClickDelete(this.props.destination.uuid);
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
                    <p id="dest-description">
                        {destModel.website}
                        {destModel.formattedPhoneNumber}
                    </p>
                </div>
            </div>
        );
    }
}
