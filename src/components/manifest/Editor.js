import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { ControlText } from '../FormKit';
import { changeName } from '../../actions/Application';
import { connect } from 'react-redux';

const ManifestEditor = ({ app, onNameChange, onCompanyIdentifierChange }) => (
    <Card>
        <Card.Header>General information</Card.Header>
        <Card.Body>
            <Form>
                <ControlText caption="Name" value={app.name} onChange={value => onNameChange(value)} />
                <ControlText caption="Company identifier" value={app.companyIdentifier} onChange={value => onCompanyIdentifierChange(value)} />
            </Form>
        </Card.Body>
    </Card>
);

const mapStateToProps = state => {
    return {
        app: state.application
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNameChange: value => dispatch(changeName(value)),
        onCompanyIdentifierChange: value => dispatch(changeName(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManifestEditor);