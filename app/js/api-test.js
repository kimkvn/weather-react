var ApiTest = React.createClass({

  getInitialState: function(){
    return({
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
          forecast: json.daily.data,
        });
      })
      .catch(function(err){
        console.log('Fetch Error:', err);
      })
  },



  // returning a string day of the week from the 'time' data point obj in the Darksky API
  getWeekday: function(val){
    var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    // 'time' is returned as a UNIX value. Needs to be multiplied by 1000 to return a UTC value that the Date() method can read correctly
    var index = (new Date(val * 1000)).getDay();
    return days[index];
  },

  getIcon: function(input){
    switch(input){
  //     case "clear-day":
  //     case "clear-night":
  //     case "rain":
  //     case "snow":
  //     case "sleet":
  //     case "wind":
  //     case "fog":
  //     case "cloudy":
      case "partly-cloudy-day":
        return ("wi wi-day-cloudy")
        break;
  //     case "part-cloudy-night":
      default:
        return ("wi wi-day-sunny")
        break;
    }
  },

  render: function(){
    return(
      <div clasName="forecast-wrap">
        {
          this.state.forecast.map((day, index) => {
            return(
              <div key={index} className="day-block col-xs-12">
                <div className="day-block-wrap row">
                  <div className="day-name col-xs-4 col-sm-12">
                    <h3>{this.getWeekday(day.time)}</h3>
                  </div>
                  <div className="img-wrap">
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
    )
  }
});

ReactDOM.render(<ApiTest />, document.getElementById('api-test'));
