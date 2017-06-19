//将存入本地的身份信息sessionStorage取出来
var player_array = JSON.parse(localStorage.getItem("arr"));

//取出在4-3杀手页面处理后的信息
var player_obj = JSON.parse(localStorage.getItem("player_obj"));
var the_dead = JSON.parse(localStorage.getItem("the_dead"));
var day = JSON.parse(localStorage.getItem("day"));
var result = JSON.parse(localStorage.getItem("result"));



//header中左右两边
var js_back = document.getElementById("back");
var js_close = document.getElementById("close");


js_back.onclick =function(){
	history.back();
} 
js_close.onclick=function (){
	window.location.href = "../../task2/task2/task2.html";
}

//所有玩家身份显示出来

$(document).ready(function(){
	//这对header中的p替换
	$("#p0").text("投票");

	//这里对title中的问题替换
	$("#p1").text("全名投票");
	$("#p2").text("点击下方玩家头像，对要投死的玩家进行标记");
	//这里只用了1个循环
	// for (var i = 0; i < player_array.length; i++) {
    for (var i = 0; i < player_array.length; i++) {
		$(".main-content").append($("<div class=\"box\"></div>"));
		$(".box").eq(i).append($("<p class=\"person\"></p>"));
		$(".box").eq(i).append($("<p class=\"num\"></p>"));
		//加内容
		$(".person").eq(i).text(player_array[i]);
		$(".num").eq(i).text((i+1)+"号");

		//加CSS样式
		// $(".box").css({"float": "left",	"width": "21%",	"margin": "5% 5% 4.5% 5%", "border": "5px solid #fff",	"background-image": "url(images/ptt.png)", "background-repeat": "no-repeat", "background-attachment": "scroll", "background-position":" center center", "background-size": "cover"});
		// $(".person").css({"font-size": ".3rem", "color":"#fff",	"display": "flex", "flex-flow": "row nowrap", "justify-content": "center", "align-items": "center",	"padding": "28% 0",	"opacity": "0"});
		// $(".person:hover").css({ "opacity": "1", "background-color": "#f5c97b"});
		// $(".num").css({	"font-size": ".23rem", "color": "#fff",	"background-color": "rgba(62,166,199,0.7)",	"display": "flex", "flex-flow": "row nowrap", "justify-content": "center", "align-items": "center"});

	}

    //给死亡的平民加上死亡背景色
    for (var i = 0; i < player_obj.length; i++) {
         //这句4-3中也要加上，因为死的要变灰，因为我以前用了opacity来挡，所以这里background-color不起作用，也要opacity
        if (player_obj[i].state == "death") {                    
            $(".box").eq(i).css({"border-color":"#fff"});   //这个可以不加#ccc，因为连续点击的时候会被撤销为白色
            $(".person").eq(i).css({"opacity":"1"});       //这要设置box下的person的opacity为 背景色体现出来，然后死的是谁也体现出来。还要修改
        }
       
        console.log(player_obj[i].state);
    }

    

});






//创建数组，记录每个玩家是杀手或平民是死活状态。
function Player(num,role,state) {

}
// Player.prototype.num = 1;		这可以用来加属性和赋值
// Player.prototype.role = "平民";
// Player.prototype.state = "alive";








// var player_obj = [];

// var day = 1;

// $(document).ready(function(){
//放每个玩家Player对象的数组
// var player_obj = [];

//第一天创建玩家Player()，然后将所有玩家加入数组playerObj[]	//前面的player_array[]中只存了平民杀手，没别的。
// var day = 1;
// if (day == 1) {
//     for (var i = 0; i < player_array.length; i++) {
//         if (player_array[i] == "平民") {
//             player_obj[i] = new Player();
//             player_obj[i].num = i + 1;
//             player_obj[i].role = "平民";
//             player_obj[i].state = "alive";
//         }
//         else if (player_array[i] == "杀手") {
//             player_obj[i] = new Player();
//             player_obj[i].num = i + 1;
//             player_obj[i].role = "杀手";
//             player_obj[i].state = "alive";
//         }
//     }
// }

// console.log(player_array);		//控制台打印原存储中拿出来的数据是什么
// console.log(player_obj);		//重新添加state后的新数组是什么状态

// });






