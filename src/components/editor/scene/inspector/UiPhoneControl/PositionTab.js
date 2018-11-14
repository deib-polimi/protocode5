import React from 'react';
import { Card, Form, ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ControlNumber } from '../utils/FormKit';
import { CONSTRAINT_VALID } from '../../../../../Constants';
import { Link } from 'react-router-dom';

const PositionTab = ({ scene, viewController, uiPhoneControl, onCreateConstraint, onEdit }) => {
    return (
        <>
            <Card className="w-100">
                <Card.Header>
                    {'Constraints'}
                </Card.Header>
                {uiPhoneControl.constraints.length > 0 &&
                    <ListGroup variant="flush">
                        {uiPhoneControl.constraints.map(constraint => {
                            let style = {};
                            if (constraint.valid !== CONSTRAINT_VALID) {
                                style.color = '#FF0000';
                            }
                            let linkUrl = '';
                            if (scene) {
                                linkUrl = `/editor/scenes/${scene.id}/viewControllers/${viewController.id}/${uiPhoneControl.uiPhoneControlType}/${uiPhoneControl.id}/constraints/${constraint.id}`;
                            } else {
                                linkUrl = `/editor/scenes/viewControllers/${viewController.id}/${uiPhoneControl.uiPhoneControlType}/${uiPhoneControl.id}/constraints/${constraint.id}`;
                            }
                            return (
                                <ListGroup.Item key={constraint.id}>
                                    <Link to={linkUrl} style={style}>
                                        {constraint.name}
                                    </Link>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                }
                <Card.Footer>
                    <Button onClick={() => onCreateConstraint(uiPhoneControl.id, viewController.id)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </Card.Footer>
            </Card>
            <Form className="mt-3">
                <ControlNumber caption="Position X" value={uiPhoneControl.posX} onChange={value => onEdit('posX', value)} />
                <ControlNumber caption="Position Y" value={uiPhoneControl.posY} onChange={value => onEdit('posY', value)} />
            </Form>
        </>
    );
}

export default PositionTab;