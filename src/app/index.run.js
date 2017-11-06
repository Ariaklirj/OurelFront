(function() {
  'use strict';

  angular
  .module('frontend')
  .run(runBlock);

  /** @ngInject */
  function runBlock(Auth, $log, EnvironmentConfig, $rootScope, $state ,Restangular,$localStorage) {

    Restangular.setErrorInterceptor(function(response) {
      if(response.status === 401){
        delete $localStorage.auth;
        $state.go('login');
      }
    });

    Restangular.setFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {

      if (Auth.isAuthenticated()) {
        headers.Authorization = 'Token ' + Auth.getToken();
      }
      return {
        element: element,
        headers: headers,
        params: params,
        httpConfig: httpConfig
      };
    });

    Restangular.addResponseInterceptor(function(data, operation) {
      if (operation === "getList") {
        return data.data;
      } else {
        return data;
      }
    });

    // $rootScope.Auth = Auth;

    $rootScope.isTest = EnvironmentConfig.site.staging;

    $rootScope.logout = function(){
      delete $localStorage.auth;
      delete $localStorage.prof;
      $state.go('login');
    };

    $rootScope.$on('$stateChangeStart', function (e, toState) {
      // if (Auth.expired()) {
      //   e.preventDefault();
      //   $state.go('login');
      // }
      // console.log('----');
      // console.log(toState.name);
      // console.log('Token: ' + Auth.getToken());
      // console.log('isAuthenticated: ' + Auth.isAuthenticated());
      // console.log('Expired: ' + Auth.expired());
      // console.log('----');

      // if(toState.name != 'login' && !Auth.isAuthenticated()) {
      //   e.preventDefault();
      //   $state.go('login');
      // }
      // $rootScope.userInfo = Auth.userInfo();
      $rootScope.userInfo = {
        nombre : 'Super Admin',
        correoElectronico : 'admin@app.com',
        username : 'samdin'
      };
    });

    // if (Auth.expired()) {
    //   $state.go('login');
    // }





    $log.debug('runBlock end');
  }

})();
