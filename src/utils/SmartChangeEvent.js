import React from 'react';
import { Form } from 'react-bootstrap';

export function SmartChangeEvent(Component) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.wrapped = React.createRef();
            this.onValueChange = this.onValueChange.bind(this);
        }
        onValueChange() {
            if (this.props.onChange) {
                this.props.onChange(this.wrapped.current.value);
            }
        }
        render() {
            let {onChange, ...others} = this.props;
            return (
                <Component onChange={this.onValueChange} ref={this.wrapped} {...others} />
            );
        }
    }
}

const SmartFormControl = SmartChangeEvent(Form.Control);

export default SmartFormControl;