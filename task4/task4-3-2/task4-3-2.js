//从4-3第一天晚上杀人开始取出数值来，黑夜揭秘
var player_obj = JSON.parse(localStorage.getItem("player_obj"));
var the_dead = JSON.parse(localStorage.getItem("the_dead"));
var day = JSON.parse(localStorage.getItem("day"));

var js_back = document.getElementById("back");
var js_close = document.getElementById("close");


console.log(player_obj);
console.log(the_dead);
console.log("day="+day);



js_back.onclick =function(){
	history.back();
} 
js_close.onclick=function (){
	window.location.href = "../../task2/task2/task2.html";
}




$(document).ready(function(){

		console.log(player_obj);
		console.log(the_dead);
		//用来记录是杀手杀死还是投票，也就换着来轮流
		var count =1;
		//首先显示死亡的人的身份
        for (var i = 0; i < the_dead.length; i++) {          
            $(".bcg_add").append($("<p class=\"add_p\"></p>"));
            	// 有几个%n 然后比对是第几个  比如有4个就%4 ==2   ==3这样
            	console.log(the_dead.length);
            	if ( count % 2 == 1) {
                    // $(".add_p").eq(i).text((the_dead[the_dead.length-1]+1)+"号被投票投死，"+(the_dead[the_dead.length-1]+1)+"号是"+player_obj[(the_dead[the_dead.length-1])].role);      
                    $(".add_p").eq(i).text((the_dead[i]+1)+"号被杀手杀死，"+(the_dead[i]+1)+"号是"+player_obj[(the_dead[i])].role);      
				} else {
                    $(".add_p").eq(i).text((the_dead[i]+1)+"号被投票投死，"+(the_dead[i]+1)+"号是"+player_obj[(the_dead[i])].role);      
				}
				count++;
        }

                 
        //这里下面就是第二天了，上面还是第一天 
		if (day == 1) {
			day++;
			$("#btn").text("第"+(day)+"天"); 
		} else if ( (the_dead.length) % 2 == 0) {
        		
	        //修改按钮天数
			$("#btn").text("晚上杀手杀人");         	
        } else if ( (the_dead.length) % 2 == 1) {
        	day++;	
	        //修改按钮天数
			$("#btn").text("第"+(day)+"天");

		}
   //       else {
			// $("#btn").text("投票去");         	
   //      }  
		
  
   	//存day
   	localStorage.setItem("day", JSON.stringify(day));

		//点击按钮回到4-2法官日志
  		$("#btn").click(function btnChange() {
			window.location.href = "../../task4/task4-2/task4-2.html";
		}

 		 );
});

