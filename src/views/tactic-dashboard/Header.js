import React, { Component } from 'react';
import styled from 'styled-components';
import Datepicker from '../../components/Datepicker';
import Monthpicker from '../../components/Monthpicker';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import '../../css/tactic-dashboard/Header.css';
const Container = styled.div`
	height: 2rem;
	color: white;
	font-weight: 700;
	font-size: 1rem;
	background-color: rgb(223, 221, 221);
`;

class Header extends Component {
	constructor() {
		super();
		this.state = { mode: '' };
	}
	setQueryData(props) {
		let mode = '';
		const query = _.get(props.location.state, 'title', '');
		// console.log(query)
		if (query.includes('Day')) {
			mode = 'Day';
		} else if (query.includes('ThreeMonths')) {
			mode = 'Month';
		} else if (query.includes('Month')) {
		} else {
			mode = 'Month';
		}
		this.setState({ mode });
	}
	componentWillReceiveProps(props) {
		this.setQueryData(props);
	}
	componentDidMount() {
		this.setQueryData(this.props);
	}
	render() {
		const { header } = this.props;
		const { mode } = this.state;
		return (
			<Container className="d-flex">
				<div className="p-1 header flex-grow-1 mr-2 text-center">{header}</div>
				<div className="d-flex flex-grow-0 p-1 header">
					Select data of:&nbsp;
					{mode === 'Day' ? <Datepicker setSelectedDate={this.props.setSelectedDate} /> : <Monthpicker setSelectedDate={this.props.setSelectedDate}/>}
				</div>
			</Container>
		);
	}
}

export default withRouter(Header);
