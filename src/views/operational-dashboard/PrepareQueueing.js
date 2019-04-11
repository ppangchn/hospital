import React, { Component } from "react";
import styled from "styled-components";
import "../../css/operational-dashboard/OperationalDashboard.css";
import { BarChart } from "../../components/EarthChart";

const InQueue = styled.div`
  background-color: rgb(186,226,228);
  color: black;
`

const Queue = styled.div`
  width: 100px;
  height: 50px;
  background-color: white;
  box-shadow: 1px 3px 6px 2px rgb(180, 180, 180);
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


class PrepareQueueing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getChartData(){
    let time = 0
    if(localStorage.getItem('limit')){
      const data = localStorage.getItem('limit').split(',')
      time = (+data[0])*60+(+data[1])
    }
    // console.log('ekceaf',this.props.pick_q);
    const data = this.props.pick_q.map(pre => {
      // console.log('time',pre.time/60);
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
  render() {
    return (
      <InQueue className="col header-container cell ml-1">
        <div className="row">
          <div className="col-3 cell" >
            <div className="d-flex justify-content-center align-items-center cell flex-column">
              <h5>รอจัด[ใบ]</h5>
              <Queue className="d-flex justify-content-center align-items-center">{this.props.pick_q ? this.props.pick_q.length : 0}</Queue>
            </div>
          </div>
          <ChartFrame className="col-9 cell d-flex justify-content-center align-items-center mini-font" >
            <MyChart className="d-flex justify-content-center align-items-center">
              <BarChart data={this.getChartData()}  color={this.getColor()}/>
            </MyChart>
          </ChartFrame>
        </div>
      </InQueue>
    );
  }
}

export default PrepareQueueing;
