import React, { Component } from 'react';
import Header from '../Header';
import Dashboard from './Dashboard';
class Scenario extends Component {
	render() {
		return (
			<div className="d-flex flex-column">
				<Header header="Scenario Test of Medicine Picking Staff" />
				<Dashboard />
			</div>
		);
	}
}

export default Scenario;
