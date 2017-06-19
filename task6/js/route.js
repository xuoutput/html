var myApp = angular.module("myApp",['ui.router','oc.lazyLoad','ngMessages','tm.pagination']);
//懒加载：将依赖的脚本进行注入操作
myApp.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        myApp.controller = $controllerProvider.register;
        myApp.directive = $compileProvider.directive;
        myApp.filter = $filterProvider.register;
        myApp.factory = $provide.factory;
        myApp.service = $provide.service;
        myApp.constant = $provide.constant;
    }]);

//路由配置
myApp.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider
        .otherwise('/login');
        // .when("","/login");
    $stateProvider
        .state("login",{
            url: "/login",
            templateUrl: "tpls/login.html",
            resolve:{
                load:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'css/login.css',
                        'js/login.js'
                        ]);
                }]
            }
        })
        .state("main",{
            url: "/main",
            templateUrl: "tpls/main.html",
            resolve:{
                load:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        // 'js/main.js'
                        'js/mainCtrl.js'
                        // 'js/main.js',
                        // 'js/mainCtrl.js'
                        ]);
                }]
            }
        })
        .state("main.article-list",{
            url: "/article-list/:page/:size/:startAt/:endAt/:type/:status",
            // url: "/article-list",
            params:{'page':"1",'size':"10"},
            templateUrl: "tpls/article-list.html",
            cache:'false',//配合reload使用，每次跳转页面刷新
            //如果在使用ui-route的情况下，state中设置了controller,并且在对应的template.html中也设置了ng-controller,那会发出两次请求
            // controller:"listCtrl",
            resolve:{
                load:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'css/article-list.css',
                        'js/article-list.js'
                        ]);
                }]
            }
        })
        .state("main.article-details",{
            url: "/article-details?id",
            // url: "/article-details?id/:page/:size",
            templateUrl: "tpls/article-details.html",
            cache:'false',//配合reload使用，每次跳转页面刷新
            // controller:"detailsCtrl",
            resolve:{
                load:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        'css/article-list.css',
                        'css/article-details.css',
                        'js/details-controllers.js'
                        // 这就是图片上传预览的自带的
                        // 'js/details-directives.js'
                        ]);
                }]
            }
        })
});



