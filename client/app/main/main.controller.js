'use strict';

angular.module('coursesApp')
  .controller('MainCtrl', function ($scope, $state, $http, lodash) {
    var vm = this;

    vm.goDetails = goDetails;
    activate();

    function activate() {
      getCourse();
    }

    function getCourse() {
      $http.get('/api/courses').success(function(response) {
        vm.courses = response.courses;
      });
    }

    function goDetails(id) {
      $state.go('main.detail',
        {
          id: id
        });
    }

    $scope.$on('details-updated', function (event, params) {
      var courseUpdated = lodash.find(vm.courses,function(value){
        return value.id === params.id;
      });
      courseUpdated.name = params.name;
    });
  });
