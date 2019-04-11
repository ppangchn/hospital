import React, { Component } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styled from 'styled-components';
const MySwal = withReactContent(Swal);
const Container = styled.div`
	background-color: rgb(223, 221, 221);
	height: 115vh;
`;
const BackButton = styled.div`
	background: black;
	border: 1px solid #000000;
	color: white;
	display: inline;
	&:hover {
		background-color: #303030;
		text-decoration: none;
		color: white;
	}
`;
const Title = styled.div`
	color: black;
	font-size: 3em;
`;
const SubTitle = styled.div`
background: white;
	color: black;
	font-size: 3.5em;
`;
const Header = styled.div`
	font-size: 1.2em;
`;
const Detail = styled.div`
	font-size: 1.25em;
`;
class StaffDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			theDate: new Date(),
			full_pick: 0,
			full_decoct: 0,
			full_dis: 0,
			part_pick: 0,
			part_decoct: 0,
		};
	}
	async staffSubmit() {
		MySwal.fire({
			title: 'Submit your staff number',
			type: 'question',
			showCancelButton: true,
			confirmButtonText: 'submit',
			showLoaderOnConfirm: true,
			confirmButtonColor: '#DC3545',
			cancelButtonColor: 'black',
			reverseButtons: true,
			preConfirm: async () => {
				return await Axios.post('https://us-central1-hospital-app-e6e5e.cloudfunctions.net/staff/setStaff', this.state);
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then(result => {
			// console.log(result);
			// this.getData()
			if (result.value)
				MySwal.fire({
					title: 'Successful',
					type: 'success',
					text: 'Your data has been set.',
					confirmButtonColor: '#DC3545',
				});
		});
	}
	componentDidMount() {
		this.getData();
	}
	async getData() {
		const res = await Axios.get('https://us-central1-hospital-app-e6e5e.cloudfunctions.net/staff/getStaff');
		// // console.log(res.data);
		const { data } = res;

		data.length === 1 ? this.setState(data[0]) : console.log('not recieve');
	}
	handleChangeFP(e) {
		this.setState({ full_pick: e.target.value });
	}
	handleChangeFD(e) {
		this.setState({ full_decoct: e.target.value });
	}
	handleChangeFDI(e) {
		this.setState({ full_dis: e.target.value });
	}
	handleChangePP(e) {
		this.setState({ part_pick: e.target.value });
	}
	handleChangePD(e) {
		this.setState({ part_decoct: e.target.value });
	}

	render() {
		const { theDate } = this.state;
		return (
			<Container className="col">
				<div className="row pt-4">
					<Title className="col center d-flex justify-content-center align-items-center flex-row">
					<i className="fas fa-users mr-2" style={{ fontSize: '75px' }} /><div>{' '}Number of Assigned Staffs</div>
					</Title>
				</div>
				<SubTitle className="row mt-4 mb-4">
					<div className="col center">{theDate ? new Date(theDate).toDateString() : ''}</div>
				</SubTitle>

				<Header className="row mt-4">
					<div className="col-6 center" />
					<div className="col-2 d-flex justify-content-center align-items-center ">
						<div className="staff-cell time d-flex justify-content-center align-items-center">
							{' '}
							Full-Time{' '}
						</div>
					</div>
					<div className="col-2 d-flex justify-content-center align-items-center ">
						<div className="staff-cell time d-flex justify-content-center align-items-center">
							{' '}
							Part-Time{' '}
						</div>
					</div>
					<div className="col-2" />
				</Header>
				<div className="row mt-4">
					<div className="col-2 d-flex justify-content-center align-items-center " ><i className="fas fa-file-medical" style={{ fontSize: '100px' }} /></div>
					<div className="col-4  d-flex justify-content-center align-items-center">
						<Header className="staff-cell pick d-flex justify-content-center align-items-center">
							{' '}
							Picker{' '}
						</Header>
					</div>
					<Detail className="col-2 d-flex justify-content-center align-items-center">
						<input type="number" value={this.state.full_pick} onChange={this.handleChangeFP.bind(this)} />
					</Detail>
					<Detail className="col-2 d-flex justify-content-center align-items-center">
						{' '}
						<input type="number" value={this.state.part_pick} onChange={this.handleChangePP.bind(this)} />
					</Detail>
				</div>
				<div className="row mt-4">
				<div className="col-2 d-flex justify-content-center align-items-center " ><i className="fas fa-mug-hot" style={{ fontSize: '100px' }} /></div>
					<div className="col-4 d-flex justify-content-center align-items-center">
						<Header className="staff-cell decoct d-flex justify-content-center align-items-center">
							{' '}
							Decocting operator
						</Header>
					</div>
					<Detail className="col-2 d-flex justify-content-center align-items-center">
						<input type="number" value={this.state.full_decoct} onChange={this.handleChangeFD.bind(this)} />
					</Detail>
					<Detail className="col-2 d-flex justify-content-center align-items-center">
						<input type="number" value={this.state.part_decoct} onChange={this.handleChangePD.bind(this)} />
					</Detail>
				</div>
				<div className="row mt-4">
				<div className="col-2 d-flex justify-content-center align-items-center " ><i className="fas fa-handshake" style={{ fontSize: '100px' }} /></div>
					<div className="col-4 d-flex justify-content-center align-items-center">
						<Header className="staff-cell dis d-flex justify-content-center align-items-center">
							{' '}
							Dispensing operator
						</Header>
					</div>
					<Detail className="col-2 center">
						<input type="number" value={this.state.full_dis} onChange={this.handleChangeFDI.bind(this)} />
					</Detail>
					<div className="col-2 center" />
				</div>
				<div className="row mt-4">
					<div className="col d-flex justify-content-center align-items-center">
						<button
							className="btn btn-danger mr-3"
							onClick={() => {
								this.props.history.push('/');
							}}
						>
							Back
						</button>
						<button
							className="btn btn-success"
							onClick={() => {
								this.staffSubmit();
							}}
						>
							Submit
						</button>
					</div>
				</div>
			</Container>
		);
	}
}

export default StaffDashboard;
