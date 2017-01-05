import React from "react";

var Credits = React.createClass({
  render: function(){
    if(this.props.loading){
      return(
        <div className="credits load-fix">
          <p className="made-by">
            Made with lots of coffee and tea by <a href="https://kimkvn.github.io" target="_blank">Kevin Kim</a>
          </p>
        </div>
      )
    }
    else{
      return(
        <div className="credits">
          <p className="made-by">
            Made with lots of coffee and tea by <a href="https://kimkvn.github.io" target="_blank">Kevin Kim</a>
          </p>
        </div>
      )
    }

  }
});

export default Credits;
