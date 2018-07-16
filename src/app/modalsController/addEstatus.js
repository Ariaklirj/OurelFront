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
            vm.disableEstatusSelect2 = true;
            vm.disableDecisionSelect2 = true;
            vm.showSpanDecisionDoble = false;
            vm.SuccesFailDecision = false;
            vm.capitulo_seleccionado = null;
            vm.estatus_seleccionado = null;
            vm.disableEstatusSelect = true;
            vm.disableEstatusFinal = true;
            vm.disableSpanCapitulos = false;
            vm.disableSuccesFailDecision = false
            vm.disableSuccesFailDecision2 = false
            vm.showSuccesFailOption = false;
            vm.showSuccesFailOption2 = false;
            vm.decision_seleccionada = null;
            vm.SpanDecisionNoSeleccionado = false;
            vm.spanTitle = false;
            vm.SpanEstatusNoSeleccionado = false;
            vm.disableSpanEstatus = false;
            vm.disablePrimerEstatus = true;
            vm.primerEstatus = false;
            vm.saveDisable = false;
            vm.decisions = [];
            vm.decisions2 = [];
            vm.EstatusFinal = false;
            vm.disableMasDeUnaDecision = false;
            vm.dobleDecisionAnterior = false;
            vm.vitUp = 0;
            vm.agiUp = 0;
            vm.strUp = 0;
            vm.lckUp = 0;
            vm.intUp = 0;
            Auth.ObtenerCapitulos(criteria)
                .then(function (respuesta) {
                    console.log(respuesta);
                    for (var i = 0; i < respuesta.data.length; i++) {
                        respuesta.data[i].index = i;
                    }
                    vm.capitulos = respuesta.data;
                    console.log(vm.capitulos);
                })
                .catch(function (err) {
                    vm.saveDisable = true;
                    vm.disableSpanCapitulos = true;
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
                    vm.disableEstatusSelect = true;
                    vm.estatus_seleccionado = null;
                    vm.EstatusFinal = false;
                }
                console.log(vm.primerEstatus)
            }

            vm.cambioDobleDecisionAnterior = function () {
                if (!vm.dobleDecisionAnterior) {
                    vm.disableEstatusSelect2 = true;
                    vm.disableDecisionSelect2 = true;
                    vm.dobleDecisionAnterior = false;
                }
                else {
                    vm.disableEstatusSelect2 = false;
                    vm.disableDecisionSelect2 = false;
                    vm.dobleDecisionAnterior = true;
                }
                console.log(vm.dobleDecisionAnterior)
            }
            vm.cambioEstatusFinal = function () {
                if (!vm.EstatusFinal) {
                    vm.EstatusFinal = false;


                    vm.disablePrimerEstatus = false;

                } else {
                    vm.EstatusFinal = true;




                    vm.disablePrimerEstatus = true;
                    vm.primerEstatus = false;


                }
                console.log(vm.EstatusFinal)
            }

            vm.cambioEstatus = function () {
                vm.decisions = [];
                vm.SpanEstatusNoSeleccionado = false;
                vm.disableSpanDecision = false;
                vm.saveDisable = false;
                var criteria = {
                    status: vm.estatus[vm.estatus_seleccionado].id_estatus
                }
                Auth.ObtenerDecisiones(criteria)
                    .then(function (response) {
                        var i = 0;
                        if (response.data.idNextStatusOne == null || response.data.idNextStatusTwo == null || response.data.idNextStatusThree == null) {
                            if (response.data.idNextStatusOne == null) {
                                console.log(response.data.hasRestriccionsOne);
                                if (response.data.hasRestriccionsOne) {
                                    if (response.data.idNextStatusOneSucces == null || response.data.idNextStatusOneFail == null) {
                                        var objDecision1 = {
                                            index: i,
                                            name: response.data.descriptionOne,
                                            id_decision: {
                                                id_decision: response.data.id_decision
                                            },
                                            hasRestriccions: true,
                                            updateDecision: {
                                                idNextStatusOne: null,
                                                idNextStatusOneSucces: response.data.idNextStatusOneSucces,
                                                idNextStatusOneFail: response.data.idNextStatusOneFail
                                            },
                                            type: 1
                                        }
                                        vm.decisions.push(objDecision1);
                                        i++;
                                    }
                                } else {
                                    var objDecision1 = {
                                        index: i,
                                        hasRestriccions: false,
                                        name: response.data.descriptionOne,
                                        id_decision: {
                                            id_decision: response.data.id_decision
                                        },
                                        updateDecision: {
                                            idNextStatusOne: ""
                                        },
                                        type: 1
                                    }
                                    vm.decisions.push(objDecision1);
                                    i++;
                                }
                            }
                            if (response.data.idNextStatusTwo == null) {

                                console.log(response.data.hasRestriccionsTwo);
                                if (response.data.hasRestriccionsTwo) {
                                    if (response.data.idNextStatusTwoSucces == null || response.data.idNextStatusTwoFail == null) {
                                        var objDecision2 = {
                                            index: i,
                                            name: response.data.descriptionTwo,
                                            id_decision: {
                                                id_decision: response.data.id_decision
                                            },
                                            hasRestriccions: true,
                                            updateDecision: {
                                                idNextStatusTwo: null,
                                                idNextStatusTwoFail: response.data.idNextStatusTwoFail,
                                                idNextStatusTwoSucces: response.data.idNextStatusTwoSucces
                                            },
                                            type: 2
                                        }
                                        vm.decisions.push(objDecision2);
                                        i++;
                                    }
                                }

                                else {
                                    var objDecision2 = {
                                        index: i,
                                        hasRestriccions: false,
                                        name: response.data.descriptionTwo,
                                        id_decision: {
                                            id_decision: response.data.id_decision
                                        },
                                        updateDecision: {
                                            idNextStatusTwo: ""
                                        },
                                        type: 2

                                    }
                                    vm.decisions.push(objDecision2);
                                    i++
                                }


                            }

                            if (!response.data.singleDecision && response.data.idNextStatusThree == null) {


                                console.log(response.data.hasRestriccionsThree);
                                if (response.data.hasRestriccionsThree) {
                                    if (response.data.idNextStatusThreeSucces == null || response.data.idNextStatusThreeFail == null) {
                                        var objDecision3 = {
                                            index: i,
                                            name: response.data.descriptionThree,
                                            id_decision: {
                                                id_decision: response.data.id_decision
                                            },
                                            hasRestriccions: true,
                                            updateDecision: {
                                                idNextStatusThree: null,
                                                idNextStatusThreeSucces: response.data.idNextStatusThreeSucces,
                                                idNextStatusThreeFail: response.data.idNextStatusThreeFail
                                            },
                                            type: 2
                                        }
                                        vm.decisions.push(objDecision3);
                                        i++;
                                    }
                                }

                                else {
                                    var objDecision3 = {
                                        index: i,
                                        hasRestriccions: false,
                                        name: response.data.descriptionThree,
                                        id_decision: {
                                            id_decision: response.data.id_decision
                                        },
                                        updateDecision: {
                                            idNextStatusThree: ""
                                        },
                                        type: 3

                                    }
                                    vm.decisions.push(objDecision3);
                                    i++;
                                }



                            }


                        } else {
                            vm.disableSpanDecision = true;
                            vm.saveDisable = true;
                        }



                    })
                    .catch(function (err) {
                        vm.saveDisable = true;
                        vm.disableSpanDecision = true;
                    })

            }


            vm.cambioEstatus2 = function () {
                vm.SpanEstatusNoSeleccionado2 = false;
                vm.disableSpanDecision2 = false;
                vm.saveDisable = false;
                vm.decisions2 = [];
                var criteria = {
                    status: vm.estatus[vm.estatus_seleccionado2].id_estatus
                }
                Auth.ObtenerDecisiones(criteria)
                    .then(function (response) {
                        var i = 0;
                        if (response.data.idNextStatusOne == null || response.data.idNextStatusTwo == null || response.data.idNextStatusThree == null) {
                            if (response.data.idNextStatusOne == null) {
                                if (response.data.hasRestriccionsOne) {
                                    if (response.data.idNextStatusOneSucces == null || response.data.idNextStatusOneFail == null) {
                                        var objDecision1 = {
                                            index: i,
                                            name: response.data.descriptionOne,
                                            id_decision: {
                                                id_decision: response.data.id_decision
                                            },
                                            hasRestriccions: true,
                                            updateDecision: {
                                                idNextStatusOne: null,
                                                idNextStatusOneSucces: response.data.idNextStatusOneSucces,
                                                idNextStatusOneFail: response.data.idNextStatusOneFail
                                            },
                                            type: 1
                                        }
                                        vm.decisions2.push(objDecision1);
                                        i++;
                                    }
                                } else {
                                    var objDecision1 = {
                                        index: i,
                                        hasRestriccions: false,
                                        name: response.data.descriptionOne,
                                        id_decision: {
                                            id_decision: response.data.id_decision
                                        },
                                        updateDecision: {
                                            idNextStatusOne: ""
                                        },
                                        type: 1
                                    }
                                    vm.decisions2.push(objDecision1);
                                    i++;
                                }
                            }
                            if (response.data.idNextStatusTwo == null) {


                                if (response.data.hasRestriccionsTwo) {
                                    if (response.data.idNextStatusTwoSucces == null || response.data.idNextStatusTwoFail == null) {
                                        var objDecision2 = {
                                            index: i,
                                            name: response.data.descriptionTwo,
                                            id_decision: {
                                                id_decision: response.data.id_decision
                                            },
                                            hasRestriccions: true,
                                            updateDecision: {
                                                idNextStatusTwo: null,
                                                idNextStatusTwoFail: response.data.idNextStatusTwoFail,
                                                idNextStatusTwoSucces: response.data.idNextStatusTwoSucces
                                            },
                                            type: 2
                                        }
                                        vm.decisions2.push(objDecision2);
                                        i++;
                                    }
                                }

                                else {
                                    var objDecision2 = {
                                        index: i,
                                        hasRestriccions: false,
                                        name: response.data.descriptionTwo,
                                        id_decision: {
                                            id_decision: response.data.id_decision
                                        },
                                        updateDecision: {
                                            idNextStatusTwo: ""
                                        },
                                        type: 2

                                    }
                                    vm.decisions2.push(objDecision2);
                                    i++
                                }


                            }

                            if (!response.data.singleDecision && response.data.idNextStatusThree == null) {



                                if (response.data.hasRestriccionsThree) {
                                    if (response.data.idNextStatusThreeSucces == null || response.data.idNextStatusThreeFail == null) {
                                        var objDecision3 = {
                                            index: i,
                                            name: response.data.descriptionThree,
                                            id_decision: {
                                                id_decision: response.data.id_decision
                                            },
                                            hasRestriccions: true,
                                            updateDecision: {
                                                idNextStatusThree: null,
                                                idNextStatusThreeSucces: response.data.idNextStatusThreeSucces,
                                                idNextStatusThreeFail: response.data.idNextStatusThreeFail
                                            },
                                            type: 2
                                        }
                                        vm.decisions2.push(objDecision3);
                                        i++;
                                    }
                                }

                                else {
                                    var objDecision3 = {
                                        index: i,
                                        hasRestriccions: false,
                                        name: response.data.descriptionThree,
                                        id_decision: {
                                            id_decision: response.data.id_decision
                                        },
                                        updateDecision: {
                                            idNextStatusThree: ""
                                        },
                                        type: 3

                                    }
                                    vm.decisions2.push(objDecision3);
                                    i++;
                                }



                            }


                        } else {
                            vm.disableSpanDecision2 = true;
                            vm.saveDisable = true;
                        }



                    })
                    .catch(function (err) {
                        vm.saveDisable = true;
                        vm.disableSpanDecision = true;
                    })

            }


            vm.cambioDecision = function () {
                vm.showSuccesFailOption = false;
                vm.disableSuccesFailDecision = false;
                if (vm.decisions[vm.decision_seleccionada].hasRestriccions) {
                    vm.showSuccesFailOption = true;
                    console.log(vm.decisions[vm.decision_seleccionada]);
                    switch (vm.decisions[vm.decision_seleccionada].type) {
                        case 1:
                            if (vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusOneSucces != null || vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusOneFail != null) {
                                vm.disableSuccesFailDecision = true;
                                if (vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusOneSucces == null)
                                    vm.SuccesFailDecision = true;
                                else
                                    vm.SuccesFailDecision = false;
                            }
                            break;
                        case 2:
                            if (vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusTwoSucces != null || vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusTwoFail != null) {
                                vm.disableSuccesFailDecision = true;
                                if (vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusTwoSucces == null)
                                    vm.SuccesFailDecision = true;
                                else
                                    vm.SuccesFailDecision = false;
                            }
                            break;

                        case 3:
                            if (vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusThreeSucces != null || vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusThreeFail != null) {
                                vm.disableSuccesFailDecision = true;
                                if (vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusThreeSucces == null)
                                    vm.SuccesFailDecision = true;
                                else
                                    vm.SuccesFailDecision = false;
                            }
                            break;
                    }
                }



            }
            vm.cambioDecision2 = function () {
                vm.showSuccesFailOption2 = false;
                vm.disableSuccesFailDecision2 = false;
                if (vm.decisions2[vm.decision_seleccionada2].hasRestriccions) {
                    vm.showSuccesFailOption2 = true;
                    switch (vm.decisions2[vm.decision_seleccionada2].type) {
                        case 1:
                            if (vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusOneSucces != null || vm.decisions2[vm.decision_seleccionada].updateDecision.idNextStatusOneFail != null) {
                                vm.disableSuccesFailDecision = true;
                                if (vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusOneSucces == null)
                                    vm.SuccesFailDecision2 = true;
                                else
                                    vm.SuccesFailDecision2 = false;
                            }
                            break;
                        case 2:
                            if (vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusTwoSucces != null || vm.decisions2[vm.decision_seleccionada].updateDecision.idNextStatusTwoFail != null) {
                                vm.disableSuccesFailDecision = true;
                                if (vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusTwoSucces == null)
                                    vm.SuccesFailDecision2 = true;
                                else
                                    vm.SuccesFailDecision2 = false;
                            }
                            break;

                        case 3:
                            if (vm.decisions2[vm.decision_seleccionada].updateDecision.idNextStatusThreeSucces != null || vm.decisions2[vm.decision_seleccionada].updateDecision.idNextStatusThreeFail != null) {
                                vm.disableSuccesFailDecision = true;
                                if (vm.decisions2[vm.decision_seleccionada].updateDecision.idNextStatusThreeSucces == null)
                                    vm.SuccesFailDecision2 = true;
                                else
                                    vm.SuccesFailDecision2 = false;
                            }
                            break;
                    }
                }

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
                            for (var i = 0; i < resEstatus.data.length; i++) {
                                resEstatus.data[i].index = i;
                            }
                            console.log(resEstatus.data);
                            vm.estatus = resEstatus.data;
                            if (vm.capitulos[vm.capitulo_seleccionado].unique_start) {
                                vm.disablePrimerEstatus = true;
                                vm.disableEstatusFinal = false;
                                vm.primerEstatus = false;
                            } else {
                                vm.disableEstatusFinal = false;
                                vm.disablePrimerEstatus = false;
                            }
                        })
                        .catch(function (err) {
                            vm.disableSpanEstatus = true;
                            vm.disableEstatusFinal = true;

                            vm.disablePrimerEstatus = true;

                            vm.primerEstatus = true;
                            vm.EstatusFinal = false;

                            console.log(err);
                        });
                }
            }


            vm.ok = function () {
                vm.vitUp = parseInt(vm.vitUp);
                vm.agiUp = parseInt(vm.agiUp);
                vm.strUp = parseInt(vm.strUp);
                vm.lckUp = parseInt(vm.lckUp);
                vm.intUp = parseInt(vm.intUp);
                vm.showSpanDecisionDoble = false;
                if (vm.primerEstatus) {

                    if (vm.title != "") {
                        var newEstatus = {
                            title: vm.name,
                            isStart: vm.primerEstatus,
                            isEnd: vm.EstatusFinal,
                            admin: $localStorage.idAdmin,
                            chapter: vm.capitulos[vm.capitulo_seleccionado].id_chapter,
                            vitUp: vm.vitUp,
                            agiUp: vm.agiUp,
                            strUp: vm.strUp,
                            lckUp: vm.lckUp,
                            intUp: vm.intUp
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
                        vm.spanTitle = true;
                    }
                } else {
                    if (vm.dobleDecisionAnterior) {
                        console.log("doble");
                        if (vm.title != "") {
                            var newEstatus = {}
                            if (vm.estatus_seleccionado != null) {
                                if (vm.estatus_seleccionado2 != null) {
                                    if (vm.estatus[vm.estatus_seleccionado].id_estatus == vm.estatus[vm.estatus_seleccionado2].id_estatus) {
                                        vm.showSpanDecisionDoble = true;
                                    } else {
                                        newEstatus = {
                                            title: vm.name,

                                            isStart: vm.primerEstatus,
                                            isEnd: vm.EstatusFinal,
                                            lastStatus: vm.estatus[vm.estatus_seleccionado].id_estatus,
                                            lastStatus2: vm.estatus[vm.estatus_seleccionado2].id_estatus,
                                            admin: $localStorage.idAdmin,
                                            chapter: vm.capitulos[vm.capitulo_seleccionado].id_chapter,
                                            vitUp: vm.vitUp,
                                            agiUp: vm.agiUp,
                                            strUp: vm.strUp,
                                            lckUp: vm.lckUp,
                                            intUp: vm.intUp

                                        };
                                        console.log(newEstatus);
                                        if (vm.decision_seleccionada != null) {
                                            if (vm.decision_seleccionada2 != null) {
                                                Auth.CrearEstatus(newEstatus)
                                                    .then(function (response) {

                                                        switch (vm.decisions[vm.decision_seleccionada].type) {
                                                            case 1:
                                                                if (vm.decisions[vm.decision_seleccionada].hasRestriccions) {
                                                                    if (vm.SuccesFailDecision) {
                                                                        vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusOne = null;
                                                                        vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusOneSucces = response.data.id_estatus
                                                                    } else {
                                                                        vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusOne = null;
                                                                        vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusOneFail = response.data.id_estatus
                                                                    }
                                                                }
                                                                else
                                                                    vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusOne = response.data.id_estatus;
                                                                break;

                                                            case 2:
                                                                if (vm.decisions[vm.decision_seleccionada].hasRestriccions) {
                                                                    if (vm.SuccesFailDecision) {
                                                                        vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusTwo = null;
                                                                        vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusTwoSucces = response.data.id_estatus
                                                                    } else {
                                                                        vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusTwo = null;
                                                                        vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusTwoFail = response.data.id_estatus
                                                                    }
                                                                }
                                                                else
                                                                    vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusTwo = response.data.id_estatus;
                                                                break;

                                                            case 3:
                                                                if (vm.decisions[vm.decision_seleccionada].hasRestriccions) {
                                                                    if (vm.SuccesFailDecision) {
                                                                        vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusThree = null;
                                                                        vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusThreeSucces = response.data.id_estatus
                                                                    } else {
                                                                        vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusThree = null;
                                                                        vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusThreeFail = response.data.id_estatus
                                                                    }
                                                                }
                                                                else
                                                                    vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusThree = response.data.id_estatus;
                                                                break;
                                                        }
                                                        switch (vm.decisions2[vm.decision_seleccionada2].type) {
                                                            case 1:
                                                                if (vm.decisions2[vm.decision_seleccionada2].hasRestriccions) {
                                                                    if (vm.SuccesFailDecision) {
                                                                        vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusOne = null;
                                                                        vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusOneSucces = response.data.id_estatus
                                                                    } else {
                                                                        vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusOne = null;
                                                                        vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusOneFail = response.data.id_estatus
                                                                    }
                                                                }
                                                                else
                                                                    vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusOne = response.data.id_estatus;
                                                                break;

                                                            case 2:
                                                                if (vm.decisions2[vm.decision_seleccionada2].hasRestriccions) {
                                                                    if (vm.SuccesFailDecision) {
                                                                        vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusTwo = null;
                                                                        vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusTwoSucces = response.data.id_estatus
                                                                    } else {
                                                                        vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusTwo = null;
                                                                        vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusTwoFail = response.data.id_estatus
                                                                    }
                                                                }
                                                                else
                                                                    vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusTwo = response.data.id_estatus;
                                                                break;

                                                            case 3:
                                                                if (vm.decisions2[vm.decision_seleccionada2].hasRestriccions) {
                                                                    if (vm.SuccesFailDecision) {
                                                                        vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusThree = null;
                                                                        vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusThreeSucces = response.data.id_estatus
                                                                    } else {
                                                                        vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusThree = null;
                                                                        vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusThreeFail = response.data.id_estatus
                                                                    }
                                                                }
                                                                else
                                                                    vm.decisions2[vm.decision_seleccionada2].updateDecision.idNextStatusThree = response.data.id_estatus;
                                                                break;
                                                        }
                                                        var updateDecisionReq2 = {
                                                            id_decision: vm.decisions2[vm.decision_seleccionada2].id_decision,
                                                            updateDecision: vm.decisions2[vm.decision_seleccionada2].updateDecision
                                                        }
                                                        var updateDecisionReq = {
                                                            id_decision: vm.decisions[vm.decision_seleccionada].id_decision,
                                                            updateDecision: vm.decisions[vm.decision_seleccionada].updateDecision
                                                        }
                                                        Auth.ActualizarDecisiones(updateDecisionReq)
                                                            .then(function (responseUpdate) {
                                                                console.log(responseUpdate);
                                                                Auth.ActualizarDecisiones(updateDecisionReq2)
                                                                    .then(function (responseUpdate) {
                                                                        console.log(responseUpdate);
                                                                        $rootScope.$emit('statusAdded');
                                                                        $uibModalInstance.dismiss('close');
                                                                    })
                                                                    .catch(function (err) {
                                                                    })
                                                            })
                                                            .catch(function (err) {

                                                            })
                                                    })
                                                    .catch(function (err) {
                                                        console.log(err);
                                                    })
                                            } else {
                                                vm.SpanDecisionNoSeleccionado2 = true;
                                            }
                                        } else {
                                            vm.SpanDecisionNoSeleccionado = true;
                                        }
                                    }


                                } else {
                                    vm.SpanEstatusNoSeleccionado2 = true;
                                }
                            } else {
                                vm.SpanEstatusNoSeleccionado = true;
                            }
                        } else {
                            vm.spanTitle = false;
                        }
                    } else {
                        if (vm.title != "") {
                            var newEstatus = {}
                            if (vm.estatus_seleccionado != null) {
                                newEstatus = {
                                    title: vm.name,

                                    isStart: vm.primerEstatus,
                                    isEnd: vm.EstatusFinal,
                                    lastStatus: vm.estatus[vm.estatus_seleccionado].id_estatus,
                                    admin: $localStorage.idAdmin,
                                    chapter: vm.capitulos[vm.capitulo_seleccionado].id_chapter,
                                    vitUp: vm.vitUp,
                                    agiUp: vm.agiUp,
                                    strUp: vm.strUp,
                                    lckUp: vm.lckUp,
                                    intUp: vm.intUp
                                };
                                console.log(newEstatus);
                                if (vm.decision_seleccionada != null) {
                                    Auth.CrearEstatus(newEstatus)
                                        .then(function (response) {

                                            switch (vm.decisions[vm.decision_seleccionada].type) {
                                                case 1:
                                                    console.log(vm.decisions[vm.decision_seleccionada].hasRestriccions);
                                                    if (vm.decisions[vm.decision_seleccionada].hasRestriccions) {
                                                        if (vm.SuccesFailDecision) {
                                                            vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusOne = null;
                                                            vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusOneSucces = response.data.id_estatus
                                                        } else {
                                                            vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusOne = null;
                                                            vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusOneFail = response.data.id_estatus
                                                        }
                                                    }
                                                    else
                                                        vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusOne = response.data.id_estatus;
                                                    break;

                                                case 2:
                                                    console.log(vm.decisions[vm.decision_seleccionada].hasRestriccions);
                                                    if (vm.decisions[vm.decision_seleccionada].hasRestriccions) {
                                                        if (vm.SuccesFailDecision) {
                                                            vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusTwo = null;
                                                            vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusTwoSucces = response.data.id_estatus
                                                        } else {
                                                            vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusTwo = null;
                                                            vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusTwoFail = response.data.id_estatus
                                                        }
                                                    }
                                                    else
                                                        vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusTwo = response.data.id_estatus;
                                                    break;

                                                case 3:
                                                    console.log(vm.decisions[vm.decision_seleccionada].hasRestriccions);
                                                    if (vm.decisions[vm.decision_seleccionada].hasRestriccions) {
                                                        if (vm.SuccesFailDecision) {
                                                            vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusThree = null;
                                                            vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusThreeSucces = response.data.id_estatus
                                                        } else {
                                                            vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusThree = null;
                                                            vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusThreeFail = response.data.id_estatus
                                                        }
                                                    }
                                                    else
                                                        vm.decisions[vm.decision_seleccionada].updateDecision.idNextStatusThree = response.data.id_estatus;
                                                    break;
                                            }


                                            var updateDecisionReq = {
                                                id_decision: vm.decisions[vm.decision_seleccionada].id_decision,
                                                updateDecision: vm.decisions[vm.decision_seleccionada].updateDecision
                                            }
                                            Auth.ActualizarDecisiones(updateDecisionReq)
                                                .then(function (responseUpdate) {
                                                    console.log(responseUpdate);
                                                    $rootScope.$emit('statusAdded');
                                                    $uibModalInstance.dismiss('close');
                                                })
                                                .catch(function (err) {

                                                })
                                        })
                                        .catch(function (err) {
                                            console.log(err);
                                        })
                                } else {
                                    vm.SpanDecisionNoSeleccionado = true;
                                }

                            } else {
                                vm.SpanEstatusNoSeleccionado = true;
                            }
                        } else {
                            vm.spanTitle = false;
                        }

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