(function() {
  'use strict';

  angular
  .module('frontend')
  .controller('AuthController', AuthController);

  /** @ngInject */
  function AuthController(Auth, $state, EnvironmentConfig, $localStorage, $timeout) {
    var vm = this;
    vm.credentials = {username: '', password: '' };

    vm.loading = false;

    vm.login = function(){

      vm.loading = true;

      var data = {
        username: vm.credentials.username,
        password: vm.credentials.contrasenia
      };
      Auth.authenticate(data).then(function(resp){

        // console.log('--------token');
        // console.log(resp);
        // console.log('--------');
        if (resp.token != undefined){
          $localStorage.auth = angular.toJson(resp);
          Auth.getUser(resp.id).then(function(resp){
            // console.log('--------current');
            // console.log(resp);
            // console.log('--------');
            if (resp.is_active === true){
              $localStorage.prof = angular.toJson(resp);
              $state.go('i.main');
            } else {
              delete $localStorage.auth;
              vm.loading = false;
              vm.error = 'No tienes los permisos suficientes para acceder.';
            }
          });
        } else {
          delete $localStorage.auth;
          vm.loading = false;
          vm.error = 'Usuario y/o Contraseña incorrectos';
        }
        $timeout(function() {
          vm.error = undefined;
        }, 3000);
      }).catch(function (){
        delete $localStorage.auth;
        vm.loading = false;
        vm.error = 'Usuario y/o Contraseña incorrectos';
        $timeout(function() {
          vm.error = undefined;
        }, 3000);
      });
    }// end login

  }
})();
