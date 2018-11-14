import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { UI_PHONE_ELEMENT_ASYNC_TASK } from '../../../../../Constants';

const Async = ({ match, asyncTasks, onAsyncTaskAdd }) => (
    <>
        <h5>Async tasks dialogs</h5>
        <Button onClick={onAsyncTaskAdd}>
            <FontAwesomeIcon icon={faPlus} /> {'Add async task'}
        </Button>
        {asyncTasks.length > 0 &&
            <ListGroup>
                {
                    asyncTasks.map(task => (
                        <LinkContainer key={task.id} to={`${match.url}/${UI_PHONE_ELEMENT_ASYNC_TASK}/${task.id}`}>
                            <ListGroup.Item>{task.name}</ListGroup.Item>
                        </LinkContainer>
                    ))
                }
            </ListGroup>
        }
    </>
);

export default Async;