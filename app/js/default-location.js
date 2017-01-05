import React from "react";

var DefaultLocation = React.createClass({

  render: function(){

    if(!this.props.locationPermission && this.props.value){
      return(
        <div className="location-denied">
          <p>
          You have chosen to not share your location, and that&#39;s okay!
          <br></br>
          You are viewing the current weather for a default location.
          </p>
        </div>
      )
    }
    return(
      <div></div>
    )
  }
});

export default DefaultLocation;
