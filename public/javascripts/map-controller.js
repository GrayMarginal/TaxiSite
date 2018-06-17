$(document).ready(function(){
	//Создание переменных!
		var dev = false;
		var markers = [];
		var geocoder;
		var matrix;
		var directionsService;
		var directionsRenderer;
		var map;
		var fromAddress, toAddress, clientPhone, arrivalTime, rate = 1, distance=0, price = 0;
		
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
		price = 0;
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
				console.log('Дистанция = '+distance);
				$.post('/order',{
					prepare:true,
					data:{
						rate:$('#tariff option:selected').val()
					}
				}, function(data){
					console.log(data);
					if(data.min_price&&data.km_price){
						if (distance/1000>1){
							price = Math.round(data.min_price+(data.km_price*(distance/1000)));
						$("#price").html("Стоимость поездки: "+price+" руб.");
						}else{
							price = (data.min_price);
							$("#price").html("Стоимость поездки: "+price+" руб.");
						}
					}
				});
				
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
			if(fromAddress!=''&&toAddress!=''&&clientPhone!=''&&arrivalTime!=''&&rate>0){
				console.log('проверка присвоены ли значения пройдена');
				if(Number(clientPhone)!=NaN&&Number(clientPhone)!=0&&clientPhone.length>=11){
					console.log('Проверка номера');
					var now = new Date();
					if(new Date(now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate()+'T'+(arrivalTime+':00')>=new Date())){
						console.log('Проверка даты');
							if(rate){
								console.log('Проверка тарифа:'+rate);
								console.log('Проверка расстояния:'+distance);
								if(distance>0){
									
									$.post('/order',
									{
										order:true,
										data:{
										"fromAddress":fromAddress,
										"toAddress":toAddress,
										"clientPhone":clientPhone.replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, ''), 
										"arrivalTime":arrivalTime,
										"rate":rate,
										"distance":(distance/1000),
										"price":price,
										"comment":$("#comment").val(),
										"services":
										{
											"child":$('#child').prop('checked'),
											"animal":$('#animal').prop('checked')
										}},
										function(data) {
											console.log('запрос обработан');
											//alert(data.message);
										}
									});
									console.log('запрос отправлен');
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