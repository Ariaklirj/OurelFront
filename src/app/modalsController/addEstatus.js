(function () {
    'use strict';
    angular.module('frontend')
        .directive('addEstatus', addEstatus);
    /** @ngInject */
    function addEstatus($uibModal) {
        var directive = {
            restrict: 'A',
            link: function (scope, element) {
                element.click(function () {
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'app/components/modals/addEstatus.html',
                        controller: addEstatus,
                        controllerAs: 'vm',
                        size: 'md',
                        backdrop: 'static'
                    });
                });
            }
        };
        return directive;
        /** @ngInject */
        function addEstatus($uibModalInstance, $rootScope, $localStorage, $window, Auth, $scope) {
            var vm = this;
            var criteria = {};
            vm.capitulos;
            vm.estatus;
            vm.name
            vm.capitulo_seleccionado = null;
            vm.estatus_seleccionado = null;
            vm.disableEstatusSelect = true;
            vm.disableEstatusFinal = false;
            vm.disableInicioUnico = false;
            vm.spanTitle=false;
            vm.SpanEstatusNoSeleccionado = false;
            vm.disableSpanEstatus = false;
            vm.disablePrimerEstatus = false;
            vm.primerEstatus = false;
            vm.InicioUnico = false;
            vm.EstatusFinal = false;

            Auth.ObtenerCapitulos(criteria)
                .then(function (respuesta) {


                    for (var i = 0; i < respuesta.data.length; i++) {
                        respuesta.data[i].index = i;
                    }
                    vm.capitulos = respuesta.data;
                    console.log(vm.capitulos);
                })
                .catch(function (err) {
                    console.log(err);
                });

            vm.cambioPrimerEstaus = function () {
                if (!vm.primerEstatus) {
                    vm.primerEstatus = false;
                    vm.disableEstatusFinal = false;


                }
                else {
                    vm.primerEstatus = true;
                    vm.disableEstatusFinal = true;

                    vm.primerEstatus = true;
                    vm.EstatusFinal = false;
                }
                console.log(vm.primerEstatus)
            }
            vm.cambioInicioUnico = function () {

                if (!vm.InicioUnico) {
                    vm.InicioUnico = false;
                    vm.disableEstatusFinal = false;
                    vm.primerEstatus = false;

                } else {
                    vm.InicioUnico = true;
                    vm.disableEstatusFinal = true;

                    vm.primerEstatus = true;
                    vm.EstatusFinal = false;
                }
                console.log(vm.InicioUnico)
            }
            vm.cambioEstatusFinal = function () {
                if (!vm.EstatusFinal) {
                    vm.EstatusFinal = false;

                    vm.disableInicioUnico = false;
                    vm.disablePrimerEstatus = false;

                } else {
                    vm.EstatusFinal = true;



                    vm.disableInicioUnico = true;
                    vm.disablePrimerEstatus = true;
                    vm.primerEstatus = false;
                    vm.InicioUnico = false;

                }
                console.log(vm.EstatusFinal)
            }

            vm.cambioEstatus = function () {
                vm.SpanEstatusNoSeleccionado = false;
            }

            vm.cambioCapitulo = function () {
                if (vm.capitulo_seleccionado != null) {
                    vm.disableSpanEstatus = false;
                    console.log(vm.capitulo_seleccionado);
                    vm.disableEstatusSelect = false;
                    var dataReqEstatus = {
                        chapter: vm.capitulos[vm.capitulo_seleccionado].id_chapter
                    };
                    console.log(dataReqEstatus);
                    Auth.ObtenerEstatus(dataReqEstatus)
                        .then(function (resEstatus) {

                            
                            if (resEstatus.data.length > 0) {
                                for (var i = 0; i < resEstatus.data.length; i++) {
                                    resEstatus.data[i].index = i;
                                }
                                console.log(resEstatus.data);
                                vm.estatus = resEstatus.data;

                            } else {
                                vm.disableSpanEstatus = true;
                                vm.disableEstatusFinal = true;
                                vm.disableInicioUnico = false;
                                vm.disablePrimerEstatus = true;
                                vm.primerEstatus = true;
                                vm.InicioUnico = false;
                                vm.EstatusFinal = false;
                            }

                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                }
            }
            vm.ok = function () {

                if (!vm.primerEstatus) {
                    if (vm.estatus_seleccionado != null) {
                        if(vm.title!="") {
                             var newEstatus = {
                            title: vm.name,
                            uniqueStart: vm.InicioUnico,
                            isStart: vm.primerEstatus,
                            isEnd: vm.EstatusFinal,
                            lastStatus: vm.estatus[vm.estatus_seleccionado].id_estatus,
                            admin: $localStorage.idAdmin,
                            chapter: vm.capitulos[vm.capitulo_seleccionado].id_chapter
                        };
                        console.log(newEstatus);
                         Auth.CrearEstatus(newEstatus)
                            .then(function (data) {
                                console.log(data);
                                $rootScope.$emit('statusAdded');
                                $uibModalInstance.dismiss('close');
                            })
                            .catch(function (err) {
                                console.log(err);
                            })
    
                        } else {
                            vm.spanTitle=true;
                        }
                       
                    } else {
                        vm.SpanEstatusNoSeleccionado = true;
                    }


                } else {
                    if(vm.title!=""){
                       var newEstatus = {
                        title: vm.name,
                        uniqueStart: vm.InicioUnico,
                        isStart: vm.primerEstatus,
                        isEnd: vm.EstatusFinal,
                        lastStatus: null,
                        admin: $localStorage.idAdmin,
                        chapter: vm.capitulos[vm.capitulo_seleccionado].id_chapter
                    };
                    console.log(newEstatus);
                      Auth.CrearEstatus(newEstatus)
                         .then(function (data) {
                             console.log(data);
                             $rootScope.$emit('statusAdded');
                             $uibModalInstance.dismiss('close');
                         })
                         .catch(function (err) {
                             console.log(err);
                         })  
                    } else {
                        vm.spanTitle=false;
                    }
                    
                }
            }
            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
                $rootScope.bp_beneficiario = "";
            }
        }
    }
})();