//将存入本地的身份信息sessionStorage取出来
var array = JSON.parse(localStorage.getItem("arr"));
// alert(array.length);



var js_back = document.getElementById("back");
var js_close = document.getElementById("close");


js_back.onclick =function(){
	history.back();
} 
js_close.onclick=function (){
	window.location.href = "../task2/task2.html";
}
