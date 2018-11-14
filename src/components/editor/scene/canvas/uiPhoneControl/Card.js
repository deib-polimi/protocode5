import React from 'react';

const uiPhoneControlCard = ({ control, platform }) => {
    return (
        <div className={`control-card expanded ${platform}`}>
            <div className="control-content">
                <div className="card-image"></div>
                <p className="card-title">{control.title}</p>
                <p className="card-subtitle">{control.subtitle}</p>
                <div className="card-buttons">
                    {(new Array(control.numActions).fill(0).map((_, i) => (
                        <p class="card-button" key={`Action${i}`}>Action {i}</p>
                    )))}
                </div>
            </div>
        </div>
    );
}

export default uiPhoneControlCard;