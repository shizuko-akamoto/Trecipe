import React from 'react';
import './emptyText.scss';

/**
 * Simple functional component to display message when no destination is in a trecipe
 */
export function EmptyDestinations() {
    return (
        <div className="empty-text-wrapper">
            <p className="empty-text">Your trecipe is empty!</p>
            <p className="description-text">
                Start building your trecipe by adding new destinations
            </p>
        </div>
    );
}
