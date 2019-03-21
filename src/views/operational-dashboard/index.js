import React, { Component } from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
class OperationalDashboard extends Component {

	constructor(props) {
		super(props)
		this.state ={
			isLoading: false
		}
		
	}

	setLoading = (i) => {
		this.setState({isLoading:i})
	}
	render() {
		return (
			<div>
				<Header isLoading={this.state.isLoading}/>
				<Dashboard setLoading={this.setLoading}/>
			</div>
		);
	}
}

export default OperationalDashboard;
