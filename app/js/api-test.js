var ApiTest = React.createClass({

  componentDidMount: function(){
    var latitude = 33.748995;
    var longitude = -84.387982;
    var key = '9015e70a6b3a67646b7b52980ff99846';
    var weatherURL = 'https://api.darksky.net/forecast/'+ key + '/'+latitude+','+longitude

    fetchJsonp(weatherURL, {
      timeout: 3000
    })
      .then(
        function(response){
          // if(response.status !== 200){
          //   console.log('Whoops! Encountered issue. Status Code:'+response.status);
          //   return;
          // }
          response.json().then(function(data){
            console.log(data)
          })
        })
      .catch(function(err){
        console.log('Fetch Error:', err);
      })

  //   var result = fetchJsonp(weatherURL, {
  //     // jsonpCallback: 'jsoncallback',
  //     timeout: 3000
  //   })
  //   result.then(function(response) {
  //     return response.json()
  //   }).then(function(data) {
  //     // document.body.innerHTML = JSON.stringify(json);
  //     console.log(data)
  //   }).catch(
  //     function(err) {
  //       console.log('Fetch error:' + err);
  //     });

  },

  render: function(){
    return <h1>hello world</h1>
  }
});

ReactDOM.render(<ApiTest />, document.getElementById('api-test'));
