
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
	var div3 = Array(3);
	do{
		for (var i = 0; i < 3; i++) {
			// 选出0-8之间的数存好
			div3[i] = Math.floor(Math.random()*9);	
		}
	}while(!((div3[0] != div3[1]) && (div3[0] != div3[2]) && (div3[1] != div3[2])));

	// JS随机生成颜色,但颜色不能和背景色相同，而且三个不同的颜色又不能相接近
	var color3 = Array(3);
	for (var i = 0; i < 3; i++) {
		var colorLess;
		var colorLessHigh;		
		var colorLessMiddle;	
		var colorLessLow ;		
		var a, b, c;		
			
		do{	
			colorLessHigh = Math.floor(Math.random()*256);  
			colorLessMiddle = Math.floor(Math.random()*256);
			colorLessLow = Math.floor(Math.random()*256);

			a =	Math.abs(colorLessHigh - 255) < 50 ;		
			b = Math.abs(colorLessMiddle - 255) < 50 ;
			c = Math.abs(colorLessLow - 0) < 50;			
		}while((a && b) || (a && c) || (b && c) && colorLess!=0xffa600);
		color3[i] = "rgb("+colorLessHigh+","+colorLessMiddle+","+colorLessLow+")";
	}	

	for (var i = 0; i <3; i++) {
		div9[div3[i]].style.backgroundColor = color3[i];
	}
}


var time;
function star() { 
    clearInterval(time);//主要是再次点击时取消循环，防止上一个循环没结束，又开始循环导致闪烁速度越来越快
    time=setInterval("changeColor()",1000);


}

function end() {
	clearInterval(time);
	resetColor();

}










