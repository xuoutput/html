//将存入本地的身份信息sessionStorage取出来
var array = JSON.parse(localStorage.getItem("arr"));
// alert(array.length);
var i=1;	//从2号开始
var count=1;
var go=0;


var js_back = document.getElementById("back");
var js_close = document.getElementById("close");


js_back.onclick =function(){
	history.back();
} 
js_close.onclick=function (){
	window.location.href = "../task2/task2.html";
}




$(document).ready(
	function(){
  		$("#btn").click(

		function btnChange() {
			// if (i == 1) {
			// 	$(".num p").text(i); 
			// 	$("#btn").text("查看"+i+"号身份"); 
			// }
			// else 

			if (go) {
				window.location.href = "../task2-3/task2-3.html";
			}

			if (i < array.length) {
				if (count%2 == 1) {
					$(".num p").text(i);
					$("#bcg1").hide();
					$("#bcg2").show();
					$("#bcg2").css({"display": "flex","flex-flow": "column nowrap","justify-content": "center","align-items": "center"});

					$(".p1").text(array[i]);	
					$(".p2").text("词组：西伯利亚");

					$("#btn").text("隐藏并传递给"+(i+1)+"号");
					
				}else {
					i++;

					$(".num p").text(i);

					$("#bcg1").show();
					$("#bcg2").hide();

					$("#btn").text("查看"+i+"号身份");

				}

				count++;
			
			}else if (i == array.length) {
				$(".num p").text(i);

				$("#bcg1").hide();
				$("#bcg2").show();
				$("#bcg2").css({"display": "flex","flex-flow": "column nowrap","justify-content": "center","align-items": "center"});

				$(".p1").text(array[i]);	
				$(".p2").text("词组：西伯利亚");
				// $(".p3").text("");

				$("#btn").text("法官查看");	

				go++;
			}
			

		}

 		 );
	}
);

