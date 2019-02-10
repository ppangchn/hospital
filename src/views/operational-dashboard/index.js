import React, { Component } from 'react';
import Dashboard from './Dashboard';
class OperationalDashboard extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col d-flex align-content-center justify-content-center header">
						Operational Dashboard
					</div>
				</div>
				<Dashboard />
			</div>
		);
	}
}

export default OperationalDashboard;
