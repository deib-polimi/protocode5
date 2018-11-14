import React from 'react';

const uiPhoneControlDatepicker = ({ platform }) => {
    return (
        <div className={`control-datepicker expanded ${platform}`}>
            <div className="control-content">
                <div className="datepicker-image"></div>
            </div>
        </div>
    );
}

export default uiPhoneControlDatepicker;