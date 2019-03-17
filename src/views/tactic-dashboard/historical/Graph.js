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
			yAxis: {
				analyzeByDay:[],
				analyzeByMonth:[],
				analyzeByThreeMonths:[]
			},
			analyze: [],
		};
	}
	setQueryData(props) {
		const { title } = this.state;
		let analyze = [];
		const query = _.get(props.location.state, 'title', "");
		if (query.includes('Day')) analyze = title.analyzeByDay;
		else if (query.includes('ThreeMonths')) analyze = title.analyzeByThreeMonths;
		else if (query.includes('Month')) analyze = title.analyzeByMonth;
		this.setState({ query, analyze });
	}
	componentWillReceiveProps(props) {
		this.setQueryData(props);
	}
	componentDidMount() {
		this.setQueryData(this.props);
	}
	overall() {
		return (
			<div className="d-flex flex-column justify-content-center text-center w-100 m-3 background">
				<div className="mt-5 mb-2 font-weight-bold">
					Average waiting time of processes (1 month)
				</div>
				<div className="d-flex justify-content-center align-items-center graph-background w-80 h-100 mb-5 ml-5 mr-5">
					<BarChart />
				</div>
			</div>
		);
	}
	analyze() {
		const { analyze } = this.state;
		return (
			<div className="d-flex flex-column background text-center w-100 m-3">
				<div className="container">
					<div className="row mt-3">
						{analyze.map(element => {
							return (
								<div className="col-6 mb-2">
									<div className="font-weight-bold">{element}</div>
									<div className="d-flex justify-content-center align-items-center graph-background w-100 analyze-height">
										<BarChart />
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
		return <div className="d-flex w-100">{query ? this.analyze() : this.overall()}</div>;
	}
}

export default withRouter(Graph);
