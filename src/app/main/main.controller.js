'use strict';

angular.module('frontend')
  .controller('MainController', function (Auth, $scope, $localStorage, $location) {

    var vm = this;
   
    // $scope.hasPerm = Auth.hasPerm;
    console.log($localStorage.permission)
 if($localStorage.permission==undefined) {
   console.log("cambio");
   $location.url('/login');
 }




  });
