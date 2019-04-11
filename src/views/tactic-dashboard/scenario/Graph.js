import React, { Component } from 'react';
import { BarChart } from '../../../components/BarChart';
import '../../../css/tactic-dashboard/scenario/Scenario.css';
import '../../../css/tactic-dashboard/scenario/Graph.css';
class Graph extends Component {
	constructor() {
		super();
		this.state = {
			analyzeData: [],
			color: [{ dataKey: 'Actual', fill: 'rgb(86,140,215)' }, { dataKey: 'InputPolicy', fill: 'rgb(230,108,6)' }],
			
		};
	}
	componentWillReceiveProps(props) {
		this.setState({ analyzeData: props.analyzeData });
	}
	componentDidMount() {
		const { analyzeData } = this.props;
		this.setState({ analyzeData });
	}
	render() {
		const { analyzeData, color } = this.state;
		console.log(analyzeData,this.props.selectedDate)
		// console.log('ana',analyzeData)
		return (
			<div className="container-fluid scenario-bg">
				<div className="row d-flex justify-content-center font-weight-bold mb-3">
					Average Waiting Time (Actual VS Trial)
				</div>
				<div className="row d-flex justify-content-center align-items-center bg-white">
					<BarChart
						data={analyzeData.actualData}
						color={color}
						XAxisLabel="Date"
						YAxisLabel="Waiting time (minute)"
					/>
				</div>
			</div>
		);
	}
}

export default Graph;
