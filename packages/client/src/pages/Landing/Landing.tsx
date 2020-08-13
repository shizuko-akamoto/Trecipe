import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Landing.scss';
import { LazyBackground } from '../../components/Image/LazyBackground';
// @ts-ignore
import Fade from 'react-reveal/Fade';
import { Button } from '../../components/Button/Button';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../redux';

class Landing extends React.Component<RouteComponentProps & ReturnType<typeof mapStateToProps>> {
    private static IMAGES: string[] = [
        '//find47.jp/ja/i/CunqI/image_file',
        '//find47.jp/ja/i/UXSjY/image_file',
        '//find47.jp/ja/i/pNzeU/image_file',
        '//find47.jp/ja/i/0xE72/image_file',
        '//find47.jp/ja/i/6rhh5/image_file',
    ];

    private renderSlide(imageUrl: string) {
        return (
            <div className="intro-banner" key={imageUrl}>
                <LazyBackground
                    className="intro-image"
                    src={imageUrl}
                    otherStyles={[
                        'linear-gradient(rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 5%)',
                    ]}
                />
                <h1 className="intro-text">Trecipe</h1>
                <svg
                    className="border"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none">
                    <path d="M 0 0 Q 50 50 100 0 V 100 H 0 Z" />
                </svg>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <div className="carousel-container">
                    <Carousel
                        autoPlay={true}
                        showThumbs={false}
                        useKeyboardArrows={true}
                        infiniteLoop={true}
                        showStatus={false}
                        showIndicators={false}
                        interval={4000}>
                        {Landing.IMAGES.map((imgUrl: string) => this.renderSlide(imgUrl))}
                    </Carousel>
                </div>
                <div className="content-container">
                    <div className="content-wrapper">
                        <div className="main-text-wrapper">
                            <Fade bottom>
                                <h1 className="main-text-header">Let's go on a journey</h1>
                                <h2 className="main-text-subheader">
                                    The world is full of places you haven't seen.
                                </h2>
                                <p className="main-text">
                                    Wish that you explored the city beyond the glitters catered to
                                    tourists, or that you didn’t miss the scenery and stores loved
                                    by locals?
                                </p>
                                <p className="main-text">
                                    Trecipe shares the same vision, and realizes it. We are
                                    motivated by not just customer experience, but human experience.
                                </p>
                                <p className="main-text">
                                    Powered and inspired by people like you, we present detailed
                                    reviews on lesser-known sites and activities, so you can venture
                                    off one-size-fits-all itinerary and personalize your journey —
                                    be it adventurous, enlightening or relaxing, we have something
                                    for you.
                                </p>
                                <p className="main-text">
                                    Conveniently access countless of unique tourist experiences,
                                    create your own bucket list and share your encounterance.
                                </p>
                                <p className="main-text-subending">
                                    If imagination is the limit, Trecipe is <span>boundless</span>.
                                </p>
                                <p className="main-text-ending">
                                    Your journey to serendipity starts here.
                                </p>
                            </Fade>
                            {!this.props.isAuthenticated && (
                                <div className="login-btn">
                                    <Button
                                        text="Login"
                                        onClick={() => this.props.history.push('/user/login')}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.user.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(Landing));
