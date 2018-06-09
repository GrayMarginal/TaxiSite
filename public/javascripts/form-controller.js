$(document).ready(function(){
	document.getElementById("arrivalTime").min = new Date().getHours()+':'+new Date().getMinutes();
	document.getElementById("arrivalTime").value = new Date().getHours()+':'+new Date().getMinutes();
var timeSetter = setInterval(function(){
	var time = document.getElementById("arrivalTime");
	if(time.value<new Date().getHours()+':'+new Date().getMinutes()){
		time.min = new Date().getHours()+':'+new Date().getMinutes();
		time.value = new Date().getHours()+':'+new Date().getMinutes();
		}
}, 1000);
})