# Weather-React

## Weather App, built with React

APIs:

[Dark Sky](https://darksky.net/dev/)

[Google Geolocation](https://developers.google.com/maps/documentation/javascript/examples/map-geolocation)

This app uses the following tools/libraries/methods:
* [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [`fetch-jsonp`](https://github.com/camsong/fetch-jsonp) by @camsong, which is how I was able to get around the CORS issue when trying to use the DarkSky API
* [spin.js](http://spin.js.org/) provides a nifty spinner animation to use for loading
* [Weather Icons](https://erikflowers.github.io/weather-icons/) by @erikflowers


Originally I set out to build an app that would show the local weather. Per the freeCodeCamp spec, it needed:

* to show the weather at the user's current location
* to have a way to toggle between Fahrenheit and Celsius
* to show a different weather icon related to whatever the current weather conditions are

However, I decided to expand on the functionality, thinking it would be a nice challenge to add some features similar to the ones you Google shows when you search for weather in their browser. The app should also:

* show the user's location (city)
* show the day and approximate time of the user's request
* show the weather forecast for the upcoming week
* the forecast should have high/low temps and will also toggle between Fahrenheit and Celsius
* show other current weather stats (precipitation, humidity, wind speed)
* Wind speed will also toggle between mph and km/h
