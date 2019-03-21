import React, { Component } from 'react';
import Table from './Table';
import Graph from './Graph';
import styled from 'styled-components';
import '../../../css/tactic-dashboard/scenario/Scenario.css';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

const Container = styled.div`
	background-color: rgb(226, 226, 226);
`;
class Dashboard extends Component {
	constructor(params) {
		this.state={}
	}

	async getData() {
		const res = await Axios.post('',{})
		const {data} = res;
		this.setState(data)
	}

	componentDidMount(){
		this.getData()
	}
	render() {
		return (
			<Container>
				<Graph data={this.state.data}/>
				<Table data={this.state.data}/>
			</Container>
		);
	}
}

export default withRouter(Dashboard);
