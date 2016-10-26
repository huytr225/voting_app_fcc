'use strict';

angular.module('polls',[
        'ngResource',
        'ui.router',
        'pollServices'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/polls");
        $stateProvider
            .state('list',{
                url:"/polls",
                templateUrl:'/public/views/list.html',
                controller:'PollListCtrl'
            })
            .state('item',{
                url:'/poll/:pollId',
                templateUrl: '/public/views/item.html', 
                controller: 'PollItemCtrl'
            })
            .state('new',{
                url:'/new',
                templateUrl: '/public/views/new.html', 
                controller: 'PollNewCtrl'
            });
    }]);