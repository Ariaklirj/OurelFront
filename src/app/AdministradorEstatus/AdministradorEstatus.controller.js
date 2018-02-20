'use strict';

angular.module('frontend')
  .controller('AdministradorEstatusController', function (Auth, $scope,$rootScope, $localStorage) {
    var vm = this;
    var criteria = {};
    vm.capitulos;
    vm.estatus_seleccionado;
    vm.status;
   
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

      vm.updateEstatus=function(){
        var objReq={description:vm.statusDescription,id_estatus:vm.estatus[vm.estatus_seleccionado].id_estatus};
        Auth.ActualizarEstatus(objReq)
        .then(function(response){
          console.log(response);
        })
        .catch(function(err){
          console.log(err);
        });
       
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

          })
          .catch(function (err) {
            console.log(err);
          });
      }
    }
    vm.estatus_seleccionado = null;
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

            console.log(err);
          });
      }
    }
    vm.actualizarListaestatus();
    vm.cambioEstatus = function () {
      console.log(vm.estatus[vm.estatus_seleccionado].description);
    }
    $rootScope.$on('statusAdded', function (event, data) {
      vm.actualizarListaestatus();
    });

  });
