import React, { MouseEvent } from 'react';
import './ratingPopup.scss';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import Destination, { Rating } from '../../../../shared/models/destination';
import { bindActionCreators, Dispatch } from 'redux';
import { hideModal } from '../../redux/Modal/action';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';
import { UpdateDestinationRatingDTO } from '../../../../shared/models/updateDestinationRatingDTO';
import { Button } from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type RatingPopupProps = ReturnType<typeof mapDispatchToProps> & RatingPopupOwnProps;

export interface RatingPopupOwnProps {
    onClickHandler: (
        id: string,
        skip: boolean,
        updateDestinationRatingDTO: UpdateDestinationRatingDTO
    ) => void;
    trecipeId: string;
    dest: Destination;
    userId: string;
}

export interface RatingPopupState {
    rating: Rating;
}

class RatingPopup extends React.Component<RatingPopupProps, RatingPopupState> {
    public constructor(props: Readonly<RatingPopupProps>) {
        super(props);
        this.state = {
            rating: 5 as Rating,
        };
    }

    private closeRatingPopup() {
        this.props.onClickHandler(this.props.dest.uuid, true, {
            userId: this.props.userId,
            trecipeId: this.props.trecipeId,
            rating: this.state.rating,
        });
        this.props.hideModal();
    }

    private onRatingChange(rating: any) {
        this.props.onClickHandler(this.props.dest.uuid, false, {
            userId: this.props.userId,
            trecipeId: this.props.trecipeId,
            rating,
        });
        this.props.hideModal();
    }

    render() {
        return (
            <Modal>
                <div className="ratingPopup">
                    <div className="contents">
                        <h1 className="title">{'Rate your experience'}</h1>
                        <label className="destination-address">
                            {' '}
                            {this.props.dest.formattedAddress}{' '}
                        </label>
                        <label className="destination-name"> {this.props.dest.name} </label>
                        <div className="ratingStars">
                            <ReactStars
                                count={5}
                                onChange={this.onRatingChange.bind(this)}
                                size={30}
                                activeColor="#ffe66d"
                                emptyIcon={<FontAwesomeIcon icon={['far', 'star']} />}
                                filledIcon={<FontAwesomeIcon icon={['fas', 'star']} />}
                            />
                        </div>
                    </div>
                    <div className="btn">
                        <Button onClick={this.closeRatingPopup} text={'Skip'} />
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            hideModal,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(RatingPopup);
