import React, { Component } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styled from 'styled-components';

const MySwal = withReactContent(Swal);
const Container = styled.div`
	background-color: rgb(223, 221, 221);
	height: 105vh;
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
	color: black;
	font-size: 1.5em;
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
				// return await Axios.post("http://localhost:5001/setStaff", this.state);
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
		const res = await Axios.get('http://localhost:5000/limit');
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
					<Title className="col center">
						<div>Limit Time Setting</div>
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
					<div className="col-2" />
					<div className="col-4 d-flex justify-content-center align-items-center flex-column">
						<Header className="staff-cell pick d-flex justify-content-center align-items-center">
							Waiting time for Picking{' '}
						</Header>
						<div className=" d-flex justify-content-center align-items-center" style={{ fontSize: '12px' }}>
							{this.state.pick ? (
								<Detail className="d-flex flex-column">
									<div className="d-flex">
										<div className="font-weight-bold">min:&nbsp;</div>
										{this.state.pick.min.toFixed(2)}&nbsp;
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">max:&nbsp;</div>
										{this.state.pick.max.toFixed(2)}&nbsp;
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">avg:&nbsp;</div>
										{this.state.pick.avg.toFixed(2)}&nbsp;
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">p80:&nbsp;</div>
										{this.state.pick.per80.toFixed(2)}&nbsp;
									</div>
								</Detail>
							) : (
								<Detail>
									<div className="font-weight-bold">min: -</div>
									<div className="font-weight-bold">max: -</div>
									<div className="font-weight-bold">avg: -</div>
									<div className="font-weight-bold">per80: -</div>
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
					<div className="col-2" />
				</div>
				<div className="row mt-3">
				<div className="col-2" />
					<div className="col-4 d-flex justify-content-center align-items-center flex-column">
						<Header className="staff-cell decoct d-flex justify-content-center align-items-center">
							Waiting time for Decocting{' '}
						</Header>
						<div className="d-flex justify-content-center align-items-center" style={{ fontSize: '12px' }}>
							{this.state.decoct ? (
								<Detail className="d-flex flex-column">
									<div className="d-flex">
										<div className="font-weight-bold">min:&nbsp;</div>
										{this.state.decoct.min.toFixed(2)}&nbsp;
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">max:&nbsp;</div>
										{this.state.decoct.max.toFixed(2)}&nbsp;
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">avg:&nbsp;</div>
										{this.state.decoct.avg.toFixed(2)}&nbsp;
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">p80:&nbsp;</div>
										{this.state.decoct.per80.toFixed(2)}&nbsp;
									</div>
								</Detail>
							) : (
								<Detail>
									<div className="font-weight-bold">min: -</div>
									<div className="font-weight-bold">max: -</div>
									<div className="font-weight-bold">avg: -</div>
									<div className="font-weight-bold">per80: -</div>
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
				<div className="col-2" />
					<div className="col-4 d-flex justify-content-center align-items-center flex-column">
						<Header className="staff-cell dis d-flex justify-content-center align-items-center">
							Waiting time for Dispensing{' '}
						</Header>
						<div className="d-flex justify-content-center align-items-center" style={{ fontSize: '12px' }}>
							{this.state.dispense ? (
								<Detail className="d-flex flex-column">
									<div className="d-flex">
										<div className="font-weight-bold">min:&nbsp;</div>
										{this.state.dispense.min.toFixed(2)}&nbsp;
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">max:&nbsp;</div>
										{this.state.dispense.max.toFixed(2)}&nbsp;
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">avg:&nbsp;</div>
										{this.state.dispense.avg.toFixed(2)}&nbsp;
									</div>
									<div className="d-flex">
										<div className="font-weight-bold">p80:&nbsp;</div>
										{this.state.dispense.per80.toFixed(2)}&nbsp;
									</div>
								</Detail>
							) : (
								<Detail>
									<div className="font-weight-bold">min: -</div>
									<div className="font-weight-bold">max: -</div>
									<div className="font-weight-bold">avg: -</div>
									<div className="font-weight-bold">per80: -</div>
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

export default LimitDashboard;
