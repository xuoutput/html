// 因为要保存导航栏点击状态，所以这里要保存好数据用cookies
//点击时小箭头的切换
$("a.managelist").click(
    function () {
        $(this).find("span.arrowL").html("&#xe62e;");
        $(this).parent().siblings().find("span.arrowL").html("&#xe667;");
        $(this).css("background-color","#7b7f89");
        $(this).parent().siblings().find("a.managelist").css("background-color","transparent");
        $(this).css("border-left","3px solid #ffffff");
        $(this).parent().siblings().find("a.managelist").css("border-left","none");
        if ($(this).siblings("ul.collapse").hasClass("in")) {
            $(this).find("span.arrowL").html("&#xe667;");
        }
    }
);
//让二级菜单中被选中的元素获得active类名，去掉其他的类名
$("ul.detailslist > li").click(
    function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $(this).parents("li.panel").siblings().find("ul.detailslist > li").removeClass("active");
        $(this).parents("li.panel").find("a.managelist").css("background-color","transparent");
        if ($(this).hasClass("active")) {
            $(this).parents("li.panel").find("span.arrowL").html("&#xe62e;");
        }
        //得到二级菜单中的第几个元素被点击并存入cookie
        var length=$(this).parent().children().length;
        for (var i=0;i<length;i++){
            if($(this).parent().children().eq(i).hasClass("active")) {
                var m=i;
            }
        }
        console.log(m);
        $.cookie("m", m, {path:"/"});
    }
);
//以下内容为刷新后侧边栏状态不改变的代码
//将状态存入cookie
$("a.managelist").click(function () {
    var page = $(this).attr("data-target");
    var num=page[page.length-1];
    num--;
    var number = num;
    console.log('number=',number);
    console.log('page=',page);
    $.cookie("number", number, {expires: 7,path:"/"});

});

$("a.managelist").click(function () {
    var status1 = $(this).attr('class');
    var status2 = $(this).siblings('ul.detailslist').attr('class');
    console.log("此时状态1",status1);
    console.log("此时状态2",status2);
    //展开状态
    var status11 = 'managelist';
    var status21 = 'detailslist collapse in';
    //收缩状态
    var status12 = 'managelist collapsed';
    var status22 = 'detailslist collapse';

    if(status2==status21){
        status1=status12;
        status2=status22;
    }else{
        status1=status11;
        status2=status21;
    }
    console.log("改变后状态1",status1);
    console.log("改变后状态2",status2);
//把body中代表他是收缩还是展开的class类存起来
    $.cookie('status1', status1, {expires: 7,path:"/"});
    $.cookie('status2', status2, {expires: 7,path:"/"});
});
$(document).ready(function(){
    var id=$.cookie('number');
    var id2=$.cookie("m");
    console.log("id=",id);
    console.log("cookie状态1=",$.cookie('status1'));
    console.log("cookie状态2=",$.cookie('status2'));
    $("a.managelist").eq(id).siblings('ul.detailslist').children('li').eq(id2).addClass('active');
    $("a.managelist").eq(id).attr('class',$.cookie('status1'));
    $("a.managelist").eq(id).siblings('ul.detailslist').attr('class',$.cookie('status2'));
});














