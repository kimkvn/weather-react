import React from "react";
import ReactDOM from "react-dom";
import Forecast from "./forecast.js";
import Credits from "./credits.js";
import CurrentDetails from "./current-details.js";
import DefaultLocation from "./default-location.js";
import CurrentWeather from "./current-weather.js";

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
