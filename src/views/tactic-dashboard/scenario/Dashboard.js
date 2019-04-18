import React, { Component } from 'react';
import Table from './Table';
import Graph from './Graph';
import styled from 'styled-components';
import axios from 'axios';
import { config } from '../../../config';
import '../../../css/tactic-dashboard/scenario/Scenario.css';
import { withRouter } from 'react-router-dom';
import Instruction from './Instruction';

const Container = styled.div`
	background-color: rgb(226, 226, 226);
`;
const Spinner = styled.div`
	position: absolute;
	top: 48%;
	left: 48%;
`;
const One = styled.div`
	position: absolute;
	height: 22px;
	top: 40px;
	right: 1em;
	text-align: center;
	width: 25px;
	background-color: black;
	color: white;
	border-radius: 50%;
	font-weight: bold;
	display: inline-block;
`;
const Calculate = styled.div`
position: absolute;
top: 220px;
left: 550px;
font-weight: bold;
font-size: 20px;
`
class Dashboard extends Component {
	constructor() {
		super();
		this.state = { analyzeData: [], userTrialOutput: {} };
	}
	formatToGraphData(data1, data2, data3, data4) {
		let formatData1 = [];
		let formatData2 = [];
		let formatData3 = [];
		let formatData4 = [];
		for (let k in data1) {
			formatData1.push({ name: k, Prescription: data1[k] });
		}
		for (let k in data2) {
			formatData2.push({ name: k, Prescription: data2[k] });
		}
		for (let k in data3) {
			formatData3.push({ name: k, Time: (data3[k].totalTime / data3[k].num || 0).toFixed(2) });
		}
		for (let k in data3) {
			formatData4.push({ name: k, Actual: (data3[k].totalTime / data3[k].num || 0).toFixed(2), InputPolicy: data4[k] });
		}
		return [formatData1, formatData2, formatData3, formatData4];
	}
	async setAnalyzeDataByMonth(props) {
		const { selectedDate } = props;
		const { userTrialOutput } = this.state;
		const res = await axios.post(config.url + '/monthlyPicking', { date: selectedDate });
		const resStaff = await axios.post(config.staffUrl + '/getStaffByMonth', { date: selectedDate });
		this.finishFetchingData();
		this.finishCalculate();
		const { dateDict, breakLimit, avgDate } = res.data;
		const staff = resStaff.data;
		const modeStaff = 'pick';
		const staffData = [];
		const [dateDictData, breakLimitData, avgDateData, actualData] = this.formatToGraphData(
			dateDict,
			breakLimit,
			avgDate,
			userTrialOutput
		);
		for (let k in staff) {
			staffData.push({ name: k, Staff: staff[k][`full_${modeStaff}`] + staff[k][`part_${modeStaff}`] });
		}
		const analyzeData = { dateDictData, breakLimitData, avgDateData, actualData, staffData };
		console.log('ana', analyzeData)
		this.setState({ analyzeData });
	}
	finishFetchingData() {
		const spinner1 = document.getElementById('spinner1');
		const spinner2 = document.getElementById('spinner2');
		const spinner3 = document.getElementById('spinner3');
		const loading = document.getElementById('loading');
		const graph = document.getElementById('graph');
		spinner1.hidden = true;
		spinner2.hidden = true;
		spinner3.hidden = true;
		loading.hidden = true;
		graph.hidden = false;
	}
	unFinishFetchingData() {
		const spinner1 = document.getElementById('spinner1');
		const spinner2 = document.getElementById('spinner2');
		const spinner3 = document.getElementById('spinner3');
		const loading = document.getElementById('loading');
		const graph = document.getElementById('graph');
		spinner1.hidden = false;
		spinner2.hidden = false;
		spinner3.hidden = false;
		loading.hidden = false;
		graph.hidden = true;
	}
	finishCalculate() {
		const calculate = document.getElementById('calculate')
		calculate.hidden = true;
	}
	unFinishCalculate() {
		const calculate = document.getElementById('calculate')
		calculate.hidden = false;
	}
	setUserTrialOutput(userTrialOutput) {
		this.setState({ userTrialOutput }, () => this.setAnalyzeDataByMonth(this.props))
		this.unFinishCalculate()
	}
	componentWillReceiveProps(props) {
		this.unFinishFetchingData();
		this.finishCalculate();
		this.setAnalyzeDataByMonth(props);
	}
	componentDidMount() {
		this.unFinishFetchingData();
		this.finishCalculate();
		this.setAnalyzeDataByMonth(this.props);
	}
	render() {
		const { analyzeData, userTrialOutput } = this.state;
		return (
			<Container>
				<Spinner class="d-flex justify-content-center align-items-center">
					<div id="spinner1" class="spinner-grow text-dark" role="status" />
					<div id="spinner2" class="spinner-grow text-dark" role="status" />
					<div id="spinner3" class="spinner-grow text-dark" role="status" />
					<div id="loading" class="text-center">
						Loading...
					</div>
				</Spinner>
				<div id="graph" class="w-100">
					<div className="d-flex">
						<Graph selectedDate={this.props.selectedDate} analyzeData={analyzeData} userTrialOutput={userTrialOutput} />
						<Instruction />
						<Calculate id="calculate" className="calculate">Calculating<span>.</span><span>.</span><span>.</span></Calculate>
					</div>

					<Table selectedDate={this.props.selectedDate} analyzeData={analyzeData} setUserTrialOutput={(e) => this.setUserTrialOutput(e)} />
					<One>1</One>
				</div>
			</Container>
		);
	}
}

export default withRouter(Dashboard);
