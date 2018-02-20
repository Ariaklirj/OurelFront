(function() {
  'use strict';

  angular
  .module('frontend')
  .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    })
    .state('i', {
      abstract: true,
      url: "/",
      templateUrl: "app/components/common/content.html"
    })
    
    .state('i.main', {
      url: "inicio/",
      templateUrl: "app/main/main.html"
    })
    .state('i.admin', {
      url: "Admin/",
      templateUrl: "app/administrador/administrador.html"
    })
    .state('i.estatus', {
      url: "admin_estatus/",
      templateUrl: "app/AdministradorEstatus/AdministradorEstatus.html"
    });

    $urlRouterProvider.when('', '/login');
    $urlRouterProvider.otherwise('/login');
  }

})();
