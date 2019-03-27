import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { MonthPicker } = DatePicker;
class Monthpicker extends Component {
	constructor(props) {
		super(props);
		this.state = { date: new Date() };
	}

	handleDayChange(date, datestring) {
		// console.log(new Date(date), datestring);
		this.setState({ date });
		this.props.setSelectedDate(new Date(date));
	}

	render() {
		const { date } = this.state;
		return (
			<MonthPicker
				onChange={(date, datestring) => this.handleDayChange(date, datestring)}
				placeholder="Select Month..."
				format="MMM YYYY"
				size="small"
				value={moment(date)}
			/>
		);
	}
}
export default Monthpicker;
