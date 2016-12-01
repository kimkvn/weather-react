var Forecast = React.createClass({

  getInitialState: function(){
    return({
      day0: 'Thu',
      day1: 'Fri',
      day2: 'Sat',
      day0High: '56',
      day1High: '58',
      day2High: '58',
      day0Low: '36',
      day1Low: '39',
      day2Low: '44',
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
            console.log('Whoops, encountered issue. Status COde:' + response.status);
            return;
          }
          //examine the test in the response;
          response.json().then(function(data){
            console.log(data);
            console.log(data.list[0], data.list[1], data.list[2]);
            var days = [
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat"
            ];
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
