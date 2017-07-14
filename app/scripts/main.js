
// 	function geoLocation() {
// 		var userLocation = document.getElementById("user-location");

// 		if (!navigator.geolocation) {
// 			userLocation.innerHTML = "<h2>Geolocation is not supported by your browser!</h2>";
// 			return;
// 		}

// 		function success(position) {
// 			var latitude = position.coords.latitude;
// 			var longitude = position.coords.longitude;

// 			console.log(latitude);
// 			console.log(longitude);

// 			userLocation.innerHTML = "<h1>Your location is: " + latitude + "° ," + longitude + "°</h1>";
// 		}

// 		function error() {
// 			userLocation.innerHTML = "<h2>Unable to retrieve your location!</h2>";
// 		}

// 		navigator.geolocation.getCurrentPosition(success, error);
// 	}

// 	var body = document.querySelector("body");
// 	body.addEventListener("onload", geoLocation);

// };

window.onload = function() {
	console.log("page loaded");
	getLocation();
	
	var userLocation = document.getElementById("userLocation");
	console.log(userLocation);
	
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);

		} else {
			userLocation.innerHTML = "<h2>Geolocation is not supported by this browser.</h2>";
		}
	}

	function showPosition(position) {
		

		var latitude = position.coords.latitude;
		console.log(latitude);
		var longitude = position.coords.longitude;
		console.log(longitude);
		userLocation.innerHTML = "<h1>Your location is: " + latitude + "° ," + longitude + "°</h1>";
	}



};