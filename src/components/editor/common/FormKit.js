import React from 'react';
import { Form, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import SmartFormControl from '../../../utils/SmartChangeEvent';

export const ControlText = ({ caption, value, onChange, ...others }) => (
    <Form.Group as={Row}>
        <Form.Label column sm={4}>{caption}</Form.Label>
        <Col sm={8}>
            <SmartFormControl type="text" value={value} onChange={onChange} {...others} />
        </Col>
    </Form.Group>
);

export const ControlNumber = ({ caption, value, onChange, min, max, ...others }) => {
    let parser = parseInt;
    if (others.parser) parser = others.parser;
    delete others.parser;
    return (
        <Form.Group as={Row}>
            <Form.Label column sm={4}>{caption}</Form.Label>
            <Col sm={8}>
                <SmartFormControl type="number" min={min} max={max} value={value.toString()} onChange={v => onChange(parser(v))} {...others} />
            </Col>
        </Form.Group>
    )
};

export const ControlColor = ({ caption, value, onChange, ...others }) => (
    <Form.Group as={Row}>
        <Form.Label column sm={4}>{caption}</Form.Label>
        <Col sm={8} className="d-flex justify-content-end align-items-center">
            <ColorPicker animation="slide-up" color={value} onChange={data => onChange(data.color)} {...others} />
        </Col>
    </Form.Group>
);

export const ControlCustomColor = ({ caption, value, customDefault, onChange, ...others }) => (
    <Form.Group as={Row}>
        <Form.Label column sm={4}>{caption}</Form.Label>
        <Col sm={5}>
            <ButtonGroup size="sm">
                <Button variant={value === '' ? 'dark' : 'light'} onClick={() => onChange('')}>Auto</Button>
                <Button variant={value !== '' ? 'dark' : 'light'} onClick={() => onChange(customDefault)}>Custom</Button>
            </ButtonGroup>
        </Col>
        {value !== '' &&
            <Col sm={3} className="d-flex justify-content-end align-items-center">
                <ColorPicker animation="slide-up" color={value} onChange={data => onChange(data.color)} {...others} />
            </Col>
        }
        {value === '' && <Col sm={3}></Col>}
    </Form.Group>
)

export const ControlAutoSelect = ({ caption, options, value, placeholder, onChange }) => {
    return (
        <Form.Group as={Row}>
            <Form.Label column sm={4}>{caption}</Form.Label>
            <SmartFormControl as="select" value={value || "undefined"} onChange={val => onChange(val)}>
                <option value={"undefined"} disabled>{placeholder}</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </SmartFormControl>
        </Form.Group>
    );
}

export const ControlArraySelect = ({ caption, options, value, placeholder, onChange, transformLabel, transformValue }) => {
    return (
        <Form.Group as={Row}>
            <Form.Label column sm={4}>{caption}</Form.Label>
            <Col sm={8}>
                <SmartFormControl as="select" value={value || "undefined"} onChange={val => onChange(val)}>
                    <option value={"undefined"} disabled>{placeholder}</option>
                    {options.map(opt => {
                        let k = transformLabel(opt);
                        let v = transformValue(opt);
                        return (
                            <option key={v} value={v}>{k}</option>
                        )
                    }
                    )}
                </SmartFormControl>
            </Col>
        </Form.Group>
    );
}

export const ControlSelect = ({ caption, children, onChange, value }) => (
    <Form.Group as={Row}>
        <Form.Label column sm={4}>{caption}</Form.Label>
        <Col sm={8}>
            <SmartFormControl as="select" value={value || "undefined"} onChange={val => onChange(val)}>
                {children}
            </SmartFormControl>
        </Col>
    </Form.Group>
);

export const ControlImageSelect = ({ caption, children, onChange, value }) => {
    let dict = {};
    React.Children.forEach(children, child => dict[child.props.value] = child.props.image);
    let image = dict[value];
    return (
        <Form.Group as={Row}>
            <Form.Label column sm={4}>{caption}</Form.Label>
            <Col sm={8}>
                <div className="thumbnail-hover">
                    {image && <img src={image} className='thumbnail' alt="" />}
                    <SmartFormControl as="select" value={value || "undefined"} onChange={val => onChange(val)}>
                        {children}
                    </SmartFormControl>
                </div>
            </Col>
        </Form.Group>

    );
}

ControlImageSelect.Option = ({ value, children }) => {
    return (
        <option value={value}>{children}</option>
    )
}