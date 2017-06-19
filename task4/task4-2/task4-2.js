




$("#back").click(function(){
    history.back();
});


$("#close").click(function(){
    window.location.href = "../../task2/task2/task2.html";
});


//从4-3第一天晚上杀人开始取出数值来，黑夜揭秘
var player_obj = JSON.parse(localStorage.getItem("player_obj"));
var the_dead = JSON.parse(localStorage.getItem("the_dead"));
var day = JSON.parse(localStorage.getItem("day"));

//控制杀人页面
// var visited = JSON.parse(localStorage.getItem("visited"));

//以下三个第一天开始肯定为null，第一天晚上杀人后才有数据。
console.log(player_obj);
console.log(the_dead);
// console.log(the_dead.length);
// console.log(the_dead[0]);
console.log("day="+day);

//null的话就什么也不添加，只有不为null有信息了就显示出来晚上白天的信息。
// if (player_obj == null) {
//     player_obj = [];
// }

// if (the_dead == null) {
//     the_dead = new Array(0);
// }

//这个用在4个点击事件
if (day == null) {
    day = 1;
}



//下面是判断点击顺序的
// var num1 = 0;
// var num2 = 0;
// var num3 = 0;
// // var num4 = 0;

// var num1 = JSON.parse(localStorage.getItem("num1"));
// var num2 = JSON.parse(localStorage.getItem("num2"));
// var num3 = JSON.parse(localStorage.getItem("num3"));
// var num4 = JSON.parse(localStorage.getItem("num4"));

// console.log(num1);
// console.log(num2);
// console.log(num3);
// console.log(num4);




//x.push("杀手");       push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。


