import React, { Component } from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import styled from 'styled-components';
const Container = styled.div`
	height: 100vh;
`;
class OperationalDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
		};
	}

	setLoading = i => {
		this.setState({ isLoading: i });
	};
	render() {
		return (
			<Container className="d-flex flex-column">
				<Header isLoading={this.state.isLoading} />
				<Dashboard setLoading={this.setLoading} />
			</Container>
		);
	}
}

export default OperationalDashboard;
