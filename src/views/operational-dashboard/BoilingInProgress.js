import React, { Component } from "react";
import styled from "styled-components";
import "../../css/operational-dashboard/OperationalDashboard.css";
import Axios from "axios";

const Queue = styled.div`
  width: 100px;
  height: 50px;
  background-color: white;
  box-shadow: 1px 3px 6px 2px rgb(180, 180, 180);
`;
const Queue1 = styled.div`
  width: 80px;
  height: 40px;
  background-color: white;
  box-shadow: 1px 3px 6px 2px rgb(180, 180, 180);
`;
const Queue2 = styled.div`
  width: 80px;
  height: 40px;
  font-size: 15px;
`;

const InQueue = styled.div`
  background-color: rgb(131, 214, 132);
  color: black;
`;

class BoilingInProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getStaff() {
    let fullTime = 0;
    let partTime = 0;
    let other = 0;
    let f = new Set()
    let p = new Set()
    this.props.decoct.forEach(pre => {
      // // console.log(pre);
      if (pre.o_type === 2) {
        if (pre.parttime === 2) partTime++;
        else if (pre.parttime === 1) {
          if (pre.o_id === 99) other++;
          else {
            if(!(f.has(pre.o_id)) ){
              fullTime++;
              f.add(pre.o_id)

            }
          }
        }
      }
    })
    return [fullTime, partTime, other]
  }
  async componentDidMount() {
    const res = await Axios.get('https://us-central1-hospital-app-e6e5e.cloudfunctions.net/staff/getStaff')
    const { data } = res;
    const staff = data[0]
    this.setState({ staff })
    // console.log('staff',this.state);
  }

  render(props) {
    return (
      <InQueue className="col header-container cell ml-1">
        <div className="row">
          <div className="col-3 cell">
            <div className="d-flex justify-content-center align-items-center cell flex-column">
              <h5>กำลังต้ม[ใบ]</h5>
              <Queue className="d-flex justify-content-center align-items-center">
                {this.props.decoct.length}
              </Queue>
            </div>
          </div>
          <div className="col-9 cell">
            <div className="row mt-4">
              <div className="col">เจ้าหน้าที่</div>
            </div>
            <div className="row">
              <div className="col-7">
                {" "}
                <span style={{ fontSize: "12px" }}>กำลังทำงาน</span>{" "}
              </div>
              <div className="col-5">
                {" "}
                <span style={{ fontSize: "12px" }}>อัตรากำลังวันนี้</span>{" "}
              </div>
            </div>
            <div className="row ">
              <div className="col-7 ">
                <div className="row d-flex justify-content-center align-items-center mr-1">
                  <Queue1 className="d-flex justify-content-center align-items-center mr-1">
                    {this.getStaff()[0]}
                  </Queue1>
                  <Queue1 className="d-flex justify-content-center align-items-center mr-1">
                    {this.getStaff()[1]}
                  </Queue1>

                </div>
              </div>
              <div className="col-5">
                <div className="row d-flex justify-content-center align-items-center mr-1">
                  <Queue1 className="d-flex justify-content-center align-items-center mr-1">
                    {this.state.staff ? this.state.staff.full_decoct : 0}
                  </Queue1>
                  <Queue1 className="d-flex justify-content-center align-items-center mr-1">
                    {this.state.staff ? this.state.staff.part_decoct : 0}
                  </Queue1>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-7 ">
                <div className="row d-flex justify-content-center align-items-center mr-1">
                  <Queue2 className="d-flex justify-content-center align-items-center mr-1">
                    Full-time
                  </Queue2>
                  <Queue2 className="d-flex justify-content-center align-items-center mr-1">
                    Part-time
                  </Queue2>
                </div>
              </div>
              <div className="col-5">
                <div className="row d-flex justify-content-center align-items-center mr-1">
                  <Queue2 className="d-flex justify-content-center align-items-center mr-1">
                    Full-time
                  </Queue2>
                  <Queue2 className="d-flex justify-content-center align-items-center mr-1">
                    Part-time
                  </Queue2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </InQueue>
    );
  }
}

export default BoilingInProgress;
