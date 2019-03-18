import React, { Component } from 'react';
import Table from './Table';
import Graph from './Graph';
import styled from 'styled-components';
import '../../../css/tactic-dashboard/scenario/Scenario.css';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
	height: 100vh;
	background-color: rgb(224, 222, 223);
`;
class Dashboard extends Component {
	render() {
		return (
			<Container>
				<button
					type="button"
					className="btn btn-sm btn-history pl-3 pr-3"
					onClick={() => this.props.history.push('/tactic/history')}
				>
					Historical Data
				</button>
				<Graph />
				<Table />
			</Container>
		);
	}
}

export default withRouter(Dashboard);
