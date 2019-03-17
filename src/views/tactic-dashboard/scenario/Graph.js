import React, { Component } from 'react';
import { BarChart } from '../../../components/BarChart';
import '../../../css/tactic-dashboard/scenario/Scenario.css';
import '../../../css/tactic-dashboard/scenario/Graph.css';
class Graph extends Component {
	render() {
		return (
			<div className="container-fluid scenario-bg">
				<div className="row d-flex justify-content-center font-weight-bold mb-3">Average waiting time of each day</div>
				<div className="row d-flex justify-content-center align-items-center bg-white">
					<BarChart />
				</div>
			</div>
		);
	}
}

export default Graph;
