console.log("Hello!");


var searchBox = new google.maps.places.SearchBox(document.querySelector("#city-search"));
searchBox.addListener("places_changed", function() {
    var locale = searchBox.getplaces()[0];

    var latInput = document.querySelector("#latitude");
    var lngInput = document.querySelector("#longitude");

    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
});

