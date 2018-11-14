import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const uiPhoneControlSpinner = ({ platform }) => {
    return (
        <div className={`control-spinner expanded ${platform}`}>
            <div className="control-content">
                <p>Select an option<span className="caret"><FontAwesomeIcon icon={faCaretDown} /></span></p>
            </div>
        </div>
    );
}

export default uiPhoneControlSpinner;