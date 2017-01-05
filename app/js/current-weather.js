import React from "react";
import WelcomeMessage from "./welcome-message.js";
import Location from "./location.js";

var CurrentWeather = React.createClass({

  componentDidMount: function(){
    var opts = {
      lines: 13 // The number of lines to draw
    , length: 4 // The length of each line
    , width: 5 // The line thickness
    , radius: 30 // The radius of the inner circle
    , scale: 0.5 // Scales overall size of the spinner
    , corners: 1 // Corner roundness (0..1)
    , color: '#fff' // #rgb or #rrggbb or array of colors
    , opacity: 0.3 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 1 // Rounds per second
    , trail: 60 // Afterglow percentage
    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '50%' // Top position relative to parent
    , left: '50%' // Left position relative to parent
    , shadow: false // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'absolute' // Element positioning
    }
    var target = document.getElementById('spin')
    var spinner = new Spinner(opts).spin(target);

  },

  render: function(){

    if(this.props.loading){
      return(
        <div className="loading">
          <p className="browser-check">This site will work only in <a href="https://www.google.com/chrome/browser">Chrome</a> or <a href="https://www.mozilla.org/firefox/products/">Firefox</a>. </p>
          <WelcomeMessage />
          <h4>Getting the local weather...</h4>
          <div id="spin"></div>
        </div>
      )
    }

    return(
      <div>
        <Location location={this.props.location} locationPermission={this.props.locationPermission}/>
        <div className="temp-block">
          <h1>{this.props.unitPref == "Imperial" ? Math.floor(this.props.value) : Math.floor((this.props.value - 32) * (5/9)) }</h1>
          <div className="unit-toggle">
            <a onClick={this.props.handleImp}> &#176;F</a>
            <span> | </span>
            <a onClick={this.props.handleSi}> &#176;C</a>
          </div>
        </div>
      </div>
    )
  }
});

export default CurrentWeather;
