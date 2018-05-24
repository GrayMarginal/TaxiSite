$(document).ready(function(){
var timeSetter = setInterval(function(){
    document.getElementById("time").value=new Date().getHours()+':'+new Date().getMinutes();
    document.getElementById("time").min=new Date().getHours()+':'+new Date().getMinutes();
}, 1000);
var startElement = document.getElementById("start");
var endElement = document.getElementById("end");
var phoneElement = document.getElementById("phone");
startElement.addEventListener('focus', function(){if(startElement.value=='Откуда'){startElement.value='';}else{codeAddress();}});
startElement.addEventListener('blur', function(){if(startElement.value==''){startElement.value='Откуда'; }});
endElement.addEventListener('focus', function(){if(endElement.value=='Куда'){endElement.value='';}});
endElement.addEventListener('blur', function(){if(endElement.value==''){endElement.value='Куда'; }else{codeAddress();}});
phoneElement.addEventListener('focus', function(){if(phoneElement.value=='Телефон'){phoneElement.value='';}});
phoneElement.addEventListener('blur', function(){if(phoneElement.value==''){phoneElement.value='Телефон'; }else{}});
})