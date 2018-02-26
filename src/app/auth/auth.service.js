
(function () {
  'use strict';

  angular
    .module('frontend')
    .factory('Auth', Auth);

  /** @ngInject */
  function Auth($q, $localStorage, Restangular, Usuario) {

    return {
      Login: function (criterio) {
        var deferred = $q.defer();
        var response = Restangular
          .all('/login').post(criterio);
        response.then(function (res) {
          deferred.resolve(res);
        }).catch(function (err) {
          console.log(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      ObtenerCapitulos: function (criterio) {
        var deferred = $q.defer();
        var response = Restangular
          .all('/chapter').customGET("", criterio);
        response.then(function (res) {
          deferred.resolve(res);
        }).catch(function (err) {
          console.log(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      ObtenerDecisiones: function (criterio) {
        var deferred = $q.defer();
        var response = Restangular
          .all('/decision').customGET("", criterio);
        response.then(function (res) {
          deferred.resolve(res);
        }).catch(function (err) {
          console.log(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      CrearCapitulo: function (criterio) {
        var deferred = $q.defer();
        var response = Restangular
          .all('/chapter').post(criterio);
        response.then(function (res) {
          deferred.resolve(res);
        }).catch(function (err) {
          console.log(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      CrearEstatus: function (criterio) {
        var deferred = $q.defer();
        var response = Restangular
          .all('/status').post(criterio);
        response.then(function (res) {
          deferred.resolve(res);
        }).catch(function (err) {
          console.log(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      CrearDecision: function (criterio) {
        var deferred = $q.defer();
        var response = Restangular
          .all('/decision').post(criterio);
        response.then(function (res) {
          deferred.resolve(res);
        }).catch(function (err) {
          console.log(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      ObtenerEstatus: function (criterio) {
        var deferred = $q.defer();
        var response = Restangular
          .all('/status').customGET("", criterio);
        response.then(function (res) {
          deferred.resolve(res);
        }).catch(function (err) {
          console.log(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      ActualizarEstatus: function (criterio) {
        var deferred = $q.defer();
        var response = Restangular
          .all('/status').customPUT(criterio, "");
        response.then(function (res) {
          deferred.resolve(res);
        }).catch(function (err) {
          console.log(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      ActualizarDecisiones: function (criterio) {
        var deferred = $q.defer();
        var response = Restangular
          .all('/decision').customPUT(criterio, "");
        response.then(function (res) {
          deferred.resolve(res);
        }).catch(function (err) {
          console.log(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      ActualizarDecisionesTodo: function (criterio) {
        var deferred = $q.defer();
        var response = Restangular
          .all('/decision').customPUT(criterio, "");
        response.then(function (res) {
          deferred.resolve(res);
        }).catch(function (err) {
          console.log(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      LiberarCapitulo: function (criterio) {
        var deferred = $q.defer();
        var response = Restangular
          .all('/chapter').customPUT(criterio, "");
        response.then(function (res) {
          deferred.resolve(res);
        }).catch(function (err) {
          console.log(err);
          deferred.reject(err);
        });
        return deferred.promise;
      },
      ActualizarCapitulo: function (criterio) {
        var deferred = $q.defer();
        var response = Restangular
          .all('/chapter/sequenceUpdate').customPUT(criterio, "");
        response.then(function (res) {
          deferred.resolve(res);
        }).catch(function (err) {
          console.log(err);
          deferred.reject(err);
        });
        return deferred.promise;
      }


    }// end return

  }// end function

})();
