var username;
var password;

var checked = [0,0];

//username这里还是用jq的不过这里显示错误信息应该也是用AJAX来做的，而不是JQ，不过任务没要求怎么取出错误返回信息地址
$(".username_text").change(function () {
	//清空登录提示
	$("#btn_check").text("");
    // $(".username_text").value="";	  // 清空输入框
    username = $(".username_text").val();//获取数值
    console.log(username);
    //"^[A-Za-z]+$"　　//由26个英文字母组成的字符串  test() 方法用于检测一个字符串是否匹配某个模式.
    if( username.length < 5 || username.length > 10 || !/^[A-Za-z\d]+$/.test(username) ){
        $("#username_check").text("账号至少为5位的数字和字母");

    } else {
    	 // 清空输入提示框
    	$("#username_check").text("");
    	checked[0] = 1;
    	console.log(checked[0]);
    	console.log(checked);
    }

});


//password
$(".password_text").change(function () {
	//清空登录提示
	$("#btn_check").text("");
    // $(".username_text").value="";	  // 清空输入框
    password = $(".password_text").val();//获取数值
    console.log(password);
    if( password.length <6 || password.length > 16){
        $("#password_check").text("密码为6到16位");

    } else {
    	 // 清空输入提示框
    	$("#password_check").text("");
    	checked[1] = 1;
    	console.log(checked[1]);
    	console.log(checked);    	
    }	
});


//login这里提交用ajax  只有账号和密码都输入正确才能按登录，要有个记录账号和密码都输入正确的标志

$("#btn_login").click(function () {
    //账号密码都输入了才能点击登录，不然不行
    console.log(checked); 
    console.log(username);
    console.log(password);
    username = $(".username_text").val();
    password = $(".password_text").val();
    if (checked[0] && checked[1]) {
// $.ajax({
//     url: "/carrots-admin-ajax/a/login",
//     method: "POST",
//     data: {"name": username,"pwd": password}
// 	contentType: "application/json; charset=utf-8",
// dataType: "json",
// success: function (text, status) {
// var meg = JSON.parse(test);
// alert(mes.message); 
// },
// error: function (msg) {
//     alert(msg);
// }
// })
		//$.post(url,parameters,callback)
        $.post("/carrots-admin-ajax/a/login", { name: username, pwd: password }, function (text) { 
        	var meg = JSON.parse(text);
        	alert(meg.message); 
        });
            // url: "http://dev.admin.carrots.ptteng.com/"

        // }, function (test) {
        //     var mes = JSON.parse(test);
        //     alert(mes.message);

// function (msg) {
//         var c=JSON.parse(msg);
//         $(".tips1").text("");
//         $(".tips2").text("");
//         if (c.message==="success") {
//             alert(c.message);
//         }
//         else if(c.message==="用户不存在"){
//             $(".tips1").text(c.message);//输出
//         }
//         else if(c.message==="密码错误"){
//             $(".tips2").text(c.message);//输出
//         }
//         }
//     )
// }        

    } else {
    	// 清空输入提示框
    	$("#username_check").text("");
    	$("#password_check").text("");
    	$("#btn_check").text("无此用户");
    }

});


//ajax  XHR对象创建，然后向服务器发送请求
// function loadXMLDoc()
// {
// 	var xmlhttp;
// 	if (window.XMLHttpRequest)
// 	{
// 		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
// 		xmlhttp=new XMLHttpRequest();
// 	}
// 	else
// 	{
// 		// IE6, IE5 浏览器执行代码
// 		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
// 	}


// 	xmlhttp.onreadystatechange=function()
// 	{
// 		if (xmlhttp.readyState==4 && xmlhttp.status==200)
// 		{
// 			// document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
// 		}
// 	}
// 	xmlhttp.open("POST","/carrots-admin-ajax/a/login",true);
// 	xmlhttp.send();
// }


