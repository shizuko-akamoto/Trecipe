import React, { RefObject } from 'react';
import './filterButtons.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export enum FilterSelectorTypes {
    ANY = 'Any',
    PRIVATE = 'Private',
    PUBLIC = 'Public',
}

export interface FilterSelectorProps {
    listItem: Array<{ text: string; icon: IconProp; selectorType: FilterSelectorTypes }>;
    onClick: (type: FilterSelectorTypes) => void;
}

export interface FilterSelectorState {
    listOpen: boolean;
    selected: string;
}

export class FilterSelector extends React.Component<FilterSelectorProps, FilterSelectorState> {
    private container: RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    public readonly state: Readonly<FilterSelectorState> = {
        listOpen: false,
        selected: 'All',
    };
    constructor(props: any) {
        super(props);
        this.state = {
            listOpen: false,
            // should make into enum later
            selected: 'Any',
        };
    }

    componentDidMount(): void {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount(): void {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    // called from parent component
    private handleClickOutside = (event: MouseEvent) => {
        if (
            this.container.current &&
            event.target instanceof Node &&
            !this.container.current.contains(event.target)
        ) {
            this.setState({ listOpen: false });
        }
    };

    toggleList() {
        this.setState((prevState: FilterSelectorState) => ({
            listOpen: !prevState.listOpen,
        }));
    }

    toggleSelected(event: any) {
        this.setState({ listOpen: false, selected: event.currentTarget.innerText });
        this.props.onClick(event.currentTarget.innerText as FilterSelectorTypes);
    }

    render() {
        const listOpen = this.state.listOpen;
        return (
            <div className="contextFilterSelectorWrapper" ref={this.container}>
                <div className="contextFilterSelector" onClick={this.toggleList.bind(this)}>
                    {this.state.selected}
                    {listOpen ? (
                        <FontAwesomeIcon icon="chevron-up" className="button-icon" fixedWidth />
                    ) : (
                        <FontAwesomeIcon icon="chevron-down" className="button-icon" fixedWidth />
                    )}
                </div>
                {listOpen && (
                    <ul className="contextFilterSelectorList">
                        {this.props.listItem.map((item) => {
                            return (
                                <li key={item.text}>
                                    <button
                                        className="contextFilterSelectorEntry"
                                        onClick={this.toggleSelected.bind(this)}>
                                        <span className="button-icon">
                                            <FontAwesomeIcon icon={item.icon} fixedWidth />
                                        </span>
                                        {item.text}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        );
    }
}
