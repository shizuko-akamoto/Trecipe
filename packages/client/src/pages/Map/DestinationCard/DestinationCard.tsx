import React from 'react';
import { CardMenu } from '../../../components/CardMenu/CardMenu';
import { RatingBar } from '../../../components/Rating/RatingBar';
import { DCProps } from '../../Trecipe/DestinationCard/DestinationCard';
import { getIcon } from '../../../redux/Destinations/types';
import './destinationCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class DestinationCard extends React.Component<DCProps> {
    render() {
        const destModel = this.props.destModel;
        return (
            <div className="dest-card-item-wrapper" id={this.props.destModel.id}>
                <div
                    className="dest-card-header-container"
                    style={{
                        backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.5) 100%), 
      url(${destModel.imgSrc})`,
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
                                                this.props.destModel.id,
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
                                            this.props.onClickDelete(this.props.destModel.id);
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
                                    icon={getIcon(destModel.category)}
                                />
                            </h6>
                            <h6 id="dest-location">{destModel.address}</h6>
                        </span>
                        <RatingBar rating={destModel.rating} />
                    </div>
                    <p id="dest-description">{destModel.description}</p>
                </div>
            </div>
        );
    }
}
