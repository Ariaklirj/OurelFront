(function() {
  'use strict';

  angular
  .module('frontend')
  .config(config);

  function config($logProvider, toastrConfig, RestangularProvider, EnvironmentConfig, gravatarServiceProvider, $localStorageProvider, paginationTemplateProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-center';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;

    RestangularProvider.setBaseUrl(EnvironmentConfig.site.rest.baseUrl);

    RestangularProvider.setRequestSuffix('/');

    $localStorageProvider.setKeyPrefix('frn-');

    gravatarServiceProvider.defaults = {
      "default": 'retro' //retro , mm,
    };

    paginationTemplateProvider.setPath('app/components/common/pagination.html');


  }

})();
