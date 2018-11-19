import { MenuItemAll } from "../../selectors/Menu";
import { SceneAll } from "../../selectors/Scene";
import { ViewControllerAll } from "../../selectors/ViewController";
import { WatchControllerSelectorAll } from "../../selectors/WatchController";
import MenuTransform from "./Menu";
import SceneTransform from "./Scene";
import ViewControllerTransform from "./ViewController";
import WatchControllerTransform from "./WatchController";

function transform(state) {
    this.viewControllers = ViewControllerAll(state);
    this.scenes = SceneAll(state);
    this.watchControllers = WatchControllerSelectorAll(state);
    this.menu = MenuItemAll(state);

    this.toXml = () => {
        var xmlDocType = document.implementation.createDocumentType('appModel', 'MODEL', '<?xml version="1.0" encoding="ASCII"?>');
        var xmlDoc = document.implementation.createDocument('appModelXml', '', xmlDocType);

        var appModel = xmlDoc.createElement('metamodel:Application');
        appModel.setAttribute('xmi:version', '2.0');
        appModel.setAttribute('xmlns:xmi', 'http://www.omg.org/XMI');
        appModel.setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
        appModel.setAttribute('xmlns:metamodel', 'http://metamodel/1.0');
        appModel.setAttribute('xsi:schemaLocation', 'http://metamodel/1.0 ../metamodel/metamodel.ecore');
        appModel.setAttribute('name', this.name);
        appModel.setAttribute('companyIdentifier', this.companyIdentifier);

        // appModel.appendChild(this.dataHandler.toXml(xmlDoc));

        var viewControllers = this.viewControllers;
        var scenes = this.scenes.filter(s => s.valid);
        var watchControllers = this.watchControllers;

        viewControllers.forEach(vc => {
            appModel.appendChild(ViewControllerTransform(this, null, vc).toXml(xmlDoc));
        })

        scenes.forEach(s => {
            appModel.appendChild(SceneTransform(this, s).toXml(xmlDoc))
        })

        watchControllers.forEach(wc => {
            appModel.appendChild(WatchControllerTransform(this, wc).toXml(xmlDoc));
        })

        appModel.appendChild(MenuTransform(this, this.menu).toXml(xmlDoc));

        xmlDoc.appendChild(appModel);

        return xmlDoc;
    }
    return this;
}

// state is the full REDUX state
export default function ApplicationTransform(state) {
    return transform.call(state.application, state);
}