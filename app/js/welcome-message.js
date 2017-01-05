import React from "react";

var WelcomeMessage = React.createClass({
  getInitialState: function(){
    return({
      welcomeText: '',
    })
  },

  componentDidMount: function(){
    this.setWelcomeText();
  },

  // setting a greeting depending on time of day
  setWelcomeText: function(){
    var time = (new Date()).getHours();
    if( time < 5 || time >= 18 ){
      this.setState({
        welcomeText: 'Good Evening!',
      })
    }
    else if( time >= 5 && time < 12 ){
      this.setState({
        welcomeText: 'Good Morning!',
      })
    }
    else if( time >= 12 && time < 18 ){
      this.setState({
        welcomeText: 'Good Afternoon!',
      })
    }
  },

  render: function(){
    return(
      <div className="welcome-message">
        <h1>{this.state.welcomeText}</h1>
      </div>
    )
  }
});

export default WelcomeMessage;
