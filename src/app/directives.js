'use strict';

//Directive used to set metisMenu and minimalize button
angular.module('frontend')
.directive('sideNavigation', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element) {
      // Call metsi to build when user signup
      scope.$watch('authentication.user', function() {
        $timeout(function() {
          element.metisMenu();
        });
      });

    }
  };
})
.directive('minimalizaSidebar', function ($timeout) {
  return {
    restrict: 'A',
    template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
    controller: function ($scope) {
      $scope.minimalize = function () {
        angular.element('body').toggleClass('mini-navbar');
        if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
          // Hide menu in order to smoothly turn on when maximize menu
          angular.element('#side-menu').hide();
          // For smoothly turn on menu
          $timeout(function () {
            angular.element('#side-menu').fadeIn(400);
          }, 200);
        } else {
          // Remove all inline style from jquery fadeIn function to reset menu state
          angular.element('#side-menu').removeAttr('style');
        }
      };
    }
  };
})
.directive('pwCheck', [function () {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.pwCheck;
      elem.add(firstPassword).on('keyup', function () {
        scope.$apply(function () {
          var v = elem.val()===$(firstPassword).val();
          ctrl.$setValidity('pwmatch', v);
        });
      });
    }
  }
}])
.directive("sort", function() {
  return {
    restrict: 'A',
    transclude: true,
    template :
    '<span ng-click="onClick()">'+
    '<span ng-transclude></span>'+
    '<i class="fa fa-sort m-l-xs"'+
    'ng-class="{ \'fa fa-sort-asc\' : order===by && !reverse,' +
    '\'fa fa-sort-desc\' : order===by && reverse,' +
    '\'fa fa-sort\' : order!=by}"></i>'+
    '</span>',
    scope: {
      order: '=',
      by: '=',
      reverse : '='
    },
    link: function(scope) {
      scope.onClick = function () {
        if( scope.order === scope.by ) {
          scope.reverse = !scope.reverse
        } else {
          scope.by = scope.order ;
          scope.reverse = false;
        }
      }
    }
  }
});
