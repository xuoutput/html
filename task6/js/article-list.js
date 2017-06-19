
//angular部分
//将页面数据渲染出来
var listApp = angular.module("myApp",[]);
listApp.controller("listCtrl",['$scope','$http','$state','$stateParams',function ($scope,$http,$state,$stateParams) {

    // if(sessionStorage.userpwd==="flase") {
    //     $state.go('login');
    // }


    // // 下拉框数据
    // $scope.types = [
    //     {value:0,text:"首页Banner"},
    //     {value:1,text:"找职业Banner"},
    //     {value:2,text:"找精英Banner"},
    //     {value:3,text:"行业大图"}
    // ];
    // $scope.statuss = [
    //     {value:1,text:"草稿"},
    //     {value:2,text:"上线"}
    // ];
    // // 为行业大图时显示,不过暂时用不到
    // $scope.industrys = [
    //     {value:0,text:"移动互联网"},
    //     {value:1,text:"电子商务"},
    //     {value:2,text:"企业服务"},
    //     {value:3,text:"O2O"},
    //     {value:4,text:"教育"},
    //     {value:5,text:"金融"},
    //     {value:6,text:"游戏"}
    // ];        


    // 分页部分

    $scope.paginationConf = {
        showFlag:0,
        // 当前页
        currentPage: 1,
        // 每页默认
        itemsPerPage: 10,
        // 点击每个分页按钮都会触发这个函数，然后刷新加载
        onChange:function () {            
            console.log('$scope.paginationConf.currentPage=' );
            console.log($scope.paginationConf.currentPage );
            console.log('$scope.paginationConf.itemsPerPage=');
            console.log($scope.paginationConf.itemsPerPage);
            $state.go('main.article-list', {
                page: $scope.paginationConf.currentPage ,
                size: $scope.paginationConf.itemsPerPage
                }, {reload: true});
    }};
    console.log('$stateParams=' );
    console.log($stateParams );
    $scope.paginationConf.currentPage = $stateParams.page ;
    $scope.paginationConf.itemsPerPage = $stateParams.size ;  


    // 搜索这块，从url中得到参数
    $scope.starttime = $stateParams.startAt || "" ;
    $scope.endtime = $stateParams.endAt || "" ;
    $scope.types = $stateParams.type||"";//将搜索之后的值在搜索后还显示出来
    $scope.statuss = $stateParams.status||"";//将搜索之后的值在搜索后还显示出来

    // 请求数据并用ng-repeat渲染
    $scope.record = function () {
        $http.get('/carrots-admin-ajax/a/article/search?page='+$scope.paginationConf.currentPage+'&size='+$scope.paginationConf.itemsPerPage
        +'&startAt='+$scope.starttime+'&endAt='+$scope.endtime+'&type='+$scope.types+'&status='+$scope.statuss
        ).then(function successCallback(response){
            console.log('response=');
            console.log(response);

            $scope.paginationConf.totalItems = response.data.data.total;
            $scope.articleList = response.data.data.articleList;
            // $scope.upAt=response.data.data.articleList.updateAt;
            //判断暂无数据是否出现的条件，当totalItems为0或者未定义时出现
            $scope.paginationConf.showFlag = !$scope.paginationConf.totalItems;
        });
    };
    $scope.record();




    // 转化时间
    if($scope.starttime!=="") {
        // console.log('$scope.starttime=');
        // console.log($scope.starttime);        
        var s=parseInt($scope.starttime,10);
        // var st=new Date(s).toLocaleString();
        var st=new Date(s).toLocaleString().replace(/(([0-1]\d)|(2[0-4])):[0-5]\d:[0-5]\d$/,' ');//将时间转换为字符串并把其中的时：分：秒用正则替换掉
        console.log('st=');
        console.log(st);
        $scope.starttime = st;//将搜索之后的值在搜索后还显示出来,此时还是时间戳形式
    }
    if($scope.endtime!=="") {
        var e=parseInt($scope.endtime,10);
        // var et=new Date(e).toLocaleString();//将时间转换为字符串并把其中的时：分：秒用正则替换掉
        var et=new Date(e).toLocaleString().replace(/(([0-1]\d)|(2[0-4])):[0-5]\d:[0-5]\d$/,' ');//将时间转换为字符串并把其中的时：分：秒用正则替换掉
        console.log('et=');
        console.log(et);
        $scope.endtime = et;  //将搜索之后的值在搜索后还显示出来
    }



    // 时间插件
    // $('.date').datetimepicker({
    //     language: 'zh-CN',//显示中文
    //     format: 'yyyy-mm-dd',//显示格式
    //     minView: "month",//设置只显示到月份
    //     initialDate: new Date(),//初始化当前日期
    //     autoclose: true,//选中自动关闭
    //     todayBtn: true//显示今日按钮
    // });
    $("#datetimeStart").datetimepicker({
        format: 'yyyy-mm-dd',
        minView:"month",
        language: 'zh-CN',
        autoclose:true,
        todayBtn: true//显示今日按钮
    }).on("click",function(){
        $("#datetimeStart").datetimepicker("setEndDate",$("#datetimeEnd").val());              
    });
    $("#datetimeEnd").datetimepicker({
        format: 'yyyy-mm-dd',
        minView:"month",
        language: 'zh-CN',
        autoclose:true,
        todayBtn: true//显示今日按钮
    }).on("click",function(){
        $("#datetimeEnd").datetimepicker("setStartDate",$("#datetimeStart").val())
    });

    //搜索功能
    $scope.search = function () {
        console.log('$scope.starttime=');
        console.log($scope.starttime); 
        // var time2start = $scope.starttime;
        // var time2end = $scope.endtime;       
        // var start = "";
        // var end = "";
        // if (time2start!=="") {
        //     start= new Date(Date.parse(time2start.replace(/-/g, "/"))).getTime();//需要将时间字符串转化为时间格式
        //     // start= starttime;//需要将时间字符串转化为时间格式
        // }
        // if (time2end!=="") {
        //     end= new Date(Date.parse(time2end.replace(/-/g, "/"))).getTime();
        //     end = end +86399999;

        var start = "";
        var end = "";                  
        if ($scope.starttime!=="") {
            start= new Date(Date.parse($scope.starttime.replace(/-/g, "/"))).getTime();//需要将时间字符串转化为时间格式
        }
        if ($scope.endtime!=="") {
            end= new Date(Date.parse($scope.endtime.replace(/-/g, "/"))).getTime();
            end = end +86399999;            
            
        }
        console.log('start=');
        console.log(start);
        console.log('end=');
        console.log(end);
        $state.go('main.article-list', {
            page: 1 ,
            size: $scope.paginationConf.itemsPerPage,
            startAt: start,
            endAt: end,
            type: $scope.types,
            status:$scope.statuss
            }, {reload: true});
    };
    //清空功能回到最初的url
    $scope.clear = function () {
        $state.go('main.article-list', {
            page: 1 ,
            size: 10,
            startAt: "",
            endAt: "",
            type: "",
            status:""
        }, {reload: true});
    };



    // 上下线功能
    $scope.offline = function () {
        console.log(this.x.id);
        console.log(this.x.status);
        var id=this.x.id;
        //上线
        if (this.x.status===1) {
            bootbox.confirm({
                buttons: {
                    confirm: {
                        label: '确定',
                        className: 'btn-primary'
                    },
                    cancel: {
                        label: '取消',
                        className: 'btn-warning'
                    }
                },
                message: '<p style="color: #999999;font-size: 16px;text-align: center">上线后该图片将在轮播banner中展示。</p>' +
                '<p style="color: #333333; font-size:20px;text-align: center">是否执行上线操作?</p>',
                title: '<p style="color: #47c6e8">操作提示</p>',
                callback: function(result) {
                    if(result) {
                        $http.put('/carrots-admin-ajax/a/u/article/status?id='+id+'&status='+2).then(function successCallback(response) {
                            console.log(response);
                        });
                        $state.go('main.article-list', {
                            page: $scope.paginationConf.currentPage,
                            size: $scope.paginationConf.itemsPerPage
                        }, {reload: true});
                        bootbox.alert({
                            title: '<p style="color: #47c6e8">提示</p>',
                            message:'上线成功',
                            buttons: {
                                ok: {
                                    label: '确定',
                                    className: 'btn-primary'
                                }
                            }
                        });
                    }
                }
            });
        }
        // 下线
        else if (this.x.status===2) {
            bootbox.confirm({
                buttons: {
                    confirm: {
                        label: '确定',
                        className: 'btn-primary'
                    },
                    cancel: {
                        label: '取消',
                        className: 'btn-warning'
                    }
                },
                message: '<p style="color: #999999;font-size:16px;text-align: center">下线后该图片将不展示在轮播banner中。</p>' +
                         '<p style="color: #333333; font-size:20px;text-align: center">是否执行下线操作？</p>',
                title: '<p style="color: #47c6e8">操作提示</p>',
                callback: function(result) {
                    if(result) {
                        $http.put('/carrots-admin-ajax/a/u/article/status?id='+id+'&status='+1).then(function successCallback(response) {
                            console.log(response)
                        });
                        $state.go('main.article-list', {
                            page: $scope.paginationConf.currentPage,
                            size: $scope.paginationConf.itemsPerPage
                        }, {reload: true});
                        bootbox.alert({
                            title: '<p style="color: #47c6e8">提示</p>',
                            message:'下线成功',
                            buttons: {
                                ok: {
                                    label: '确定',
                                    className: 'btn-primary'
                                }
                            }
                        })
                    }
                }
            })
        }
    };
    //编辑功能,跳转到新增页面并把id这个参数传递过去,根据id来编辑选中页面
    $scope.editor = function () {
        console.log('this.x.id=');
        console.log(this.x.id);
        console.log('this.x=');
        console.log(this.x);
        $state.go('main.article-details', {
            id : this.x.id
        }, {reload: true});
    };

    //删除功能
    $scope.delete = function () {
        console.log(this.x.id);
        var id=this.x.id;
        bootbox.setDefaults("locale","zh_CN");
        bootbox.confirm({
            buttons: {
                confirm: {
                    label: '确定',
                    className: 'btn-primary'
                },
                cancel: {
                    label: '取消',
                    className: 'btn-warning'
                }
            },
            message: '是否确认删除',
            callback: function(result) {
                if(result) {
                    $http.delete('/carrots-admin-ajax/a/u/article/'+id).then(function successCallback(response) {
                        console.log(response);
                        // article-list页面重新刷新
                        $state.go('main.article-list', {
                            page: $scope.paginationConf.currentPage,
                            size: $scope.paginationConf.itemsPerPage
                        }, {reload: true});
                    });
                }
            },
            title: '<p style="color: #47c6e8">提示</p>'
        });
    };
}]);

// 将类型部分的数字转化为相应文字
listApp.filter("type2view",function () {
    // return function (type) {
    return function (type) {
        switch (type) {
            case 0:
                return "首页banner";
                break;
            case 1:
                return "找职位banner";
                break;
            case 2:
                return "找精英banner";
                break;
            case 3:
                return "行业大图";
                break;
            default :
                return "查找不到信息";
                break;
        }
    }
});
// 将状态部分的数字转化为相应文字
listApp.filter("status2view",function () {
    return function (status) {
        switch (status) {
            case 1:
                return "草稿";
                break;
            case 2:
                return "上线";
                break;
            default :
                return "查找不到信息";
                break;
        }
    }
});
//上下线的切换
listApp.filter("status2change",function () {
    return function (status) {
        switch (status) {
            case 1:
                return "上线";
                break;
            case 2:
                return "下线";
                break;
        }
    }
});











