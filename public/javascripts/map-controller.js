		//initialize();
		var dev = true;
		var markers = [];
        var geocoder;
		var matrix;
		var directionsService;
		var directionsRenderer;

  var map;
var timer = setInterval(function(){
document.getElementById('map').style.height = (document.documentElement.clientHeight-50)+'px'; 
},1000);
  function initialize() {
    geocoder = new google.maps.Geocoder();
	matrix = new google.maps.DistanceMatrixService();
	directionsService = new google.maps.DirectionsService();
	directionsRenderer = new google.maps.DirectionsRenderer();
    var latlng = new google.maps.LatLng(54.9851249,73.3167058);
    var mapOptions = {
      zoom: 12,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
	directionsRenderer.setMap(map);

 }

  function codeAddress() {
	  if(!dev){
	removeMarkers();
	if((startElement!=''&&startElement!='Откуда')&&(endElement!=''&&endElement!='Куда')){
    var start = "Омск "+document.getElementById('start').value;
	var end = "Омск "+document.getElementById('end').value;
	matrix.getDistanceMatrix({
			origins:[start], 
			destinations:[end], 
			travelMode:"DRIVING"},function(response, status){
				if(status=="OK"){
					document.getElementById('tripinfo').innerHTML="Поездка займет "+response.rows[0].elements[0].duration.text;
					}
			});
	directionsService.route({
		origin:start,
		destination: end,
	travelMode:'DRIVING'}, function(response, status){
		if(status=='OK'){
			directionsRenderer.setDirections(response);
		}else{
			document.getElementById('tripinfo').innerHTML="Упс, что-то пошло не так и маршрут не построен((";
		}
	});
  }}
  }
  function removeMarkers() 
{
  for (i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];}