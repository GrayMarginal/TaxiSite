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
		$("#pay").hide();
		$("#phone").mask("8(999)999-99-99", { completed: function () { } });
		$("#tariff").change(function(){
			if($('#tariff option:selected').val()==2){
				$("#pay").show();
				
			}else{
				$("#pay").hide();
			}
			codeAddress(false);
		});
		$("#orderBtn").click(function(){
			codeAddress(true);
		});
		$("#prepareBtn").click(function(){
			codeAddress(false);
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
	console.log(map);
	directionsRenderer.setMap(map);

	startElement.addEventListener('blur', function(){
		if(startElement.value!=''&&endElement.value!=''){
			codeAddress(false);
	}});
	endElement.addEventListener('blur', function(){
		if(startElement.value!=''&&endElement.value!=''){
			codeAddress(false);
	}});
 }	

  function codeAddress(variable) {
	  if(!dev){
	removeMarkers();
	fromAddress = $('#start').val();
	toAddress = $('#end').val();
	var first, second;
	if((fromAddress!='')&&(toAddress!='')){
		var start = "Омск "+fromAddress;
		var end = "Омск "+toAddress;
		geocoder.geocode({address:fromAddress}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
		first = true;
      } else {
		  alert("Адрес отправки некоректный!");
		  first = false
		  return;
      }
    });
	geocoder.geocode({address:toAddress}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
		second = true;
      } else {
        alert("Адрес прибытия некоректный!");
		second = false;
		 return;
      }
    });
	if(first==true&&second==true){
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
					if(variable == true){
						compileOrder();
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
	});}
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
			console.log('Прошел кодАдресс');
			clientPhone = $('#phone').val();
			arrivalTime = $('#arrivalTime').val();
			if(fromAddress==''||toAddress==''){
				alert("Заполните начальный и конечный адрес!");
				return;
			}
			console.log('проверка адресов пройдена');
			if(clientPhone==''||clientPhone.length<15){
				alert("Заполните номер телефона!");
				return;
			}
			console.log('Проверка номера пройдена');
			console.log(fromAddress+' '+toAddress+' '+clientPhone+' '+arrivalTime+' '+rate);
					var now = new Date();
					if(new Date(now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate()+'T'+(arrivalTime+':00')>=new Date())){
						console.log('Проверка даты пройдена');
							if(rate){
								console.log('Проверка тарифа:'+rate);
								console.log('Проверка расстояния:'+distance);
								if(distance>0){
									var date = new Date();
									$.post('/order',
									{
										order:true,
										data:{
										"fromAddress":fromAddress,
										"toAddress":toAddress,
										"clientPhone":clientPhone.replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, ''), 
										"arrivalTime":""+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+arrivalTime+":00",
										"entrance":1,
										"rate":rate,
										"distance":(distance/1000),
										"price":price,
										"comment":$("#comment").val(),
										"services":
										{
											"child":$('#childbox').prop('checked'),
											"animal":$('#animalbox').prop('checked')
										}},
										function(data) {
											console.log('запрос обработан');
											alert("Заказ успешно оформлен!");
										}
									});
									console.log('запрос отправлен');
								}
							}
						
					}
	}
})