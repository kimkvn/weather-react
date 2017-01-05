import React from "react";
import ReactDOM from "react-dom";
import Forecast from "./forecast.js";
import Credits from "./credits.js";
import WelcomeMessage from "./welcome-message.js";
import CurrentDetails from "./current-details.js";

var DefaultLocation = React.createClass({

  render: function(){

    if(!this.props.locationPermission && this.props.value){
      return(
        <div className="location-denied">
          <p>
          You have chosen to not share your location, and that&#39;s okay!
          <br></br>
          You are viewing the current weather for a default location.
          </p>
        </div>
      )
    }
    return(
      <div></div>
    )
  }
});


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

var Location = React.createClass({
  render: function(){
    return(
      <div className="location">
        <p className="city">{this.props.location}</p>
        <DateTime locationPermission={this.props.locationPermission}/>
      </div>
    )
  }
});

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

var Weather = React.createClass({

  getInitialState: function(){
    return({
      currentWind: '',
      currentTemp: '',
      currentIcon: '',
      currentDescription: '',
      currentHumidity: '',
      currentPrecip: '',
      unitPref: '',
      loading: true,
      location: '',
      forecast: [],
    });
  },

  componentDidMount: function(){

    var component = this;

    navigator.geolocation.getCurrentPosition(success, error);

    // location: granted
    function success(position){
      component.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        locationPermission: true,
      });
      component.getLocation();
      component.getWeather();
    }

    //location: denied
    function error(){
      //setting placeholder coordinates so user can still see what the page looks like with data
      component.setState({
        latitude: 33.7490,
        longitude: -84.3880,
        locationPermission: false,
      });

      component.getLocation();
      component.getWeather();
    }

  },

  getLocation: function(){
    var geoKEY = 'AIzaSyCdRjMXAQcUozlvQtv5pjn3d6jcW9WJCN4';
    var geoURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.state.latitude + ',' + this.state.longitude + '&key=' + geoKEY;

    var component = this;

    fetch(geoURL)
      .then(function(response){
        response.json()
          .then(function(data){
            console.log(data)
            component.setState({
              location: data.results[5].formatted_address,
            })
          })
      })
      .catch(function(err){
        console.log('Whoops, Fetch Error:'+err);
      })
  },

  getWeather: function(){
    var key = '9015e70a6b3a67646b7b52980ff99846';
    var weatherURL = 'https://api.darksky.net/forecast/'+ key + '/'+this.state.latitude+','+this.state.longitude+'/?exclude=hourly,minutely,flags'

    var component = this;

    fetchJsonp(weatherURL, {
      timeout: 5000
    })
      .then(function(response){
        return response.json()
      })
      .then(function(json){
        console.log(json)
        component.setState({
          currentTemp: Math.floor(json.currently.temperature),
          currentIcon: json.currently.icon,
          currentDescription: json.currently.summary,
          currentWind: Math.floor(json.currently.windSpeed),
          currentHumidity: Math.floor(json.currently.humidity),
          currentPrecip: json.currently.precipProbability,
          unitPref: 'Imperial',
          loading: false,
          forecast: json.daily.data,
        });
      })
      .catch(function(err){
        console.log('Fetch Error:', err);
      })
  },

  handleSi: function(){
    if(this.state.unitPref == "Imperial"){
      this.setState({
        unitPref: 'SI',
      });
    }
  },

  handleImp: function(){
    if(this.state.unitPref == "SI"){
      this.setState({
        unitPref: 'Imperial',
      })
    }
  },

  // setting an icon dependent on the 'icon' data point value from the Dark Sky API
  // weather icons from https://github.com/erikflowers/weather-icons/
  getIcon: function(input){
    switch(input){
      case "clear-day":
        return ("wi wi-day-sunny")
        break;
      case "clear-night":
        return ("wi wi-night-clear")
        break;
      case "rain":
        return ("wi wi-rain")
        break;
      case "snow":
        return ("wi wi-snow")
        break;
      case "sleet":
        return ("wi wi-sleet")
        break;
      case "wind":
        return ("wi wi-strong-wind")
        break;
      case "fog":
        return ("wi wi-fog")
        break;
      case "cloudy":
        return ("wi wi-cloudy")
        break;
      case "partly-cloudy-day":
        return ("wi wi-day-cloudy")
        break;
      case "part-cloudy-night":
        return ("wi wi-night-alt-cloudy")
      default:
        return ("wi wi-cloud")
        break;
    }
  },

  render: function(){
    return(
      <div>
        <DefaultLocation
          value={this.state.currentTemp}
          locationPermission={this.state.locationPermission}
        />
        <div className="current-temp-wrap">
          <CurrentWeather
            value={this.state.currentTemp}
            unitPref={this.state.unitPref}
            handleImp={this.handleImp}
            handleSi={this.handleSi}
            location={this.state.location}
            getWeekday={this.getWeekday}
            locationPermission={this.state.locationPermission}
            loading={this.state.loading}
          />
          <CurrentDetails
            unitPref={this.state.unitPref}
            currentTemp={this.state.currentTemp}
            icon={this.getIcon(this.state.currentIcon)}
            description={this.state.currentDescription}
            humidity={this.state.currentHumidity}
            wind={this.state.currentWind}
            precip={Math.floor(this.state.currentPrecip * 100)}
            loading={this.state.loading}
          />
        </div>
        <Forecast
          item={this.state.forecast}
          unitPref={this.state.unitPref}
          getIcon={this.getIcon}
          locationPermission={this.state.locationPermission}
        />
        <Credits loading={this.state.loading}/>
      </div>
    )
  }
});

ReactDOM.render(<Weather />, document.getElementById('weather'));
