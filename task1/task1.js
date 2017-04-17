
var div9 = document.getElementsByClassName("yellow");

//将div的颜色重置，在之后的循环中需要插入。
function resetColor() {
    for (var i=0; i<9 ;i++){
        div9[i].style.backgroundColor = "#ffa600";
    }
}


/*选三个序号不同的出来放入颜色*/
function changeColor() {
	resetColor();

	/*选三个出来,但这三个序号得不同*/
	var div3 = Array(3);
	do{
		for (var i = 0; i < 3; i++) {
			// 选出0-8之间的数存好
			div3[i] = Math.floor(Math.random()*9);	
		}
	}while(!((div3[0] != div3[1]) && (div3[0] != div3[2]) && (div3[1] != div3[2])));
	// while((div3[0] == div3[1]) || (div3[0] == div3[2]) || (div3[1] == div3[2]));

	// JS随机生成颜色,但颜色不能和背景色相同，而且三个不同的颜色又不能相接近

	var color3 = Array(3);
	// function chooseColor3() {	
		for (var i = 0; i < 3; i++) {
			var colorLess;
			do{
				colorLess = Math.floor(Math.random()*0xffffff).toString(16);
			}while(0xffcc00 <= colorLess && colorLess <= 0xffff00 && colorLess != 0xffa600);
			// 主要是上面颜色不可以接近黄色的底
			color3[i] = "#"+colorLess;
		}	
	// }

	for (var i = 0; i <3; i++) {
		div9[div3[i]].style.backgroundColor = color3[i];
	}
}


var time;
function star() {
    clearInterval(time);//主要是再次点击时取消循环，防止上一个循环没结束，又开始循环导致闪烁速度越来越快
    time=setInterval("changeColor()",1000);

	var btn_star = document.getElementById("btn_star")
	btn_star.style.backgroundColor="orange";
	btn_star.style.color="white";
	var btn_end = document.getElementById("btn_end")
	btn_end.style.backgroundColor="white";
	btn_end.style.color="orange";

}

function end() {
	clearInterval(time);
	resetColor();

	var btn_star = document.getElementById("btn_star")
	btn_star.style.backgroundColor="white";
	btn_star.style.color="orange";	
	var btn_end = document.getElementById("btn_end")
	btn_end.style.backgroundColor="orange";
	btn_end.style.color="white";	
}










