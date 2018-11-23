import { NAVIGATION, MENU_NAVIGATION } from "../XmlNames";
import SceneTransform from "./Scene";
import ViewControllerTransform from "./ViewController";

function transform(control, app) {
    this._control = control;
    this._application = app;
    this.toXml = xmlDoc => {
        var elem = null;
        // Case of buttons, listViews and gridViews
        if (this.fromSceneId) {
            elem = xmlDoc.createElement(NAVIGATION);
            elem.setAttribute('id', this.id);
            elem.setAttribute('contextScene', '//@scenes[id=\'' + this.fromSceneId + '\']');
            if (this.toViewControllerId) {
                let app = this._control._viewController._application;
                let vc = app.viewControllers.find(e => e.id === this.toViewControllerId);
                elem.setAttribute('destinationViewController', ViewControllerTransform(app, null, vc).getRefPath(''));
            } else if (this.toSceneId) {
                let app = this._control._viewController._application;
                let scene = app.scenes.find(s => s.id === this.toSceneId);
                elem.setAttribute('destinationScene', SceneTransform(app, scene).getRefPath(''));
            }
        } else {
            // Case of menuItems
            elem = xmlDoc.createElement(MENU_NAVIGATION);
            elem.setAttribute('id', this.id);
            if (this.toSceneId) {
                let scene = this._application.scenes.find(s => s.id === this.toSceneId);
                elem.setAttribute('destinationScene', SceneTransform(app, scene).getRefPath(''));
            }
        }

        return elem;
    }
    return this;
}

export default function NavigationTransform(uiPhoneControl, app, raw) {
    return transform.call(raw, uiPhoneControl, app);
}