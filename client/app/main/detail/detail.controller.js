'use strict';

angular.module('coursesApp')
  .controller('DetailCtrl', function ($scope, $stateParams, Course) {
    var vm = this;

    vm.edit = edit;
    vm.resetChanges = resetChanges;
    vm.saveChanges = saveChanges;
    vm.data;

    activate();

    function activate() {
      getCourse();
    }

    function getCourse() {
      vm.promise = Course.get($stateParams.id);
      vm.promise.then(function (response) {
        loadDetails(response);
      });
    }

    function edit(book) {
      book.edit = true;
    }


    function resetChanges() {
      angular.copy(vm.data , vm.selected);
      vm.formEdit.$setPristine(true);
      angular.forEach(vm.selected.textbooks, function(value, key) {
        if(value.edit) {
          value.edit = false;
        }
      });
    }

    function saveChanges() {
      vm.promise = Course.save($stateParams.id, vm.selected).then(function (response) {
        vm.formEdit.$setPristine(true);
       loadDetails(response);
        $scope.$emit('details-updated', response);
      });
    }

    function loadDetails(details) {
      vm.selected = null;
      vm.selected = details;
      vm.data = angular.copy(vm.selected);
      angular.forEach(vm.selected.textbooks, function(value, key) {
        if(value.edit) {
          value.edit = false;
        }
      });
    }
  });
