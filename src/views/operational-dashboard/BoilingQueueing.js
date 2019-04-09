import React, { Component } from "react";
import styled from "styled-components";
import "../../css/operational-dashboard/OperationalDashboard.css";
import { BarChart } from "../../components/EarthChart";
import Axios from "axios";


const Queue = styled.div`
  width: 100px;
  height: 50px;
  background-color: white;
  box-shadow: 1px 3px 6px 2px rgb(180, 180, 180);
`

const InQueue = styled.div`
  background-color: rgb(173,223,172);
  color: black;
  
`
const MyChart = styled.div`
   background-color: white;
   height: 90%;
   width:90%;
   border-radius: 5% ;
   box-shadow: 1px 3px 6px 2px rgb(180, 180, 180);

`
const ChartFrame = styled.div`
  padding: 0px 0px 0px 0px;
`
class BoilingQueueing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getChartData(){
    let time = 0
    if(localStorage.getItem('limit')){
      const data = localStorage.getItem('limit').split(',')
      time = (+data[2])*60+(+data[3])
    }

    // console.log(time);
    const data = this.props.decoct_q.map(pre => {
      return {
        name: pre.pre_id,
        value: (pre.time/60).toFixed(2),
        limit: time
      }
    })
    return data
  }
  getColor(){
    return [{
      dataKey:"value",
      fill:"#8884d8"
    }]
  }

  render(props) {
    return (
      <InQueue className="col header-container cell ml-1">
        <div className="row">
          <div className="col-3 cell">
            <div className="d-flex justify-content-center align-items-center cell flex-column">
              <h5>รอต้ม[ใบ]</h5>
              <Queue className="d-flex justify-content-center align-items-center">{this.props.decoct_q.length}</Queue>
            </div>
          </div>
          <ChartFrame className="col-9 cell d-flex justify-content-center align-items-center mini-font">
            <MyChart className="d-flex justify-content-center align-items-center cell">
              <BarChart data={this.getChartData()} color={this.getColor()}/>
            </MyChart>
          </ChartFrame>
        </div>
      </InQueue>
    );
  }
}

export default BoilingQueueing;
