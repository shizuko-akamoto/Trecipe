import './userIcon.scss';
import SampleAvatar from './sample.png';
import React, { MouseEvent } from 'react';

export interface UserIconProps {
    imageSource: string;
    onClick(e: MouseEvent<HTMLElement>): void;
}

export class UserIcon extends React.Component<UserIconProps, {}> {
    public static defaultProps: Partial<UserIconProps> = {
        imageSource: SampleAvatar,
        onClick: () => {
            return;
        },
    };

    render() {
        return (
            <div>
                <img className="avatar" src={this.props.imageSource} alt="userIcon" />
            </div>
        );
    }
}
