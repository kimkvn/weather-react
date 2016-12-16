# Weather-React

## [See it in action!](https://kimkvn.github.io/weather-react/) ####(Chrome or Firefox supported only)

**Featured APIs:**

[Dark Sky](https://darksky.net/dev/)

[GoogleMaps Geocode](https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse)

**Built with:**
* React
* Sass
* Gulp

This app uses the following tools/libraries/methods:
* [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [`fetch-jsonp`](https://github.com/camsong/fetch-jsonp) by @camsong, which is how I was able to get around the CORS issue when trying to use the DarkSky API
* [spin.js](http://spin.js.org/), provides a nifty spinner animation to use for loading
* [Weather Icons](https://erikflowers.github.io/weather-icons/) by @erikflowers


Originally I set out to build an app that would show the local weather. Per the freeCodeCamp spec, it needed:

- [x] to show the weather at the user's current location
- [x] to have a way to toggle between Fahrenheit and Celsius
- [x] to show a different weather icon related to whatever the current weather conditions are

However, I decided to expand on the functionality, thinking it would be a nice challenge to add some features similar to the ones Google shows when you search for weather in their browser. The app should also:

- [x] show the user's location (city)
- [x] show the day and approximate time of the user's request
- [x] show the weather forecast for the upcoming week
- [x] have high/low temps and will also toggle between Fahrenheit and Celsius
- [x] show other current weather stats (precipitation, humidity, wind speed)
- [x] toggle wind speed between mph and km/h

This project grew exponentially as I worked on it. Just when I thought I was nearing the end, I realized the app should have another feature. But as a result, I learned so much about React and various tools and methods. And knowing is half the battle.
