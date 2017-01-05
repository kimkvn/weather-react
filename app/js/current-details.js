import React from "react";

var CurrentDetails = React.createClass({
  render: function(){
    if(this.props.loading){
      return(
        <div></div>
      )
    }
    return(
      <div className="description-wrap">
        <div className="icon-wrap">
          <i className={this.props.icon}></i>
          <p>{this.props.description}</p>
        </div>

        <div className="weather-stat-wrap">
          <div className="weather-stat">
            <p className="stat-title">Precipitation: </p>
            <p className="stat-value">{this.props.precip}%</p>
          </div>
          <div className="weather-stat">
            <p className="stat-title">Humidity: </p>
            <p className="stat-value">{this.props.humidity}%</p>
          </div>
          <div className="weather-stat">
            <p className="stat-title">Wind: </p>
            <p className="stat-value">{this.props.unitPref == "Imperial" ? this.props.wind : Math.floor((this.props.wind * 1.609344)) } {this.props.unitPref == "Imperial" ? "mph" : "km/h"}</p>
          </div>
        </div>
      </div>
    )
  }
});

export default CurrentDetails;
