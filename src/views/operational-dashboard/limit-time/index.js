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
	background: red;
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
class LimitDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			theDate: new Date(),
			hour_pick: 0,
			min_pick: 0,
			hour_decoct: 0,
			min_decoct: 0,
			hour_dis: 0,
			min_dis: 0,
		};
	}
	async staffSubmit() {
		MySwal.fire({
			title: 'Submit limit time?',
			type: 'question',
			showCancelButton: true,
			confirmButtonText: 'submit',
			confirmButtonColor: '#DC3545',
			cancelButtonColor: 'black',
			showLoaderOnConfirm: true,
			reverseButtons: true,
			preConfirm: async () => {
				// return await Axios.post("https://us-central1-dashboard-backend-4e571.cloudfunctions.net/staffdash/setStaff", this.state);
				localStorage.setItem(
					'limit',
					`${this.state.hour_pick},${this.state.min_pick},${this.state.hour_decoct},${
					this.state.min_decoct
					},${this.state.hour_dis},${this.state.min_dis}`
				);
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
				}).then(() => this.props.history.push('/'));
		});
	}
	componentDidMount() {
		this.getData();
		if (localStorage.getItem('limit')) {
			const data = localStorage.getItem('limit').split(',');
			this.setState({
				hour_pick: data[0],
				min_pick: data[1],
				hour_decoct: data[2],
				min_decoct: data[3],
				hour_dis: data[4],
				min_dis: data[5],
			});
		}
	}
	async getData() {
		const res = await Axios.get('https://us-central1-dashboard-backend-4e571.cloudfunctions.net/dashboard/limit');
		// console.log(res.data);
		this.setState(res.data);
		// const { data } = res;
		// data.length === 1 ? this.setState(data[0]) : // console.log("not recieve");
	}
	handleChangeHP(e) {
		this.setState({ hour_pick: e.target.value });
	}
	handleChangeMP(e) {
		this.setState({ min_pick: e.target.value });
	}
	handleChangeHD(e) {
		this.setState({ hour_decoct: e.target.value });
	}
	handleChangeMD(e) {
		this.setState({ min_decoct: e.target.value });
	}
	handleChangeHDI(e) {
		this.setState({ hour_dis: e.target.value });
	}
	handleChangeMDI(e) {
		this.setState({ min_dis: e.target.value });
	}

	render() {
		const { theDate } = this.state;
		return (
			<Container className="col pt-4">
				<div className="row">
					<Title className="col center d-flex justify-content-center align-items-center  flex-row">
						<i className="fas fa-chart-line mr-2" style={{ fontSize: '75px' }} /><div>Limit Time Setting</div>
					</Title>
				</div>
				<SubTitle className="row mt-4 mb-4">
					<div className="col center">{theDate ? new Date(theDate).toDateString() : ''}</div>
				</SubTitle>

				<Header className="row mt-3">
					<div className="col-6 center" />
					<div className="col-2 d-flex justify-content-center align-items-center ">
						<div className="staff-cell time d-flex justify-content-center align-items-center"> Hours </div>
					</div>
					<div className="col-2 d-flex justify-content-center align-items-center ">
						<div className="staff-cell time d-flex justify-content-center align-items-center">
							{' '}
							Minutes{' '}
						</div>
						<div className="col-2" />
					</div>
				</Header>
				<div className="row mt-3">
					<div className="col-1"></div>
					<div className="col-1 d-flex justify-content-center align-items-center flex-column" >
						<i className="fas fa-file-prescription" style={{ fontSize: '100px', color: 'rgb(58,124,130)' }} />
					</div>

					<div className="col-4 d-flex justify-content-center align-items-center flex-column">
						<Header className="staff-cell  pick d-flex justify-content-center align-items-center">
							<span>Waiting time for Picking{' '}</span>
						</Header>
						<div className=" d-flex justify-content-center align-items-center" style={{ fontSize: '12px' }}>
							{this.state.pick ? (
								<Detail className="d-flex flex-column">
									<div className="d-flex">
										<div className="font-weight-bold">min:&nbsp;</div>
										{parseInt(this.state.pick.min / 60)}&nbsp; Hr {parseInt(this.state.pick.min % 60)} Min
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">max:&nbsp;</div>
										{parseInt(this.state.pick.max / 60)}&nbsp; Hr {parseInt(this.state.pick.max % 60)} Min
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">avg:&nbsp;</div>
										{parseInt(this.state.pick.avg / 60)}&nbsp; Hr {parseInt(this.state.pick.avg % 60)} Min
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">p80:&nbsp;</div>
										{parseInt(this.state.pick.per80 / 60)}&nbsp; Hr {parseInt(this.state.pick.per80 % 60)} Min
									</div>
								</Detail>
							) : (
									<Detail>
										<div className="font-weight-bold">min: Loading . . .</div>
										<div className="font-weight-bold">max: Loading . . .</div>
										<div className="font-weight-bold">avg: Loading . . .</div>
										<div className="font-weight-bold">per80: Loading . . .</div>
									</Detail>
								)}
						</div>
					</div>
					<Detail className="col-2 d-flex justify-content-center align-items-center">
						<input type="number" value={this.state.hour_pick} onChange={this.handleChangeHP.bind(this)} />
					</Detail>
					<Detail className="col-2 d-flex justify-content-center align-items-center">
						{' '}
						<input type="number" value={this.state.min_pick} onChange={this.handleChangeMP.bind(this)} />
					</Detail>
					<div className="col-2" >

					</div>
				</div>
				<div className="row mt-3">
					<div className="col-1"></div>
					<div className="col-1 d-flex justify-content-center align-items-center" >
						<i className="fas fa-mug-hot" style={{ fontSize: '100px', color: 'rgb(79,129,69)' }} />
					</div>
					<div className="col-4 d-flex justify-content-center align-items-center flex-column">
						<Header className="staff-cell decoct d-flex justify-content-center align-items-center">
							Waiting time for Decocting{' '}
						</Header>
						<div className="d-flex justify-content-center align-items-center" style={{ fontSize: '12px' }}>
							{this.state.decoct ? (
								<Detail className="d-flex flex-column">
									<div className="d-flex">
										<div className="font-weight-bold">min:&nbsp;</div>
										{parseInt(this.state.decoct.min / 60)}&nbsp; Hr {parseInt(this.state.decoct.min % 60)} Min
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">max:&nbsp;</div>
										{parseInt(this.state.decoct.max / 60)}&nbsp; Hr {parseInt(this.state.decoct.max % 60)} Min
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">avg:&nbsp;</div>
										{parseInt(this.state.decoct.avg / 60)}&nbsp; Hr {parseInt(this.state.decoct.avg % 60)} Min
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">p80:&nbsp;</div>
										{parseInt(this.state.decoct.per80 / 60)}&nbsp; Hr {parseInt(this.state.decoct.per80 % 60)} Min
									</div>
								</Detail>
							) : (
									<Detail>
										<div className="font-weight-bold">min: Loading . . .</div>
										<div className="font-weight-bold">max: Loading . . .</div>
										<div className="font-weight-bold">avg: Loading . . .</div>
										<div className="font-weight-bold">per80: Loading . . .</div>
									</Detail>
								)}
						</div>
					</div>
					<Detail className="col-2 d-flex justify-content-center align-items-center">
						<input type="number" value={this.state.hour_decoct} onChange={this.handleChangeHD.bind(this)} />
					</Detail>
					<Detail className="col-2 d-flex justify-content-center align-items-center">
						<input type="number" value={this.state.min_decoct} onChange={this.handleChangeMD.bind(this)} />
					</Detail>
					<div className="col-2" />
				</div>
				<div className="row mt-3">
					<div className="col-1"></div>
					<div className="col-1 d-flex justify-content-center align-items-center" >
						<i className="fas fa-handshake" style={{ fontSize: '100px', color: 'rgb(84,66,118)' }} />
					</div>
					<div className="col-4 d-flex justify-content-center align-items-center flex-column">
						<Header className="staff-cell dis d-flex justify-content-center align-items-center">
							Waiting time for Dispensing{' '}
						</Header>
						<div className="d-flex justify-content-center align-items-center" style={{ fontSize: '12px' }}>
							{this.state.dispense ? (
								<Detail className="d-flex flex-column">
									<div className="d-flex">
										<div className="font-weight-bold">min:&nbsp;</div>
										{parseInt(this.state.dispense.min / 60)}&nbsp; Hr {parseInt(this.state.dispense.min % 60)} Min
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">max:&nbsp;</div>
										{parseInt(this.state.dispense.max / 60)}&nbsp; Hr {parseInt(this.state.dispense.max % 60)} Min
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">avg:&nbsp;</div>
										{parseInt(this.state.dispense.avg / 60)}&nbsp; Hr {parseInt(this.state.dispense.avg % 60)} Min
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">p80:&nbsp;</div>
										{parseInt(this.state.dispense.per80 / 60)}&nbsp; Hr {parseInt(this.state.dispense.per80 % 60)} Min
									</div>
								</Detail>
							) : (
									<Detail>
										<div className="font-weight-bold">min: Loading . . .</div>
										<div className="font-weight-bold">max: Loading . . .</div>
										<div className="font-weight-bold">avg: Loading . . .</div>
										<div className="font-weight-bold">per80: Loading . . .</div>
									</Detail>
								)}
						</div>
					</div>
					<Detail className="col-2 d-flex justify-content-center align-items-center">
						<input type="number" value={this.state.hour_dis} onChange={this.handleChangeHDI.bind(this)} />
					</Detail>
					<Detail className="col-2 d-flex justify-content-center align-items-center">
						<input type="number" value={this.state.min_dis} onChange={this.handleChangeMDI.bind(this)} />
					</Detail>
					<div className="col-2" />
				</div>
				<div className="row mt-3">
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

export default LimitDashboard;
