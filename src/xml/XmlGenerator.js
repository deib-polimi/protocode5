import ApplicationTransform from "./models/Application";
import saveAs from 'file-saver';
import beautify from 'xml-beautifier';

const XmlGenerator = {
    DownloadModelXml: function (state) {
        let xmlDoc = ApplicationTransform(state).toXml();
        let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(xmlDoc.documentElement);
        let blob = new Blob(
            [beautify(xmlString)], {
                type: "application/xml;charset=ASCII"
            });
        saveAs(blob, "protocode.xmi");
    }
}

export default XmlGenerator;
