import React, { Component } from 'react';
import _ from 'lodash';
import { BarChart } from '../../../components/BarChart';
import { withRouter } from 'react-router-dom';
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
			analyzeData: {
				data: [],
				color: [{ dataKey: 'Prescription', fill: 'rgb(67,113,202)' }],
			},
		};
	}
	setQueryData(props) {
		const { title } = this.state;
		let analyze = [];
		const query = _.get(props.location.state, 'title', '');
		if (query.includes('Day')) {
			analyze = title.analyzeByDay;
			this.setAnalyzeDataByDay();
		} else if (query.includes('ThreeMonths')) {
			analyze = title.analyzeByThreeMonths;
			this.setAnalyzeDataByThreeMonths();
		} else if (query.includes('Month')) {
			analyze = title.analyzeByMonth;
			this.setAnalyzeDataByMonth();
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
	setAnalyzeDataByDay() {
		const color = [{ dataKey: 'Prescription', fill: 'rgb(67,113,202)' }];
		const data = [
			{ name: '7:00-8:00', Prescription: 12 },
			{ name: '8:00-9:00', Prescription: 40 },
			{ name: '9:00-10:00', Prescription: 21 },
			{ name: '10:00-11:00', Prescription: 4 },
			{ name: '11:00-12:00', Prescription: 4 },
			{ name: '12:00-13:00', Prescription: 4 },
			{ name: '13:00-14:00', Prescription: 4 },
			{ name: '14:00-15:00', Prescription: 4 },
			{ name: '15:00-16:00', Prescription: 4 },
		];
		this.setState({ analyzeData: { data, color } });
	}
	setAnalyzeDataByMonth() {
		const color = [{ dataKey: 'Prescription', fill: 'rgb(67,113,202)' }];
		const data = [
			{ name: '7:00-8:00', Prescription: 12 },
			{ name: '8:00-9:00', Prescription: 40 },
			{ name: '9:00-10:00', Prescription: 21 },
			{ name: '10:00-11:00', Prescription: 4 },
			{ name: '11:00-12:00', Prescription: 4 },
			{ name: '12:00-13:00', Prescription: 4 },
			{ name: '13:00-14:00', Prescription: 4 },
			{ name: '14:00-15:00', Prescription: 4 },
			{ name: '15:00-16:00', Prescription: 4 },
		];
		this.setState({ analyzeData: { data, color } });
	}
	setAnalyzeDataByThreeMonths() {
		const color = [
			{ dataKey: 'Mon', fill: 'rgb(251,165,2)' },
			{ dataKey: 'Tue', fill: 'rgb(254,152,252)' },
			{ dataKey: 'Wed', fill: 'rgb(145,209,79)' },
			{ dataKey: 'Thu', fill: 'rgb(253,153,52)' },
			{ dataKey: 'Fri', fill: 'rgb(159,195,232)' },
			{ dataKey: 'Sat', fill: 'rgb(152,1,212)' },
			{ dataKey: 'Sun', fill: 'rgb(194,0,3)' }
		];
		const data = [
			{ name: '7:00-8:00', Mon: 12 ,Tue:1,Wed:2,Thu:4,Fri:10,Sat:12,Sun:10},
			{ name: '8:00-9:00', Mon: 12 ,Tue:1,Wed:2,Thu:4,Fri:10,Sat:12,Sun:10 },
			{ name: '9:00-10:00', Mon: 12 ,Tue:1,Wed:2,Thu:4,Fri:10,Sat:12,Sun:10 },
		];
		this.setState({ analyzeData: { data, color } });
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
		const { analyze, icon } = this.state;
		const { data, color } = this.state.analyzeData;
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
										<BarChart data={data} color={color} yAxis={'Prescription'} />
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
