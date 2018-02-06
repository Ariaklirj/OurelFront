
(function() {
  'use strict';

  angular
    .module('frontend')
    .factory('Auth',Auth);

  /** @ngInject */
  function Auth($q, $localStorage, Restangular, Usuario) {

    return {
      ObtenerCapitulos: function(criterio) {
        var deferred = $q.defer();
        var response = Restangular
          .all('/chapter').customGET("",criterio);
        response.then(function(res) {
          deferred.resolve(res);
        }).catch(function(err) {
          console.log(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      LiberarCapitulo: function(criterio) {
        var deferred = $q.defer();
        var response = Restangular
          .all('/chapter').customPUT(criterio,"");
        response.then(function(res) {
          deferred.resolve(res);
        }).catch(function(err) {
          console.log(err);
          deferred.reject(err);
        });
        return deferred.promise;
      }


    }// end return

  }// end function

})();
