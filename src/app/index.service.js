(function() {
  'use strict';

  angular
  .module('frontend')
  .factory('Usuario', function(Restangular){
    return Restangular.service('usuario');
  })


})();
