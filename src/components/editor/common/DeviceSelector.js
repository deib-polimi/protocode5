import React from 'react';
import { InputGroup, Button } from 'react-bootstrap';
import SmartFormControl from '../../../utils/SmartChangeEvent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faAndroid, faApple } from '@fortawesome/free-brands-svg-icons';

const DeviceSelector = ({ devices, platform, device, onDeviceChange, onPlatformChange, className }) => {
    let platformMap = {};
    devices.forEach(dev => platformMap[dev.platform] = 1);
    let platforms = Object.keys(platformMap);
    platforms.sort();
    return (
    <InputGroup className={className || ""}>
        <InputGroup.Prepend>
        {platforms.map(item_platform => {
            let variant = item_platform === platform ? 'dark' : 'light';
            let icon;
            switch(item_platform) {
                case 'android':
                case 'androidwear':
                    icon = faAndroid; 
                    break;
                case 'ios': 
                case 'watchos':
                    icon = faApple; 
                    break;
                default: 
                    icon = faQuestion; 
                    break;
            }
            return (
                <Button key={item_platform} variant={variant} onClick={() => onPlatformChange(item_platform)}>
                    <FontAwesomeIcon icon={icon} />
                </Button>
            );
        })}
        </InputGroup.Prepend>
        <SmartFormControl 
            as="select" 
            onChange={name => onDeviceChange(devices.find(d => d.name === name))} 
            value={device.name}
        >
            {devices.filter(d => d.platform === platform).map(dev => {
                return (<option key={dev.name} value={dev.name}>{dev.label}</option>);
            })}   
        </SmartFormControl>
    </InputGroup>
)};

export default DeviceSelector;