$(document).ready(function(){
	var curTime = {
		hours:new Date().getHours().toString(),
		minutes:new Date().getMinutes().toString(),
		getFullTime:function(){
			var h, m;
			if(Number(this.hours)<=9){
				h = "0"+this.hours;
			}else{
				h = this.hours;
			}
			if(Number(this.minutes)<=9){
				m = "0"+this.minutes;
			}else{
				m = this.minutes;
			}
			return h+":"+m;
		},
		update:function(){
			this.hours = new Date().getHours().toString();
			this.minutes = new Date().getMinutes().toString();
		}
	}
	//document.getElementById("arrivalTime").min = new Date().getHours()+':'+new Date().getMinutes();
	document.getElementById("arrivalTime").value = new Date().getHours()+':'+new Date().getMinutes();
setInterval(function(){
	var time = document.getElementById("arrivalTime");
	curTime.update();
	if(time.value<curTime.getFullTime()){
		time.min = curTime.getFullTime();
		time.value = curTime.getFullTime();
	}
		}, 1000);
})