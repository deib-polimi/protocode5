import { faLevelUpAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'rc-color-picker/assets/index.css';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Route } from 'react-router-dom';

export * from '../../../../FormKit';

export const BackLink = ({ scene, viewController, ...others }) => {
    let link = '/editor/scenes';
    if (scene) {
        link += `/${scene.id}`;
    }
    if (viewController) {
        link += `/viewControllers/${viewController.id}`;
        if (others.controlType && (others.controlId || others.control)) {
            let id = others.controlId || others.control.id;
            link += `/${others.controlType}/${id}`;
        }
    }
    if (others.controlType && others.control === null) {
        link += '/' + others.controlType;
    }
    return (
        <Route render={({ history }) => (
            <Button
                className="mr-2"
                variant="light"
                onClick={() => history.push(link)}
            >
                <FontAwesomeIcon icon={faLevelUpAlt} />
            </Button>
        )}
        />
    );
}