import React from 'react';

export interface LazyBackgroundProps {
    src: string | null;
    className?: string;
    placeholder?: string;
    otherStyles?: string[];
}

export class LazyBackground extends React.Component<LazyBackgroundProps, { src: string | null }> {
    state = { src: null };
    private imageLoader: HTMLImageElement = new Image();

    componentDidMount() {
        const { src } = this.props;
        if (src) {
            this.imageLoader.src = src;
        }

        this.imageLoader.onload = () => {
            this.setState({ src: src });
        };
    }

    componentWillUnmount(): void {
        if (!this.imageLoader) {
            return;
        }
        this.imageLoader.onload = function () {};
    }

    render() {
        const placeholder = this.props.placeholder ? `url(${this.props.placeholder})` : 'none';
        const imageSrc = this.state.src ? `url(${this.state.src})` : placeholder;
        const otherStyles = this.props.otherStyles ? `${this.props.otherStyles.join(', ')},` : '';
        return (
            <div
                className={this.props.className}
                style={{ backgroundImage: `${otherStyles}${imageSrc}` }}>
                {this.props.children}
            </div>
        );
    }
}
