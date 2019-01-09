import { faCaretDown, faCaretRight, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { FILESTORAGE, ENTITY, PREFERENCE } from '../../../../../Constants';

const LeafNode = ({ caption, keyPath, onConnect }) => (
    <li onClick={() => onConnect(keyPath)}>
        <FontAwesomeIcon icon={faCircle} />
        {caption}
    </li>
)

const EntityNode = ({ caption, entity, keyPath, onConnect }) => (
    <li>
        <p onClick={() => onConnect(keyPath)}>
            <FontAwesomeIcon icon={faCaretDown} /> {`${caption}: ${entity.name}`}
        </p>
        <ul>
            {entity.attributes.map(attr => (
                <LeafNode key={attr.id} caption={attr.name} keyPath={`${keyPath}.${attr.name}`} onConnect={onConnect} />
            ))}
        </ul>
    </li>
);

const EntityListNode = ({ caption, entity, keyPath, onConnect }) => (
    <li>
        <p onClick={() => onConnect(keyPath)}>
            <FontAwesomeIcon icon={faCaretDown} /> {`${caption}: List of ${entity.name}`}
        </p>
    </li>
);

const ModelTab = ({ scene, viewController, uiPhoneControl, onConnect, onDisconnect, properties }) => {
    return (
        <>
            {properties.map(property => {
                let isConnected = uiPhoneControl.modelConnectors.filter(c => c.property === property && c.sceneId === scene.id).length > 0;
                if (isConnected) {
                    let connector = uiPhoneControl.modelConnectors[0];
                    return (
                        <React.Fragment key={property}>
                            <p className="font-weight-bold text-center">{property}</p>
                            <Alert variant="success">
                                <p>Connected successfully!</p>
                                <hr />
                                <p>
                                    {connector.adapter.name}
                                    {connector.keypath.split('.').filter(el => el !== '').map((prop, i) => (
                                        <React.Fragment key={`${connector.id}-${i}`}>
                                            <FontAwesomeIcon icon={faCaretRight} className="ml-2 mr-2" />
                                            {prop}
                                        </React.Fragment>
                                    ))}
                                </p>
                            </Alert>    
                            <Button size="sm" variant="danger" onClick={() => onDisconnect(connector.id)}>
                                {'Disconnect'}
                            </Button>
                        </React.Fragment>
                    );
                } else {
                    return (
                        <React.Fragment key={property}>
                            <p className="font-weight-bold text-center">{property}</p>
                            <p>Pick a destination</p>
                            <ul>
                                {scene.adapters.map(adapter => {
                                    if (adapter.adapterClass === FILESTORAGE || adapter.adapterClass === PREFERENCE) {
                                        return (
                                            <LeafNode
                                                key={adapter.id}
                                                caption={adapter.name}
                                                keyPath={''}
                                                onConnect={keyPath => onConnect(scene.id, viewController.id, uiPhoneControl.id, adapter.id, keyPath, property)}
                                            />
                                        );
                                    }
                                    if (adapter.adapterClass === ENTITY && !adapter.isList) {
                                        return (
                                            <EntityNode
                                                key={adapter.id}
                                                caption={adapter.name}
                                                entity={adapter.entity}
                                                keyPath={''}
                                                onConnect={keyPath => onConnect(scene.id, viewController.id, uiPhoneControl.id, adapter.id, keyPath, property)}
                                            />
                                        );
                                    }
                                    if (adapter.adapterClass === ENTITY && adapter.isList) {
                                        return (
                                            <EntityListNode
                                                key={adapter.id}
                                                caption={adapter.name}
                                                entity={adapter.entity}
                                                keyPath={''}
                                                onConnect={keyPath => onConnect(scene.id, viewController.id, uiPhoneControl.id, adapter.id, keyPath, property)}
                                            />
                                        );
                                    }
                                    return <></>;
                                })}
                            </ul>
                        </React.Fragment>
                    );
                }
            })}
        </>
    );
};

export default ModelTab;