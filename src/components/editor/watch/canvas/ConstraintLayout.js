import React from 'react';
import ConstraintCalculator from './ConstraintCalculator';

export class ConstraintLayout extends React.Component {

    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
        
        this.updateLayout = this.updateLayout.bind(this);
    }

    updateLayout() {
        if (this.key) ConstraintCalculator.deleteGroup(this.key, true);
        this.key = ConstraintCalculator.createGroup();
        React.Children.forEach(this.props.children, child => {
            ConstraintCalculator.register(this.key, child);
        });
        ConstraintCalculator.finalizeGroup(this.key);
        ConstraintCalculator.recomputeGroup(this.key, this.wrapper.current.offsetWidth, this.wrapper.current.offsetHeight);
    }

    componentDidMount() {
        this.updateLayout();
    }

    componentDidUpdate() {
        this.updateLayout();
    }

    componentWillUnmount() {
        if (this.key) ConstraintCalculator.deleteGroup(this.key);
    }

    render() {
        return (
            <div ref={this.wrapper} className={this.props.className} style={this.props.style}>
                {this.props.children}
            </div>
        )
    }

}

export function withConstraints(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                style: ConstraintCalculator.public[this.props.id] || {}
            }
        }
        componentDidMount() {
            ConstraintCalculator.addListener(this.props.id, style => {
                this.setState({
                    style
                });
            });
        }
        componentWillUnmount() {
            ConstraintCalculator.removeListener(this.props.id);
        }
        render() {
            let {style, ...others} = this.props;
			style = {
				...style,
				marginTop: 0,
				marginBottom: 0,
				marginLeft: 0,
				marginRight: 0,
				marginVertical: 0,
				marginHorizontal: 0,
				margin: 0,
				position: 'absolute',
				...this.state.style,
			};
            others = {
                ...others,
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,
                marginVertical: 0,
                marginHorizontal: 0,
                margin: 0,
            };
            return <WrappedComponent style={style} {...others} />
        }
    }
}

export function normalizeStyleProp(WrappedComponent, stylePropName) {
    return class extends React.Component {
        render() {
            let {style, ...others} = this.props;
            others[stylePropName] = style;
            return <WrappedComponent {...others} />
        }
    }
}
