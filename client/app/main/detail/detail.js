'use strict';

angular.module('coursesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.detail', {
        parent: 'main',
        url: '/detail?id&name',
        templateUrl: 'app/main/detail/detail.html',
        controller: 'DetailCtrl',
        controllerAs: 'detail'
      });
  });
