import React, { Component } from 'react';
import Table from './Table';
import Graph from './Graph';
import styled from 'styled-components';
import '../../../css/tactic-dashboard/scenario/Scenario.css';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
	background-color: rgb(226, 226, 226);
`;
class Dashboard extends Component {
	render() {
		return (
			<Container>
				<Graph />
				<Table />
			</Container>
		);
	}
}

export default withRouter(Dashboard);
