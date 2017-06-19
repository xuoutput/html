//将存入本地的身份信息sessionStorage取出来
var array = JSON.parse(localStorage.getItem("arr"));
// alert(array.length);



var js_back = document.getElementById("back");
var js_close = document.getElementById("close");


js_back.onclick =function(){
	history.back();
} 
js_close.onclick=function (){
	window.location.href = "../../task2/task2/task2.html";
}

$(document).ready(function(){
	// 加html标签
	// 

	//这里只用了1个循环
	// for (var i = 0; i < array.length; i++) {
		// $("main").append($("<div class=\"box\"></div>"));
		// $(".box").eq(i).append($("<p class=\"person\"></p>"));
		// $(".box").eq(i).append($("<p class=\"num\"></p>"));
		//加内容
		// $(".person").eq(i).text(array[i]);
		// $(".num").eq(i).text((i+1)+"号");
		//加CSS样式
		// $(".box").css({"float": "left",	"width": "21%",	"margin": "5% 5% 4.5% 5%", "border": "5px solid #fff",	"background-image": "url(images/ptt.png)", "background-repeat": "no-repeat", "background-attachment": "scroll", "background-position":" center center", "background-size": "cover"});
		// $(".person").css({"font-size": ".3rem", "color":"#fff",	"display": "flex", "flex-flow": "row nowrap", "justify-content": "center", "align-items": "center",	"padding": "28% 0",	"opacity": "0"});
		// $(".person:hover").css({ "opacity": "1", "background-color": "#f5c97b"});
		// $(".num").css({	"font-size": ".23rem", "color": "#fff",	"background-color": "rgba(62,166,199,0.7)",	"display": "flex", "flex-flow": "row nowrap", "justify-content": "center", "align-items": "center"});

	// }


	//这里用3个循环试试
	for (var i = 0; i < array.length; i++) {
		$("main").append($("<div class=\"box\"></div>"));
	}
	for (var i = 0; i < array.length; i++) {
		$(".box").eq(i).append($("<p class=\"person\"></p>"));
		$(".person").eq(i).text(array[i]);
	}
	for (var i = 0; i < array.length; i++) {
		$(".box").eq(i).append($("<p class=\"num\"></p>"));
		$(".num").eq(i).text((i+1)+"号");
	}
});


$("#btn").click(function(){
	window.location.href = "../task4-2/task4-2.html";
});



