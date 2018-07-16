'use strict';

angular.module('frontend')
    .controller('AdministradorEstatusController', function(Auth, $scope, $rootScope, $window, $localStorage) {
        var vm = this;
        var criteria = {};
        vm.capitulos;
        vm.estatus_seleccionado;
        vm.status;
        vm.statusDescription
        vm.showEditStatus = false;
        vm.buttonEditDisable = true;
        vm.errorNoStatus = false;
        vm.estatus_seleccionado = null;
        vm.decisionType = "";
        vm.limiteTiempo = false;
        vm.disableDecisionType = false;
        vm.textoPrimeraDecision = "";
        vm.textoSegundaDecision = "";
        vm.textoTerceraDecision = "";
        vm.UpdateDecision = false;
        vm.showTrheeOption = false;
        vm.showSecondOption = true;
        vm.spanContenido = false;
        vm.spanTypeDecision = false;
        vm.spanPrimera = false;
        vm.spanSegunda = false;
        vm.spanTercera = false;
        vm.finalStatus = false;
        vm.decision;
        vm.vitOneNeeded = 0;
        vm.strOneNeeded = 0;
        vm.agiOneNeeded = 0;
        vm.intOneNeeded = 0;
        vm.lckOneNeeded = 0;
        vm.vitTwoNeeded = 0;
        vm.strTwoNeeded = 0;
        vm.agiTwoNeeded = 0;
        vm.intTwoNeeded = 0;
        vm.lckTwoNeeded = 0;
        vm.vitThreeNeeded = 0;
        vm.strThreeNeeded = 0;
        vm.agiThreeNeeded = 0;
        vm.intThreeNeeded = 0;
        vm.lckThreeNeeded = 0;
        vm.hasRestriccionsOne = false;
        vm.hasRestriccionsTwo = false;
        vm.hasRestriccionsThree = false;
        vm.statusSeleccionadoActual;

        if ($localStorage.permission == undefined) {
            console.log("cambio");
            $location.url('/login');
        }

        Auth.ObtenerCapitulos(criteria)
            .then(function(respuesta) {


                for (var i = 0; i < respuesta.data.length; i++) {
                    respuesta.data[i].index = i;
                }
                vm.capitulos = respuesta.data;
                console.log(vm.capitulos);
            })
            .catch(function(err) {
                console.log(err);
            });



        vm.buttonEdit = function() {
            vm.showEditStatus = true;
        }

        vm.cambioCapitulo = function() {
            if (vm.capitulo_seleccionado != null) {
                vm.disableSpanEstatus = false;
                console.log(vm.capitulo_seleccionado);
                vm.disableEstatusSelect = false;
                var dataReqEstatus = {
                    chapter: vm.capitulos[vm.capitulo_seleccionado].id_chapter
                };
                console.log(dataReqEstatus);
                Auth.ObtenerEstatus(dataReqEstatus)
                    .then(function(resEstatus) {
                        vm.UpdateDecision = true;
                        for (var i = 0; i < resEstatus.data.length; i++) {
                            resEstatus.data[i].index = i;
                        }
                        console.log(resEstatus.data);
                        vm.estatus = resEstatus.data;

                    })
                    .catch(function(err) {
                        vm.errorNoStatus = true;
                        console.log(err);
                    });
            }
        }


        vm.actualizarListaestatus = function() {
            if (vm.capitulo_seleccionado != null) {
                var dataReqEstatus = {
                    chapter: vm.capitulos[vm.capitulo_seleccionado].id_chapter
                };
                Auth.ObtenerEstatus(dataReqEstatus)
                    .then(function(resEstatus) {

                        for (var i = 0; i < resEstatus.data.length; i++) {
                            resEstatus.data[i].index = i;
                        }
                        console.log(resEstatus.data);
                        vm.estatus = resEstatus.data;
                    })
                    .catch(function(err) {
                        vm.errorNoStatus = true;
                        console.log(err);
                    });
            }
        }


        vm.cambioLimiteTiempo = function() {
            if (!vm.limiteTiempo) {
                vm.limiteTiempo = false;
            }
            else {
                vm.limiteTiempo = true;
            }

        }

        vm.changeTypeDecision = function() {
            if (vm.decisionType == 3) {
                vm.showSecondOption = false;
            }
            else {
                vm.showSecondOption = true;
            }
            if (vm.decisionType == 2) {
                vm.showTrheeOption = true;
            } else {
                vm.showTrheeOption = false;
            }
        }


        vm.cambioEstatus = function() {
            vm.textoPrimeraDecision = null;
            vm.textoSegundaDecision = null;
            vm.textoTerceraDecision = null;
            vm.buttonEditDisable = false;
            vm.statusSeleccionadoActual = vm.estatus[vm.estatus_seleccionado]
            vm.finalStatus = vm.statusSeleccionadoActual.isEnd;
            if (vm.statusSeleccionadoActual.description) {
                vm.statusDescription = vm.statusSeleccionadoActual.description;
            }
            else
                vm.statusDescription = null;
            var criteria = {
                status: vm.statusSeleccionadoActual.id_estatus
            }
            Auth.ObtenerDecisiones(criteria)
                .then(function(response) {
                    vm.UpdateDecision = true;
                    vm.decision = response.data;
                    vm.limiteTiempo = vm.decision.limitTime;


                    vm.vitOneNeeded = parseInt(vm.decision.vitOneNeeded);
                    vm.strOneNeeded = parseInt (vm.decision.strOneNeeded);
                    vm.agiOneNeeded = parseInt (vm.decision.agiOneNeeded);
                    vm.intOneNeeded = parseInt (vm.decision.intOneNeeded);
                    vm.lckOneNeeded = parseInt (vm.decision.lckOneNeeded);
                    vm.vitTwoNeeded = parseInt (vm.decision.vitTwoNeeded);
                    vm.strTwoNeeded = parseInt (vm.decision.strTwoNeeded);
                    vm.agiTwoNeeded = parseInt (vm.decision.agiTwoNeeded);
                    vm.intTwoNeeded = parseInt (vm.decision.intTwoNeeded);
                    vm.lckTwoNeeded = parseInt (vm.decision.lckTwoNeeded);
                    vm.vitThreeNeeded = parseInt (vm.decision.vitThreeNeeded);
                    vm.strThreeNeeded = parseInt (vm.decision.strThreeNeeded);
                    vm.agiThreeNeeded = parseInt (vm.decision.agiThreeNeeded);
                    vm.intThreeNeeded = parseInt (vm.decision.intThreeNeeded);
                    vm.lckThreeNeeded = parseInt (vm.decision.lckThreeNeeded);
                    vm.hasRestriccionsOne = vm.decision.hasRestriccionsOne;
                    vm.hasRestriccionsTwo = vm.decision.hasRestriccionsTwo;
                    vm.hasRestriccionsThree = vm.decision.hasRestriccionsThree;

                    console.log(vm.decision)
                    if (vm.decision.uniqDecisionReq) {
                        vm.decisionType = "3";
                        vm.showSecondOption = false;
                        vm.showTrheeOption = false;
                        vm.textoPrimeraDecision = vm.decision.descriptionOne;
                    }
                    else if (vm.decision.singleDecision) {
                        vm.decisionType = "1";
                        vm.textoPrimeraDecision = vm.decision.descriptionOne;
                        vm.textoSegundaDecision = vm.decision.descriptionTwo;
                        vm.showSecondOption = true;
                        vm.showTrheeOption = false;
                    }
                    else {
                        vm.showTrheeOption = true;
                        vm.decisionType = "2";
                        vm.showSecondOption = true;
                        vm.showTrheeOption = true;
                        vm.textoPrimeraDecision = vm.decision.descriptionOne;
                        vm.textoSegundaDecision = vm.decision.descriptionTwo;
                        vm.textoTerceraDecision = vm.decision.descriptionThree;
                    }
                })
                .catch(function(err) {
                    vm.UpdateDecision = false;
                })
        }
        vm.updateEstatus = function() {
            var canUpdate = true;
            var singleDecisionReq = true;
            var uniqDecisionReq = true;
            vm.spanContenido = false;
            vm.spanTypeDecision = false
            vm.spanPrimera = false;
            vm.spanSegunda = false;
            vm.spanTercera = false;
            console.log(vm.decisionType)
            if (!vm.statusDescription) {
                vm.spanContenido = true;
                canUpdate = false;
            }
            if (vm.finalStatus) {
                if (canUpdate) {
                    var updateEstatusReq = {
                        description: vm.statusDescription,
                        id_estatus: vm.statusSeleccionadoActual.id_estatus,
                        decisionsAtached: true
                    }
                    console.log(updateEstatusReq);
                    Auth.ActualizarEstatus(updateEstatusReq)
                        .then(function(respuesta) {
                            alert("Actualizado correctamente");
                            $window.location.reload();
                        })
                        .catch(function(err) {
                            alert("Error llama al dministrador");
                            $window.location.reload();
                        })
                }
            }
            else {
                if (!vm.decisionType) {
                    vm.spanTypeDecision = true;
                    canUpdate = false;
                } else {
                    if (vm.decisionType == "2" || vm.decisionType == "3") {
                        singleDecisionReq = false;
                        uniqDecisionReq = false;
                    }
                    if (vm.decisionType == "3")
                        uniqDecisionReq = true;
                }
                if (!vm.textoPrimeraDecision) {
                    vm.spanPrimera = true;
                    canUpdate = false;
                }
                if (vm.decisionType != "3") {
                    if (!vm.textoSegundaDecision) {
                        vm.spanSegunda = true;
                        canUpdate = false;
                    }
                }

                if (!vm.textoTerceraDecision && vm.decisionType == "2") {
                    vm.spanTercera = true;
                    canUpdate = false;
                }
                if (vm.decisionType == "1") {
                    vm.textoTerceraDecision = null;
                }
                if (vm.UpdateDecision) {
                    if (canUpdate) {
                        var updateEstatusReq = {
                            description: vm.statusDescription,
                            id_estatus: vm.statusSeleccionadoActual.id_estatus,
                            decisionsAtached: true
                        }
                        console.log(updateEstatusReq);
                        Auth.ActualizarEstatus(updateEstatusReq)
                            .then(function(respuesta) {

                                var updateDecisionReq = {
                                    id_decision: {
                                        id_decision: vm.decision.id_decision
                                    },
                                    updateDecision: {
                                        descriptionOne: vm.textoPrimeraDecision,
                                        descriptionTwo: vm.textoSegundaDecision,
                                        descriptionThree: vm.textoTerceraDecision,
                                        singleDecision: singleDecisionReq,
                                        uniqDecision: uniqDecisionReq,
                                        limitTime: vm.limiteTiempo,
                                        vitOneNeeded: vm.vitOneNeeded,
                                        strOneNeeded: vm.strOneNeeded,
                                        agiOneNeeded: vm.agiOneNeeded,
                                        intOneNeeded: vm.intOneNeeded,
                                        lckOneNeeded: vm.lckOneNeeded,
                                        vitTwoNeeded: vm.vitTwoNeeded,
                                        strTwoNeeded: vm.strTwoNeeded,
                                        agiTwoNeeded: vm.agiTwoNeeded,
                                        intTwoNeeded: vm.intTwoNeeded,
                                        lckTwoNeeded: vm.lckTwoNeeded,
                                        vitThreeNeeded: vm.vitThreeNeeded,
                                        strThreeNeeded: vm.strThreeNeeded,
                                        agiThreeNeeded: vm.agiThreeNeeded,
                                        intThreeNeeded: vm.intThreeNeeded,
                                        lckThreeNeeded: vm.lckThreeNeeded,
                                    }
                                }
                                Auth.ActualizarDecisiones(updateDecisionReq)
                                    .then(function(respuesta) {
                                        alert("Actualizado correctamente");
                                        $window.location.reload();
                                    })
                                    .catch(function(err) {
                                        alert("Error llama al dministrador");
                                        $window.location.reload();
                                    })

                            })
                            .catch(function(err) {

                            })
                    }

                } else {

                    if (canUpdate) {
                        var updateEstatusReq = {
                            description: vm.statusDescription,
                            id_estatus: vm.statusSeleccionadoActual.id_estatus,
                            decisionsAtached: true
                        }
                        console.log(updateEstatusReq);
                        Auth.ActualizarEstatus(updateEstatusReq)
                            .then(function(respuesta) {

                                var createDecisionReq = {
                                    descriptionOne: vm.textoPrimeraDecision,
                                    descriptionTwo: vm.textoSegundaDecision,
                                    descriptionThree: vm.textoTerceraDecision,
                                    singleDecision: singleDecisionReq,
                                    uniqDecision: uniqDecisionReq,
                                    limitTime: vm.limiteTiempo,
                                    status: vm.statusSeleccionadoActual.id_estatus,
                                    chapter: vm.capitulos[vm.capitulo_seleccionado].id_chapter,
                                    admin: $localStorage.idAdmin,
                                    vitOneNeeded: vm.vitOneNeeded,
                                    strOneNeeded: vm.strOneNeeded,
                                    agiOneNeeded: vm.agiOneNeeded,
                                    intOneNeeded: vm.intOneNeeded,
                                    lckOneNeeded: vm.lckOneNeeded,
                                    vitTwoNeeded: vm.vitTwoNeeded,
                                    strTwoNeeded: vm.strTwoNeeded,
                                    agiTwoNeeded: vm.agiTwoNeeded,
                                    intTwoNeeded: vm.intTwoNeeded,
                                    lckTwoNeeded: vm.lckTwoNeeded,
                                    vitThreeNeeded: vm.vitThreeNeeded,
                                    strThreeNeeded: vm.strThreeNeeded,
                                    agiThreeNeeded: vm.agiThreeNeeded,
                                    intThreeNeeded: vm.intThreeNeeded,
                                    lckThreeNeeded: vm.lckThreeNeeded,
                                    hasRestriccionsOne: vm.hasRestriccionsOne,
                                    hasRestriccionsTwo: vm.hasRestriccionsTwo,
                                    hasRestriccionsThree: vm.hasRestriccionsThree
                                }
                                Auth.CrearDecision(createDecisionReq)
                                    .then(function(respuesta) {
                                        alert("Actualizado correctamente");
                                        $window.location.reload();
                                    })
                                    .catch(function(err) {
                                        alert("Error llama al dministrador");
                                        $window.location.reload();
                                    })

                            })
                            .catch(function(err) {

                            })
                    }


                }

            }
        }
        $rootScope.$on('statusAdded', function(event, data) {
            vm.actualizarListaestatus();
        });

    });
