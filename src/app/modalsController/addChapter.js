(function () {
    'use strict';
    angular.module('frontend')
        .directive('addChapter', addChapter);
    /** @ngInject */
    function addChapter($uibModal) {
        var directive = {
            restrict: 'A',
            link: function (scope, element) {
                element.click(function () {
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'app/components/modals/addChapter.html',
                        controller: addChapter,
                        controllerAs: 'vm',
                        size: 'md',
                        backdrop: 'static'
                    });
                });
            }
        };
        return directive;
        /** @ngInject */
        function addChapter($uibModalInstance, $rootScope, $localStorage, $window, Auth, $scope) {
            var vm = this;
            vm.valido = false;
            vm.criterio;
            vm.ok = function () {
                if ($scope.frmnew.$valid) {

                    vm.data = {
                        name: vm.name,
                        desc: vm.description,
                        status: false,
                        admin: $localStorage.idAdmin
                    };
                    console.log(vm.data);
                    Auth.CrearCapitulo(vm.data)
                    .then(function (respuesta) {


                        
                        console.log(respuesta);
                        $uibModalInstance.close('close');
                        $rootScope.$emit('chapterAdded');
                      })
                      .catch(function (err) {
                        console.log(err);
                      });
                   

                    
                }
            }
            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
               
            }
        }
    }
})();