var App = React.createClass({

  getInitialState: function(){
    return({
      tempKel: '',
      // tempF: '' + ' &#176 F',
      // tempC: '' + ' &#176 C',
      displayTemp: '',

      units: '',

      iconCode: '',
      description: '',
      humidity: '',
      dataWind: '',
      wind: '',
      windUnit: '',
      welcomeText: '',
    });
  },

  componentDidMount: function(){
    this.getCurrentWeather();
    this.setWelcomeText();
  },

  getCurrentWeather: function(){
    var weatherKey = '8ef93b3325212e85f516fd49083dd5f0';
    var latitude = 33.748995;
    var longitude = -84.387982;
    var weatherURL = '//api.openweathermap.org/data/2.5/weather?q=Atlanta&APPID='+weatherKey;

    //aliasing 'this' for the fetch request
    var component = this;

    fetch(weatherURL)
      .then(
        function(response){
          if(response.status !== 200){
            console.log('Whoops, encountered issue. Status Code:'+response.status);
            return;
          }
          //Examine the text in the response;
          response.json().then(function(data){
            console.log(data);

            var kelvin = data.main.temp;
            // var fahrenheit = Math.floor(kelvin * (9/5) - 459.67);
            // var celsius = Math.floor(kelvin - 273.15);

            component.setState({
              tempKel: data.main.temp,
              // tempF: fahrenheit,
              // tempC: celsius,
              // displayTemp: fahrenheit,
              iconCode: 'https://openweathermap.org/img/w/'+data.weather[0].icon+'.png',
              description: data.weather[0].description,
              humidity: data.main.humidity + "%",
              dataWind: data.wind.speed,
              wind: data.wind.speed,
              windUnit: 'mph',
            });

            //defaulting to setting the temp to Fahrenheit
            component.convertF();
          });
        }
      )
      .catch(function(err){
        console.log('Fetch Error', err);
      });
  },

  convertF: function(){
    this.setState({
      // displayTemp: this.state.tempF
      displayTemp: Math.floor(this.state.tempKel * (9/5) - 459.67),
      wind: Math.floor((this.state.dataWind / 0.44704)),
      windUnit: 'mph'
    })
  },

  convertMetric: function(){
    this.setState({
      displayTemp: Math.floor(this.state.tempKel - 273.15),
      wind: Math.floor((this.state.dataWind * 3.6)),
      windUnit: 'km/h',
    });
  },

  // getTempF: function(){
  //   this.setState({
  //     // displayTemp: this.state.tempF
  //     displayTemp: Math.floor(this.state.tempKel * (9/5) - 459.67),
  //   })
  // },
  //
  // getTempC: function(){
  //   this.setState({
  //     // displayTemp: this.state.tempC
  //     displayTemp: Math.floor(this.state.tempKel - 273.15),
  //   })
  // },

  setWind: function(){
    if(this.state.unit == 'metric'){
      this.setState({
        wind : 'kmph',
      })
    }
  },

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

  render: function(){
    return(
      <div className="current-temp-wrap">

        <div className="welcome-message">
          <h4>{this.state.welcomeText}</h4>
          The current temperature is:
        </div>
        <div className="temp-block">
          <h1>{this.state.displayTemp}</h1>
          <div className="unit-toggle">
            <a onClick={this.convertF}> &#176;F</a>
            <span> | </span>
            <a onClick={this.convertMetric}> &#176;C</a>
          </div>
        </div>
        <div className="description-wrap">
          <img src={this.state.iconCode} />
          <p>{this.state.description}</p>
          <p>Humidity : {this.state.humidity}</p>
          <p>Wind: {this.state.wind} {this.state.windUnit}</p>
        </div>

      </div>
  )}
});

ReactDOM.render(<App />, document.getElementById('app'));
