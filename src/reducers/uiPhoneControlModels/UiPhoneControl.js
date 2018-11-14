import { MEASURE_MODE_AUTO } from "../../Constants";

export default function createUiPhoneControl(uiPhoneControlType, viewControllerId, id, name, title, minWidth, minHeight, defaultWidth, defaultHeight) {
    return {
        $ref: null,
        id,
        name,
        title,
        uiPhoneControlType,
        viewControllerId,
        minWidth,
        minHeight,
        defaultWidth,
        defaultHeight,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        width: defaultWidth,
        height: defaultHeight,
        ratioWidth: 1,
        ratioHeight: 1,
        posX: 0,
        posY: 0,
        widthMode: MEASURE_MODE_AUTO,
        heightMode: MEASURE_MODE_AUTO,
        ratioMode: MEASURE_MODE_AUTO,
        controlChainId: null,
        controlChainPosition: 0,
        controlChainWeight: 1
    }
}