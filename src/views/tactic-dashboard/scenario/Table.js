import React, { Component } from 'react';
import '../../../css/tactic-dashboard/scenario/Table.css';
class Table extends Component {
	constructor() {
		super();
		this.state = { day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] };
	}
	render() {
		return (
			<div className="container-fluid mb-4 pb-3 table-bg">
				<div className="row p-2">
					<button className="button pl-4 pr-4 mr-2 font-weight-bold">Day Policy</button>
					<button className="button pl-4 pr-4 font-weight-bold">Weekday - Weekend Policy</button>
				</div>
				<div className="row ml-4 mr-4 mt-4 mb-2 d-flex justify-content-center">
					<table className="text-center">
						<tr className="table-border cell-header-bg">
							<th className="border-right pl-4 pr-4">Day</th>
							<th className="border-right pl-4 pr-4">Average prescription per day</th>
							<th className="border-right pl-4 pr-4">Average number of staff</th>
							<th className="border-right pl-4 pr-4">Average waiting time [minute]</th>
							<th className="border-right pl-4 pr-4">Number of staff input</th>
							<th className="border-right pl-4 pr-4">Estimated waiting time [minute]</th>
						</tr>
						<tr className="table-border cell-bg">
							<td className="border-right">Mon</td>
							<td className="border-right">Berglunds snabbköp</td>
							<td className="border-right">Berglunds snabbköp</td>
							<td className="border-right">Berglunds snabbköp</td>
							<td className="border-right">Berglunds snabbköp</td>
							<td className="border-right">Berglunds snabbköp</td>
						</tr>
						<tr className="table-border cell-bg">
							<td>Tue</td>
							<td className="border-right">Berglunds snabbköp</td>
							<td className="border-right">Berglunds snabbköp</td>
							<td className="border-right">Berglunds snabbköp</td>
							<td className="border-right">Berglunds snabbköp</td>
							<td className="border-right">Berglunds snabbköp</td>
						</tr>
						<tr className="table-border cell-bg">
							<td>Wed</td>
							<td className="border-right">Berglunds snabbköp</td>
							<td className="border-right">Berglunds snabbköp</td>
							<td className="border-right">Berglunds snabbköp</td>
							<td className="border-right">Berglunds snabbköp</td>
							<td className="border-right">Berglunds snabbköp</td>
						</tr>
						<tr className="table-border cell-bg">
							<td>Thu</td>
							<td className="border-right">Berglunds snabbköp</td>
							<td className="border-right">Berglunds snabbköp</td>
							<td className="border-right">Berglunds snabbköp</td>
							<td className="border-right">Berglunds snabbköp</td>
							<td className="border-right">Berglunds snabbköp</td>
						</tr>
					</table>
				</div>
				<div className="row d-flex justify-content-end mr-5">
					<div className="font-weight-bold col-1-margin">Overall average waiting time: 23.14</div>
                    <button className="button font-weight-bold col-2-margin">Enter input Number</button>
					<div className="font-weight-bold col-3-margin">Overall average waiting time: 23.14</div>
				</div>
			</div>
		);
	}
}

export default Table;
