import React from 'react';
import './filterButtons.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonProps, ButtonState } from '../../../components/Button/Button';

export enum FilterButtonTypes {
    ALL = 'All Trecipes',
    COMPLETED = 'Completed',
    IN_PROGRESS = 'In Progress',
    TODO = 'To Do',
}

export interface FilterButtonProps extends ButtonProps {
    filterType: FilterButtonTypes;
    filterOnClick(filter: FilterButtonTypes, selected: boolean): void;
    selected: boolean;
}

export class FilterButton extends React.Component<FilterButtonProps, ButtonState> {
    public readonly state: Readonly<ButtonState> = {
        disabled: false,
    };

    private handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        this.props.filterOnClick(this.props.filterType, !this.props.selected);
    }

    render() {
        return (
            <button
                className={
                    this.props.selected ? 'contextFilterButtons active' : 'contextFilterButtons'
                }
                onClick={(e) => this.handleClick(e)}>
                {this.props.text}
                <span className={this.props.selected ? 'button-icon' : 'button-icon icon-hidden'}>
                    <FontAwesomeIcon icon={this.props.icon} fixedWidth />
                </span>
            </button>
        );
    }
}
