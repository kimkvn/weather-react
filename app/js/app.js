var App = React.createClass({

  getInitialState: function(){
    return({
      tempKel: '',
      tempF: '',
      tempC: '',
    });
  },

  componentDidMount: function(){
    var weatherKey = '8ef93b3325212e85f516fd49083dd5f0';
    var latitude = 33.748995;
    var longitude = -84.387982;
    var weatherURL = '//api.openweathermap.org/data/2.5/weather?q=Atlanta&APPID='+weatherKey;

    // https://api.darksky.net/forecast/9015e70a6b3a67646b7b52980ff99846/33.748995,-84.387982

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
            console.log(data.main.temp);
            component.setState({
              tempKel: data.main.temp
            });
            component.tempConvert();
          });
        }
      )
      .catch(function(err){
        console.log('Fetch Error', err);
      });

      // IMPORTANT!!!!
      //    the default unit returned for temperature is in Kelvin.

  },

  tempConvert: function(){
    var kelvin = this.state.tempKel;
    var fahrenheit = Math.floor(kelvin * (9/5) - 459.67);
    var celsius = Math.floor(kelvin - 273.15);
    this.setState({
      tempF: fahrenheit,
      tempC: celsius,
    });
  },

  render: function(){
    return(
      <div>
        <h1>hello world</h1>
        <div>
          The current temperature is:
          <h3>{this.state.tempF} F</h3>
          <h3>{this.state.tempC} C</h3>
        </div>
      </div>
  )}
});

ReactDOM.render(<App />, document.getElementById('app'));
