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
            var criteria = {};
            vm.capitulos = [];
            vm.capitulo_seleccionado = null;
            vm.InicioUnico = false;
            vm.disabledSelectChapter = false;
            Auth.ObtenerCapitulos(criteria)
                .then(function (respuesta) {

                    if (respuesta.data.length <= 0) {
                        vm.disabledSelectChapter = true;
                    } else {
                        var i = 0;
                        respuesta.data.forEach(function (chapter) {
                            if (chapter.next_chapter == null) {
                                respuesta.data[i].index = i;
                                i++;
                                vm.capitulos.push(chapter);
                            }

                        });

                        console.log(vm.capitulos);
                    }

                })
                .catch(function (err) {
                    console.log(err);
                });

            vm.cambioInicioUnico = function () {

                if (!vm.InicioUnico) {
                    vm.InicioUnico = false;
                } else {
                    vm.InicioUnico = true;
                }

            }



            vm.ok = function () {
                if ($scope.frmnew.$valid) {
                    if (vm.capitulo_seleccionado != null) {
                        console.log(vm.capitulo_seleccionado);
                        vm.data = {
                            chapter_name: vm.name, description: vm.description,
                            chapter_status: false, admin: $localStorage.idAdmin, previous_chapter: vm.capitulos[vm.capitulo_seleccionado].id_chapter,
                            unique_start: vm.InicioUnico
                        }
                        console.log(vm.data);
                        Auth.CrearCapitulo(vm.data)
                            .then(function (respuesta) {

                                vm.update = {
                                    id_chapter: {
                                        id_chapter: vm.capitulos[vm.capitulo_seleccionado].id_chapter
                                    },
                                    sequenceUpdate: {
                                        next_chapter: respuesta.data.id_chapter
                                    }
                                };
                                console.log(vm.update);

                                Auth.ActualizarCapitulo(vm.update)
                                    .then(function (respuestaUpdate) {
                                        console.log(respuestaUpdate);
                                        $uibModalInstance.close('close');
                                        $rootScope.$emit('chapterAdded');
                                    })
                                    .catch(function (err) {
                                        console.log(err);
                                    });




                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    } else {
                        vm.data = {
                            chapter_name: vm.name, description: vm.description,
                            chapter_status: false, admin: $localStorage.idAdmin, previous_chapter: null,
                            unique_start: vm.InicioUnico
                        }
                        console.log(vm.data);
                        Auth.CrearCapitulo(vm.data)
                            .then(function (respuesta) {
                                $uibModalInstance.close('close');
                                $rootScope.$emit('chapterAdded');
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    }
                }
            }
            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');

            }
        }
    }
})();