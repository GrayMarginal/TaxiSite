$(document).ready(function(){
	//var time = document.getElementById("arrivalTime");
	document.getElementById("arrivalTime").min = new Date().getHours()+':'+new Date().getMinutes();
	document.getElementById("arrivalTime").value = new Date().getHours()+':'+new Date().getMinutes();
var timeSetter = setInterval(function(){
	//if (document.getElementById("arrivalTime").value < (new Date().getHours()+':'+new Date().getMinutes())){
		document.getElementById("arrivalTime").min = new Date().getHours()+':'+new Date().getMinutes();
		document.getElementById("arrivalTime").value = new Date().getHours()+':'+new Date().getMinutes();
	//}
}, 1000);
})