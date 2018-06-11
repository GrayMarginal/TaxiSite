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
                $('#driver-table').append("<tr id='"+data.list[i].ID_Driver+"'></tr>");
                $("#driver-table tr#"+data.list[i].ID_Driver)
                .append("<td><input name='lastName' readonly value='"+data.list[i].LastName+"' style='width:"+data.list[i].LastName.length*9+"px' /></td>")
                .append("<td><input name='firstName' readonly value='"+data.list[i].FirstName+"' style='width:"+data.list[i].FirstName.length*9+"px'/></td>")
                .append("<td><input name='patronymic' readonly value='"+data.list[i].Patronymic+"' style='width:"+data.list[i].Patronymic.length*9+"px'/></td>")
                .append("<td><input name='phone' readonly value='"+data.list[i].Phone_Number+"' style='width:"+data.list[i].Phone_Number.length*9+"px'/></td>")
                .append("<td><input name='password' readonly value='"+data.list[i].Password+"' style='width:"+data.list[i].Password.length*9+"px'/></td>")
                .append("<td><input name='carNumber' readonly value='"+data.list[i].Car_Number+"' style='width:"+data.list[i].Car_Number.length*9+"px'/></td>")
                .append("<td><input name='carDescription' readonly value='"+data.list[i].Car_Description+"' style='width:"+data.list[i].Car_Description.length*9+"px'/></td>")
                .append("<td><input name='status' readonly value='"+data.list[i].Status+"' style='width:"+data.list[i].Status.length*9+"px'/></td>")
                .append("<td>"+data.list[i].Coordinates+"</td>")
                .append("<td><input name='rate' readonly value='"+data.list[i].ID_Rate+"' style='width:5px'/></td>")
                .append("<td><button onclick='edit("+data.list[i].ID_Driver+")'>Ред</button></td>")
                .append("<td><button onclick='del("+data.list[i].ID_Driver+")'>X</button></td>");
            }
            $("#driver-block").show(2000);
        }
    });
    }
})