// var the_dead = new Array(0);//放死亡玩家序号
$(document).ready(function(){
    
    //bgm的播放控制
    var bgm=document.getElementById("bgm");
    //用图片出发函数来控制音乐
    $("#bgm_control").click(
        function () {
            if(bgm.paused){
                bgm.play();
            }
            else {
                bgm.pause();
            }
        }
    );


	//点击玩家变色，但不能选杀手

	// var the_dead = new Array(0);//放死亡玩家序号
    var box_click = 0;

    var the_dead_count = 0;
	$(".box").on("click",function(){
        box_click = 1;

	    var n = parseInt($(this).index());		//鼠标点击获取player_array中第几个，里面存着Play的3个属性。
	    console.log(n);		//这个n是player_array中0开始的
	    console.log(player_array[n]);


        //这里就不用判断是不是杀手了，投票是不论谁都杀的
	    // if (player_obj[n].role !== "杀手" && player_obj[n].state === "alive") {
        if (player_obj[n].state === "alive") {
	        $(".box").attr("style", "border-color:#fff;")	//这是用来还原上一次红色的框为白色，不然连续点两个两个框都会变红
	        this.setAttribute("style", "border-color:red;");//这是仅仅指当前的box框
	        // $(".box").css({"border-color": "red"});

            if (the_dead_count == 0) {
                the_dead.push(n);   //用push存进去。但若是连续点击会有问题，加多了，所以换种方式
                // the_dead[the_dead.length] = n;
                the_dead_count++;                   
            } else {
                //访问过一次就先出去不要的，再进入最新的数
                the_dead.pop();
                the_dead.push(n);   //用push存进去。但若是连续点击会有问题，加多了，所以换种方式
                // the_dead[the_dead.length] = n;
                the_dead_count++;                   
            }

	        console.log(n);
            console.log(the_dead[day - 1]);     //感觉这个不对，选the_dead数组最后一个元素
	        console.log(the_dead[day]);
	        console.log(the_dead);
	    }
	    else if (player_obj[n].state == "death") {
	        alert("他已经死了!")
	    }
	    // else if (player_obj[n].role == "杀手") {
	    //     alert("杀手不能杀杀手!")
	    // }

         
	});


    //0胜负未分 ，1平民赢 ，2杀手赢 这里加不加没用，如果是平局就一定为0
    // var result = 0; 


    //杀手确定要杀平民后，点击该按钮确定杀掉
    $("#btn").on("click", (function () {
        console.log("第"+day+"天晚上杀手杀人");
        //the_dead放了死人
        console.log(box_click);
        if (box_click == 0) {
            return alert("请选择玩家");
        } 
        else {
            //投票完才算一天结束开始第二天
            //这里也不用了,在杀人页面加
            // day++;
            //改变生死状态
            console.log(the_dead);
            console.log(the_dead.length);
            (player_obj[the_dead[the_dead.length - 1]]).state = "death";    //每次选最近死的那个序号赋值为death
            console.log(player_obj);
            console.log(the_dead);
            console.log(the_dead.length);   
            var alive_killer = 0;
            var alive_cilivian = 0;
            //统计杀手和平民活人的数量
            for (var i = 0; i < player_obj.length; i++) {
                if (player_obj[i].state == "alive") {
                    switch (player_obj[i].role) {
                        case "杀手" :
                            alive_killer++;
                            break;
                        case "平民" :
                            alive_cilivian++;
                            break;
                    }
                }
            }
            console.log(alive_killer);
            console.log(alive_cilivian);
            //胜利判断
            if (alive_killer == 0) {
                //平民win
                result = 1;
            }
            else if (alive_killer >= alive_cilivian) {
                //杀手win
                result = 2;
            }
            else {
                //继续杀
                result = 0;
            }
            //看结果，判断结束页要不要出现
            console.log(result);

            console.log(the_dead);
            //信息存入localStorage
            localStorage.player_obj = JSON.stringify(player_obj);
            localStorage.the_dead = JSON.stringify(the_dead);
            localStorage.day = JSON.stringify(day);
            localStorage.result = JSON.stringify(result);
            console.log("进入第"+day+"天白天投票");
            //跳转到4-2第n天，但要在之前加入晚上，白天这些解密信息

            if (result) {
                window.location.href = '../task4-7/task4-7.html'
            }else {
              window.location.href = '../task4-3-2/task4-3-2.html'  
            }            
        }    
            

        
    }));




});











