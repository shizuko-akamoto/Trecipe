import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Landing.scss';

class Landing extends React.Component {
    private static IMAGES: string[] = [
        '//find47.jp/ja/i/CunqI/image_file',
        '//find47.jp/ja/i/UXSjY/image_file',
        '//find47.jp/ja/i/pNzeU/image_file',
        '//find47.jp/ja/i/0xE72/image_file',
        '//find47.jp/ja/i/6rhh5/image_file',
    ];

    private renderSlide(imageUrl: string) {
        return (
            <div className="intro-banner">
                <div
                    className="intro-image"
                    key={imageUrl}
                    style={{
                        backgroundImage: `linear-gradient(rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 5%),url(${imageUrl})`,
                    }}
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
                            <h1 className="main-text-header">Let's go on a journey</h1>
                            <p className="main-text-subheader">
                                The world is full of places you haven't seen
                            </p>
                            <p className="main-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;