$(document).ready(function(){
        //the_dead 为null当然是length == 0了 当要和 == 0的区别啊
        if (the_dead === null) {

        } else {
            $("#dayn").text("第"+day+"天");
        }




//这里是开关按钮制作的有限状态机实现
var Switch = function ($elem) {
    var log = function (fsm, previousState) {
        console.log('currentState is : ' + fsm.currentState + ((previousState || '') && (' , and previous state is : ' + previousState)));
    };
    return {
        currentState: 'off',
        states: {
            'on': {
                to: 'off',
                action: 'turnOff'
            },
            'off': {
                to: 'on',
                action: 'turnOn'
            }
        },
        init: function () {
            var self = this;
            $elem.on('click', (function () {
                var args = arguments;
                return function () {
                    self.transition(args);
                }
            })());
            log(this);
        },
        transition: function (e) {
            var old = this.currentState;
            this.currentState = this.states[old].to;
            var action = this.states[old].action;
            (action in this) && this[action](old);
        },
        turnOn: function (fromState) {
            $elem.addClass('on');
            log(this, fromState);
        },
        turnOff: function (fromState) {
            $elem.removeClass('on');
            log(this, fromState);
        }
    }
};








var num1 = 0;
var num2 = 0;
var num3 = 0;
// var num4 = 0;

var num1 = JSON.parse(localStorage.getItem("num1"));
var num2 = JSON.parse(localStorage.getItem("num2"));
var num3 = JSON.parse(localStorage.getItem("num3"));
var num4 = JSON.parse(localStorage.getItem("num4"));

var visited = JSON.parse(localStorage.getItem("visited"));

console.log(num1);
console.log(num2);
console.log(num3);
console.log(num4);

if (num1 == null) {
    var num1 = 0;
}

if (num2 == null) {
    var num2 = 0;
}

if (num3 == null) {
    var num3 = 0;
}

if (num4 == null) {
    var num4 = 0;
}

if (visited == null) {
    var visited = 0;
}
console.log(num1);
console.log(num2);
console.log(num3);
console.log(num4);



//这里是放在外面每次刷新后根据有没有点击过来判断上不上背景色

var visited_kill = JSON.parse(localStorage.getItem("visited_kill"));
var visited_dead_speak = JSON.parse(localStorage.getItem("visited_dead_speak"));
var visited_turn_speak = JSON.parse(localStorage.getItem("visited_turn_speak"));


console.log(visited_kill);
console.log(visited_dead_speak);
console.log(visited_turn_speak);


if (visited_kill == null) {
    var visited_kill = 0;
}

if (visited_dead_speak == null) {
    var visited_dead_speak = 0;
}

if (visited_turn_speak == null) {
    var visited_turn_speak = 0;
}


if (visited_kill) {
    $("#kill").css({"background-color": "#ccc"});
    $("#kill").prev().css({"border-right-color": "#ccc"});    
}

if (visited_dead_speak) {
    $("#dead_speak").css({"background-color": "#ccc"});
    $("#dead_speak").prev().css({"border-right-color": "#ccc"});    
}

if (visited_turn_speak) {
    $("#turn_speak").css({"background-color": "#ccc"});
    $("#turn_speak").prev().css({"border-right-color": "#ccc"});    
}




//这是清除指定名字的缓存，而clear()是所有的
//这个放vote
// localStorage.removeItem("name");



//杀手杀人
$("#kill").click(function(){
    if (visited == 0) {
        //这里一跳转num1++就清零了。所以存下
        num1++;                     
        console.log(num1);
        localStorage.setItem("num1", JSON.stringify(num1));
        
        visited = 1;
        localStorage.visited = JSON.stringify(visited);

        //背景色变化     这里的背景色如果在这里那么刷新后就没了，所以应该放在外面单独做一个判断用来显示。
        $("#kill").css({"background-color": "#ccc"});
        $("#kill").prev().css({"border-right-color": "#ccc"});
        //用来判断颜色的
        visited_kill++;
        localStorage.setItem("visited_kill", JSON.stringify(visited_kill));

        window.location.href = "../task4-3/task4-3.html"; 
    }
    // } else if (num4 == num1) {
    //     num1++;  
    //     console.log(num1);
    //     console.log(num4);
    //     localStorage.setItem("num1", JSON.stringify(num1));
    //     window.location.href = "../task4-3/task4-3.html";
    // } 

});


//亡灵遗言
$("#dead_speak").click(function(){
    //下面这句可不加，因为有了
    num1 = JSON.parse(localStorage.getItem("num1"));
    console.log(num1);
    ++num2;
    if (num2 == num1) {
        console.log(num2);
        localStorage.setItem("num2", JSON.stringify(num2));
        prompt("亡灵请发言","说话内容");

        // //背景色变化
        // $("#dead_speak").css({"background-color": "#ccc"});
        // //这是错的，不是箭头是border
        // $("#dead_speak").prev().css({"background-color": "#ccc"});
        $("#dead_speak").css({"background-color": "#ccc"});
        $("#dead_speak").prev().css({"border-right-color": "#ccc"});        

        //用来判断颜色的
        visited_dead_speak++;
        localStorage.setItem("visited_dead_speak", JSON.stringify(visited_dead_speak));        
        //刷新，取数
        location.reload();
    } else {
    confirm("请按顺序点击");
    }
});    




//依次发言
$("#turn_speak").click(function(){ 
    num2 = JSON.parse(localStorage.getItem("num2"));
    console.log(num2);
    ++num3;
    if (num3 == num2) {
        console.log(num3);
        localStorage.setItem("num3", JSON.stringify(num3));
        prompt("活着的请依次发言","说话内容");

        //背景色变化
        $("#turn_speak").css({"background-color": "#ccc"});
        $("#turn_speak").prev().css({"border-right-color": "#ccc"}); 

        //用来判断颜色的
        visited_turn_speak++;
        localStorage.setItem("visited_turn_speak", JSON.stringify(visited_turn_speak));         
        //刷新，取数
        location.reload();
    } else {
        confirm("请按顺序点击");
    }        
});    



//投票
$("#vote").click(function(){
    num3 = JSON.parse(localStorage.getItem("num3"));
    console.log(num3);
    ++num4;
    if (num4 == num3) {
        localStorage.setItem("num4", JSON.stringify(num4));
        //清空visited 用来下次可以访问杀人页面
        visited = 0;
        localStorage.visited = JSON.stringify(visited);
        //清空一轮
        localStorage.removeItem("visited_kill");
        localStorage.removeItem("visited_dead_speak");
        localStorage.removeItem("visited_turn_speak");
        //跳转
        window.location.href = "../task4-6/task4-6.html";
    } else {
        confirm("请按顺序点击");
    }       
});    


        
});




