/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var DefaultLocation = React.createClass({
	  displayName: 'DefaultLocation',


	  render: function render() {

	    if (!this.props.locationPermission && this.props.value) {
	      return React.createElement(
	        'div',
	        { className: 'location-denied' },
	        React.createElement(
	          'p',
	          null,
	          'You have chosen to not share your location, and that\'s okay!',
	          React.createElement('br', null),
	          'You are viewing the current weather for a default location.'
	        )
	      );
	    }
	    return React.createElement('div', null);
	  }
	});

	var WelcomeMessage = React.createClass({
	  displayName: 'WelcomeMessage',

	  getInitialState: function getInitialState() {
	    return {
	      welcomeText: ''
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    this.setWelcomeText();
	  },

	  // setting a greeting depending on time of day
	  setWelcomeText: function setWelcomeText() {
	    var time = new Date().getHours();
	    if (time < 5 || time >= 18) {
	      this.setState({
	        welcomeText: 'Good Evening!'
	      });
	    } else if (time >= 5 && time < 12) {
	      this.setState({
	        welcomeText: 'Good Morning!'
	      });
	    } else if (time >= 12 && time < 18) {
	      this.setState({
	        welcomeText: 'Good Afternoon!'
	      });
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'welcome-message' },
	      React.createElement(
	        'h1',
	        null,
	        this.state.welcomeText
	      )
	    );
	  }
	});

	var DateTime = React.createClass({
	  displayName: 'DateTime',

	  getInitialState: function getInitialState() {
	    return {
	      formattedTime: '',
	      meridiem: ''
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    this.setCurrentTime();
	    this.setMeridiem();
	    this.getWeekday();
	  },

	  setCurrentTime: function setCurrentTime() {
	    var hour = new Date().getHours();
	    if (hour > 12) {
	      this.setState({
	        formattedTime: hour - 12 + ":00"
	      });
	    } else {
	      this.setState({
	        formattedTime: hour + ":00"
	      });
	    }
	  },

	  setMeridiem: function setMeridiem() {
	    var hour = new Date().getHours();
	    if (hour < 12) {
	      this.setState({
	        meridiem: 'AM'
	      });
	    } else {
	      this.setState({
	        meridiem: 'PM'
	      });
	    }
	  },

	  getWeekday: function getWeekday() {
	    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	    var dayIndex = new Date().getDay();
	    this.setState({
	      currentDay: days[dayIndex]
	    });
	  },

	  render: function render() {
	    if (!this.props.locationPermission) {
	      return React.createElement('div', null);
	    }
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'p',
	        { className: 'date weekday' },
	        this.state.currentDay
	      ),
	      React.createElement(
	        'p',
	        { className: 'date time' },
	        this.state.formattedTime,
	        ' ',
	        this.state.meridiem
	      )
	    );
	  }
	});

	var Location = React.createClass({
	  displayName: 'Location',

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'location' },
	      React.createElement(
	        'p',
	        { className: 'city' },
	        this.props.location
	      ),
	      React.createElement(DateTime, { locationPermission: this.props.locationPermission })
	    );
	  }
	});

	var CurrentWeather = React.createClass({
	  displayName: 'CurrentWeather',


	  componentDidMount: function componentDidMount() {
	    var opts = {
	      lines: 13 // The number of lines to draw
	      , length: 4 // The length of each line
	      , width: 5 // The line thickness
	      , radius: 30 // The radius of the inner circle
	      , scale: 0.5 // Scales overall size of the spinner
	      , corners: 1 // Corner roundness (0..1)
	      , color: '#fff' // #rgb or #rrggbb or array of colors
	      , opacity: 0.3 // Opacity of the lines
	      , rotate: 0 // The rotation offset
	      , direction: 1 // 1: clockwise, -1: counterclockwise
	      , speed: 1 // Rounds per second
	      , trail: 60 // Afterglow percentage
	      , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
	      , zIndex: 2e9 // The z-index (defaults to 2000000000)
	      , className: 'spinner' // The CSS class to assign to the spinner
	      , top: '50%' // Top position relative to parent
	      , left: '50%' // Left position relative to parent
	      , shadow: false // Whether to render a shadow
	      , hwaccel: false // Whether to use hardware acceleration
	      , position: 'absolute' // Element positioning
	    };
	    var target = document.getElementById('spin');
	    var spinner = new Spinner(opts).spin(target);
	  },

	  render: function render() {

	    if (this.props.loading) {
	      return React.createElement(
	        'div',
	        { className: 'loading' },
	        React.createElement(
	          'p',
	          { className: 'browser-check' },
	          'This site will work only in ',
	          React.createElement(
	            'a',
	            { href: 'https://www.google.com/chrome/browser' },
	            'Chrome'
	          ),
	          ' or ',
	          React.createElement(
	            'a',
	            { href: 'https://www.mozilla.org/firefox/products/' },
	            'Firefox'
	          ),
	          '. '
	        ),
	        React.createElement(WelcomeMessage, null),
	        React.createElement(
	          'h4',
	          null,
	          'Getting the local weather...'
	        ),
	        React.createElement('div', { id: 'spin' })
	      );
	    }

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(Location, { location: this.props.location, locationPermission: this.props.locationPermission }),
	      React.createElement(
	        'div',
	        { className: 'temp-block' },
	        React.createElement(
	          'h1',
	          null,
	          this.props.unitPref == "Imperial" ? Math.floor(this.props.value) : Math.floor((this.props.value - 32) * (5 / 9))
	        ),
	        React.createElement(
	          'div',
	          { className: 'unit-toggle' },
	          React.createElement(
	            'a',
	            { onClick: this.props.handleImp },
	            ' \xB0F'
	          ),
	          React.createElement(
	            'span',
	            null,
	            ' | '
	          ),
	          React.createElement(
	            'a',
	            { onClick: this.props.handleSi },
	            ' \xB0C'
	          )
	        )
	      )
	    );
	  }
	});

	var CurrentDetails = React.createClass({
	  displayName: 'CurrentDetails',

	  render: function render() {
	    if (this.props.loading) {
	      return React.createElement('div', null);
	    }
	    return React.createElement(
	      'div',
	      { className: 'description-wrap' },
	      React.createElement(
	        'div',
	        { className: 'icon-wrap' },
	        React.createElement('i', { className: this.props.icon }),
	        React.createElement(
	          'p',
	          null,
	          this.props.description
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'weather-stat-wrap' },
	        React.createElement(
	          'div',
	          { className: 'weather-stat' },
	          React.createElement(
	            'p',
	            { className: 'stat-title' },
	            'Precipitation: '
	          ),
	          React.createElement(
	            'p',
	            { className: 'stat-value' },
	            this.props.precip,
	            '%'
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'weather-stat' },
	          React.createElement(
	            'p',
	            { className: 'stat-title' },
	            'Humidity: '
	          ),
	          React.createElement(
	            'p',
	            { className: 'stat-value' },
	            this.props.humidity,
	            '%'
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'weather-stat' },
	          React.createElement(
	            'p',
	            { className: 'stat-title' },
	            'Wind: '
	          ),
	          React.createElement(
	            'p',
	            { className: 'stat-value' },
	            this.props.unitPref == "Imperial" ? this.props.wind : Math.floor(this.props.wind * 1.609344),
	            ' ',
	            this.props.unitPref == "Imperial" ? "mph" : "km/h"
	          )
	        )
	      )
	    );
	  }
	});

	var Forecast = React.createClass({
	  displayName: 'Forecast',


	  // returning a string day of the week from the 'time' data point obj in the Dark Sky API
	  getWeekday: function getWeekday(val) {
	    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	    // 'time' is returned as a UNIX value. Needs to be multiplied by 1000 to return a UTC value that the Date() method can read correctly
	    var index = new Date(val * 1000).getDay();
	    return days[index];
	  },

	  render: function render() {
	    var _this = this;

	    return React.createElement(
	      'div',
	      { className: 'forecast-wrap' },
	      this.props.item.map(function (day, index) {
	        return React.createElement(
	          'div',
	          { key: index, className: 'day-block col-xs-12 col-sm-2' },
	          React.createElement(
	            'div',
	            { className: 'day-block-wrap row' },
	            React.createElement(
	              'div',
	              { className: 'day-name col-xs-4 col-sm-12' },
	              React.createElement(
	                'h3',
	                null,
	                _this.getWeekday(day.time)
	              )
	            ),
	            React.createElement(
	              'div',
	              { className: 'img-wrap col-xs-4 col-sm-12' },
	              React.createElement('i', { className: _this.props.getIcon(day.icon) })
	            ),
	            React.createElement(
	              'div',
	              { className: 'high-low col-xs-4 col-sm-12' },
	              React.createElement(
	                'h5',
	                { className: 'high' },
	                _this.props.unitPref == "Imperial" ? Math.floor(day.temperatureMax) : Math.floor((day.temperatureMax - 32) * (5 / 9)),
	                '\xB0'
	              ),
	              React.createElement(
	                'h5',
	                { className: 'low' },
	                _this.props.unitPref == "Imperial" ? Math.floor(day.temperatureMin) : Math.floor((day.temperatureMin - 32) * (5 / 9)),
	                '\xB0'
	              )
	            )
	          )
	        );
	      })
	    );
	  }
	});

	var Credits = React.createClass({
	  displayName: 'Credits',

	  render: function render() {
	    if (this.props.loading) {
	      return React.createElement(
	        'div',
	        { className: 'credits load-fix' },
	        React.createElement(
	          'p',
	          { className: 'made-by' },
	          'Made with lots of coffee and tea by ',
	          React.createElement(
	            'a',
	            { href: 'https://kimkvn.github.io', target: '_blank' },
	            'Kevin Kim'
	          )
	        )
	      );
	    } else {
	      return React.createElement(
	        'div',
	        { className: 'credits' },
	        React.createElement(
	          'p',
	          { className: 'made-by' },
	          'Made with lots of coffee and tea by ',
	          React.createElement(
	            'a',
	            { href: 'https://kimkvn.github.io', target: '_blank' },
	            'Kevin Kim'
	          )
	        )
	      );
	    }
	  }
	});

	var Weather = React.createClass({
	  displayName: 'Weather',


	  getInitialState: function getInitialState() {
	    return {
	      currentWind: '',
	      currentTemp: '',
	      currentIcon: '',
	      currentDescription: '',
	      currentHumidity: '',
	      currentPrecip: '',
	      unitPref: '',
	      loading: true,
	      location: '',
	      forecast: []
	    };
	  },

	  componentDidMount: function componentDidMount() {

	    var component = this;

	    navigator.geolocation.getCurrentPosition(success, error);

	    // location: granted
	    function success(position) {
	      component.setState({
	        latitude: position.coords.latitude,
	        longitude: position.coords.longitude,
	        locationPermission: true
	      });
	      component.getLocation();
	      component.getWeather();
	    }

	    //location: denied
	    function error() {
	      //setting placeholder coordinates so user can still see what the page looks like with data
	      component.setState({
	        latitude: 33.7490,
	        longitude: -84.3880,
	        locationPermission: false
	      });

	      component.getLocation();
	      component.getWeather();
	    }
	  },

	  getLocation: function getLocation() {
	    var geoKEY = 'AIzaSyCdRjMXAQcUozlvQtv5pjn3d6jcW9WJCN4';
	    var geoURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.state.latitude + ',' + this.state.longitude + '&key=' + geoKEY;

	    var component = this;

	    fetch(geoURL).then(function (response) {
	      response.json().then(function (data) {
	        console.log(data);
	        component.setState({
	          location: data.results[5].formatted_address
	        });
	      });
	    }).catch(function (err) {
	      console.log('Whoops, Fetch Error:' + err);
	    });
	  },

	  getWeather: function getWeather() {
	    var key = '9015e70a6b3a67646b7b52980ff99846';
	    var weatherURL = 'https://api.darksky.net/forecast/' + key + '/' + this.state.latitude + ',' + this.state.longitude + '/?exclude=hourly,minutely,flags';

	    var component = this;

	    fetchJsonp(weatherURL, {
	      timeout: 5000
	    }).then(function (response) {
	      return response.json();
	    }).then(function (json) {
	      console.log(json);
	      component.setState({
	        currentTemp: Math.floor(json.currently.temperature),
	        currentIcon: json.currently.icon,
	        currentDescription: json.currently.summary,
	        currentWind: Math.floor(json.currently.windSpeed),
	        currentHumidity: Math.floor(json.currently.humidity),
	        currentPrecip: json.currently.precipProbability,
	        unitPref: 'Imperial',
	        loading: false,
	        forecast: json.daily.data
	      });
	    }).catch(function (err) {
	      console.log('Fetch Error:', err);
	    });
	  },

	  handleSi: function handleSi() {
	    if (this.state.unitPref == "Imperial") {
	      this.setState({
	        unitPref: 'SI'
	      });
	    }
	  },

	  handleImp: function handleImp() {
	    if (this.state.unitPref == "SI") {
	      this.setState({
	        unitPref: 'Imperial'
	      });
	    }
	  },

	  // setting an icon dependent on the 'icon' data point value from the Dark Sky API
	  // weather icons from https://github.com/erikflowers/weather-icons/
	  getIcon: function getIcon(input) {
	    switch (input) {
	      case "clear-day":
	        return "wi wi-day-sunny";
	        break;
	      case "clear-night":
	        return "wi wi-night-clear";
	        break;
	      case "rain":
	        return "wi wi-rain";
	        break;
	      case "snow":
	        return "wi wi-snow";
	        break;
	      case "sleet":
	        return "wi wi-sleet";
	        break;
	      case "wind":
	        return "wi wi-strong-wind";
	        break;
	      case "fog":
	        return "wi wi-fog";
	        break;
	      case "cloudy":
	        return "wi wi-cloudy";
	        break;
	      case "partly-cloudy-day":
	        return "wi wi-day-cloudy";
	        break;
	      case "part-cloudy-night":
	        return "wi wi-night-alt-cloudy";
	      default:
	        return "wi wi-cloud";
	        break;
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(DefaultLocation, {
	        value: this.state.currentTemp,
	        locationPermission: this.state.locationPermission
	      }),
	      React.createElement(
	        'div',
	        { className: 'current-temp-wrap' },
	        React.createElement(CurrentWeather, {
	          value: this.state.currentTemp,
	          unitPref: this.state.unitPref,
	          handleImp: this.handleImp,
	          handleSi: this.handleSi,
	          location: this.state.location,
	          getWeekday: this.getWeekday,
	          locationPermission: this.state.locationPermission,
	          loading: this.state.loading
	        }),
	        React.createElement(CurrentDetails, {
	          unitPref: this.state.unitPref,
	          currentTemp: this.state.currentTemp,
	          icon: this.getIcon(this.state.currentIcon),
	          description: this.state.currentDescription,
	          humidity: this.state.currentHumidity,
	          wind: this.state.currentWind,
	          precip: Math.floor(this.state.currentPrecip * 100),
	          loading: this.state.loading
	        })
	      ),
	      React.createElement(Forecast, {
	        item: this.state.forecast,
	        unitPref: this.state.unitPref,
	        getIcon: this.getIcon,
	        locationPermission: this.state.locationPermission
	      }),
	      React.createElement(Credits, { loading: this.state.loading })
	    );
	  }
	});

	ReactDOM.render(React.createElement(Weather, null), document.getElementById('weather'));

/***/ }
/******/ ]);