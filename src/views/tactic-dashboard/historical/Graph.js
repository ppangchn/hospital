import React, { Component } from 'react';
import _ from 'lodash';
import { BarChart } from '../../../components/BarChart';
import { withRouter } from 'react-router-dom';
import { config } from '../../../config';
import axios from 'axios';
import '../../../css/tactic-dashboard/historical/Graph.css';
import '../../../css/Layout.css';
class Graph extends Component {
	constructor() {
		super();
		this.state = {
			query: '',
			title: {
				analyzeByDay: [
					'Number of prescriptions',
					'Number of prescriptions exceeded limit time',
					'Number of staffs',
					'Average waiting time',
				],
				analyzeByMonth: [
					'Number of prescriptions',
					'Number of prescriptions exceeded limit time',
					'Number of staffs',
					'Average waiting time',
				],
				analyzeByThreeMonths: [
					'Average number of prescriptions',
					'Average number of prescriptions exceeded limit time',
					'Average number of staffs',
					'Average waiting time',
				],
			},
			icon: [
				<i class="fas fa-file-medical" />,
				<i class="fas fa-exclamation-circle" />,
				<i class="fas fa-users" />,
				<i class="fas fa-clock" />,
			],
			analyze: [],
			overallData: {
				data: [],
				color: [
					{ dataKey: 'Picking', fill: 'rgb(230,108,6)' },
					{ dataKey: 'Decocting', fill: 'rgb(86,140,215)' },
					{ dataKey: 'Dispensing', fill: 'rgb(116,146,61)' },
				],
			},
			analyzeData: [{ data: [], color: [] }],
			analyzeByDayColor: [{ dataKey: 'Prescription', fill: 'rgb(67,113,202)' }],

			analyzeByMonthColor: [{ dataKey: 'Prescription', fill: 'rgb(67,113,202)' }],

			analyzeByThreeMonthsColor: [
				{ dataKey: 'Mon', fill: 'rgb(251,165,2)' },
				{ dataKey: 'Tue', fill: 'rgb(254,152,252)' },
				{ dataKey: 'Wed', fill: 'rgb(145,209,79)' },
				{ dataKey: 'Thu', fill: 'rgb(253,153,52)' },
				{ dataKey: 'Fri', fill: 'rgb(159,195,232)' },
				{ dataKey: 'Sat', fill: 'rgb(152,1,212)' },
				{ dataKey: 'Sun', fill: 'rgb(194,0,3)' },
			],
			url: {
				overall: '/overallProcess',
				pickingDay: `/dailyPicking`,
				decoctingDay: `/dailyDecocting`,
				dispensingDay: `/dailyDispense`,
				pickingMonth: `/MonthlyPicking`,
				decoctingMonth: `/MonthlyDecocting`,
				dispensingMonth: `/MonthlyDispense`,
				pickingThreeMonths: `/dailyPicking`,
				decoctingThreeMonths: `/dailyPicking`,
				dispensingThreeMonths: `/dailyPicking`,
			},
		};
	}
	setQueryData(props) {
		const { title } = this.state;
		let analyze = [];
		const query = _.get(props.location.state, 'title', '');
		if (query.includes('Day')) {
			analyze = title.analyzeByDay;
			this.setAnalyzeDataByDay(query);
		} else if (query.includes('ThreeMonths')) {
			analyze = title.analyzeByThreeMonths;
			this.setAnalyzeDataByThreeMonths(query);
		} else if (query.includes('Month')) {
			analyze = title.analyzeByMonth;
			this.setAnalyzeDataByMonth(query);
		}
		this.setState({ query, analyze });
	}
	setOverallData() {
		const { color } = this.state.overallData;
		const data = [
			{ name: '7:00-8:00', Picking: 12, Decocting: 100, Dispensing: 10 },
			{ name: '8:00-9:00', Picking: 12, Decocting: 100, Dispensing: 10 },
			{ name: '9:00-10:00', Picking: 12, Decocting: 100, Dispensing: 10 },
			{ name: '10:00-11:00', Picking: 12, Decocting: 100, Dispensing: 10 },
		];
		this.setState({ overallData: { data, color } });
	}
	formatToGraphData(data1, data2, data3) {
		const formatData1 = [];
		const formatData2 = [];
		const formatData3 = [];
		for (let k in data1) {
			formatData1.push({ name: k, Prescription: data1[k] });
		}
		for (let k in data2) {
			formatData2.push({ name: k, Prescription: data2[k] });
		}
		for (let k in data3) {
			formatData3.push({ name: k, Time: data3[k].totalTime / data3[k].num });
		}
		return [data1, data2, data3];
	}
	async setAnalyzeDataByDay(query) {
		const { url } = this.state;
		const { analyzeByDayColor } = this.state;
		const queryUrl = url[query];
		const res = await axios.get(config.url + queryUrl);
		const { timeDict, breakLimit, avgTime } = res.data;
		const [timeDictData, breakLimitData, avgTimeData] = this.formatToGraphData(timeDict, breakLimit, avgTime);
		const analyzeData = [
			{ data: timeDictData, color: analyzeByDayColor },
			{ data: breakLimitData, color: analyzeByDayColor },
			{ data: [], color: analyzeByDayColor },
			{ data: avgTimeData, color: [{ dataKey: 'Time', fill: 'rgb(67,113,202)' }] },
		];
		this.setState({ analyzeData });
	}
	async setAnalyzeDataByMonth(query) {
		const { url } = this.state;
		const { analyzeByMonthColor } = this.state;
		const queryUrl = url[query];
		const res = await axios.get(config.url + queryUrl);
		const { dateDict, breakLimit, avgTime } = res.data;
		const [dateDictData, breakLimitData, avgTimeData] = this.formatToGraphData(dateDict, breakLimit, avgTime);
		const analyzeData = [
			{ data: dateDictData, color: analyzeByMonthColor },
			{ data: breakLimitData, color: analyzeByMonthColor },
			{ data: [], color: analyzeByMonthColor },
			{ data: avgTimeData, color: [{ dataKey: 'Time', fill: 'rgb(67,113,202)' }] },
		];
		this.setState({ analyzeData });
	}
	async setAnalyzeDataByThreeMonths(query) {
		const { url } = this.state;
		const { analyzeByThreeMonthsColor } = this.state;
		const queryUrl = url[query];
		const res = await axios.get(config.url + queryUrl);
		const { timeDict, breakLimit, avgTime } = res.data;
		const [timeDictData, breakLimitData, avgTimeData] = this.formatToGraphData(timeDict, breakLimit, avgTime);
		const analyzeData = [
			{ data: timeDictData, color: analyzeByThreeMonthsColor },
			{ data: breakLimitData, color: analyzeByThreeMonthsColor },
			{ data: [], color: analyzeByThreeMonthsColor },
			{ data: avgTimeData, color: analyzeByThreeMonthsColor },
		];
		this.setState({ analyzeData });
	}
	componentWillReceiveProps(props) {
		this.setQueryData(props);
	}
	componentDidMount() {
		this.setQueryData(this.props);
		this.setOverallData();
	}

