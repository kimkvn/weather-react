var App = React.createClass({

  componentDidMount: function(){
    var weatherKey = '9015e70a6b3a67646b7b52980ff99846';
    var latitude = 33.748995;
    var longitude = -84.387982;
    var weatherURL = 'https://api.darksky.net/forecast/'+weatherKey+'/'+latitude+','+longitude ;

    // fetch(weatherURL)
    //   .then(
    //     function(response){
    //       if(response.status !== 200){
    //         console.log('Whoops, encountered issue. Status Code:'+response.status);
    //         return;
    //       }
    //       //Examine the text in the response;
    //       response.json().then(function(data){
    //         console.log(data);
    //       });
    //     }
    //   )
    //   .catch(function(err){
    //     console.log('Fetch Error', err);
    //   });

    fetchJsonp(weatherURL)
      .then(function(response){
        return response.json()
      }).then(function(json){
        console.log('parsed json', json)
      }).catch(function(ex){
        console.log('parsing failed', ex)
      });

  },

  render: function(){
    return(
      <h1>hello world</h1>
  )}
});

ReactDOM.render(<App />, document.getElementById('app'));
