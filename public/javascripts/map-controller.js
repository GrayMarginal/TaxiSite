		initialize();
		var markers = [];
        var geocoder;
		var matrix;
		var directionsService;
		var directionsRenderer;
  var map;
var timer = setInterval(function(){
document.getElementById('map').style.height = (document.documentElement.clientHeight-50)+'px'; 
document.getElementById('order-taxi').style.height = document.documentElement.clientHeight/100*30+'px';
},1000);
  function initialize() {
    geocoder = new google.maps.Geocoder();
	matrix = new google.maps.DistanceMatrixService();
	directionsService = new google.maps.DirectionsService();
	directionsRenderer = new google.maps.DirectionsRenderer();
    var latlng = new google.maps.LatLng(54.9851249,73.3167058);
    var mapOptions = {
      zoom: 8,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
	directionsRenderer.setMap(map);

 }

  function codeAddress() {
	removeMarkers();
    var address = "Омск "+document.getElementById('address').value;
	var address2 = "Омск "+document.getElementById('address2').value;
	matrix.getDistanceMatrix({
			origins:[address], 
			destinations:[address2], 
			travelMode:"DRIVING"},function(response, status){
				if(status=="OK"){
					alert("Поездка займет "+response.rows[0].elements[0].duration.text)
					}
			});
	directionsService.route({
		origin:address,
		destination: address2,
	travelMode:'DRIVING'}, function(response, status){
		if(status=='OK'){
			directionsRenderer.setDirections(response);
		}else{
			alert("Упс, что-то пошло не так и маршрут не построен((");
		}
	});
	/*directionsService.route({
		origin:address,
		destination: address2,
		waypoints:[{location:"Place", stopover:true},{location:"Place", stopover:true}...{etc}]
	travelMode:'DRIVING'}, function(response, status){
		if(status=='OK'){
			directionsRenderer.setDirections(response);
		}/*
	//git commit -m "Реализовано построение маршрутов и расчет времени поездки. Приложен скриншот"
    /*geocoder.geocode( { 'address': address}, function(results, status) {
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
		matrix.getDistanceMatrix({
			origins:[address], 
			destinations:[address2], 
			travelMode:"DRIVING"},function(response, status){
				if(status=="OK"){
					alert("Поездка займет "+response.rows[0].elements[0].duration.text)
					}
			});
		directionsService.route({
			origin:address,
			destination: address2,
		travelMode:'DRIVING'}, function(response, status){
			if(status=='OK'){
				directionsRenderer.setDirections(response);
			}else{
				alert("Упс, что-то пошло не так и маршрут не построен((");
			}
		});
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });*/
	/*var req = new XMLHttpRequest();
	req.open("GET", "https://maps.googleapis.com/maps/api/directions/json?origin="+address.replace(new RegExp(" ",'g'), "+")+"&destination="+address2.replace(new RegExp(" ",'g'), "+")+"&key=AIzaSyCkgZHQMiEst3HhDiU_ejn9Miy4z6PplxA" , true);
	req.addEventListener("load", function() {
  console.log("Done:", req.status);
});
req.send(null);
console.log("https://maps.googleapis.com/maps/api/directions/json?origin="+address.replace(new RegExp(" ",'g'), "+")+"&destination="+address2.replace(new RegExp(" ",'g'), "+")+"&key=AIzaSyCkgZHQMiEst3HhDiU_ejn9Miy4z6PplxA");*/
  }
  function removeMarkers() 
{
  for (i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];}
/*function createFrame(name, src, debug){
src=src||'javascript:false';
var tmpElem = document.createElement('div');
tmpElem.innerHTML = '<iframe name="'+name+'" id="'+name+'" src="'+src+'">;
var frame = tmpElem.firstChild;
if(!debug){
frame.style.display='none';
}
document.body.appendChild(frame);
return frame;
}*/
  //https://maps.googleapis.com/maps/api/directions/json?origin=address&destination=address2&key=AIzaSyCkgZHQMiEst3HhDiU_ejn9Miy4z6PplxA
  //"https://maps.googleapis.com/maps/api/directions/json?origin="+address.replace(" ", "+")+"&destination="+address2.replace(" ", "+")+"&key=AIzaSyCkgZHQMiEst3HhDiU_ejn9Miy4z6PplxA"   