	overallData() {
		const { data, color } = this.state.overallData;
		console.log('data', data, 'color', color);
		return (
			<div className="d-flex flex-column justify-content-center text-center w-100 m-3 background">
				<div className="mt-5 mb-2 font-weight-bold">Average waiting time of processes (1 month)</div>
				<div className="d-flex justify-content-center align-items-center graph-background w-80 h-100 mb-5 ml-5 mr-5">
					<BarChart data={data} color={color} yAxis={'Picking'} />
				</div>
			</div>
		);
	}
	analyze() {
		const { analyze, icon, analyzeData } = this.state;
		return (
			<div className="d-flex flex-column background text-center w-100 m-3">
				<div className="container">
					<div className="row mt-3">
						{analyze.map((element, index) => {
							return (
								<div className="col-6 mb-2">
									<div className="font-weight-bold">
										{icon[index]}&nbsp;{element}
									</div>
									<div className="d-flex justify-content-center align-items-center graph-background w-100 analyze-height">
										<BarChart
											data={_.get(analyzeData[index], 'data', [])}
											color={_.get(analyzeData[index], 'color', [])}
											yAxis={'Prescription'}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
	render() {
		const { query } = this.state;
		return <div className="d-flex w-100">{query ? this.analyze() : this.overallData()}</div>;
	}
}

export default withRouter(Graph);
