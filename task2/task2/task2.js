

// document.getElementById("btn").onclick=function () {
//     window.location.href="../task2-1/task2-1.html";
// }



//加上jq

$(document).ready(function(){
	//每次重玩的时候都要清空缓存
	localStorage.clear();
	console.log(localStorage);

	$("#btn").click(function(){
	    window.location.href = "../task2-1/task2-1.html";
	});
	// $("#btn").on("click",function(){
	// 	window.location.href = "../task2-1/task2-1.html";
	// })
});


