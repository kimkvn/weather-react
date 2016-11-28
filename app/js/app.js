var App = React.createClass({

  componentDidMount: function(){
    var weatherKey = '8ef93b3325212e85f516fd49083dd5f0';
    var latitude = 33.748995;
    var longitude = -84.387982;
    var weatherURL = '//api.openweathermap.org/data/2.5/weather?q=Atlanta&APPID='+weatherKey;

    // https://api.darksky.net/forecast/9015e70a6b3a67646b7b52980ff99846/33.748995,-84.387982

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
          });
        }
      )
      .catch(function(err){
        console.log('Fetch Error', err);
      });

    // $.ajax({
    //   url: weatherURL,
    //   type: 'GET',
    //   data: {},
    //   dataType: 'json',
    //   success: (data) => {
    //     console.log(data)
    //   },
    //   error: function(err){
    //     console.log('Whoops, error:'+err)
    //   }
    // })

  },

  render: function(){
    return(
      <h1>hello world</h1>
  )}
});

ReactDOM.render(<App />, document.getElementById('app'));
