import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Input from '../../../components/Input';
import styled from 'styled-components';
import '../../../css/tactic-dashboard/scenario/Table.css';

const Button = styled.button`
	width: 8em;
`
const Two = styled.div`
	position: absolute;
	height: 22px;
	top: 70px;
    left: -12px;
	text-align: center;
	width: 25px;
	background-color: black;
	color: white;
	border-radius: 50%;
	font-weight: bold;
	display: inline-block;
`;
const Three = styled.div`
	position: absolute;
	top: 70px;
    left:190px;
	text-align: center;
	width: 25px;
	background-color: black;
	color: white;
	border-radius: 50%;
	font-weight: bold;
	display: inline-block;
`;
const ButtonBox = styled.div`
	padding-top: 265px;
`
class Table extends Component {
	constructor() {
		super();
		this.state = {
			day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			inputValue: {},
			dataLength: 0,
			dateDictData: [],
			staffData: [],
			avgDateData: [],
			actualTable: [],
			inputTable: [],
			outputValue: {},
			actualOverallAverageWaitingTime: 0,
			inputOverallAverageWaitingTime: 0,
		};
	}
	createActualTable() {
		const { dataLength, dateDictData, staffData, avgDateData } = this.state;
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
		const { dataLength, inputValue, outputValue } = this.state;
		let inputTable = [];
		for (let i = 0; i < dataLength; i++) {
			inputTable.push(
				<tr className={`table-border cell-input${i < 7 ? "-7" : ""}-bg height-input-cell`}>
					<td className="border-right">
						<Input addInputValue={(i, e) => this.addInputValue(i, e)} index={i} value={inputValue[i]} />
					</td>
					<td className="border-right">{outputValue[i]}</td>
				</tr>
			);
		}
		// console.log('input -->', inputTable, dataLength);
		this.setState({ inputTable });
	}

	addInputValue(index, value) {
		const { inputValue } = this.state;
		inputValue[index] = +value;
		this.setState({ inputValue });
		// console.log(inputValue);
	}
	setSevenDaysUniform() {
		const { inputValue, dataLength } = this.state;
		for (let i = 7; i < dataLength; i++) {
			inputValue[i] = inputValue[i % 7];
		}
		// console.log(inputValue);
		this.setState({ inputValue }, () => this.createInputTable());
	}
	calculateData() {
		const { inputValue, dateDictData, outputValue } = this.state;
		console.log(inputValue)
		for (let k in inputValue) {
			console.log(dateDictData[k].Prescription)
			outputValue[k] = (27.49 + (0.1423 * dateDictData[k].Prescription) - 3.009 * (inputValue[k])).toFixed(2)
		}
		this.setState({ inputValue, outputValue }, () => this.createInputTable())
		this.props.setUserTrialOutput(outputValue)
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
		const { inputValue, dataLength ,outputValue} = this.state;
		for (let i = 0; i < dataLength; i++) {
			inputValue[i] = 0;
			outputValue[i] = 0;
		}
		// console.log('input ->', inputValue);
		this.setState({ inputValue,outputValue }, () => this.createInputTable());
		this.props.setUserTrialOutput(outputValue)
	}
	initialInputValue() {
		const { inputValue, dataLength, outputValue } = this.state;
		for (let i = 0; i < dataLength; i++) {
			if (!inputValue[i]) inputValue[i] = 0;
			if (!outputValue[i]) outputValue[i] = 0;
		}
		// console.log('input ->', inputValue);
		this.setState({ inputValue });
	}
	componentWillReceiveProps(props) {
		this.getData(props);
	}
	componentDidMount() {
		this.getData(this.props);
	}
	render() {
		const { inputTable, actualTable, actualOverallAverageWaitingTime, months } = this.state;
		const { selectedDate } = this.props
		return (
			<div className="container-fluid mb-4 pb-3">
				<div className="row ml-4 mr-4 mt-4 mb-2 d-flex justify-content-center">
					<div className="col-6">
						<div className="row">
							<table className="text-center mr-3">
								<tr className="table-border table-header-bg">
									<th colSpan="4" className="border-right pl-4 pr-4">
										Actual Data of {months[selectedDate.getMonth()]} {selectedDate.getUTCFullYear()}
									</th>
								</tr>
								<tr className="table-border cell-actual-header-bg">
									<th className="border-right pl-4 pr-4 height-input-header">Day</th>
									<th className="border-right pl-4 pr-4 height-input-header">Count of prescriptions per day</th>
									<th className="border-right pl-4 pr-4 height-input-header">Number of staffs per day</th>
									<th className="border-right pl-4 pr-4 height-input-header">Average waiting time [minute]</th>
								</tr>
								{actualTable}
								<tr className="table-border cell-actual-bg">
									<td colspan="4" className="pr-2 text-right border-right height-actual-cell font-weight-bold">
										Overall average waiting time: {actualOverallAverageWaitingTime}
									</td>
								</tr>
							</table>
						</div>
					</div>
					<div className="col-4">
						<div className="row ">
							<table className="text-center">
								<tr className="table-border table-header-bg">
									<th colSpan="2" className="border-right pl-4 pr-4">
										User's Trial
									</th>
								</tr>
								<tr className="table-border cell-input-header-bg">
									<th className="border-right pl-4 pr-4 height-input-header">
										Number of staff input
									</th>
									<th className="border-right pl-4 pr-4 height-input-header">
										Estimated waiting time [minute]
									</th>
								</tr>
								{inputTable}
								<tr className={`table-border cell-input-bg height-input-cell`}>
									<td colspan="4" className="pr-2 text-right border-right font-weight-bold">
										Overall average waiting time: 23.14
									</td>
								</tr>
							</table>
						</div>

						<Two>2</Two>
						<Three>3</Three>
					</div>
					<ButtonBox className="col-2 text-center d-flex flex-column">
						<div className="mb-auto">
							<Button className="button font-weight-bold" onClick={() => this.setSevenDaysUniform()}>
								7 Days Uniform
								</Button>
						</div>
						<div className="mb-3">
							<Button className="button font-weight-bold" onClick={() => this.clearInput()}>
								Clear input
								</Button>
						</div>
						<div className="">
							<Button className="button font-weight-bold" onClick={() => this.calculateData()}>Calculate</Button>
						</div>
					</ButtonBox>
				</div>
				<div className="row ml-4 mt-4">
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
