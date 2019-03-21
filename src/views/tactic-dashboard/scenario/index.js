import React, { Component } from 'react';
import Header from '../Header';
import Dashboard from './Dashboard';
class Scenario extends Component {
	constructor() {
		super();
		this.state = {selectedDate: new Date()}
	}
	setSelectedDate(date) {
		this.setState({ selectedDate: date });
	}
	render() {
		const {selectedDate} = this.state;
		return (
			<div className="d-flex flex-column">
				<Header
					header="Scenario Test of Medicine Picking Staff"
					setSelectedDate={e => this.setSelectedDate(e)}
				/>
				<Dashboard selectedDate={selectedDate} />
			</div>
		);
	}
}

export default Scenario;
