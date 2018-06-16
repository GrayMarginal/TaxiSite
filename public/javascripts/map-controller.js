$(document).ready(function(){
	//Создание переменных!
		var dev = false;
		var markers = [];
		var geocoder;
		var matrix;
		var directionsService;
		var directionsRenderer;
		var map;
		var fromAddress, toAddress, clientPhone, arrivalTime, rate, distance, price;
		
if(!dev)initialize();
var timer = setInterval(function(){ 
document.getElementById('map').style.height = (document.documentElement.clientHeight-50)+"px";
},1000);

  function initialize() {
		$("#orderBtn").click(function(){
			compileOrder();
		});
		$("#prepareBtn").click(function(){
			codeAddress();
		});
		
var startElement = document.getElementById("start");
var endElement = document.getElementById("end");
var phoneElement = document.getElementById("phone");
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

startElement.addEventListener('focus', function(){
	if(startElement.value=='Откуда'){
		startElement.value='';
		}else{
			codeAddress();
			}});
			
startElement.addEventListener('blur', function(){
	if(startElement.value==''){
		startElement.value='Откуда'; 
		}});
		
endElement.addEventListener('focus', function(){
	if(endElement.value=='Куда'){
		endElement.value='';
		}});
		
endElement.addEventListener('blur', function(){
	if(endElement.value==''){
		endElement.value='Куда'; 
		}else{
			codeAddress();
			}});
			
phoneElement.addEventListener('focus', function(){
	if(phoneElement.value=='Телефон'){
		phoneElement.value='';
		}});
		
phoneElement.addEventListener('blur', function(){
	if(phoneElement.value==''){
		phoneElement.value='Телефон'; 
		}else{
			
		}});
    
 }	

  function codeAddress() {
	  if(!dev){
	removeMarkers();
	fromAddress = $('#start').val();
	toAddress = $('#end').val();
	$.post('/order',{
		prepare:true,
		data:{
			rate:$('#tariff option:selected').val();
		}
	}, function(data){
		
	});
	if((fromAddress!=''&&fromAddress!='Откуда')&&(toAddress!=''&&toAddress!='Куда')){
		var start = "Омск "+fromAddress;
		var end = "Омск "+toAddress;
		rate = $('#tariff option:selected').val();
		console.log(start+end+rate);
	
	matrix.getDistanceMatrix({
			origins:[start], 
			destinations:[end], 
			travelMode:"DRIVING"},function(response, status){
				if(status=="OK"){
				$('#tripinfo').html("Поездка займет "+response.rows[0].elements[0].duration.text);
				distance = response.rows[0].elements[0].distance.value;
				
				
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
	return true;
  }
  function removeMarkers() 
{
  for (i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
	markers = [];}

	function compileOrder(){
		console.log('Попытка оформить заказ');
		console.log(codeAddress());
		if (codeAddress()){
			console.log('Прошел кодАдресс');
			clientPhone = $('#phone').val();
			arrivalTime = $('#arrivalTime').val();
			console.log(fromAddress+' '+toAddress+' '+clientPhone+' '+arrivalTime+' '+rate);
			if((fromAddress&&toAddress&&clientPhone&&entrance&&arrivalTime&&rate)){
				console.log('проверка присвоены ли значения пройдена');
				if(Number(clientPhone)!=NaN&&Number(clientPhone)!=0&&clientPhone.length>=11){
					console.log('Проверка номера');
					var now = new Date();
					if(new Date(now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate()+'T'+(arrivalTime+':00')>=new Date())){
						console.log('Проверка даты');
						if(entrance>=1&&entrance<=6){
							console.log('Проверка подъезда');
							if(rate==1||rate==5){
								if(distance){
									$.post('/order',
									{
										order:true,
										data:{
										"fromAddress":fromAddress,
										"toAddress":toAddress,
										"clientPhone":clientPhone, 
										"arrivalTime":arrivalTime,
										"rate":rate,
										"distance":(distance/1000),
										"services":
										{
											"child":$('#child').prop('checked'),
											"animal":$('#animal').prop('checked')
										}}
									});
							console.log('запрос отправлен');
								}
							}
						}
					}
				}else{
					alert('Некорректный номер телефона');
				}
		}
	}
	}
})