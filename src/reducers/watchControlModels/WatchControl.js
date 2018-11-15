export default function createWatchControl(watchControlType, watchControllerId, id, name, title, minHeight, defaultHeight) {
    return {
        id,
        name,
        title,
        watchControlType,
        watchControllerId,
        minHeight,
        defaultHeight,
        height: defaultHeight
    }
}