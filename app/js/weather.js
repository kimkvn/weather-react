var WelcomeMessage = React.createClass({
  getInitialState: function(){
    return({
      welcomeText: '',
    })
  },

  componentDidMount: function(){
    this.setWelcomeText();
  },

  // setting a greeting depending on time of day
  setWelcomeText: function(){
    var time = (new Date()).getHours();
    if( time < 5 || time >= 18 ){
      this.setState({
        welcomeText: 'Good Evening!',
      })
    }
    else if( time >= 5 && time < 12 ){
      this.setState({
        welcomeText: 'Good Morning!',
      })
    }
    else if( time >= 12 && time < 18 ){
      this.setState({
        welcomeText: 'Good Afternoon!',
      })
    }
  },

  render: function(){
    return(
      <div className="welcome-message">
        <h4>{this.state.welcomeText}</h4>
        The current temperature is:
      </div>
    )
  }
});

var CurrentWeather = React.createClass({
  render: function(){
    return(
      <h1>{this.props.unitPref == "Imperial" ? Math.floor(this.props.value) : Math.floor((this.props.value - 32) * (5/9)) }</h1>
    )
  }
});

var CurrentDetails = React.createClass({
  render: function(){
    return(
      <div className="description-wrap">
        <i className={this.props.icon}></i>
        <p>{this.props.description}</p>
        <p>Precipitation : {this.props.precip}%</p>
        <p>Humidity : {this.props.humidity}%</p>
        <p>Wind : {this.props.unitPref == "Imperial" ? this.props.wind : Math.floor((this.props.wind * 1.609344)) } {this.props.unitPref == "Imperial" ? "mph" : "km/h"}
        </p>
      </div>
    )
  }
});

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

      forecast: [],
    });
  },

  componentDidMount: function(){
    var latitude = 33.748995;
    var longitude = -84.387982;
    var key = '9015e70a6b3a67646b7b52980ff99846';
    var weatherURL = 'https://api.darksky.net/forecast/'+ key + '/'+latitude+','+longitude+'/?exclude=hourly,minutely,flags'

    var component = this;

    fetchJsonp(weatherURL, {
      timeout: 3000
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

        <div className="current-temp-wrap">
          <WelcomeMessage />
          <div className="temp-block">
            <CurrentWeather
              value={this.state.currentTemp}
              unitPref={this.state.unitPref}
            />
            <div className="unit-toggle">
              <a onClick={this.handleImp}> &#176;F</a>
              <span> | </span>
              <a onClick={this.handleSi}> &#176;C</a>
            </div>
          </div>
          <CurrentDetails
            icon = {this.getIcon(this.state.currentIcon)}
            description = {this.state.currentDescription}
            humidity = {this.state.currentHumidity}
            wind = {this.state.currentWind}
            unitPref = {this.state.unitPref}
            precip={Math.floor(this.state.currentPrecip * 100)}
          />
        </div>

        <Forecast
          item={this.state.forecast}
          unitPref={this.state.unitPref}
          getIcon={this.getIcon}
        />
      </div>
    )
  }
});

ReactDOM.render(<Weather />, document.getElementById('weather'));
