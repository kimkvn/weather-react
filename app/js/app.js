var App = React.createClass({

  getInitialState: function(){
    return({
      tempKel: '',
      tempF: '' + ' &#176 F',
      tempC: '' + ' &#176 C',
      displayTemp: '',
      iconCode: '',
    });
  },

  componentDidMount: function(){
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
              iconCode: 'https://openweathermap.org/img/w/'+data.weather[0].icon+'.png'
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

  render: function(){
    return(
      <div>
        <div>
          The current temperature is:
          <h1>{this.state.displayTemp}</h1>
          <img src={this.state.iconCode} />
          <a onClick={this.getTempF}> &#176;F</a> | <a onClick={this.getTempC}> &#176;C</a>
        </div>
      </div>
  )}
});

ReactDOM.render(<App />, document.getElementById('app'));
