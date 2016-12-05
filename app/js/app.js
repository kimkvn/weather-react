var App = React.createClass({

  getInitialState: function(){
    return({
      tempKel: '',
      tempF: '' + ' &#176 F',
      tempC: '' + ' &#176 C',
      displayTemp: '',
      iconCode: '',
      description: '',
      humidity: '',
      wind: '',
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
            var fahrenheit = Math.floor(kelvin * (9/5) - 459.67);
            var celsius = Math.floor(kelvin - 273.15);

            component.setState({
              tempKel: data.main.temp,
              tempF: fahrenheit,
              tempC: celsius,
              displayTemp: fahrenheit,
              iconCode: 'https://openweathermap.org/img/w/'+data.weather[0].icon+'.png',
              description: data.weather[0].description,
              humidity: data.main.humidity + "%",
              wind: data.wind.speed + " mph",
            });
          });
        }
      )
      .catch(function(err){
        console.log('Fetch Error', err);
      });
  },

  getTempF: function(){
    this.setState({
      displayTemp: this.state.tempF
    })
  },

  getTempC: function(){
    this.setState({
      displayTemp: this.state.tempC
    })
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
            <a onClick={this.getTempF}> &#176;F</a>
            <span> | </span>
            <a onClick={this.getTempC}> &#176;C</a>
          </div>
        </div>
        <div className="description-wrap">
          <img src={this.state.iconCode} />
          <p>{this.state.description}</p>
          <p>Humidity : {this.state.humidity}</p>
          <p>Wind: {this.state.wind}</p>
        </div>

      </div>
  )}
});

ReactDOM.render(<App />, document.getElementById('app'));
