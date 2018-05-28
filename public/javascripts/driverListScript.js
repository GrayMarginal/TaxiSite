$(document).ready(function(){
    $("#exit").click(function(){
    $.post('/driverList',{
    exit:true
    }, function(data){
        console.log(data);
        if(data.status=="OK"){
        alert("Вы успешно вышли!");
        document.location.reload();
        }else{
            alert("Что-то пошло не так, попробуйте еще раз!");
        }
    });
    });
    $("#driver-block").hide();
    auth();
    function auth(){
    $.post('/driverList', 
    {},
    function(data){
        console.log(data);
        if(data.status=="OK"){
            $("#lastName").text("Фамилия");
            $("#firstName").text("Имя");
            $("#patronymic").text("Отчество");
            $("#phone").text("Телефон");
            $("#password").text("Пароль");
            $("#carNumber").text("Номер авто");
            $("#carDescription").text("Описание авто");
            $("#status").text("Статус");
            $("#coordinates").text("Положение");
            $("#rate").text("Тариф");
            for(var i=0;i<data.list.length;i++){
                $('#driver-table').append("<tr id='"+i+"'></tr>");
                $("#driver-table tr#"+i)
                .append("<td><input name='lastName' readonly value='"+data.list[i].LastName+"'/></td>")
                .append("<td><input name='firstName' readonly value='"+data.list[i].FirstName+"'/></td>")
                .append("<td><input name='patronymic' readonly value='"+data.list[i].Patronymic+"'/></td>")
                .append("<td><input name='phone' readonly value='"+data.list[i].Phone_Number+"'/></td>")
                .append("<td><input name='password' readonly value='"+data.list[i].Password+"'/></td>")
                .append("<td><input name='carNumber' readonly value='"+data.list[i].Car_Number+"'/></td>")
                .append("<td><input name='carDescription' readonly value='"+data.list[i].Car_Description+"'/></td>")
                .append("<td><input name='status' readonly value='"+data.list[i].Status+"'/></td>")
                .append("<td>"+data.list[i].Coordinates+"</td>")
                .append("<td><input name='rate' readonly value='"+data.list[i].ID_Rate+"'/></td>")
                .append("<td><button onclick='edit("+i+")'>Ред</button></td>")
                .append("<td><button onclick='del("+i+")'>X</button></td>");
            }
            $("#driver-block").show(2000);
        }
    });
    }
})