
(function() {
  'use strict';

  angular
    .module('frontend')
    .factory('Auth',Auth);

  /** @ngInject */
  function Auth($q, $localStorage, Restangular, Usuario) {

    return {

      authenticate : function(obj){
        var deferred = $q.defer();
        delete $localStorage.auth;
        var response = Restangular.all('login/').post(obj);
        response.then(function (res) {
          deferred.resolve(res);
        }).catch(function (err){
          deferred.reject(err);
        });
        return deferred.promise;
      },// end authenticate

      getUser : function(id){
        var deferred = $q.defer();
        usuarios.get(id).then(function(res){
          deferred.resolve(res);
        }).catch(function(err){
          deferred.reject(err);
        });
        return deferred.promise;
      },// end getUser

      userInfo : function(){
        var _prof = ($localStorage.prof) ? angular.fromJson($localStorage.prof) : false;
        if (_prof) {
          delete _prof.permisos;
          delete _prof.grupos;
          return _prof;
        }
      },// end userInfo

      userGroups : function(){
        var _prof = ($localStorage.prof) ? angular.fromJson($localStorage.prof) : false;
        if (_prof) {
          delete _prof.permissions;
          delete _prof.id;
          delete _prof.username;
          delete _prof.email;
          delete _prof.is_active;
          delete _prof.date_joined;
          delete _prof.last_login;
          delete _prof.first_name;
          delete _prof.last_name;
          return _prof;
        }
      },// end userGroups

      userPermissions : function(){
        var _prof = ($localStorage.prof) ? angular.fromJson($localStorage.prof) : false;
        if (_prof) {
          return _prof.role.permissions;
        }
        return false;
      },// end userPermissions

      getToken : function(){
        if (typeof $localStorage.auth !== 'undefined') {
          var _auth = angular.fromJson($localStorage.auth);
          return _auth.token;
        }
      },// end getToken


      isAuthenticated : function(){
        if (typeof $localStorage.auth !== 'undefined') {
          var _auth = ($localStorage.auth) ? angular.fromJson($localStorage.auth) : false;
          if (_auth) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      },// end isAuthenticated

      hasPerm : function (perm) {
        var _prof = ($localStorage.prof) ? angular.fromJson($localStorage.prof) : false;
        if (_prof) {
          var perms = _prof.role.permissions;
          // console.log(perms);
          if (perms) {
            return (perms.indexOf(perm) != -1) ? true : false;
          }
          return false;
        }
        return false;
      },// end hasPerm

      expired : function(){
        if (typeof $localStorage.auth !== 'undefined') {
          var _auth = angular.fromJson($localStorage.auth);
          return (_auth.access_token && _auth.expiraEn && (_auth.expiraEn) < 0);
        }
      },// end expired

      destroy : function(){
        delete $localStorage.auth;
        delete $localStorage.prof;
      }// end destroy

    }// end return

  }// end function

})();
