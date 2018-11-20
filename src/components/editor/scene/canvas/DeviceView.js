import React, { Component } from 'react';
import '../../../../style/device-style.scss';
import '../../../../style/android-style.scss';
import '../../../../style/ios-style.scss';
import ViewControllerView from './ViewControllerView';
import { SCENE_SINGLE_VC_TAB, ANDROID, IOS, TABLET } from '../../../../Constants';
import Menu from './uiPhoneControl/Menu';

export const PORTRAIT = 'portrait';
export const LANDSCAPE = 'landscape';

class DeviceView extends Component {
    render() {
        let { device, zoom, rotation, scene, viewController, app, platform, onCreate, showMenu, menu, activeControlId } = this.props;
        let showTab = viewController.isParent && viewController.type === SCENE_SINGLE_VC_TAB;
        let cssClasses = [`${device.type}-view`, device.platform, device.name, rotation === PORTRAIT ? 'rotated' : '', showTab ? 'withTabs' : ''].join(' ');
        let style = {
            transform: `scale(${zoom / 100}, ${zoom / 100})`,
            margin: 0
        }
        let actionBarClasses = 'action-bar';
        let enableMenu = false;
        if (!!scene) {
            if (menu.find(item => item.navigation && item.navigation.toSceneId === scene.id)) {
                actionBarClasses += ' icon-menu';
                enableMenu = true;
            }
            else if (menu.length > 0 && !scene.launcher) {
                actionBarClasses += ' icon-back';
            }
        }
        return (
            <div className="device-align">
                <div className={cssClasses} style={style}>
                    <div className={`${device.type}-screen-view`}>
                        <div className="status-bar"></div>
                        {showMenu && enableMenu &&
                            <>
                                <Menu menu={menu} platform={platform} />
                                <div className={`app-menu-shadow ${platform}`} />
                            </>
                        }
                        <div className={actionBarClasses}>
                            <div className="bar-content-menu">{app.name}</div>
                        </div>
                        {platform === ANDROID && showTab &&
                            <div className={`tab-menu ${platform}`}>
                                {viewController.containers.map(vcbox => (
                                    <div className="tab-menu-item" key={vcbox.id}>
                                        {vcbox.containedViewController.name}
                                    </div>
                                ))}
                            </div>
                        }
                        <ViewControllerView
                            className="view-controller-preview-view"
                            scene={scene}
                            onCreate={onCreate}
                            viewController={viewController}
                            platform={platform}
                            allowDrop={!viewController.isParent}
                            activeControlId={activeControlId}
                            width={device.type === TABLET && rotation === LANDSCAPE ? device.contentWidthRotated : device.contentWidth}
                            height={device.type === TABLET && rotation === LANDSCAPE ? device.contentHeightRotated : device.contentHeight}
                        />
                        {platform === IOS && showTab &&
                            <div className={`tab-menu ${platform}`}>
                                {viewController.containers.map(vcbox => (
                                    <div className="tab-menu-item" key={vcbox.id}>
                                        {vcbox.containedViewController.name}
                                    </div>
                                ))}
                            </div>
                        }
                        <div className="command-bar"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeviceView;