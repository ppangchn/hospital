import React, { Component } from 'react';
import { BarChart } from '../../../components/BarChart';
import axios from 'axios';
import { config } from '../../../config';
import '../../../css/tactic-dashboard/scenario/Scenario.css';
import '../../../css/tactic-dashboard/scenario/Graph.css';
class Graph extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			color: [{ dataKey: 'Actual', fill: 'rgb(86,140,215)' }, { dataKey: 'InputPolicy', fill: 'rgb(230,108,6)' }],
		};
	}
	async getData(props) {
		console.log(props.selectedDate);
		const res = await axios.post(config.url + '/scenario', { date: props.selectedDate });
		this.props.finishFetchingData();
		console.log(res.data);
		const { dateDict } = res.data;
		const dateData = [];
		for (let k in dateDict) {
			dateData.push({
				name: k,
				Actual: (dateDict[k].totalTime / dateDict[k].num || 0).toFixed(2),
				InputPolicy: 0,
			});
		}
		this.setState({ data: dateData });
		console.log(dateData);
	}
	componentWillReceiveProps(props) {
		this.getData(props);
	}
	componentDidMount() {
		this.getData(this.props);
	}
	render() {
		const { data, color } = this.state;
		return (
			<div className="container-fluid scenario-bg">
				<div className="row d-flex justify-content-center font-weight-bold mb-3">
					Average Waiting Time (Actual v.s. Trial)
				</div>
				<div className="row d-flex justify-content-center align-items-center bg-white">
					<BarChart data={data} color={color} XAxisLabel="Day of Month" YAxisLabel="Waiting time (minute)" />
				</div>
			</div>
		);
	}
}

export default Graph;
