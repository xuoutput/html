//定义变量
var js_set_content = document.getElementById("set_content");
var js_set = document.getElementById("set");

var js_player_num = document.getElementById("player_num");

var js_img_sub = document.getElementById("img_sub")
var js_slider_num = document.getElementById("slider_num");
var js_img_add = document.getElementById("img_add")

var js_btn_start = document.getElementById("btn_start");
var sum;
var arrTo2;      //任务3要用到的本地缓存数组，但要用JSON转
var sh;//杀手人数   这里的数量要保存，放到4-7结束页面显示
var pm;//平民人数





//滑块滑动或输入框输好值之后两者相等
// js_player_num.oninput= function () {		//用户离开输入框时执行 onblur改为input  这里不用写，改为下面函数，会覆盖这里
    // js_slider_num.value = js_player_num.value;
// };

// 对输入框内的数字内容改变时做出限制,不用onchange
js_player_num.oninput = function () {
    var value=Number(js_player_num.value);//将数值转换为整数,保证数据类型由字符串变为了数字
    var a=isNaN(value); //当value为一个数字时，输出false，为其他时，输出true
    if(value<4||value>18||a||!(/^(?:0|[1-9][0-9]?|10000000)$/.test(value))){
        //alert("只能输入4-18之间的整数");     //这里这样弹出来体验不好，还是在旁边加个p
        //js_player_num.value="";     // 清空输入框

        document.getElementById("tip").innerText="只能输入4-18之间的整数";
    } else {
     document.getElementById("tip").innerText="";       
    }
    js_slider_num.value = js_player_num.value;
};





js_slider_num.oninput = function () {   
    js_player_num.value = js_slider_num.value;
};

//mid是中间变量，防止到4或18就不能减或加了
var mid = 0;
//点击增加、减少按钮变化
js_img_sub.onclick = function () {
    // js_slider_num.value = js_player_num.value;
    //不用这个了，这个到4会有问题，不会在变小了
    // console.log(js_slider_num.value);
    // --js_slider_num.value;
    // console.log(js_slider_num.value);

    //通过一个中间变量来减，不直接用js_slider_num.value
    mid = js_slider_num.value;
    mid--;

    if (mid < 4) {
        alert("不能再小了");
        mid =4;
    }
    js_slider_num.value = mid;
    js_player_num.value = js_slider_num.value;

};
js_img_add.onclick = function () {
    // js_slider_num.value = js_player_num.value;
    // js_slider_num.value++;
    // js_player_num.value = js_slider_num.value;

    mid = js_slider_num.value;
    mid++;

    if (mid > 18) {
        alert("不能再大了");
        mid =18;
    }
    js_slider_num.value = mid;
    js_player_num.value = js_slider_num.value;


};





//分配杀手和平民人数
    function change() {
        var sum = js_player_num.value;        
        sh=Math.floor(sum / 3);
        pm=sum-sh;

        //保存到4-7页面用
        localStorage.setItem("sh", JSON.stringify(sh));
        localStorage.setItem("pm", JSON.stringify(pm));

        return sum;
    }

//将杀手和平民放入一个原始数组x中,
    function mix() {
        var x = new Array();
        for (var i = 0; i < sh; i++) {
            x.push("杀手");		//push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
        }
        for (var k = 0; k < pm; k++) {
            x.push("平民");
        }
        return x;
    }

//将杀手平民数组x(p)乱序为z，这个就是随机好了
    function random() {
        var p = mix();
        var y = new Array();
        for (var i = 0,len = p.length; i < len; i++) {
            var j = Math.floor(Math.random() * p.length);
            y[i] = p[j];        //不用担心是同一个，就算是每次都是第1个都行
            p.splice(j, 1);		//每趟从p中删除序号为j的1个
        }
        return y;
    }

//将z中得到的身份分配给每一位玩家并显示出来
    var z = new Array();    //这个z数组也是用来判断的btn那里
    function giveId() {
        z=random();

        arrTo2=z;

        for (var k=0;k<z.length;k++) {
            //创建1个div里面包上2个span，2个位方块，一个为名字
            var Odiv = document.createElement("div");
            var Ospan1 = document.createElement("span");
            var Ospan2 = document.createElement("span");
            Odiv.style.cssText = "width:50%; font-size:.26rem;color:#919191;display: flex; flex-flow: row nowrap; justify-content: flex-start; align-items: center;";
            Ospan1.style.cssText = "display: inline-block;width: 10px;height: 10px;background-color: #ff0;margin: 0 .25rem 0 .31rem;";
            Ospan2.style.cssText = "font-size:.26rem;color:#919191;";

            // var list = document.createElement("li");
            //div插入2个 span
            Odiv.appendChild(Ospan1);
            Odiv.appendChild(Ospan2);
            js_set_content.appendChild(Odiv);
            //在span2中插入文字
            // var txt=document.createTextNode(k+1+"号玩家"+z[k]);
            var txt=document.createTextNode(z[k]);
            Ospan2.appendChild(txt);
            Odiv.appendChild(Ospan2);
            
            if (z[k]==="杀手") {//若为杀手，则小方块颜色黄，平民为蓝
                Ospan1.style.backgroundColor="#fab344";
            }
            else{
                Ospan1.style.backgroundColor="#29bde0";
            }

        }
    }


//将身份状态存入数组，并保存在本地，下一个页面要用
function arr() {
    localStorage.setItem("arr", JSON.stringify(arrTo2)) ;
}


//从文本框内得到数字，然后分配不同比例人数
    function setNum () {
        // sum=js_player_num.value;
        js_set_content.innerHTML="";//在点击之前清空区域内容，以防多次点击多次出现
        change();
        giveId();
        arr();
    }



//发牌跳转下一页面
    js_btn_start.onclick=function () {
        console.log(z.length);
        console.log(js_player_num.value);

        if (z.length == js_player_num.value ){
            window.location.href = "../../task3/task3.html";
        }
        else {
             confirm("请先点击设置人数")
        }


        //gg2
        // if (sh ){
        //     window.location.href = "../../task3/task3.html";
        // }
        // else {
        //      confirm("请先点击设置人数")
        // }

        //gg1
        // if (sum===undefined){
        //     confirm("请先点击设置人数")
        // }
        // else {
        //    	window.location.href = "../task2-2/task2-2.html";
        // }
    };





 // 根据滑块所在位置填充进度条






// js_btn_start.onclick = function () {
//     if ( player.length < 4 || player.length > 18 ) alert("\"点击设置\"配置玩家身份");
//     else  parent.location.href = "../task2-2/task2-2.html";
// }