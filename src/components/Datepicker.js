import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

class Datepicker extends Component {
	constructor(props) {
		super(props);
		this.state = { date: new Date() };
	}

	handleDayChange(date, datestring) {
		this.setState({ date });
		this.props.setSelectedDate(new Date(date));
	}

	render() {
		const { date } = this.state;
		return (
			<DatePicker
				onChange={(date, datestring) => this.handleDayChange(date, datestring)}
				placeholder="Select Date..."
				format="DD MMM YYYY"
				size="small"
                value={moment(date)}
			/>
		);
	}
}
export default Datepicker;
