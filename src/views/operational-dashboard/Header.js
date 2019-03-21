import React, { Component } from "react";
import "../../css/operational-dashboard/Header.css";
import "../../css/Layout.css";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props);
    return (
      <div className="d-flex bd-highlight  mb-2">
        <div className="p-2 bd-highlight  " style={{ width: "100px" }}>
          <div className="flex-fill header-container  d-flex align-items-center justify-content-center">
            {this.props.isLoading ? (
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="p-2 flex-grow-1 bd-highlight row">
          <div className="col header-container ml-1 ">รอคิว</div>
          <div className="col header-container ml-1 ">กำลังทำงาน</div>
        </div>
      </div>
    );
  }
}

export default Header;
