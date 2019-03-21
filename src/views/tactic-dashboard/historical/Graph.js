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
				XAxisLabel: 'Working Period',
				YAxisLabel: 'Waiting Time',
			},
			analyzeData: [{ data: [], color: [] }],
			XAxisLabel: [],
			YAxisLabel: [],
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
				pickingMonth: `/monthlyPicking`,
				decoctingMonth: `/monthlyDecocting`,
				dispensingMonth: `/monthlyDispense`,
				pickingThreeMonths: `/threeMonthlyPicking`,
				decoctingThreeMonths: `/threeMonthlyDecocting`,
				dispensingThreeMonths: `/threeMonthlyDispense`,
			},
			months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			isItalic: false,
		};
	}
	setQueryData(props) {
		const { title } = this.state;
		let analyze = [];
		const query = _.get(props.location.state, 'title', '');
		if (query.includes('Day')) {
			analyze = title.analyzeByDay;
			this.setAnalyzeDataByDay(query, props);
		} else if (query.includes('ThreeMonths')) {
			analyze = title.analyzeByThreeMonths;
			this.setAnalyzeDataByThreeMonths(query, props);
		} else if (query.includes('Month')) {
			analyze = title.analyzeByMonth;
			this.setAnalyzeDataByMonth(query, props);
		} else if (!query) {
			this.setOverallData('overall',props);
		}
		this.setState({ query, analyze });
	}
	async setOverallData(query,props) {
		const { url } = this.state;
		const { color, XAxisLabel, YAxisLabel } = this.state.overallData;
		const queryUrl = url[query];
		const res = await axios.post(config.url + queryUrl, { date: props.selectedDate });
		const { dateDict } = res.data;
		const dateDictData = [];
		for (let k in dateDict) {
			dateDictData.push({
				name: k,
				Picking: dateDict[k].pick.totalTime / dateDict[k].pick.num,
				Decocting: dateDict[k].decoct.totalTime / dateDict[k].decoct.num,
				Dispensing: dateDict[k].dispense.totalTime / dateDict[k].dispense.num,
			});
		}
		this.props.finishFetchingData();
		this.setState({ overallData: { data: dateDictData, color, XAxisLabel, YAxisLabel }, isItalic: false });
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
		return [formatData1, formatData2, formatData3];
	}
	async setAnalyzeDataByDay(query, props) {
		const { url } = this.state;
		const { analyzeByDayColor } = this.state;
		const queryUrl = url[query];
		const res = await axios.post(config.url + queryUrl, { date: props.selectedDate });
		console.log('data e dok', res.data);
		this.props.finishFetchingData();
		const { timeDict, breakLimit, avgTime } = res.data;
		const [timeDictData, breakLimitData, avgTimeData] = this.formatToGraphData(timeDict, breakLimit, avgTime);
		const analyzeData = [
			{ data: timeDictData, color: analyzeByDayColor },
			{ data: breakLimitData, color: analyzeByDayColor },
			{ data: [], color: analyzeByDayColor },
			{ data: avgTimeData, color: [{ dataKey: 'Time', fill: 'rgb(67,113,202)' }] },
		];
		const YAxisLabel = ['# Prescription', '# Prescription', '# Staff', 'Average Waiting Time (minute)'];
		const XAxisLabel = ['Time', 'Time', 'Time', 'Time'];
		this.setState({ analyzeData, XAxisLabel, YAxisLabel, isItalic: true });
	}
	async setAnalyzeDataByMonth(query, props) {
		const { url } = this.state;
		const { analyzeByMonthColor } = this.state;
		const queryUrl = url[query];
		const res = await axios.post(config.url + queryUrl, { date: props.selectedDate });
		this.props.finishFetchingData();
		const { dateDict, breakLimit, avgDate } = res.data;
		const [dateDictData, breakLimitData, avgDateData] = this.formatToGraphData(dateDict, breakLimit, avgDate);
		const analyzeData = [
			{ data: dateDictData, color: analyzeByMonthColor },
			{ data: breakLimitData, color: analyzeByMonthColor },
			{ data: [], color: analyzeByMonthColor },
			{ data: avgDateData, color: [{ dataKey: 'Time', fill: 'rgb(67,113,202)' }] },
		];
		const YAxisLabel = ['# Prescription', '# Prescription', '# Staff', 'Average Waiting Time (minute)'];
		const XAxisLabel = ['Time', 'Time', 'Time', 'Time'];
		this.setState({ analyzeData, XAxisLabel, YAxisLabel, isItalic: true });
	}
	async setAnalyzeDataByThreeMonths(query, props) {
		const { url, months } = this.state;
		const { analyzeByThreeMonthsColor } = this.state;
		const queryUrl = url[query];
		const res = await axios.post(config.url + queryUrl, { date: props.selectedDate });
		this.props.finishFetchingData();
		const { weekDict, breakLimit, avgThreeMonth } = res.data;
		const weekDictData = [];
		const breakLimitData = [];
		const avgThreeMonthData = [];
		for (let k in weekDict) {
			weekDictData.push({
				name: `${months[k[0]]}-18`,
				Mon: weekDict[k][1],
				Tue: weekDict[k][2],
				Wed: weekDict[k][3],
				Thu: weekDict[k][4],
				Fri: weekDict[k][5],
				Sat: weekDict[k][6],
				Sun: weekDict[k][0],
			});
		}
		for (let k in breakLimit) {
			breakLimitData.push({
				name: `${months[k[0]]}-18`,
				Mon: breakLimit[k][1],
				Tue: breakLimit[k][2],
				Wed: breakLimit[k][3],
				Thu: breakLimit[k][4],
				Fri: breakLimit[k][5],
				Sat: breakLimit[k][6],
				Sun: breakLimit[k][0],
			});
		}
		for (let k in avgThreeMonth) {
			avgThreeMonthData.push({
				name: `${months[k[0]]}-18`,
				Mon: (avgThreeMonth[k][1].totalTime / avgThreeMonth[k][1].num).toFixed(2),
				Tue: (avgThreeMonth[k][2].totalTime / avgThreeMonth[k][2].num).toFixed(2),
				Wed: (avgThreeMonth[k][3].totalTime / avgThreeMonth[k][3].num).toFixed(2),
				Thu: (avgThreeMonth[k][4].totalTime / avgThreeMonth[k][4].num).toFixed(2),
				Fri: (avgThreeMonth[k][5].totalTime / avgThreeMonth[k][5].num).toFixed(2),
				Sat: (avgThreeMonth[k][6].totalTime / avgThreeMonth[k][6].num).toFixed(2),
				Sun: (avgThreeMonth[k][0].totalTime / avgThreeMonth[k][0].num).toFixed(2),
			});
		}
		const analyzeData = [
			{ data: weekDictData, color: analyzeByThreeMonthsColor },
			{ data: breakLimitData, color: analyzeByThreeMonthsColor },
			{ data: [], color: analyzeByThreeMonthsColor },
			{ data: avgThreeMonthData, color: analyzeByThreeMonthsColor },
		];
		const YAxisLabel = [
			'Average # Prescription',
			'Average # Prescription',
			'Average # Staff',
			'Average Waiting Time (minute)',
		];
		const XAxisLabel = ['Time', 'Time', 'Time', 'Time'];
		this.setState({ analyzeData, XAxisLabel, YAxisLabel, isItalic: false });
	}
	componentWillReceiveProps(props) {
		this.setQueryData(props);
	}
	componentDidMount() {
		this.setQueryData(this.props);
	}

	overallData() {
		const { data, color, XAxisLabel, YAxisLabel } = this.state.overallData;
		const { isItalic } = this.state;
		console.log('data', data, 'color', color);
		return (
			<div className="d-flex flex-column justify-content-center text-center w-100 m-3 background">
				<div className="mt-5 mb-2 font-weight-bold">Average waiting time of processes (1 month)</div>
				<div className="d-flex justify-content-center align-items-center graph-background w-80 vh-70 mb-5 ml-5 mr-5">
					<BarChart
						data={data}
						color={color}
						XAxisLabel={XAxisLabel}
						YAxisLabel={YAxisLabel}
						isItalic={isItalic}
					/>
				</div>
			</div>
		);
	}
	analyze() {
		const { analyze, icon, analyzeData, XAxisLabel, YAxisLabel, isItalic } = this.state;
		console.log('analyzedata', analyzeData);
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
											XAxisLabel={XAxisLabel[index]}
											YAxisLabel={YAxisLabel[index]}
											isItalic={isItalic}
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
