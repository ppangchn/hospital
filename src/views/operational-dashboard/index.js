import React, { Component } from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
class OperationalDashboard extends Component {
	render() {
		return (
			<div>
				<Header />
				<Dashboard />
			</div>
		);
	}
}

export default OperationalDashboard;
