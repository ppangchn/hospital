import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Input from '../../../components/Input';
import '../../../css/tactic-dashboard/scenario/Table.css';
class Table extends Component {
	constructor() {
		super();
		this.state = {
			day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			inputValue: {},
			dataLength: 0,
			dateDictData: [],
			staffData: [],
			avgDateData: [],
			actualTable: [],
			inputTable: [],
			actualOverallAverageWaitingTime: 0,
			inputOverallAverageWaitingTime: 0,
		};
	}
	createActualTable() {
		const { dataLength, dateDictData, staffData, avgDateData, actualOverallAverageWaitingTime } = this.state;
		let actualTable = [];
		let newActualValue = 0;
		for (let i = 0; i < dataLength; i++) {
			actualTable.push(
				<tr className="table-border cell-actual-bg">
					<td className="border-right height-actual-cell">{dateDictData[i].name}</td>
					<td className="border-right height-actual-cell">{dateDictData[i].Prescription}</td>
					<td className="border-right height-actual-cell">{staffData[i].Staff}</td>
					<td className="border-right height-actual-cell">{avgDateData[i].Time}</td>
				</tr>
			);
			newActualValue += +avgDateData[i].Time;
		}
		newActualValue /= dataLength;
		this.setState({ actualTable, actualOverallAverageWaitingTime: newActualValue.toFixed(2) });
	}
	createInputTable() {
		const { dataLength, inputValue } = this.state;
		let inputTable = [];
		console.log(dataLength);
		for (let i = 0; i < dataLength; i++) {
			inputTable.push(
				<tr className="table-border cell-input-bg height-input-cell">
					<td className="border-right">
						<Input addInputValue={(i, e) => this.addInputValue(i, e)} index={i} value={inputValue[i]} />
					</td>
					<td className="border-right">Berglunds snabbköp</td>
				</tr>
			);
		}
		console.log('input -->', inputTable, dataLength);
		this.setState({ inputTable });
	}

	addInputValue(index, value) {
		const { inputValue } = this.state;
		inputValue[index] = +value;
		this.setState({ inputValue });
		console.log(inputValue);
	}
	setSevenDaysUniform() {
		const { inputValue, dataLength } = this.state;
		for (let i = 7; i < dataLength; i++) {
			inputValue[i] = inputValue[i % 7];
		}
		console.log(inputValue);
		this.setState({ inputValue }, () => this.createInputTable());
	}
	async getData(props) {
		const { dateDictData, staffData, avgDateData } = props.analyzeData;
		this.setState(
			{ dateDictData, staffData, avgDateData, dataLength: avgDateData ? avgDateData.length : 0 },
			() => {
				this.initialInputValue();
				this.createInputTable();
				this.createActualTable();
			}
		);
	}
	clearInput() {
		const { inputValue, dataLength } = this.state;
		for (let i = 0; i < dataLength; i++) {
			inputValue[i] = 0;
		}
		console.log('input ->', inputValue);
		this.setState({ inputValue }, () => this.createInputTable());
	}
	initialInputValue() {
		const { inputValue, dataLength } = this.state;
		for (let i = 0; i < dataLength; i++) {
			if (!inputValue[i]) inputValue[i] = 0;
		}
		console.log('input ->', inputValue);
		this.setState({ inputValue });
	}
	componentWillReceiveProps(props) {
		this.getData(props);
	}
	componentDidMount() {
		this.getData(this.props);
	}
	render() {
		const { inputTable, actualTable, actualOverallAverageWaitingTime, inputOverallAverageWaitingTime } = this.state;
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
								<tr className="table-border cell-actual-header-bg">
									<th className="border-right pl-4 pr-4">Day</th>
									<th className="border-right pl-4 pr-4">Average prescription per day</th>
									<th className="border-right pl-4 pr-4">Average number of staff</th>
									<th className="border-right pl-4 pr-4">Average waiting time [minute]</th>
								</tr>
								{actualTable}
							</table>
						</div>
						<div className="row d-flex justify-content-end mr-1 mt-2">
							<div className="font-weight-bold">
								Overall average waiting time: {actualOverallAverageWaitingTime}
							</div>
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
								<tr className="table-border cell-input-header-bg">
									<th className="border-right pl-4 pr-4 pt-input-header pb-input-header">
										Number of staff input
									</th>
									<th className="border-right pl-4 pr-4 pt-input-header pb-input-header">
										Estimated waiting time [minute]
									</th>
								</tr>
								{inputTable}
							</table>
						</div>
						<div className="row d-flex justify-content-end mr-2 mt-2">
							<div className="font-weight-bold">Overall average waiting time: 23.14</div>
						</div>
					</div>
					<div className="col-2 text-center d-flex">
						<div className="row">
							<div className="col-12 align-item-end">
								<button className="button font-weight-bold" onClick={() => this.setSevenDaysUniform()}>
									7 Days Uniform
								</button>
							</div>
							<div className="col-12 align-item-end">
								<button className="button font-weight-bold" onClick={() => this.clearInput()}>
									Clear input
								</button>
							</div>
							<div className="col-12 align-item-end">
								<button className="button font-weight-bold">Calculate</button>
							</div>
						</div>
					</div>
				</div>
				<div className="row ml-4">
					<button
						type="button"
						className="btn btn-secondary btn-sm w-10 ml-1 mb-4"
						onClick={() => this.props.history.push('/tactic/history')}
					>
						Historical
					</button>
				</div>
			</div>
		);
	}
}

export default withRouter(Table);
