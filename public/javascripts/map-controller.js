		initialize();
		var markers = [];
        var geocoder;
  var map;
  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(54.9851249,73.3167058);
    var mapOptions = {
      zoom: 8,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function codeAddress() {
	removeMarkers();
    var address = "Омск "+document.getElementById('address').value;
	var address2 = "Омск "+document.getElementById('address2').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
		map.setZoom(15);
        markers[0] = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
	geocoder.geocode( { 'address': address2}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
		map.setZoom(15);
        markers[1] = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
	var req = new XMLHttpRequest();
	req.open("GET", "https://maps.googleapis.com/maps/api/directions/json?origin="+address.replace(new RegExp(" ",'g'), "+")+"&destination="+address2.replace(new RegExp(" ",'g'), "+")+"&key=AIzaSyCkgZHQMiEst3HhDiU_ejn9Miy4z6PplxA" , true);
	req.addEventListener("load", function() {
  console.log("Done:", req.status);
});
req.send(null);
console.log("https://maps.googleapis.com/maps/api/directions/json?origin="+address.replace(new RegExp(" ",'g'), "+")+"&destination="+address2.replace(new RegExp(" ",'g'), "+")+"&key=AIzaSyCkgZHQMiEst3HhDiU_ejn9Miy4z6PplxA");
  }
  function removeMarkers() 
{
  for (i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];}
  //https://maps.googleapis.com/maps/api/directions/json?origin=address&destination=address2&key=AIzaSyCkgZHQMiEst3HhDiU_ejn9Miy4z6PplxA
  //"https://maps.googleapis.com/maps/api/directions/json?origin="+address.replace(" ", "+")+"&destination="+address2.replace(" ", "+")+"&key=AIzaSyCkgZHQMiEst3HhDiU_ejn9Miy4z6PplxA"   