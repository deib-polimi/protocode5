import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { BackLink, ControlText } from '../utils/FormKit';
import { UI_PHONE_ELEMENT_MENU } from '../../../../../Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavigationEditor from '../partials/NavigationEditor';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const MenuItemEditor = ({ scene, viewController, control, onEdit, onDelete, scenes, onNavigationCreate, onNavigationEdit, onNavigationDelete }) => {
    let menuItem = control;
    return (
        <Card>
            <Card.Header>
                <BackLink scene={scene} viewController={viewController} controlType={UI_PHONE_ELEMENT_MENU} control={null} />
                {menuItem.name}
            </Card.Header>
            <Card.Body>
                <Form>
                    <ControlText caption="Name" value={menuItem.name} onChange={value => onEdit('name', value)} />
                    <ControlText caption="Title" value={menuItem.title} onChange={value => onEdit('title', value)} />
                    <NavigationEditor
                        navigation={menuItem.navigation}
                        scenes={scenes}
                        viewControllers={[]}
                        onCreate={() => onNavigationCreate(null, null, menuItem.id, null, null)}
                        onEdit={(toSceneId, toViewControllerId) => onNavigationEdit(menuItem.navigation.id, toSceneId, toViewControllerId)}
                        onDelete={() => onNavigationDelete(menuItem.navigation.id)}
                    />
                </Form>
            </Card.Body>
            <Card.Footer>
                <Button variant="light" onClick={onDelete} >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
            </Card.Footer>
        </Card>
    );
}

export default MenuItemEditor;