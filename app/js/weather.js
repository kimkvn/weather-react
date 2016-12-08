var Weather = React.createClass({

  getInitialState: function(){
    return({
      dataTemp: '',
      dataWind: '',
      currentTemp: '',
      currentIcon: '',
      currentDescription: '',
      currentWind: '',
      windUnit: '',
      currentHumidity: '',
      welcomeText: '',
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
          dataTemp: Math.floor(json.currently.temperature),
          currentTemp: Math.floor(json.currently.temperature),
          currentIcon: json.currently.icon,
          currentDescription: json.currently.summary,
          dataWind: Math.floor(json.currently.windSpeed),
          currentWind: Math.floor(json.currently.windSpeed),
          windUnit: 'mph',
          currentHumidity: Math.floor(json.currently.humidity),
          unitPref: 'Imperial',

          forecast: json.daily.data,
        });
        component.setWelcomeText();
      })
      .catch(function(err){
        console.log('Fetch Error:', err);
      })
  },


  // By default, the API call returns values in Imperial units. Converting to SI
  // will require the right formulas, and converting back to Imperial simply
  // involves setting the original values returned.
  convertToSi: function(){
    if(this.state.unitPref == "Imperial"){
      this.setState({
        currentTemp: Math.floor((this.state.dataTemp - 32) * (9/5)),
        unitPref: 'SI',
        currentWind: Math.floor((this.state.dataWind * 1.609344)),
        windUnit: 'km/h',
      });
    }
  },

  convertToImp: function(){
    if(this.state.unitPref == "SI"){
      this.setState({
        currentTemp: this.state.dataTemp,
        unitPref: 'Imperial',
        currentWind: this.state.dataWind,
        windUnit: 'mph',
      })
    }
  },

  // setting a greeting depending on time of day
  setWelcomeText: function(){
    var time = (new Date()).getHours();
    if( time < 5 && time >= 18 ){
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

  // returning a string day of the week from the 'time' data point obj in the Dark Sky API
  getWeekday: function(val){
    var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    // 'time' is returned as a UNIX value. Needs to be multiplied by 1000 to return a UTC value that the Date() method can read correctly
    var index = (new Date(val * 1000)).getDay();
    return days[index];
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
        return ("wi-night-alt-cloudy")
      default:
        return ("wi wi-cloud")
        break;
    }
  },

  render: function(){
    return(
      <div>
        <div className="current-temp-wrap">
          <div className="welcome-message">
            <h4>{this.state.welcomeText}</h4>
            The current temperature is:
          </div>
          <div className="temp-block">
            <h1>{this.state.currentTemp}</h1>
            <div className="unit-toggle">
              <a onClick={this.convertToImp}> &#176;F</a>
              <span> | </span>
              <a onClick={this.convertToSi}> &#176;C</a>
            </div>
          </div>
          <div className="description-wrap">
            <i className={this.getIcon(this.state.currentIcon)}></i>
            <p>{this.state.currentDescription}</p>
            <p>Humidity : {this.state.currentHumidity}%</p>
            <p>Wind: {this.state.currentWind} {this.state.windUnit}</p>
          </div>
        </div>
        <div clasName="forecast-wrap">
          {
            this.state.forecast.map((day, index) => {
              return(
                <div key={index} className="day-block col-xs-12">
                  <div className="day-block-wrap row">
                    <div className="day-name col-xs-4 col-sm-12">
                      <h3>{this.getWeekday(day.time)}</h3>
                    </div>
                    <div className="img-wrap col-xs-4 col-sm-12">
                      <i className={this.getIcon(day.icon)}></i>
                    </div>
                    <div className="high-low col-xs-4 col-sm-12">
                      <h5 className="high">{Math.floor(day.temperatureMax)}&#176;</h5>
                      <h5 className="low">{Math.floor(day.temperatureMin)}&#176;</h5>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    )
  }
});

ReactDOM.render(<Weather />, document.getElementById('weather'));
