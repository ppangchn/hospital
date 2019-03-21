import React, { Component } from 'react';
import Header from '../Header';
import Dashboard from './Dashboard';
class Historical extends Component {
	constructor() {
		super();
		this.state = {selectedDate: new Date()}
	}
	setSelectedDate(date) {
		this.setState({ selectedDate: date });
	}
	render() {
		const { selectedDate } = this.state;
		return (
			<div className="d-flex flex-column">
				<Header header="Historical data" setSelectedDate={e => this.setSelectedDate(e)} />
				<Dashboard selectedDate={selectedDate} />
			</div>
		);
	}
}

export default Historical;
