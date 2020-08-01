import React from 'react';
import { RatingBar } from '../../../components/Rating/RatingBar';
import { Rating } from '../../../../../shared/models/destination';
import './review.scss';

interface ReviewProps {
    review: google.maps.places.PlaceReview;
}

class Review extends React.Component<ReviewProps> {
    render() {
        const review = this.props.review;
        return (
            <div className="review-wrapper">
                <div className="review-header-wrapper">
                    <img
                        className="user-profile"
                        src={review.profile_photo_url}
                        alt="author-profile"
                    />
                    <div className="review-header-content">
                        <span className="review-metadata">
                            {`${review.author_name} reviewed on ${new Date(
                                review.time * 1000
                            ).toLocaleString()}`}
                        </span>
                        <RatingBar rating={Math.min(5, Math.round(review.rating)) as Rating} />
                    </div>
                </div>
                <p className="review-text">{review.text}</p>
            </div>
        );
    }
}

export default Review;
