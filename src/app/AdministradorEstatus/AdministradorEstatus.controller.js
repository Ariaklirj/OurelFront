'use strict';

angular.module('frontend')
  .controller('AdministradorEstatusController', function (Auth, $scope, $rootScope, $window, $localStorage) {
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
    vm.spanContenido = false;
    vm.spanTypeDecision = false;
    vm.spanPrimera = false;
    vm.spanSegunda = false;
    vm.spanTercera = false;
    vm.decision;
    vm.statusSeleccionadoActual;

    if ($localStorage.permission == undefined) {
      console.log("cambio");
      $location.url('/login');
    }

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



    vm.buttonEdit = function () {
      vm.showEditStatus = true;
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
            vm.UpdateDecision = true;
            for (var i = 0; i < resEstatus.data.length; i++) {
              resEstatus.data[i].index = i;
            }
            console.log(resEstatus.data);
            vm.estatus = resEstatus.data;

          })
          .catch(function (err) {
            vm.errorNoStatus = true;
            console.log(err);
          });
      }
    }


    vm.actualizarListaestatus = function () {
      if (vm.capitulo_seleccionado != null) {
        var dataReqEstatus = {
          chapter: vm.capitulos[vm.capitulo_seleccionado].id_chapter
        };
        Auth.ObtenerEstatus(dataReqEstatus)
          .then(function (resEstatus) {

            for (var i = 0; i < resEstatus.data.length; i++) {
              resEstatus.data[i].index = i;
            }
            console.log(resEstatus.data);
            vm.estatus = resEstatus.data;
          })
          .catch(function (err) {
            vm.errorNoStatus = true;
            console.log(err);
          });
      }
    }


    vm.cambioLimiteTiempo = function () {
      if (!vm.limiteTiempo) {
        vm.limiteTiempo = false;
      }
      else {
        vm.limiteTiempo = true;
      }

    }

    vm.changeTypeDecision = function () {
      if (vm.decisionType == 2) {
        vm.showTrheeOption = true;
      } else {
        vm.showTrheeOption = false;
      }
    }


    vm.cambioEstatus = function () {
      vm.buttonEditDisable = false;
      vm.statusSeleccionadoActual = vm.estatus[vm.estatus_seleccionado]

      if (vm.statusSeleccionadoActual.description) {
        vm.statusDescription = vm.statusSeleccionadoActual.description;
      }
      var criteria = {
        status: vm.statusSeleccionadoActual.id_estatus
      }
      Auth.ObtenerDecisiones(criteria)
        .then(function (response) {
          vm.UpdateDecision = true;
          vm.decision = response.data[0];
          vm.limiteTiempo = vm.decision.limitTime;
          console.log(vm.decision)
          if (vm.decision.singleDecision) {
            vm.decisionType = "1";
            vm.textoPrimeraDecision = vm.decision.descriptionOne;
            vm.textoSegundaDecision = vm.decision.descriptionTwo;

          }
          else {
            vm.showTrheeOption = true;
            vm.decisionType = "2";
            vm.textoPrimeraDecision = vm.decision.descriptionOne;
            vm.textoSegundaDecision = vm.decision.descriptionTwo;
            vm.textoTerceraDecision = vm.decision.descriptionThree;
          }
        })
        .catch(function (err) {
          vm.UpdateDecision = false;
        })
    }
    vm.updateEstatus = function () {
      var canUpdate = true;
      var singleDecisionReq = true;
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
      if (!vm.decisionType) {
        vm.spanTypeDecision = true;
        canUpdate = false;
      } else {
        if (vm.decisionType == "2")
          singleDecisionReq = false;
      }
      if (!vm.textoPrimeraDecision) {
        vm.spanPrimera = true;
        canUpdate = false;
      }
      if (!vm.textoSegundaDecision) {
        vm.spanSegunda = true;
        canUpdate = false;
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
            .then(function (respuesta) {

              var updateDecisionReq = {
                id_decision: {
                  id_decision: vm.decision.id_decision
                },
                updateDecision: {
                  descriptionOne: vm.textoPrimeraDecision,
                  descriptionTwo: vm.textoSegundaDecision,
                  descriptionThree: vm.textoTerceraDecision,
                  singleDecision: singleDecisionReq,
                  limitTime: vm.limiteTiempo
                }
              }
              Auth.ActualizarDecisiones(updateDecisionReq)
                .then(function (respuesta) {
                  alert("Actualizado correctamente");
                  $window.location.reload();
                })
                .catch(function (err) {
                  alert("Error llama al dministrador");
                  $window.location.reload();
                })

            })
            .catch(function (err) {

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
            .then(function (respuesta) {

              var createDecisionReq = {
                descriptionOne: vm.textoPrimeraDecision,
                descriptionTwo: vm.textoSegundaDecision,
                descriptionThree: vm.textoTerceraDecision,
                singleDecision: singleDecisionReq,
                limitTime: vm.limiteTiempo,
                status: vm.statusSeleccionadoActual.id_estatus,
                chapter: vm.capitulos[vm.capitulo_seleccionado].id_chapter,
                admin: $localStorage.idAdmin
              }
              Auth.CrearDecision(createDecisionReq)
                .then(function (respuesta) {
                  alert("Actualizado correctamente");
                  $window.location.reload();
                })
                .catch(function (err) {
                  alert("Error llama al dministrador");
                  $window.location.reload();
                })

            })
            .catch(function (err) {

            })
        }


      }
    }
    $rootScope.$on('statusAdded', function (event, data) {
      vm.actualizarListaestatus();
    });

  });
