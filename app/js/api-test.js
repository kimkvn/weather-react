var ApiTest = React.createClass({

  getInitialState: function(){
    return({
      forecast: [],
      time: '',
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
          time: json.daily.data[0].time,
        });
        //note: data.daily.time is a unix time stamp - multiply this value by 1000
        //to get milliseconds, which you can then new Date() and get
        //get the correct response
      })
      .catch(function(err){
        console.log('Fetch Error:', err);
      })
  },

  // returning a string day of the week from the 'time' data point obj in the Darksky API
  getWeekday: function(val){
    var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    // 'time' is a UNIX value. Needs to be multiplied by 1000 to return a UTC value that the Date() method can read correctly
    var index = (new Date(val * 1000)).getDay();

    return days[index];
  },

  render: function(){
    return(
      <div>
        {
          this.state.forecast.map((day, index) => {
            return(
              <div key={index}>
                <h2>{this.getWeekday(day.time)}</h2>
              </div>
            );
          })
        }
      </div>
    )
  }
});

ReactDOM.render(<ApiTest />, document.getElementById('api-test'));
