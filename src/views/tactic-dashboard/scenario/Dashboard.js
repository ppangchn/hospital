import React, { Component } from 'react';
import Table from './Table';
import Graph from './Graph';
import styled from 'styled-components';
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
	}
	componentDidMount() {
		this.unFinishFetchingData();
	}
	render() {
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
					<Graph finishFetchingData={() => this.finishFetchingData()} selectedDate={this.props.selectedDate}/>
					<Table selectedDate={this.props.selectedDate}/>
				</div>
				
			</Container>
		);
	}
}

export default withRouter(Dashboard);
