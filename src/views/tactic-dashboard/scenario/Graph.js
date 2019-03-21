import React, { Component } from 'react';
import { BarChart } from '../../../components/BarChart';
import '../../../css/tactic-dashboard/scenario/Scenario.css';
import '../../../css/tactic-dashboard/scenario/Graph.css';
class Graph extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			color: [
				{ dataKey: 'InputPolicy', fill: 'rgb(230,108,6)' },
				{ dataKey: 'Actual', fill: 'rgb(86,140,215)' },
			],
		};
	}
	setData() {
        const data = [
            { name: '7:00-8:00', Actual:10, InputPolicy:10 },
            { name: '7:00-8:00', Actual:10, InputPolicy:10 },
            { name: '7:00-8:00', Actual:10, InputPolicy:10 },
            { name: '7:00-8:00', Actual:10, InputPolicy:10 },
            { name: '7:00-8:00', Actual:10, InputPolicy:10 },
            { name: '7:00-8:00', Actual:10, InputPolicy:10 },
            { name: '7:00-8:00', Actual:10, InputPolicy:10 },
            { name: '7:00-8:00', Actual:10, InputPolicy:10 },
            { name: '7:00-8:00', Actual:10, InputPolicy:10 },
            { name: '7:00-8:00', Actual:10, InputPolicy:10 },
            { name: '7:00-8:00', Actual:10, InputPolicy:10 },
        ];
        this.setState({data})
    }
	componentDidMount() {
		this.setData();
	}
	render() {
        const {data,color} =this.state
		return (
			<div className="container-fluid scenario-bg">
				<div className="row d-flex justify-content-center font-weight-bold mb-3">
					Average Waiting Time (Actual v.s. Trial)
				</div>
				<div className="row d-flex justify-content-center align-items-center bg-white">
					<BarChart data={data} color={color} yAxis="Actual"/>
				</div>
			</div>
		);
	}
}

export default Graph;
