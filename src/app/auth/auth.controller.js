(function () {
    'use strict';
    angular
        .module('frontend')
        .controller('AuthController', AuthController);
    /** @ngInject */
    function AuthController(Auth, EnvironmentConfig, $localStorage, $timeout, $state, $window,$location) {
        var vm = this;
        $localStorage.idAdmin=undefined;
        $localStorage.lvlAdmin=undefined;
        $localStorage.permission=undefined;
        vm.login = function () {
            var criteria = {
                name: vm.username,
                password: vm.contrasenia
            }
            Auth.Login(criteria)
                .then(function (response) {
                    $localStorage.idAdmin=response.data.id_Admin;
                    $localStorage.lvlAdmin=response.data.lvlAdmin;
                    $localStorage.permission=true;
                    $state.go('i.main');
                    console.log(response);
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    }
})();