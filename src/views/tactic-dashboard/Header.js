import React, { Component } from 'react';
import styled from 'styled-components';
const Container = styled.div`
    height: 2rem;
    color: white;
    font-weight: 700;
	font-size: 1rem;
	background-color: rgb(223, 221, 221);
`

class Header extends Component {
	render() {
		const {header} = this.props
		return (
			<Container className="d-flex">
				<div className="p-1 header flex-grow-1 mr-2 text-center">{header}</div>
				<div className="p-1 header" >Select data of:</div>
			</Container>
		);
	}
}

export default Header;
