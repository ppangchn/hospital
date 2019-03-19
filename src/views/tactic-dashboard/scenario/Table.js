import React, { Component } from 'react';
import '../../../css/tactic-dashboard/scenario/Table.css';
class Table extends Component {
	constructor() {
		super();
		this.state = { day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] };
	}
	render() {
		return (
			<div className="container-fluid mb-4 pb-3">
				<div className="row ml-4 mr-4 mt-4 mb-2 d-flex justify-content-center">
					<div className="col-6">
						<div className="row">
							<table className="text-center mr-3">
								<tr className="table-border table-header-bg">
									<th colspan="4" className="border-right pl-4 pr-4">
										Actual
									</th>
								</tr>
								<tr className="table-border cell-header-bg">
									<th className="border-right pl-4 pr-4">Day</th>
									<th className="border-right pl-4 pr-4">Average prescription per day</th>
									<th className="border-right pl-4 pr-4">Average number of staff</th>
									<th className="border-right pl-4 pr-4">Average waiting time [minute]</th>
								</tr>
								<tr className="table-border cell-bg">
									<td className="border-right">Mon</td>
									<td className="border-right">Berglunds snabbköp</td>
									<td className="border-right">Berglunds snabbköp</td>
									<td className="border-right">Berglunds snabbköp</td>
								</tr>
								<tr className="table-border cell-bg">
									<td className="border-right">Mon</td>
									<td className="border-right">Berglunds snabbköp</td>
									<td className="border-right">Berglunds snabbköp</td>
									<td className="border-right">Berglunds snabbköp</td>
								</tr>
								<tr className="table-border cell-bg">
									<td className="border-right">Mon</td>
									<td className="border-right">Berglunds snabbköp</td>
									<td className="border-right">Berglunds snabbköp</td>
									<td className="border-right">Berglunds snabbköp</td>
								</tr>
								<tr className="table-border cell-bg">
									<td className="border-right">Mon</td>
									<td className="border-right">Berglunds snabbköp</td>
									<td className="border-right">Berglunds snabbköp</td>
									<td className="border-right">Berglunds snabbköp</td>
								</tr>
							</table>
						</div>
						<div className="row d-flex justify-content-end mr-1 mt-2">
							<div className="font-weight-bold">Overall average waiting time: 23.14</div>
						</div>
					</div>
					<div className="col-4">
						<div className="row">
							<table className="text-center">
								<tr className="table-border table-header-bg">
									<th colspan="2" className="border-right pl-4 pr-4">
										User's Trial
									</th>
								</tr>
								<tr className="table-border cell-header-bg">
									<th className="border-right pl-4 pr-4">Number of staff input</th>
									<th className="border-right pl-4 pr-4">Estimated waiting time [minute]</th>
								</tr>
								<tr className="table-border cell-bg">
									<td className="border-right">Mon</td>
									<td className="border-right">Berglunds snabbköp</td>
								</tr>
								<tr className="table-border cell-bg">
									<td className="border-right">Mon</td>
									<td className="border-right">Berglunds snabbköp</td>
								</tr>
								<tr className="table-border cell-bg">
									<td className="border-right">Mon</td>
									<td className="border-right">Berglunds snabbköp</td>
								</tr>
								<tr className="table-border cell-bg">
									<td className="border-right">Mon</td>
									<td className="border-right">Berglunds snabbköp</td>
								</tr>
							</table>
						</div>
						<div className="row d-flex justify-content-end mt-2">
							<div className="font-weight-bold">Overall average waiting time: 23.14</div>
						</div>
					</div>
					<div className="col-2 text-center">
						<div className="row">
							<div className="col align-item-end">
								<button className="button font-weight-bold">Enter input Number</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Table;
