import React, { CSSProperties } from 'react';
import { Image } from '../../../components/Image/Image';
import './destinationCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RatingBar } from '../../../components/Rating/RatingBar';
import { Draggable } from 'react-beautiful-dnd';
import Destination, { getIcon } from '../../../../../shared/models/destination';
import { isEmpty } from 'lodash';
import destination from '../../../../../shared/models/destination';

/**
 * DCProps
 * index: where in Destination card list this one is located (needed for Drag & Drop functionality)
 * destModel: destination model to render
 * isCompleted: true if this destination is checked off, false otherwise
 * onClickDelete: callback handler for delete button
 * onClickComplete: callback handler for checkoff button
 * isInEdit: true if currently in edit, false otherwise
 */
export interface DCProps {
    index: number;
    destination: Destination;
    isCompleted: boolean;
    onClickDelete: (destId: string) => void;
    onClickComplete: (destId: destination, isCompleted: boolean) => void;
    isInEdit?: boolean;
}

export class DestinationCard extends React.Component<DCProps> {
    private getDCFilter(): CSSProperties {
        const defaultFilter = { filter: 'none' };
        if (this.props.isInEdit) {
            return defaultFilter;
        } else if (this.props.isCompleted) {
            return { filter: 'opacity(50%)' };
        } else {
            return defaultFilter;
        }
    }

    render() {
        return (
            <Draggable
                draggableId={this.props.destination.uuid}
                index={this.props.index}
                isDragDisabled={!this.props.isInEdit}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                        <div className="dest-list-item-wrapper" style={this.getDCFilter()}>
                            <div className="dest-img">
                                <Image
                                    src={
                                        isEmpty(this.props.destination.photoRefs)
                                            ? null
                                            : this.props.destination.photoRefs[0]
                                    }
                                    imgStyle={{ borderRadius: '8px 0 0 8px' }}
                                />
                            </div>
                            <div className="dest-info">
                                <h6 className="dest-category">
                                    {this.props.destination.category}
                                    <FontAwesomeIcon
                                        className="dest-category-icon"
                                        icon={getIcon(this.props.destination.category[0])}
                                    />
                                </h6>
                                <h6 className="dest-address">
                                    {this.props.destination.formattedAddress}
                                </h6>
                                <h3 className="dest-name">{this.props.destination.name}</h3>
                                <RatingBar rating={this.props.destination.rating} />
                                <div className="dest-description">
                                    <p>{this.props.destination.formattedPhoneNumber}</p>
                                    <p>{this.props.destination.website}</p>
                                </div>
                            </div>
                            <span
                                className={`check-edit-wrapper ${
                                    this.props.isInEdit ? 'in-edit' : ''
                                }`}>
                                <div className="completed-checkbox">
                                    <input
                                        type="checkbox"
                                        id={this.props.destination.uuid + '-completed'}
                                        onChange={() =>
                                            this.props.onClickComplete(
                                                this.props.destination,
                                                !this.props.isCompleted
                                            )
                                        }
                                        checked={this.props.isCompleted}
                                    />
                                    <label
                                        htmlFor={this.props.destination.uuid + '-completed'}
                                        className="check-mark">
                                        <FontAwesomeIcon icon="check" />
                                    </label>
                                </div>
                                <span
                                    {...provided.dragHandleProps}
                                    className="edit-option"
                                    id="dest-reorder">
                                    <FontAwesomeIcon icon="bars" />
                                </span>
                                <button
                                    className="edit-option"
                                    id="dest-delete"
                                    onClick={() =>
                                        this.props.onClickDelete(this.props.destination.uuid)
                                    }>
                                    <FontAwesomeIcon icon={['far', 'trash-alt']} />
                                </button>
                            </span>
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }
}
