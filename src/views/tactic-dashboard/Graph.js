import React, { Component } from 'react';
import { BarChart } from '../../components/BarChart';
import '../../css/Layout.css';
class Graph extends Component {
	overall() {
		return (
			<div className="d-flex flex-column justify-content-center txt-center w-100">
				<div className="">Average waiting time in one month of each process on each working period</div>
				<div>
					<BarChart />
				</div>
			</div>
		);
	}
	render() {
		return <div className="d-flex w-100">{this.overall()}</div>;
	}
}

export default Graph;
