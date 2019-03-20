import React, { Component } from 'react';
import styled from 'styled-components';
import Datepicker from '../../components/Datepicker';
import '../../css/tactic-dashboard/Header.css';
const Container = styled.div`
	height: 2rem;
	color: white;
	font-weight: 700;
	font-size: 1rem;
	background-color: rgb(223, 221, 221);
`;

class Header extends Component {
	render() {
		const { header } = this.props;
		return (
			<Container className="d-flex">
				<div className="p-1 header flex-grow-1 mr-2 text-center">{header}</div>
				<div className="d-flex flex-grow-0 p-1 header">
					Select data of:
					<Datepicker />
				</div>
			</Container>
		);
	}
}

export default Header;
