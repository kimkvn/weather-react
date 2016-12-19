import React from "react";

var Forecast = React.createClass({

  // returning a string day of the week from the 'time' data point obj in the Dark Sky API
  getWeekday: function(val){
    var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    // 'time' is returned as a UNIX value. Needs to be multiplied by 1000 to return a UTC value that the Date() method can read correctly
    var index = (new Date(val * 1000)).getDay();
    return days[index];
  },

  render: function(){
    return(
      <div className="forecast-wrap">
        {
          this.props.item.map((day, index) => {
            return(
              <div key={index} className="day-block col-xs-12 col-sm-2">
                <div className="day-block-wrap row">
                  <div className="day-name col-xs-4 col-sm-12">
                    <h3>{this.getWeekday(day.time)}</h3>
                  </div>
                  <div className="img-wrap col-xs-4 col-sm-12">
                    <i className={this.props.getIcon(day.icon)}></i>
                  </div>
                  <div className="high-low col-xs-4 col-sm-12">
                    <h5 className="high">{
                        this.props.unitPref == "Imperial" ? Math.floor(day.temperatureMax) : Math.floor((day.temperatureMax - 32) * (5/9))
                      }&#176;</h5>
                    <h5 className="low">{
                        this.props.unitPref == "Imperial" ? Math.floor(day.temperatureMin) : Math.floor((day.temperatureMin - 32) * (5/9))
                      }&#176;</h5>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    )
  }
});

export default Forecast;
