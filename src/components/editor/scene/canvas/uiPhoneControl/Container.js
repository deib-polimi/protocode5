import React from 'react';
import ViewControllerView from '../ViewControllerView';

const uiPhoneControlContainer = ({ scene, control, platform, onCreate }) => {
    return (
        <ViewControllerView
            scene={scene}
            viewController={control.containedViewController}
            platform={platform}
            allowDrop={true}
            onCreate={onCreate}
        />
    );
}

export default uiPhoneControlContainer;