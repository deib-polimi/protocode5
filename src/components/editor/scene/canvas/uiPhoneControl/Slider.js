import React from 'react';

const uiPhoneControlSlider = ({ platform }) => {
    return (
        <div className={`control-slider expanded ${platform}`}>
            <div className="control-content">
                <div className="slider-left-row"></div>
                <div className="slider-image"></div>
                <div className="slider-right-row"></div>
            </div>
        </div>
    );
}

export default uiPhoneControlSlider;