function ApplicationXml() {
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

    appModel.appendChild(DataHandler.toXml(this.dataHandler, xmlDoc));

    this.viewControllers.forEach(vc => {
        appModel.appendChild(ViewController.toXml(vc, xmlDoc));
    });
    this.scenes.filter(s => s.valid).forEach(s => {
        appModel.appendChild(Scene.toXml(s, xmlDoc));
    });
    this.watchControllers.forEach(wc => {
        appModel.appendChild(WatchController.toXml(wc, xmlDoc));
    });

    appModel.appendChild(Menu.toXml(this.menu, xmlDoc));

    return xmlDoc;
}

export default function(application) {
    return ApplicationXml.call(application);
}