import React, { Component } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styled from 'styled-components';
const MySwal = withReactContent(Swal);
const Container = styled.div`
	background-color: rgb(223, 221, 221);
	height: 100vh;
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
			reverseButtons: true,
			preConfirm: async () => {
				return await Axios.post('http://localhost:5001/setStaff', this.state);
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then(result => {
			// console.log(result);
			// this.getData()
			if (result.value)
				MySwal.fire('Successful', 'Your data has been set', 'success').then(() => this.props.history.push('/'));
		});
	}
	componentDidMount() {
		this.getData();
	}
	async getData() {
		const res = await Axios.get('http://localhost:5001/getStaff');
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
			<Container className="">
				<div className="row pt-5">
					<div className="col center">
						<h1>Number of Assigned Staffs</h1>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col center">{theDate ? new Date(theDate).toDateString() : ''}</div>
				</div>

				<div className="row mt-4">
					<div className="col center" />
					<div className="col d-flex justify-content-center align-items-center ">
						<div className="staff-cell time d-flex justify-content-center align-items-center">
							{' '}
							Full-Time{' '}
						</div>
					</div>
					<div className="col d-flex justify-content-center align-items-center ">
						<div className="staff-cell time d-flex justify-content-center align-items-center">
							{' '}
							Part-Time{' '}
						</div>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col  d-flex justify-content-center align-items-center">
						<div className="staff-cell pick d-flex justify-content-center align-items-center"> Picker </div>
					</div>
					<div className="col d-flex justify-content-center align-items-center">
						<input type="number" value={this.state.full_pick} onChange={this.handleChangeFP.bind(this)} />
					</div>
					<div className="col center">
						{' '}
						<input type="number" value={this.state.part_pick} onChange={this.handleChangePP.bind(this)} />
					</div>
				</div>
				<div className="row mt-4">
					<div className="col d-flex justify-content-center align-items-center">
						<div className="staff-cell decoct d-flex justify-content-center align-items-center">
							{' '}
							Decocting operator
						</div>
					</div>
					<div className="col center">
						<input type="number" value={this.state.full_decoct} onChange={this.handleChangeFD.bind(this)} />
					</div>
					<div className="col center">
						<input type="number" value={this.state.part_decoct} onChange={this.handleChangePD.bind(this)} />
					</div>
				</div>
				<div className="row mt-4">
					<div className="col d-flex justify-content-center align-items-center">
						<div className="staff-cell dis d-flex justify-content-center align-items-center">
							{' '}
							Dispensing operator
						</div>
					</div>
					<div className="col center">
						<input type="number" value={this.state.full_dis} onChange={this.handleChangeFDI.bind(this)} />
					</div>
					<div className="col center" />
				</div>
				<div className="row mt-4">
					<div className="col d-flex justify-content-center align-items-center">
						<BackButton
							className="btn mr-3"
							onClick={() => {
								this.props.history.push('/');
							}}
						>
							Back
						</BackButton>
						<button
							className="btn btn-danger"
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
