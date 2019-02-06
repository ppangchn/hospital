import React, { Component } from 'react';
import Queue from './Queue';
import Dashboard from './Dashboard';
class OperationalDashboard extends Component {
	render() {
		return (
			<div>
				<Queue />
				<Dashboard />
			</div>
		);
	}
}

export default OperationalDashboard;
