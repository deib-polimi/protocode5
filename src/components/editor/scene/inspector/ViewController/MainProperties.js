import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'rc-color-picker/assets/index.css';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { CONTROL_CHAIN } from '../../../../../Constants';
import { ControlColor, ControlText } from '../utils/FormKit';
import Tree from './ControlTree';

const MainProperties = ({ scene, viewController, onCreate, onEdit }) => {
    if (!viewController.isParent)
        return (
            <>
                <Form className="mb-3">
                    <ControlText caption="Name" value={viewController.name} onChange={value => onEdit('name', value)} />
                    <ControlColor caption="Background Color" value={viewController.backgroundColor} onChange={value => onEdit('backgroundColor', value)} />
                    <ControlText caption="Background Image" value={viewController.backgroundImage} onChange={value => onEdit('backgroundImage', value)} />
                </Form>
                <Button className="btn-block btn-chain" size="sm" onClick={() => onCreate(CONTROL_CHAIN, viewController.id)}>
                    <FontAwesomeIcon icon={faLink} />
                    {'Create control chain'}
                </Button>
                <p className="m-3 text-center">Ui Controls &amp; Control Chains</p>
                <Tree viewController={viewController} scene={scene} />
            </>
        );
    else
        return (
            <>
                <p>{viewController.name}</p>
                <Tree viewController={viewController} scene={scene} />
            </>
        );
};

export default MainProperties;