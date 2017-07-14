console.log("Hello!");

// store reference to #city-search input in a citySearch variable
var citySearch = document.getElementById("#city-search");
// attach citySearch to a Google Maps API SearchBox constructor
var searchBox = new google.maps.places.SearchBox(citySearch);
searchBox.addListener("places_changed", function() {
	var locale = searchBox.getplaces()[0];

	var latInput = document.querySelector("#latitude");
	var lngInput = document.querySelector("#longitude");

	latInput.value = place.geometry.location.lat();
	lngInput.value = place.geometry.location.lng();
});



// pull in data from Darksky API 
$.getJSON('https://api.darksky.net/forecast/c78e6b910ba14ef6ac41cfc1e46b3af5/51.5074,0.1278', function(forecast) {
	console.log(forecast);
});





function weather() {

	var location = document.getElementById("city-search");
	var apiKey = 'c78e6b910ba14ef6ac41cfc1e46b3af5'; 
	var url = 'https://api.darksky.net/forecast/';

	navigator.geolocation.getCurrentPosition(success, error);

	function success(position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

		location.innerHTML = 'Latitude is ' + latitude + '° Longitude is ' + longitude + '°';

		$.getJSON(url + apiKey + "/" + latitude + "," + longitude + "?callback=?", function(data) {
			$('#temp').html(data.currently.temperature + '° F');
			$('#minutely').html(data.minutely.summary);
			console.log(data);
		});
	}

	function error() {
		location.innerHTML = "Unable to retrieve your location";
	}

	location.innerHTML = "Locating...";
}

weather();