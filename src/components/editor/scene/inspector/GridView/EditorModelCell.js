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

const GridCellModelEditor = ({ scene, viewController, grid, onConnect, onDisconnect }) => {
    const gridItemsConnector = grid.modelConnectors.find(connector => connector.property === 'items' && connector.sceneId === scene.id);
    if (!gridItemsConnector) {
        return <Alert variant="danger">Please select a model connector for the <i>items</i> property in the model tab</Alert>
    }
    const gridItemsAdapter = gridItemsConnector.adapter;
    let propertySelectorLevel = PROPERTY_SELECTOR_LEVEL.NONE;
    if (gridItemsAdapter.adapterClass === ENTITY && gridItemsAdapter.isList) {
        propertySelectorLevel = PROPERTY_SELECTOR_LEVEL.RICH;
    }
    const titleConnector = grid.modelConnectors.find(connector => connector.property === '@cell.title' && connector.sceneId === scene.id);
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
                        You passed as model to this grid an array of items. A cell will be generated for any of those items.
                        Which properties of each item would you like to be reflected on the cells?
                    </p>
                    {titleConnector === undefined &&
                        <ControlArraySelect
                            caption="Title"
                            options={gridItemsAdapter.entity.attributes}
                            transformLabel={attr => attr.name}
                            transformValue={attr => attr.name}
                            placeholder="Select a property to connect"
                            value={undefined}
                            onChange={value => onConnect(scene.id, viewController.id, grid.id, null, value, '@cell.title')}
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
                </>
            }
        </>

    )
};

export default GridCellModelEditor;