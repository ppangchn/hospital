import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Graph from './Graph';
import styled from 'styled-components';

const Container = styled.div`
	background-color: rgb(223, 221, 221);
	min-height: 100vh;
`;

class Dashboard extends Component {
	render() {
		return (
			<Container className="d-flex">
				<Sidebar />
				<Graph />
			</Container>
		);
	}
}

export default Dashboard;
