var Forecast = React.createClass({

  getInitialState: function(){
    return({
      day0: '',
      day1: '',
      day2: '',
      day0High: '',
      day1High: '',
      day2High: '',
      day0Low: '',
      day1Low: '',
      day2Low: '',
      day0Icon: '',
      day1Icon: '',
      day2Icon: '',
    });
  },

  componentDidMount: function(){
    var weatherKey = '8ef93b3325212e85f516fd49083dd5f0';
    var latitude = 33.748995;
    var longitude = -84.387982;
    var weatherURL = '//api.openweathermap.org/data/2.5/forecast?q=Atlanta&APPID='+weatherKey;

    var component = this;

    fetch(weatherURL)
      .then(
        function(response){
          if(response.status !== 200){
            console.log('Whoops, encountered issue. Status Code:' + response.status);
            return;
          }
          //examine the test in the response;
          response.json().then(function(data){
            console.log(data);
            console.log(data.list[0], data.list[1], data.list[2]);
            var day0 = data.list[0],
                day1 = data.list[1],
                day2 = data.list[2],
                days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

            var index0 = (new Date(day0.dt_txt)).getUTCDay()-1,
                index1 = (new Date(day1.dt_txt)).getUTCDay(),
                index2 = (new Date(day2.dt_txt)).getUTCDay()+1;

            // var fahrenheit = Math.floor(kelvin * (9/5) - 459.67);
            // var celsius = Math.floor(kelvin - 273.15);

            var high0 = Math.floor(day0.main.temp_max * (9/5) - 459.67),
                high1 = Math.floor(day1.main.temp_max * (9/5) - 459.67),
                high2 = Math.floor(day2.main.temp_max * (9/5) - 459.67);

            var low0 = Math.floor(day0.main.temp_min * (9/5) - 459.67),
                low1 = Math.floor(day1.main.temp_min * (9/5) - 459.67),
                low2 = Math.floor(day2.main.temp_min * (9/5) - 459.67);

            component.setState({
              day0 : days[index0],
              day1: days[index1],
              day2: days[index2],
              day0High: high0,
              day1High: high1,
              day2High: high2,
              day0Low: low0,
              day1Low: low1,
              day2Low: low2
            });

          });
      })
      .catch(function(err){
        console.log('Fetch Error', err);
      })
  },

  render: function(){
    return(
      <div className="forecast-wrap">
        <div className="day-0">
          <div className="day-name">
            <h3>{this.state.day0}</h3>
          </div>
          <div className="img-wrap">
            <img src="" />
          </div>
          <div className="high-low">
            <h5 className="high">{this.state.day0High}</h5>
            <h5 className="low">{this.state.day0Low}</h5>
          </div>
        </div>
        <div className="day-1">
          <div className="day-name">
            <h3>{this.state.day1}</h3>
          </div>
          <div className="img-wrap">
            <img src="" />
          </div>
          <div className="high-low">
            <h5 className="high">{this.state.day1High}</h5>
            <h5 className="low">{this.state.day1Low}</h5>
          </div>
        </div>
        <div className="day-2">
          <div className="day-name">
            <h3>{this.state.day2}</h3>
          </div>
          <div className="img-wrap">
            <img src="" />
          </div>
          <div className="high-low">
            <h5 className="high">{this.state.day2High}</h5>
            <h5 className="low">{this.state.day2Low}</h5>
          </div>
        </div>
      </div>
    )
  }
});

ReactDOM.render(<Forecast />, document.getElementById('forecast'));
