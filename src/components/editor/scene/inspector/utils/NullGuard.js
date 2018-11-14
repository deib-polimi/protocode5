import React from 'react';
import { Redirect } from 'react-router';

const NullGuard = ({ guard, scene, viewController, children }) => {

    if (!guard) {
        if (scene) {
            return (
                <Redirect to={`/editor/scenes/${scene.id}/viewControllers/${viewController.id}`} />
            );
        } else {
            return (
                <Redirect to={`/editor/scenes/viewControllers/${viewController.id}`} />
            );
        }
    } else {
        return children;
    }

}

export default NullGuard;