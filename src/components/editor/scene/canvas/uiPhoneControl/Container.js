import React from 'react';
import ViewControllerView from '../ViewControllerView';

const uiPhoneControlContainer = ({ scene, control, platform, onCreate, width, height }) => {
    return (
        <ViewControllerView
            scene={scene}
            viewController={control.containedViewController}
            platform={platform}
            allowDrop={true}
            onCreate={onCreate}
            width={width}
            height={height}
        />
    );
}

export default uiPhoneControlContainer;