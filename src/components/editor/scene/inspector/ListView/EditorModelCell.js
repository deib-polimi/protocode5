import { faCaretRight, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { ENTITY } from '../../../../../Constants';
import { ControlArraySelect } from '../utils/FormKit';

const PROPERTY_SELECTOR_LEVEL = {
    NONE: 0,
    ITEM: 1,
    RICH: 2
}

const ListCellModelEditor = ({ scene, viewController, list, onConnect, onDisconnect }) => {
    const listItemsConnector = list.modelConnectors.find(connector => connector.property === 'items' && connector.sceneId === scene.id);
    if (!listItemsConnector) {
        return <Alert variant="danger">Please select a model connector for the <i>items</i> property in the model tab</Alert>
    }
    const listItemsAdapter = listItemsConnector.adapter;
    let propertySelectorLevel = PROPERTY_SELECTOR_LEVEL.NONE;
    if (listItemsAdapter.adapterClass === ENTITY && listItemsAdapter.isList) {
        propertySelectorLevel = PROPERTY_SELECTOR_LEVEL.RICH;
    }
    const titleConnector = list.modelConnectors.find(connector => connector.property === '@cell.title' && connector.sceneId === scene.id);
    const subtitleConnector = list.modelConnectors.find(connector => connector.property === '@cell.subtitle' && connector.sceneId === scene.id);
    return (
        <>
            {propertySelectorLevel === PROPERTY_SELECTOR_LEVEL.NONE &&
                <Alert variant="danger">
                    {
                        'It is not possible to bind model properties to cell properties. The selected model is not recognized as a list of objects/entities.'
                    }
                </Alert>
            }
            {propertySelectorLevel === PROPERTY_SELECTOR_LEVEL.RICH &&
                <>
                    <p>
                        You passed as model to this list an array of items. A cell will be generated for any of those items.
                        Which properties of each item would you like to be reflected on the cells?
                    </p>
                    {titleConnector === undefined &&
                        <ControlArraySelect
                            caption="Title"
                            options={listItemsAdapter.entity.attributes}
                            transformLabel={attr => attr.name}
                            transformValue={attr => attr.name}
                            placeholder="Select a property to connect"
                            value={undefined}
                            onChange={value => onConnect(scene.id, viewController.id, list.id, null, value, '@cell.title')}
                        />
                    }
                    {titleConnector !== undefined &&
                        <Row>
                            <Col sm={3}>Title</Col>
                            <Col sm={7}>Current item <FontAwesomeIcon icon={faCaretRight} /> {titleConnector.keypath}</Col>
                            <Col sm={2}>
                                <Button size="sm" variant="light" onClick={() => onDisconnect(titleConnector.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            </Col>
                        </Row>
                    }
                    {subtitleConnector === undefined &&
                        <ControlArraySelect
                            caption="Subtitle"
                            options={listItemsAdapter.entity.attributes}
                            transformLabel={attr => attr.name}
                            transformValue={attr => attr.name}
                            placeholder="Select a property to connect"
                            value={undefined}
                            onChange={value => onConnect(scene.id, viewController.id, list.id, null, value, '@cell.subtitle')}
                        />
                    }
                    {subtitleConnector !== undefined &&
                        <Row>
                            <Col sm={3}>Subtitle</Col>
                            <Col sm={7}>Current item <FontAwesomeIcon icon={faCaretRight} /> {subtitleConnector.keypath}</Col>
                            <Col sm={2}>
                                <Button size="sm" variant="light" onClick={() => onDisconnect(subtitleConnector.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            </Col>
                        </Row>
                    }
                </>
            }
        </>

    )
};

export default ListCellModelEditor;