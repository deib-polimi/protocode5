import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { UI_PHONE_ELEMENT_ALERT_DIALOG } from '../../../../../Constants';

const Alerts = ({ match, alertDialogs, onAlertAdd }) => (
    <>
        <h5>Alert dialogs</h5>
        <Button onClick={onAlertAdd}>
            <FontAwesomeIcon icon={faPlus} /> {'Add alert dialog'}
        </Button>
        {alertDialogs.length > 0 &&
            <ListGroup>
                {
                    alertDialogs.map(dialog => (
                        <LinkContainer key={dialog.id} to={`${match.url}/${UI_PHONE_ELEMENT_ALERT_DIALOG}/${dialog.id}`}>
                            <ListGroup.Item >{dialog.name}</ListGroup.Item>
                        </LinkContainer>
                    ))
                }
            </ListGroup>
        }
    </>
);

export default Alerts;
