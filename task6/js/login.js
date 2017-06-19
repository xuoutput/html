var loginApp = angular.module("myApp");
loginApp.controller('loginCtrl',function ($scope,$http,$state) {
    // sessionStorage.userAdmit='0';//判断登陆
    $scope.login = function () {
        $http({
            method:"POST",
            url:"/carrots-admin-ajax/a/login",
            // 下面两种都可以
            // params: { 'name': $scope.username, 'pwd': $scope.userpwd }，
            data:$.param({
                name: $scope.username,
                pwd: $scope.userpwd
            }),
            // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
            // if (response.data.message==="success") {
            // 下面判断传过去的值是否存在，弹出来显示信息
            if (response.data.code === 0) {
                // alert(response.data.message);
                bootbox.alert({
                    title: '<p style="color: #47c6e8">提示</p>',
                    message:response.data.message
                });                
                // 用来记录是不是通过登录进来main页，否则回到登录页
                // sessionStorage.userAdmit=1;不行
                // sessionStorage.userAdmit='1';
                sessionStorage.userAdmit='true';
                $state.go("main");
            } 
            else {
                // alert(response.data.message);
                bootbox.alert({
                    title: '<p style="color: #47c6e8">提示</p>',
                    message:response.data.message
                });                 
            };

        },function errorCallback(response) {
            console.log(response);
            alert("false");
        });
    }
});







