var Credits = React.createClass({
  render: function(){
    // if(!this.props.value){
    //   return(
    //     <div></div>
    //   )
    // }
    return(
      <div className="credits">
        <p className="made-by">
          Made with lots of coffee and tea by <a href="https://kimkvn.github.io" target="_blank">Kevin Kim</a>
        </p>
      </div>
    )
  }
});

ReactDOM.render(<Credits />, document.getElementById('credits'));
