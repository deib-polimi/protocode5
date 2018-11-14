import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigator = ({ viewControllers, scenes, onViewControllerCreate, onSceneCreate, className }) => {
    let scenesItems = scenes.map(scene => {
        let style = {

        };
        if (!scene.valid) {
            style.color = '#f00';
        }
        return (
            <LinkContainer to={`/editor/scenes/${scene.id}`} key={scene.id}>
                <Dropdown.Item>
                    {scene.launcher &&
                        <FontAwesomeIcon icon={faHome} />
                    }
                    <span style={style}>{scene.name}</span>
                </Dropdown.Item>
            </LinkContainer>
        )
    });
    let viewControllersItems = viewControllers.map(viewController => (
        <LinkContainer to={`/editor/scenes/viewControllers/${viewController.id}`} key={viewController.id}>
            <Dropdown.Item>{viewController.name}</Dropdown.Item>
        </LinkContainer>
    ));
    return (
        <Dropdown className={className || ""}>
            <Dropdown.Toggle variant="info" id="application-navigator">Application</Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Header>View Controllers</Dropdown.Header>
                {viewControllersItems}
                <Dropdown.Item onClick={onViewControllerCreate}>
                    <FontAwesomeIcon icon={faPlus} />
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Scenes</Dropdown.Header>
                {scenesItems}
                <Dropdown.Item onClick={onSceneCreate}>
                    <FontAwesomeIcon icon={faPlus} />
                </Dropdown.Item>
            </Dropdown.Menu>

        </Dropdown>
    )
}

export default Navigator;