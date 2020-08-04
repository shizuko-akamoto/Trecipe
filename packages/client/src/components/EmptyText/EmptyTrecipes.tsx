import React from 'react';

/**
 * Simple functional component to display message when no trecipe is there to show
 */
export function EmptyTrecipes() {
    return (
        <div className="empty-text-wrapper">
            <p className="empty-text">No matching trecipe</p>
            <p className="description-text">Either change your filters or create a new trecipe</p>
        </div>
    );
}
