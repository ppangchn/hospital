import React, { Component } from 'react';

class Input extends Component {
	constructor() {
		super();
		this.state = {
			value: '',
		};
	}
	handleChange(e) {
		const { value } = e.target;
		this.setState({ value });
		this.props.addInputValue(this.props.index, value);
    }
    setValue(value) {
        this.setState({value})
    }
    componentWillReceiveProps(props) {
        this.setValue(props.value)
    }
	render() {
		const { value } = this.state;
		return <input type="number" onChange={e => this.handleChange(e)} value={value} placeholder="Fill a number" />;
	}
}

export default Input;
