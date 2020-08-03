import React from 'react';
import './emptyText.scss';

export function EmptyText() {
    return (
        <div className="empty-destinations-text">
            <p className="empty-text">Your trecipe is empty!</p>
            <p className="description-text">
                Start building your trecipe by adding new destinations
            </p>
        </div>
    );
}
