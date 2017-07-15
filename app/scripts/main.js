// window.onload = function() {
// 	console.log("page loaded");
// 	getLocation();

	
// 	var userLocation = document.getElementById("userLocation");

	
// 	function getLocation() {
// 		if (navigator.geolocation) {
// 			navigator.geolocation.getCurrentPosition(showPosition);

// 		} else {
// 			userLocation.innerHTML = "<h2>Geolocation is not supported by this browser.</h2>";
// 		}
// 	}

// 	function showPosition(position) {
		
// 		var userLocation = document.getElementById("userLocation");
// 		var latitude = position.coords.latitude;
// 		console.log(latitude);
// 		var longitude = position.coords.longitude;
// 		console.log(longitude);
// 		userLocation.innerHTML = "<h1>Your location is: " + latitude + "° , " + longitude + "°</h1>";
// 		getWeather(latitude, longitude);
// 	}

// 	navigator.geolocation.getCurrentPosition(getWeather);

// 	function getWeather(lat, long) {


// 		var darkskyKey = "c78e6b910ba14ef6ac41cfc1e46b3af5";

// 		var request = new XMLHttpRequest();

// 		var method = "GET";
// 		var url = "https://api.darksky.net/forecast/" + darkskyKey + "/" + lat + "," + long;
// 		var async = true;

// 		request.open(method, url, async);
// 		request.send();
// 		var data = JSON.parse(request.responseText);
// 		console.log(data);
// 		console.log(request.open);

// 		var script = document.createElement("script");
// 		script.src = url + "?callback=getWeather";
// 		document.getElementsByTagName('head')[0].appendChild(script);
// 	}
// };




	// function displayLocation(latitude, longitude) {
	// 	var request = new XMLHttpRequest();

	// 	var method = "GET";
	// 	var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=AIzaSyBOmVQ0jdmYuP5bcll8ErGQe8dWNN_joZ4";
	// 	var async = true;

	// 	request.open(method, url, async);
	// 	request.onreadystatechange = function() {
	// 		if (request.readyState == 4 && request.status == 200) {
	// 			var data = JSON.parse(request.responseText);
	// 			var address = data.results[0];
	// 			document.write(address.formatted_address);
	// 		}
	// 	};
	// 	request.send();
	// }

	// function successCallback(position) {
	// 	var lat = position.coords.latitude;
	// 	var long = position.coords.longitude;
	// 	displayLocation(lat,long);
	// }

	// function errorCallback(error) {
	// 	var errorMsg = "Unknown error";
	// 	switch(error.code) {
	// 		case 1:
	// 			errorMsg = "Permission denied";
	// 			break;
	// 		case 2:
	// 			errorMsg = "Position unavailable";
	// 			break;
	// 		case 3:
	// 			errorMsg = "Timeout";
	// 			break;
	// 	}
	// 	document.write(errorMsg);
	// }

	// var Options = {
	// 	enableHighAccuracy: true,
	// 	timeout: 7000,
	// 	maximumAge: 0
	// };

	// navigator.geolocation.getCurrentPosition(successCallback, errorCallback, Options);








$(document).ready(function() {
  getLocation();
});

function getLocation() {
  var location;
  $.ajax({
    format: "jsonp",
    dataType: "jsonp",
    url: "http://ip-api.com/json",
    success: function(data) {
      location = (data.lat + "," + data.lon);
      $("#userLocation").html(data.city + ", " + data.region);
      console.log(data.city);
      console.log(data.region);
      getURL(location);

    },
    error: function() {
      httpsLocation();
    },
    method: "GET"
  });

  function httpsLocation() {
    if (navigator.geolocation) {
      var location;
      navigator.geolocation.getCurrentPosition(passLocation);
    }
  }

  function passLocation(position) {
    location = position.coords.latitude + ", " + position.coords.longitude;
    setCity(location);
    getURL(location);
    console.log(location);
  }
}

function setCity(latLon) {
  var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLon + "&sensor=true";
  url = url.replace(/\s/g, "");
  $.ajax({
    format: "json",
    dataType: "json",
    url: url,
    success: function(data) {
      $('#userLocation').html(data.results[0].address_components[2].long_name);
    },
    method: "GET"
  });
}

