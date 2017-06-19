var logoutApp = angular.module("myApp");
logoutApp.controller('mainPageCtrl',['$scope','$http','$state',function ($scope,$http,$state) {
    // 用来记录是不是通过登录进来main页，否则回到登录页
    if(sessionStorage.userAdmit==='false') {
        $state.go('login');
        bootbox.alert({
            title: '<p style="color: #47c6e8">提示</p>',
            message:'请先登录'
        });        
    }

    $scope.logout = function () {
        $.cookie('number', null,{path:'/'}); //删除一个cookie
        $.cookie('status1', null,{path:'/'}); //删除一个cookie
        $.cookie('status2', null,{path:'/'}); //删除一个cookie
        $.cookie('m', null,{path:'/'}); //删除一个cookie
        $http.post('/carrots-admin-ajax/a/logout').
            then(function successCallback(response){
                // if(response.data.message="success") {
                if(response.data.code==0) {
                    console.log(response);
                    sessionStorage.userAdmit='false';
                    $state.go('login');
                    bootbox.alert({
                        title: '<p style="color: #47c6e8">提示</p>',
                        message:'您已退出登录'
                    });
                }
                else {
                    // alert("response.data.message")
                    bootbox.alert({
                        title: '<p style="color: #47c6e8">提示</p>',
                        message:response.data.message
                    });                    
                }
            })
    }
}]);





