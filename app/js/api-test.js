var ApiTest = React.createClass({

  componentDidMount: function(){
    var latitude = 33.748995;
    var longitude = -84.387982;
    var key = '9015e70a6b3a67646b7b52980ff99846';
    var weatherURL = 'https://api.darksky.net/forecast/'+ key + '/'+latitude+','+longitude+'/?exclude=hourly,minutely,flags'

    fetchJsonp(weatherURL, {
      timeout: 3000
    })
      .then(function(response){
        return response.json()
      })
      .then(function(data){
        console.log(data)

        //note: data.daily.time is a unix time stamp - multiply this value by 1000
        //to get milliseconds, which you can then new Date() and get
        //get the correct response

      })
      .catch(function(err){
        console.log('Fetch Error:', err);
      })

  },

  render: function(){
    return <h1>hello world</h1>
  }
});

ReactDOM.render(<ApiTest />, document.getElementById('api-test'));
