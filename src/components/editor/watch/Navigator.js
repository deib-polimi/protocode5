import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigator = ({ watchControllers, onWatchControllerCreate, className }) => {
    let watchControllersItems = watchControllers.map(watchController => {
        return (
            <LinkContainer to={`/editor/watch/${watchController.id}`} key={watchController.id}>
                <Dropdown.Item>
                    {watchController.launcher &&
                        <FontAwesomeIcon icon={faHome} />
                    }
                    <span>{watchController.name}</span>
                </Dropdown.Item>
            </LinkContainer>
        )
    });
    return (
        <Dropdown className={className || ""}>
            <Dropdown.Toggle variant="info" id="application-navigator">Application</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Header>Watch Controllers</Dropdown.Header>
                {watchControllersItems}
                <Dropdown.Item onClick={onWatchControllerCreate}>
                    <FontAwesomeIcon icon={faPlus} />
                </Dropdown.Item>
            </Dropdown.Menu>

        </Dropdown>
    )
}

export default Navigator;