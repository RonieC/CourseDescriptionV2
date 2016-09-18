'use strict';

angular.module('coursesApp')
  .service('Course', function ($q, $resource) {
    var resource = $resource('/api/courses/:id', {id: '@id'}, {
      // Not needed
      get: {
        method: 'GET'
      },
      // Custom
      saveChanges: {
        method: 'PUT'
      }
    });

    var get = function (id) {
      var courseDefer = $q.defer();

      resource.get({id: id}).$promise.then(function (response) {
        console.log('Service . . ',response);
        courseDefer.resolve(response);
      }, function (error) {
        courseDefer.reject(error);
      });

      return courseDefer.promise;
    };

    var put = function(id, payload) {
      var courseDefer = $q.defer();

      resource.saveChanges({id: id}, payload).$promise.then(function (response) {
        courseDefer.resolve(response);
      }, function (error) {
        courseDefer.reject(error);
      });

      return courseDefer.promise;
    }


    return {
      get: get,
      save: put
    };
  });

