import React, { Component } from 'react';
import Table from './Table';
import Graph from './Graph';
import styled from 'styled-components';
import axios from 'axios';
import { config } from '../../../config';
import '../../../css/tactic-dashboard/scenario/Scenario.css';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
	background-color: rgb(226, 226, 226);
`;
const Spinner = styled.div`
	position: absolute;
	top: 48%;
	left: 48%;
`;
class Dashboard extends Component {
	constructor() {
		super();
		this.state = { analyzeData: [] };
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
			formatData4.push({ name: k, Actual: (data3[k].totalTime / data3[k].num || 0).toFixed(2), InputPolicy: 0 });
		}
		return [formatData1, formatData2, formatData3, formatData4];
	}
	async setAnalyzeDataByMonth() {
		const { selectedDate } = this.props;
		const res = await axios.post(config.url + '/monthlyPicking', { date: selectedDate });
		const resStaff = await axios.post(config.staffUrl + '/getStaffByMonth', { date: selectedDate });
		this.finishFetchingData();
		const { dateDict, breakLimit, avgDate } = res.data;
		const staff = resStaff.data;
		const modeStaff = 'pick';
		const staffData = [];
		const [dateDictData, breakLimitData, avgDateData, actualData] = this.formatToGraphData(
			dateDict,
			breakLimit,
			avgDate,
			avgDate
		);
		for (let k in staff) {
			staffData.push({ name: k, Staff: staff[k][`full_${modeStaff}`] + staff[k][`part_${modeStaff}`] });
		}
		const analyzeData = { dateDictData, breakLimitData, avgDateData, actualData, staffData };
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
	componentWillReceiveProps() {
		this.unFinishFetchingData();
		this.setAnalyzeDataByMonth();
	}
	componentDidMount() {
		this.unFinishFetchingData();
		this.setAnalyzeDataByMonth();
	}
	render() {
		const { analyzeData } = this.state;
		return (
			<Container>
				<Spinner class="d-flex justify-content-center align-items-center">
					<div id="spinner1" className="spinner-grow text-dark" role="status" />
					<div id="spinner2" className="spinner-grow text-dark" role="status" />
					<div id="spinner3" className="spinner-grow text-dark" role="status" />
					<div id="loading" className="text-center">
						Loading...
					</div>
				</Spinner>
				<div id="graph" className="w-100">
					<Graph selectedDate={this.props.selectedDate} analyzeData={analyzeData} />
					<Table selectedDate={this.props.selectedDate} analyzeData={analyzeData}/>
				</div>
			</Container>
		);
	}
}

export default withRouter(Dashboard);
