//将存入本地的身份信息sessionStorage取出来
var array = JSON.parse(localStorage.getItem("arr"));
// alert(array.length);
var i=1;	//从2号开始

var js_back = document.getElementById("back");
var js_close = document.getElementById("close");


js_back.onclick =function(){
	history.back();
} 
js_close.onclick=function (){
	window.location.href = "../task2/task2.html";
}




// $(document).ready(
// 	function(){
// 		$("#btn").click(		
// 			function(){
// 			$("#bcg1").hide();
// 			$("#bcg2").show();
// 			$("#bcg2").css({"display": "flex","flex-flow": "column nowrap","justify-content": "center","align-items": "center"});
// 			}
// 		);	
// 	}
// );	


function changeBcg1() {
	$("#bcg1").hide();
	$("#bcg2").show();
	$("#bcg2").css({"display": "flex","flex-flow": "column nowrap","justify-content": "center","align-items": "center"});

	$(".p1").text(array[i]);	
	$(".p2").text("词组：西伯利亚");

	$("#btn").text("隐藏并传递给"+i+"号");	
}

function changBcg2() {
	$("#bcg1").show();
	$("#bcg2").hide();

	$("#btn").text("查看"+i+"号身份");
}

function btnChange() {
	if (i == 1) {
		$("#btn").text("查看"+i+"号身份"); 
	}
	else if (i <= array.length) {
		if (i%2 == 0) {
			changeBcg1();
		}else {
			changeBcg2();
		}
	
	}else if (i == array.length) {
		$("#bcg1").hide();
		$("#bcg2").show();
		$("#bcg2").css({"display": "flex","flex-flow": "column nowrap","justify-content": "center","align-items": "center"});

		$(".p1").text(array[i]);	
		$(".p2").text("词组：西伯利亚");
		// $(".p3").text("");

		$("#btn").text("法官查看");	
	}
	i++;
	if (i == array.length+1) {
		window.location.href = "../task2-3/task2-3.html";
	}

}

$(document).ready(
	function(){
  		$("#btn").click(
  			btnChange();
 		 );
	}
);

// $(document).ready(
// 	function(){
// 		$("#btn").toggle(	这里一用toggle就隐藏了
// 			function(){
// 			$("#bcg1").hide();
// 			$("#bcg2").show();
// 			},
// 			function(){
// 			$("#bcg2").hide();
// 			$("#bcg1").show();		
// 			}		
// 		);	
// 	}
// );		
