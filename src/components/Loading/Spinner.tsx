import React from "react";
import "./spinner.scss";

class Spinner extends React.Component {
  render() {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
  }
}

export default Spinner;
