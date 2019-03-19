import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Graph from './Graph';
import styled from 'styled-components';

const Container = styled.div`
	background-color: rgb(223, 221, 221);
	min-height: 100vh;
`;

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = { isLoading: true };
	}
	render() {
		const { isLoading } = this.state;
		return (
			<Container className="d-flex">
				<Sidebar />
				{/* {isLoading ? (
					<div class="w-100 d-flex justify-content-center align-items-center">
						<div class="spinner-border text-primary" role="status" />
					</div>
				) : ( */}
					<Graph />
				{/* )} */}
			</Container>
		);
	}
}

export default Dashboard;