function getURL(location, tempSetting) {
  var url = ("https://api.darksky.net/forecast/c78e6b910ba14ef6ac41cfc1e46b3af5/" + location + "?units=si");
  //console.log(url);
  getJson(url);

}

function getJson(url) {
  //console.log("started getJson with this url: " + url);

  $.ajax({
      format: "jsonp",
      dataType: "jsonp",
      url: url,
      success: function(json) {
        //console.log("great success");
        $("#temp-data").html("Current temperature at your location is: " + json.currently.temperature + "°C");
        // $("#temp-data").html("High: " + Math.round(json.daily.data[0].temperatureMax) + "°");
        // $("#temp-data").html("Low: " + Math.round(json.daily.data[0].temperatureMin) + "°");
        // setBackground(json.currently.icon);
        console.log(json.currently.temperature);
        console.log(json.daily.data[0].temperatureMax);
        console.log(json.daily.data[0].temperatureMin);
        console.log(json.currently.time);
        console.log(json.daily.data[0].icon);
      }

    })
    .error(function(jqXHR, textStatus, errorThrown) {
      alert("error: " + JSON.stringify(jqXHR));
    });
}

// $("#temp-type").on("click", function() {
//   var currentTemp = $("#weather-current").html().replace(/°/g, "");
//   var highTemp = $("#weather-high").html().replace(/°/g, "");
//   var lowTemp = $("#weather-low").html().replace(/°/g, "");
//   lowTemp = lowTemp.replace("Low: ", "");
//   highTemp = highTemp.replace("High: ", "");

//   if ($("#temp-type").html() == "Fahrenheit") {
//     $("#weather-current").html(toCelsius(currentTemp) + "°");
//     $("#weather-high").html("High: " + toCelsius(highTemp) + "°");
//     $("#weather-low").html("Low: " + toCelsius(lowTemp) + "°");
//     $("#temp-type").html("Celsius");

//   } else if ($("#temp-type").html() == "Celsius") {
//     $("#weather-current").html(toFahrenheit(currentTemp) + "°");
//     $("#weather-high").html("High: " + toFahrenheit(highTemp) + "°");
//     $("#weather-low").html("Low: " + toFahrenheit(lowTemp) + "°");
//     $("#temp-type").html("Fahrenheit");

//   }

//   function toCelsius(num) {
//     var newNum = (parseInt(num) - 32) * 5 / 9;
//     return Math.round(newNum);
//   }

//   function toFahrenheit(num) {
//     var newNum = (parseInt(num) * 9 / 5) + 32;
//     return Math.round(newNum);
//   }

// })

// function setBackground(weatherIcon) {
//   //console.log(weatherIcon);
//   switch (weatherIcon) {
//     case "clear-day":
//       document.getElementById("body").style.backgroundImage = 'url("http://feelgrafix.com/data_images/out/15/899301-sunny-day.jpg")';
//       break;
//     case "clear-night":
//       document.getElementById("body").style.backgroundImage = 'url("https://tcklusman.files.wordpress.com/2014/05/tumblr_static_dark-starry-night-sky-226736.jpg")';
//       break;
//     case "rain":
//       document.getElementById("body").style.backgroundImage = 'url("http://wearechange.org/wp-content/uploads/2015/03/1_See_It.jpg")';
//       break;
//     case "cloudy":
//       document.getElementById("body").style.backgroundImage = 'url("http://www.tripwire.com/state-of-security/wp-content/uploads/cache//shutterstock_106367810/4261234929.jpg")';
//       break;
//     case "partly-cloudy-day":
//       document.getElementById("body").style.backgroundImage = 'url("http://www.sturdyforcommonthings.com/wp-content/uploads/2013/03/wind_blowing.jpg")';
//       break;
//     case "partly-cloudy-night":
//       document.getElementById("body").style.backgroundImage = 'url("http://scienceblogs.com/startswithabang/files/2013/04/night-sky-stars.jpeg")';
//       break;
//     case "snow":
//       document.getElementById("body").style.backgroundImage = 'url("http://www.vancitybuzz.com/wp-content/uploads/2015/12/shutterstock_315123593-984x500.jpg")';
//       break;
//     default:
//       break;

//   }

// }