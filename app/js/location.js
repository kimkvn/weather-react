import React from "react";
import DateTime from "./date-time.js";

var Location = React.createClass({
  render: function(){
    return(
      <div className="location">
        <p className="city">{this.props.location}</p>
        <DateTime locationPermission={this.props.locationPermission}/>
      </div>
    )
  }
});

export default Location;
