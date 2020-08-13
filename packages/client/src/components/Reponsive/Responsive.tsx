import React from 'react';
import MediaQuery from 'react-responsive';

const tabletBreakPoint = 768;

// Display the component if the width of screen is less than the breakpoint
export class Mobile extends React.Component<{}, {}> {
    render() {
        return <MediaQuery maxWidth={tabletBreakPoint - 1}>{this.props.children}</MediaQuery>;
    }
}

// Display the component if the width of screen is equal/larger than the breakpoint
export class Desktop extends React.Component<{}, {}> {
    render() {
        return <MediaQuery minWidth={tabletBreakPoint}>{this.props.children}</MediaQuery>;
    }
}
