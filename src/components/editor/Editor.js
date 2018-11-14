import React from 'react';
import SceneEditor from './scene/Editor';
import { Nav } from 'react-bootstrap';
import { Route, Switch } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

const Editor = ({ match }) => (
    <>
        <Nav variant="tabs" defaultActiveKey="" className="mb-2">
            <Nav.Item>
                <LinkContainer to={`${match.url}/scenes`}>
                    <Nav.Link eventKey="smartphone">Smartphone &amp; Tablet</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item> 
                <LinkContainer to={`${match.url}/smartwatch`}>
                    <Nav.Link eventKey="smartwatch">Smartwatch</Nav.Link>
                </LinkContainer>
            </Nav.Item>
        </Nav>
        <Switch>
            <Route path={`${match.path}/scenes/viewControllers/:vcid`} component={SceneEditor} />
            <Route path={`${match.path}/scenes/:sid/viewControllers/:vcid`} component={SceneEditor} />
            <Route path={`${match.path}/scenes/:sid`} component={SceneEditor} />
            <Route path={`${match.path}/scenes`} component={SceneEditor} />
        </Switch>
    </>
);

export default Editor;