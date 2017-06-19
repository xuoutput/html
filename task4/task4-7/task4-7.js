var player_obj = JSON.parse(localStorage.getItem("player_obj"));
var the_dead = JSON.parse(localStorage.getItem("the_dead"));
var day = JSON.parse(localStorage.getItem("day"));


var result = JSON.parse(localStorage.getItem("result"));


//-------------------header-----------------------------

$(".home").click(function(){
	window.location.href = "../../task2/task2/task2.html";
});

$(".help").click(function(){
	window.location.href = "#";	//暂时
});

//从4-2法官日记汇总取出sh和pm的数量，在这里要用
var sh = JSON.parse(localStorage.getItem("sh"));
var pm = JSON.parse(localStorage.getItem("pm"));

$(document).ready(function(){
	//显示胜利结果
	if (result == 1) {
		$("#bcg-pm").css({"display":"block"});
		$("#bcg-sh").css({"display":"none"});
		$("#p_info").text("太棒了！你知道么？在捉鬼游戏中只有"+(pm/(sh+pm)*100)+"%的平民取得游戏最终的胜利哦！");
	}else {
		$("#bcg-pm").css({"display":"none"});
		$("#bcg-sh").css({"display":"block"});
		$("#p_info").text("太棒了！你知道么？在捉鬼游戏中只有"+(sh/(sh+pm)*100)+"%的杀手取得游戏最终的胜利哦！");
	}

	//显示各类玩家人数
	$("#sh_num").text(sh);
	$("#pm_num").text(pm);

	console.log(player_obj);
	console.log(the_dead);
	console.log("day="+day);
	//显示每天gg信息
    for (var i = 1; i < day; i++) {          
        // $(".dayn").text("第"+(i)+"天");  

            $("ul").append($("<li ></li>"));
                $("li").eq(i-1).append($("<div class=\"wrap\"></div>"));                    //这和那个原始做box一样 要加ep了
                	$(".wrap").eq(i-1).append($("<div class=\"date\"></div>"));
                		$(".date").eq(i-1).append($("<h3></h3>"));
                		 $("h3").eq(i-1).text("第"+(i)+"天");
                		$(".date").eq(i-1).append($("<div class=\"time\"></div>"));
                		 $(".time").eq(i-1).text("0小时07分");
                	$(".wrap").eq(i-1).append($("<p class=\"p_night\"></p>"));
                	 // $(".p_night").eq(i-1).text("晚上："+(the_dead[(i-1)*2]+1)+"号被杀手杀死，"+(the_dead[(i-1)*2]+1)+"号是"+player_obj[the_dead[the_dead.length-2]].role);
                	 $(".p_night").eq(i-1).text("晚上："+(the_dead[(i-1)*2]+1)+"号被杀手杀死，"+(the_dead[(i-1)*2]+1)+"号是"+player_obj[(the_dead[(i-1)*2])].role);
                	$(".wrap").eq(i-1).append($("<p class=\"p_daytime\"></p>"));
             		 // $(".p_daytime").eq(i-1).text("白天："+(the_dead[(i-1)*2+1]+1)+"号被投票投死，"+(the_dead[(i-1)*2+1]+1)+"号是"+player_obj[the_dead[the_dead.length-1]].role);                    
             		 $(".p_daytime").eq(i-1).text("白天："+(the_dead[(i-1)*2+1]+1)+"号被投票投死，"+(the_dead[(i-1)*2+1]+1)+"号是"+player_obj[(the_dead[(i-1)*2+1])].role);                    
            
    }

});
