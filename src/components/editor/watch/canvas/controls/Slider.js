import React from 'react';

const Slider = ({ control, platform }) => {
    let style = {};
    return (
        <div className={`control-watch-slider ${platform}`} style={style}>
            <div className="control-content">
                <div className="watch-slider-minus">&#9472;</div>
                <div className="watch-slider-dash dash-green">&#9473;</div>
                <div className="watch-slider-dash dash-green">&#9473;</div>
                <div className="watch-slider-dash dash-gray">&#9473;</div>
                <div className="watch-slider-dash dash-gray">&#9473;</div>
                <div className="watch-slider-plus">&#9547;</div>
                <div className="watch-slider-left-row"></div>
                <div className="watch-slider-image"></div>
                <div className="watch-slider-right-row"></div>
            </div>
        </div>
    );
}

export default Slider;