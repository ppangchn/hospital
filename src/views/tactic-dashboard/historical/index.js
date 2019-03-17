import React, { Component } from 'react';
import Header from '../Header';
import Dashboard from './Dashboard';
class Historical extends Component {
	render() {
		return (
			<div className="d-flex flex-column">
				<Header header="Historical data" />
				<Dashboard />
			</div>
		);
	}
}

export default Historical;
