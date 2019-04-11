import React, { Component } from 'react';
import _ from 'lodash';
import { BarChart } from '../../../components/BarChart';
import { withRouter } from 'react-router-dom';
import { config } from '../../../config';
import axios from 'axios';
import '../../../css/tactic-dashboard/historical/Graph.css';
import '../../../css/Layout.css';
import { MonthChart } from '../../../components/MonthChart';
import styled from 'styled-components';
import '../../../css/tactic-dashboard/BarChart.css';

const Title = styled.div`
	font-size: 2em;
`;
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
				<i className="fas fa-file-medical d-flex align-items-center" />,
				<i className="fas fa-exclamation-circle d-flex align-items-center" />,
				<i className="fas fa-users d-flex align-items-center" />,
				<i className="fas fa-clock d-flex align-items-center" />,
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
				YAxisLabel: 'Average Waiting Time',
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
			staffUrl: {
				pickingDay: `/getStaffByMont`,
				decoctingDay: `/getStaffByMont`,
				dispensingDay: `/getStaffByMont`,
				pickingMonth: `/getStaffByMonth`,
				decoctingMonth: `/getStaffByMonth`,
				dispensingMonth: `/getStaffByMonth`,
				pickingThreeMonths: `/getStaffByThreeMonth`,
				decoctingThreeMonths: `/getStaffByThreeMonth`,
				dispensingThreeMonths: `/getStaffByThreeMonth`,
			},
			months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			weekend: [],
			isItalic: false,
			limitTime: 60,
		};
	}
	getWeekend(month, year) {
		let getTot = this.daysInMonth(month, year); //Get total days in a month
		let weekend = [];
		for (let i = 1; i <= getTot; i++) {
			//looping through days in month
			let newDate = new Date(year, month - 1, i);
			if (newDate.getDay() === 0) {
				//if Sunday
				weekend.push('sun');
			} else if (newDate.getDay() === 6) {
				//if Saturday
				weekend.push('sat');
			} else {
				weekend.push(0);
			}
		}
		this.setState({ weekend });
	}
	daysInMonth(month, year) {
		return new Date(year, month, 0).getDate();
	}
	handleLimit(value) {
		this.setState(
			{
				limitTime: value,
			},
			() => this.setQueryData(this.props)
		);
		// console.log('set', value);
		this.props.unFinishFetchingData();
		// this.setQueryData(this.props)
	}
	setQueryData(props) {
		const { title } = this.state;
		let analyze = [];
		const query = _.get(props.location.state, 'title', '');
		if (query.includes('Day')) {
			if (query.includes('dispensing'))
				analyze = [
					'Number of prescriptions',
					'Number of prescriptions exceeded limit time',
					'Average waiting time',
				];
			else analyze = title.analyzeByDay;
			this.setAnalyzeDataByDay(query, props);
		} else if (query.includes('ThreeMonths')) {
			analyze = title.analyzeByThreeMonths;
			this.setAnalyzeDataByThreeMonths(query, props);
		} else if (query.includes('Month')) {
			analyze = title.analyzeByMonth;
			const month = props.selectedDate.getMonth() + 1;
			const year = props.selectedDate.getUTCFullYear();
			// console.log(month, year);
			this.getWeekend(month, year);
			this.setAnalyzeDataByMonth(query, props);
		} else if (!query) {
			this.setOverallData('overall', props);
		}
		this.setState({ query, analyze });
	}
	formatToGraphDataDay(data1, data2, data3) {
		const formatData1 = [];
		const formatData2 = [];
		const formatData3 = [];
		for (let k in data1) {
			if (k >= 5 && k <= 19) {
				formatData1.push({ name: `${k}-${+k + 1}`, Prescription: data1[k] });
			}
		}
		for (let k in data2) {
			if (k >= 5 && k <= 19) {
				formatData2.push({ name: `${k}-${+k + 1}`, Prescription: data2[k] });
			}
		}
		for (let k in data3) {
			if (k >= 5 && k <= 19) {
				formatData3.push({ name: `${k}-${+k + 1}`, Time: (data3[k].totalTime / data3[k].num || 0).toFixed(2) });
			}
		}
		return [formatData1, formatData2, formatData3];
	}
	formatToGraphDataMonth(data1, data2, data3) {
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
			formatData3.push({ name: k, Time: (data3[k].totalTime / data3[k].num || 0).toFixed(2) });
		}
		return [formatData1, formatData2, formatData3];
	}
	async setOverallData(query, props) {
		const { url } = this.state;
		const { color, XAxisLabel, YAxisLabel } = this.state.overallData;
		const queryUrl = url[query];
		const res = await axios.post(config.url + queryUrl, { date: props.selectedDate });
		const { dateDict } = res.data;
		const dateDictData = [];
		for (let k in dateDict) {
			if (k >= 5 && k <= 19) {
				dateDictData.push({
					name: `${k}-${+k + 1}`,
					Picking: (dateDict[k].pick.totalTime / dateDict[k].pick.num || 0).toFixed(2),
					Decocting: (dateDict[k].decoct.totalTime / dateDict[k].decoct.num || 0).toFixed(2),
					Dispensing: (dateDict[k].dispense.totalTime / dateDict[k].dispense.num || 0).toFixed(2),
				});
			}
		}
		this.props.finishFetchingData();
		console.log(res.data)
		this.setState({ overallData: { data: dateDictData, color, XAxisLabel, YAxisLabel }, isItalic: false });
	}

	async setAnalyzeDataByDay(query, props) {
		// console.log(this.state.limitTime);
		const { url, limitTime } = this.state;
		const { analyzeByDayColor } = this.state;
		const queryUrl = url[query];
		const res = await axios.post(config.url + queryUrl, { date: props.selectedDate, limit: limitTime });
		// console.log(res.data);
		this.props.finishFetchingData();
		const { timeDict, breakLimit, staffDict, avgTime } = res.data;
		const [timeDictData, breakLimitData, avgTimeData] = this.formatToGraphDataDay(timeDict, breakLimit, avgTime);

		const staffData = [];
		for (let k in staffDict) {
			if (k >= 5 && k <= 19) {
				staffData.push({ name: `${k}-${+k+1}`, Staff: staffDict[k] });
			}
		}
		if (query.includes('dispensing')) {
			const analyzeData = [
				{ data: timeDictData, color: analyzeByDayColor },
				{ data: breakLimitData, color: analyzeByDayColor },
				{ data: avgTimeData, color: [{ dataKey: 'Time', fill: 'rgb(67,113,202)' }] },
			];
			const YAxisLabel = ['# Prescription', '# Prescription', 'Average Waiting Time (minute)'];
			const XAxisLabel = ['Time', 'Time', 'Time'];
			this.setState({ analyzeData, XAxisLabel, YAxisLabel, isItalic: true });
		} else {
			const analyzeData = [
				{ data: timeDictData, color: analyzeByDayColor },
				{ data: breakLimitData, color: analyzeByDayColor },
				{ data: staffData, color: [{ dataKey: 'Staff', fill: 'rgb(67,113,202)' }] },
				{ data: avgTimeData, color: [{ dataKey: 'Time', fill: 'rgb(67,113,202)' }] },
			];
			const YAxisLabel = ['# Prescription', '# Prescription', '# Staff', 'Average Waiting Time (minute)'];
			const XAxisLabel = ['Time', 'Time', 'Time', 'Time'];
			console.log(analyzeData)
			this.setState({ analyzeData, XAxisLabel, YAxisLabel, isItalic: true });
		}
	}
	async setAnalyzeDataByMonth(query, props) {
		// console.log(this.state.limitTime);
		const { url, limitTime, staffUrl } = this.state;
		const { analyzeByMonthColor } = this.state;
		const queryUrl = url[query];
		const staffQueryUrl = staffUrl[query];
		const res = await axios.post(config.url + queryUrl, { date: props.selectedDate, limit: limitTime });
		const resStaff = await axios.post(config.staffUrl + staffQueryUrl, { date: props.selectedDate });
		this.props.finishFetchingData();
		const { dateDict, breakLimit, avgDate } = res.data;
		const staff = resStaff.data;
		const modeStaff = query.includes('pick')
			? query.substring(0, 4)
			: query.includes('decoct')
				? query.substring(0, 6)
				: 'dis';
		const staffData = [];
		const [dateDictData, breakLimitData, avgDateData] = this.formatToGraphDataMonth(dateDict, breakLimit, avgDate);
		for (let k in staff) {
			staffData.push({ name: k, Staff: staff[k][`full_${modeStaff}`] + staff[k][`part_${modeStaff}`] });
		}
		const analyzeData = [
			{ data: dateDictData, color: analyzeByMonthColor },
			{ data: breakLimitData, color: analyzeByMonthColor },
			{ data: staffData, color: [{ dataKey: 'Staff', fill: 'rgb(67,113,202)' }] },
			{ data: avgDateData, color: [{ dataKey: 'Time', fill: 'rgb(67,113,202)' }] },
		];
		const YAxisLabel = ['# Prescription', '# Prescription', '# Staff', 'Average Waiting Time (minute)'];
		const XAxisLabel = ['Date', 'Date', 'Date', 'Date'];
		this.setState({ analyzeData, XAxisLabel, YAxisLabel, isItalic: true });
	}
	async setAnalyzeDataByThreeMonths(query, props) {
		// console.log(this.state.limitTime);
		const { url, months, limitTime, staffUrl } = this.state;
		const { analyzeByThreeMonthsColor } = this.state;
		const queryUrl = url[query];
		const staffQueryUrl = staffUrl[query];
		const res = await axios.post(config.url + queryUrl, { date: props.selectedDate, limit: limitTime });
		const resStaff = await axios.post(config.staffUrl + staffQueryUrl, { date: props.selectedDate });
		this.props.finishFetchingData();
		const { weekDict, breakLimit, avgThreeMonth } = res.data;
		const staff = resStaff.data;
		const weekDictData = [];
		const breakLimitData = [];
		const avgThreeMonthData = [];
		const modeStaff = query.includes('pick')
			? query.substring(0, 4)
			: query.includes('decoct')
				? query.substring(0, 6)
				: 'dis';
		const staffData = [];
		for (let k in staff) {
			let date = _.split(k, '_');
			staffData.push({
				name: `${months[date[0]]}-${date[1]}`,
				Mon: staff[k][1][`full_${modeStaff}`] + staff[k][1][`part_${modeStaff}`] || 0,
				Tue: staff[k][2][`full_${modeStaff}`] + staff[k][1][`part_${modeStaff}`] || 0,
				Wed: staff[k][3][`full_${modeStaff}`] + staff[k][1][`part_${modeStaff}`] || 0,
				Thu: staff[k][4][`full_${modeStaff}`] + staff[k][1][`part_${modeStaff}`] || 0,
				Fri: staff[k][5][`full_${modeStaff}`] + staff[k][1][`part_${modeStaff}`] || 0,
				Sat: staff[k][6][`full_${modeStaff}`] + staff[k][1][`part_${modeStaff}`] || 0,
				Sun: staff[k][0][`full_${modeStaff}`] + staff[k][1][`part_${modeStaff}`] || 0,
			});
		}
		for (let k in weekDict) {
			let date = _.split(k, '_');
			weekDictData.push({
				name: `${months[date[0]]}-${date[1]}`,
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
			let date = _.split(k, '_');
			breakLimitData.push({
				name: `${months[date[0]]}-${date[1]}`,
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
			let date = _.split(k, '_');
			avgThreeMonthData.push({
				name: `${months[date[0]]}-${date[1]}`,
				Mon: (avgThreeMonth[k][1].totalTime / avgThreeMonth[k][1].num || 0).toFixed(2),
				Tue: (avgThreeMonth[k][2].totalTime / avgThreeMonth[k][2].num || 0).toFixed(2),
				Wed: (avgThreeMonth[k][3].totalTime / avgThreeMonth[k][3].num || 0).toFixed(2),
				Thu: (avgThreeMonth[k][4].totalTime / avgThreeMonth[k][4].num || 0).toFixed(2),
				Fri: (avgThreeMonth[k][5].totalTime / avgThreeMonth[k][5].num || 0).toFixed(2),
				Sat: (avgThreeMonth[k][6].totalTime / avgThreeMonth[k][6].num || 0).toFixed(2),
				Sun: (avgThreeMonth[k][0].totalTime / avgThreeMonth[k][0].num || 0).toFixed(2),
			});
		}
		const analyzeData = [
			{ data: weekDictData, color: analyzeByThreeMonthsColor },
			{ data: breakLimitData, color: analyzeByThreeMonthsColor },
			{ data: staffData, color: analyzeByThreeMonthsColor },
			{ data: avgThreeMonthData, color: analyzeByThreeMonthsColor },
		];
		const YAxisLabel = [
			'Average # Prescription',
			'Average # Prescription',
			'Average # Staff',
			'Average Waiting Time (minute)',
		];
		const XAxisLabel = ['Month', 'Month', 'Month', 'Month'];
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
		// console.log(_.get(this.props.location.state, 'title', ''));
		return (
			<div className="d-flex flex-column justify-content-center text-center w-100 m-3 background">
				<Title className="mt-5 mb-2 font-weight-bold">Average waiting time of processes (1 month)</Title>
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
		const { analyze, icon, analyzeData, XAxisLabel, YAxisLabel, isItalic, weekend,limitTime } = this.state;
		// console.log(this.state.analyzeData);
		return (
			<div className="d-flex flex-column background text-center w-100 m-3">
				<div className="container">
					<div className="row mt-3 mb-3">
						{analyze.map((element, index) => {
							return (
								<div key={index} className="col-6 mb-2">
									<div
										className="font-weight-bold d-flex justify-content-center mb-1"
										style={{ fontSize: '1.2em' }}
									>
										{icon[index]}&nbsp;{element}
										{element.includes('exceeded limit time') ? (
											<div className="ml-2 dropdown">
												<button
													className="btn btn-dropdown dropdown-toggle btn-sm"
													type="button"
													id="dropdownMenuButton"
													data-toggle="dropdown"
													aria-haspopup="true"
													aria-expanded="false"
												>
													{limitTime}&nbsp;Min
												</button>

												<div
													className="dropdown-menu text-center"
													aria-labelledby="dropdownMenuButton"
												>
													<div
														className="btn dropdown-item"
														onClick={() => {
															this.handleLimit(10);
														}}
													>
														10 Min
													</div>
													<div
														className="btn dropdown-item"
														onClick={() => {
															this.handleLimit(20);
														}}
													>
														20 Min
													</div>
													<div
														className="btn dropdown-item"
														onClick={() => {
															this.handleLimit(30);
														}}
													>
														30 Min
													</div>
													<div
														className="btn dropdown-item"
														onClick={() => {
															this.handleLimit(40);
														}}
													>
														40 Min
													</div>
													<div
														className="btn dropdown-item"
														onClick={() => {
															this.handleLimit(50);
														}}
													>
														50 Min
													</div>
													<div
														className="btn dropdown-item"
														onClick={() => {
															this.handleLimit(60);
														}}
													>
														60 Min
													</div>
													<div
														className="btn dropdown-item"
														onClick={() => {
															this.handleLimit(70);
														}}
													>
														70 Min
													</div>
													<div
														className="btn dropdown-item"
														onClick={() => {
															this.handleLimit(80);
														}}
													>
														80 Min
													</div>
													<div
														className="btn dropdown-item"
														onClick={() => {
															this.handleLimit(90);
														}}
													>
														90 Min
													</div>
													<div
														className="btn dropdown-item"
														onClick={() => {
															this.handleLimit(100);
														}}
													>
														100 Min
													</div>
													<div
														className="btn dropdown-item"
														onClick={() => {
															this.handleLimit(110);
														}}
													>
														110 Min
													</div>
													<div
														className="btn dropdown-item"
														onClick={() => {
															this.handleLimit(120);
														}}
													>
														120 Min
													</div>
												</div>
											</div>
										) : null}
									</div>
									<div className="d-flex justify-content-center align-items-center graph-background w-100 analyze-height">
										{_.get(this.props.location.state, 'title', '').includes('Month') &&
											!_.get(this.props.location.state, 'title', '').includes('ThreeMonths') ? (
												<MonthChart
													data={_.get(analyzeData[index], 'data', [])}
													color={_.get(analyzeData[index], 'color', [])}
													XAxisLabel={XAxisLabel[index]}
													YAxisLabel={YAxisLabel[index]}
													isItalic={isItalic}
													weekend={weekend}
												/>
											) : (
												<BarChart
													data={_.get(analyzeData[index], 'data', [])}
													color={_.get(analyzeData[index], 'color', [])}
													XAxisLabel={XAxisLabel[index]}
													YAxisLabel={YAxisLabel[index]}
													isItalic={isItalic}
												/>
											)}
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
