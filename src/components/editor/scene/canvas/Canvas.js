import React from 'react';
import { SmartPhones, Tablets } from '../../../../devices/Devices';
import DeviceSelector from '../../common/DeviceSelector';
import Palette from '../../common/Palette';
import Controls from '../palette/Controls';
import Preview from './Preview';

const Canvas = ({ app, scene, viewController, onCreate, device, platform, onDeviceChange, onPlatformChange, menu, activeControlId }) => (
    <>
        <DeviceSelector
            devices={[
                ...SmartPhones,
                ...Tablets
            ]}
            className="mb-2"
            platform={platform}
            device={device}
            onPlatformChange={onPlatformChange}
            onDeviceChange={onDeviceChange}
        />
        <Palette
            className="mb-2"
            title="UiPhoneControls (Drag 'n' Drop)"
            platform={platform}
            controls={Controls}
        />
        <Preview menu={menu} app={app} scene={scene} viewController={viewController} activeControlId={activeControlId} onCreate={onCreate} platform={platform} device={device} />
    </>
);

export default Canvas;