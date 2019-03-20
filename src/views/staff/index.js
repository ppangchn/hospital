import React, { Component } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class StaffDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theDate: null,
      full_pick: 0,
      full_decoct: 0,
      full_dis: 0,
      part_pick: 0,
      part_decoct: 0
    };
  }
  async staffSubmit() {
    MySwal.fire({
      title: "Submit your staff number",
      showCancelButton: true,
      confirmButtonText: "submit",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return await Axios.post("http://localhost:5001/setStaff", this.state);
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      console.log(result);
      // this.getData()
      if (result.value)
        MySwal.fire("OK", "That thing is still around?", "question");
      else
        MySwal.fire("Cancel", "That thing is still around?", "question");
    });
  }
  componentDidMount() {
    this.getData();
  }
  async getData() {
    const res = await Axios.get("http://localhost:5001/getStaff");
    // console.log(res.data);
    const { data } = res;

    data.length === 1 ? this.setState(data[0]) : console.log("not recieve");
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
      <div>
        staff sas
        <div>theDate : {theDate}</div>
        <div>
          full_pick :{" "}
          <input
            type="number"
            value={this.state.full_pick}
            onChange={this.handleChangeFP.bind(this)}
          />
        </div>
        <div>
          full_decoct :{" "}
          <input
            type="number"
            value={this.state.full_decoct}
            onChange={this.handleChangeFD.bind(this)}
          />
        </div>
        <div>
          full_dis :{" "}
          <input
            type="number"
            value={this.state.full_dis}
            onChange={this.handleChangeFDI.bind(this)}
          />
        </div>
        <div>
          part_pick :{" "}
          <input
            type="number"
            value={this.state.part_pick}
            onChange={this.handleChangePP.bind(this)}
          />
        </div>
        <div>
          part_decoct :{" "}
          <input
            type="number"
            value={this.state.part_decoct}
            onChange={this.handleChangePD.bind(this)}
          />
        </div>
        <button
          className="btn btn-danger"
          onClick={() => {
            this.staffSubmit();
          }}
        >
          submit
        </button>
      </div>
    );
  }
}

export default StaffDashboard;
