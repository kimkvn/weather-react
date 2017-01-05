import React from "react";

var DateTime = React.createClass({
  getInitialState: function(){
    return({
      formattedTime: '',
      meridiem: '',
    })
  },

  componentDidMount: function(){
    this.setCurrentTime();
    this.setMeridiem();
    this.getWeekday();
  },

  setCurrentTime: function(){
    var hour = (new Date()).getHours();
    if(hour > 12){
      this.setState({
        formattedTime: ((hour - 12) + ":00"),
      });
    }
    else{
      this.setState({
        formattedTime: (hour + ":00"),
      });
    }
  },

  setMeridiem: function(){
    var hour = (new Date()).getHours();
    if(hour < 12){
      this.setState({
        meridiem: 'AM'
      });
    }
    else{
      this.setState({
        meridiem: 'PM'
      });
    }
  },

  getWeekday: function(){
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var dayIndex = (new Date()).getDay();
    this.setState({
      currentDay: days[dayIndex],
    })
  },

  render: function(){
    if(!this.props.locationPermission){
      return(
        <div></div>
      )
    }
    return(
      <div>
        <p className="date weekday">{this.state.currentDay}</p>
        <p className="date time">{this.state.formattedTime} {this.state.meridiem}</p>
      </div>
    )
  },
});

export default DateTime;
