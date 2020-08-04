import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./Landing.scss";
class Landing extends React.Component {
    render() {
        return (
            <div className='container'>
                <div className='carousel-container'>
                    <Carousel autoPlay={false} showThumbs={false} useKeyboardArrows={true} infiniteLoop={true} showStatus={false} stopOnHover={true} interval={5000}>
                        <div className='intro-banner'>
                            <img className='intro-image'/>
                            <h1 className="intro-text">Trecipe</h1>
                            <svg
                                className="border"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none">
                                <path d="M 0 0 Q 50 50 100 0 V 100 H 0 Z" />
                            </svg>
                        </div>
                        <div className='intro-banner'> 
                            <img className='intro-image'/>
                            <h1 className="intro-text">Trecipe</h1>
                            <svg
                                className="border"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none">
                                <path d="M 0 0 Q 50 50 100 0 V 100 H 0 Z" />
                            </svg>
                        </div>
                        <div className='intro-banner'>
                            <img className='intro-image'/>
                            <h1 className="intro-text">Trecipe</h1>
                            <svg
                                className="border"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none">
                                <path d="M 0 0 Q 50 50 100 0 V 100 H 0 Z" />
                            </svg>
                        </div>
                    </Carousel>
                </div>
                <div className='content-container'>
                    <div className='content-wrapper'>
                        Content Placeholder
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;
