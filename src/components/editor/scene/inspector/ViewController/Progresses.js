import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { UI_PHONE_ELEMENT_PROGRESS_DIALOG } from '../../../../../Constants';

const Progresses = ({ match, progressDialogs, onProgressAdd }) => (
    <>
        <h5>Progress dialogs</h5>
        <Button onClick={onProgressAdd}>
            <FontAwesomeIcon icon={faPlus} /> {'Add progress dialog'}
        </Button>
        {progressDialogs.length > 0 &&
            <ListGroup>
                {
                    progressDialogs.map(dialog => (
                        <LinkContainer key={dialog.id} to={`${match.url}/${UI_PHONE_ELEMENT_PROGRESS_DIALOG}/${dialog.id}`}>
                            <ListGroup.Item >{dialog.name}</ListGroup.Item>
                        </LinkContainer>
                    ))
                }
            </ListGroup>
        }
    </>
);

export default Progresses;