		$(document).ready(function(){
		var dev = false;
		var markers = [];
    var geocoder;
		var matrix;
		var directionsService;
		var directionsRenderer;
		var orderBtn = $("#orderBtn");
		var map;
		var fromAddress, toAddress, clientPhone, entrance, arrivalTime;
		initialize();

var timer = setInterval(function(){ 
document.getElementById('map').style.height = (document.documentElement.clientHeight-50)+"px";
},1000);
  function initialize() {
		orderBtn.click(function(){
			codeAddress();
		});
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
	fromAddress = $('#start').val();
	toAddress = $('#end').val();
  var start = "Омск "+fromAddress;
	var end = "Омск "+toAddress;
	matrix.getDistanceMatrix({
			origins:[start], 
			destinations:[end], 
			travelMode:"DRIVING"},function(response, status){
				if(status=="OK"){
				$('#tripinfo').html("Поездка займет "+response.rows[0].elements[0].duration.text);
					}else{
						alert("Упс, кажется что-то пошло не так. Попробуйте еще раз");
						return false;
					}
			});
	directionsService.route({
		origin:start,
		destination: end,
	travelMode:'DRIVING'}, function(response, status){
		if(status=='OK'){
			directionsRenderer.setDirections(response);
		}else{
			alert("Упс, кажется что-то пошло не так. Попробуйте еще раз");
			return false;
		}
	});
  }else{
		return false;
	}}
  }
  function removeMarkers() 
{
  for (i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
	markers = [];}

	function compileOrder(){
		if (codeAddress()){
			clientPhone = $('phone').val();
			entrance = $('entrance').val();
			arrivalTime = $('arrivalTime').val();
			if((fromAddress&&toAddress&&clientPhone&&entrance&&arrivalTime)){
				if(Number(clientPhone)!=NaN&&Number(clientPhone)!=0&&clientPhone.length>11){
					var now = new Date();
					if(new Date(now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate()+'T'+(arrivalTime+':00')>=new Date())){
						if(entrance>=1&&entrance<=6){
							$.ajax({
								url:'/order',
								type:'POST',
								data:{
								"fromAddress":fromAddress,
								"toAddress":toAddress, 
								"entrance":entrance,
								"clientPhone":clientPhone, 
								"arrivalTime":arrivalTime,
								"services":
								{
									"child":$('#child').prop('checked'),
									"animal":$('#animal').prop('checked')
								}}
							});
						}
					}
				}else{
					alert('Некорректный номер телефона');
				}
		}
	}
	}
})