
var detailsApp=angular.module('myApp',['angularFileUpload']);
detailsApp.controller('detailsCtrl',['$scope','$http','$state','$stateParams','FileUploader',function ($scope,$http,$state,$stateParams,FileUploader) {
    // if(sessionStorage.userpwd==="0") {
    //     $state.go('login');
    // }
    //富文本编辑器相关
    $scope.content = '';    

    //下拉框常量，不是article-list中的
    $scope.types = [
        {value:0,text:"首页banner"},
        {value:1,text:"找职业banner"},
        {value:2,text:"找精英banner"},
        {value:3,text:"行业大图"}
    ];
    // 为行业大图时显示
    $scope.industrys = [
        {value:0,text:"移动互联网"},
        {value:1,text:"电子商务"},
        {value:2,text:"企业服务"},
        {value:3,text:"O2O"},
        {value:4,text:"教育"},
        {value:5,text:"金融"},
        {value:6,text:"游戏"}
    ];
    //退出（取消）功能(要记录article-list第几页并且每页展示几页,没搞出来,因为URL中没有设置)
    console.log('$stateParams=' );
    console.log($stateParams );
    $scope.cancel = function () {
        $state.go('main.article-list', {
            page: 1 ,
            size: 10
            // page: $scope.paginationConf.currentPage ,
            // size: $scope.paginationConf.itemsPerPage            
        }, {reload: true});
    };
    // $scope.paginationConf.currentPage = $stateParams.page;
    // $scope.paginationConf.itemsPerPage = $stateParams.size ;

    // //取消时图片预览消失
    // var img;//图片url地址
    // $scope.imgCancel=function () {
    //     $scope.img = "undefined";
    // };


    
    //编辑部分的功能,通过url传参数得到id
    $scope.id = $stateParams.id;
    //先查询ID是否存在，不存在肯定是新增的；
    if($scope.id) {
        document.getElementById("title").innerHTML="编辑Article";
        $http.get('/carrots-admin-ajax/a/article/'+$scope.id).then(function successCallback(response) {
            console.log('response=');
            console.log(response);
            //请求成功，获取数据并渲染到页面上
            $scope.title = response.data.data.article.title;
            $scope.type = response.data.data.article.type;
            $scope.status = response.data.data.article.status;
            $scope.img = response.data.data.article.img;
            $scope.content = response.data.data.article.content;
            $scope.url = response.data.data.article.url;
            $scope.industry = response.data.data.article.industry;
            $scope.createAt = response.data.data.article.createAt;
            $scope.updateAt = response.data.data.article.updateAt;            
        },function errorCallback(response) {
            console.log(response);
            alert("请求失败");
        });


        //编辑立即上线
        $scope.status2 = function () {

            $http({
                method:"PUT",
                url:"/carrots-admin-ajax/a/u/article/"+$scope.id,
                data:$.param({
                    id:$scope.id,
                    title: $scope.title,
                    type: $scope.type,
                    status: 2,
                    img: $scope.img,
                    content: $scope.content,
                    url: $scope.url,
                    industry: $scope.industry,
                    createAt:$scope.createAt//后端接口问题，成为必填项目
                    // updateAt:$scope.updateAt
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .then(function successCallback(response) {
                console.log('编辑上线',response);
                // if (response.data.message==="success") {
                if (response.data.code===0) {
                    $state.go('main.article-list', {
                        page: 1 ,
                        size: 10
                    }, {reload: true});
                    bootbox.setDefaults("locale","zh_CN");
                    bootbox.alert({
                        title: '<p style="color: #47c6e8">提示</p>',
                        message:'编辑成功',
                        buttons: {
                            ok: {
                                label: '确定',
                                className: 'btn-primary'
                            }
                        }
                    });
                }
                else {
                    // alert(response.data.message)
                    bootbox.alert({
                        title: '<p style="color: #47c6e8">提示</p>',
                        message:response.data.message
                    });                    
                }
            });
        };
        //编辑存为草稿
        $scope.status1 = function () {
            $http({
                method:"PUT",
                url:"/carrots-admin-ajax/a/u/article/"+$scope.id,
                data:$.param({
                    id:$scope.id,
                    title: $scope.title,
                    type:$scope.type,
                    status:1,
                    img:$scope.img,
                    content:$scope.content,
                    url:$scope.url,
                    industry:$scope.industry,
                    createAt:$scope.createAt//后端接口问题，成为必填项目
                    // updateAt:$scope.updateAt
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                console.log('编辑草稿',response);
                if (response.data.code===0) {
                    $state.go('main.article-list', {
                        page: 1 ,
                        size: 10
                    }, {reload: true});
                    bootbox.setDefaults("locale","zh_CN");
                    bootbox.alert({
                        title: '<p style="color: #47c6e8">提示</p>',
                        message:'编辑成功',
                        buttons: {
                            ok: {
                                label: '确定',
                                className: 'btn-primary'
                            }
                        }
                    });
                }
                else {
                    // alert(response.data.message)
                    bootbox.alert({
                        title: '<p style="color: #47c6e8">提示</p>',
                        message:response.data.message
                    });                     
                }
            });
        };
    }
    //新增立即上线
    else {
        $scope.status2 = function () {
            $http({
                method:"POST",
                url:"/carrots-admin-ajax/a/u/article",
                data:$.param({
                    title: $scope.title,
                    type:$scope.type,
                    status:2,
                    // 这里不是$scope.img,
                    img:$scope.img,
                    // img:img,
                    content:$scope.content,
                    url:$scope.url,
                    industry:$scope.industry
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                console.log('新增上线',response);
                if (response.data.code===0) {
                    $state.go('main.article-list', {
                        page: 1 ,
                        size: 10
                    }, {reload: true});
                    bootbox.setDefaults("locale","zh_CN");
                    bootbox.alert({
                        title: '<p style="color: #47c6e8">提示</p>',
                        message:'新增成功',
                        buttons: {
                            ok: {
                                label: '确定',
                                className: 'btn-primary'
                            }
                        }
                    });
                }
                else {
                    // alert(response.data.message)
                    bootbox.alert({
                        title: '<p style="color: #47c6e8">提示</p>',
                        message:response.data.message
                    });                     
                }
            });
        };
        //新增存为草稿1
        $scope.status1 = function () {
            $http({
                method:"POST",
                url:"/carrots-admin-ajax/a/u/article",
                data:$.param({
                    title: $scope.title,
                    type:$scope.type,
                    status:1,
                    // 这里不是$scope.img,
                    img:$scope.img,
                    // img:img,
                    content:$scope.content,
                    industry:$scope.industry,
                    url:$scope.url
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                console.log('新增草稿',response);
                if (response.data.code===0) {
                    $state.go('main.article-list', {
                        page: 1 ,
                        size: 10
                    }, {reload: true});
                    bootbox.setDefaults("locale","zh_CN");
                    bootbox.alert({
                        title: '<p style="color: #47c6e8">提示</p>',
                        message:'新增成功',
                        buttons: {
                            ok: {
                                label: '确定',
                                className: 'btn-primary'
                            }
                        }
                    });
                }
                else {
                    // alert(response.data.message)
                    bootbox.alert({
                        title: '<p style="color: #47c6e8">提示</p>',
                        message:response.data.message
                    });                     
                }
            });
        };
    }

    //上传图片部分

    var uploader = $scope.uploader = new FileUploader({
        url: '/carrots-admin-ajax/a/u/img/task',
        queueLimit: 1     //文件个数限制
    });    
        // 图片上传
        // FILTERS
        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            // 上传成功后单独设置一个预览的imgUrl,改写下插件，后台的img才是正确的url而不是url
            img = response.data.url;
            console.log('img=');
            console.log(img);
            $scope.img = img;
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };
        console.info('uploader', uploader);
}]);








//富文本编辑器指令wangEditor2不是第3版。第3版没有angular用法
detailsApp.directive('contenteditable',function () {
    return{
        restrict: 'A',
        require:'?ngModel',
        link:function (scope,element,attrs,ngModel) {
            //初始化编辑内容
            console.log("文本编辑器被执行了");
            var editor = new wangEditor(element);
            //自定义菜单，去掉地图、图片、视频、表情
            editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
                if (item === 'location') {
                    return null;
                }
                if (item === 'img') {
                    return null;
                }
                if (item === 'video') {
                    return null;
                }
                if (item === 'emotion') {
                    return null;
                }
                return item;
            });

            editor.onchange = function () {
                // 从 onchange 函数中更新数据
                scope.$apply(function () {
                    var html = editor.$txt.html();
                    ngModel.$setViewValue(html);
                });
            };


            if(!ngModel){
                return;
            } // 如果没有ng模型，什么也不做
            // 指定如何更新UI
            ngModel.$render = function () {
                element.html(ngModel.$viewValue || "")
            };            


            // if(!ngModel){
            //     return;
            // } // 如果没有ng模型，什么也不做
            // // 指定如何更新UI
            // ngModel.$render = function () {
            //     element.html(ngModel.$viewValue || "")
            // };

            // // 无需初始化，AngularJS将基于ng模型属性初始化文本
            // // 将数据写入模型
            // function readViewText() {
            //     var html=element.html();
            //     // 当我们清除可编辑的内容时，浏览器会留下一个<br>
            //     // 如果提供了strip-br属性，那么我们将其删除
            //     if(attrs.stripBr && html=='<br>') {
            //         html='';
            //     }
            //     ngModel.$setViewValue(html);
            // }

            // //监听更改事件以启用绑定
            // element.on('blur keyup change',function () {
            //     scope.$apply(readViewText);
            // });


            editor.create();
        }
    }
});



