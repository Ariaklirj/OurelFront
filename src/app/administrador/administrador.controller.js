'use strict';

angular.module('frontend')
  .controller('AdministradorController', function (Auth,  $rootScope,$scope,$localStorage) {

    var vm = this;
    if($localStorage.permission==undefined) {
      console.log("cambio");
      $location.url('/login');
    }
    $rootScope.$on('chapterAdded', function(event, data) { 
      vm.actualizarListaCapitulos();
    });
    vm.capitulos = {};
    var criteria = {};
    vm.capitulo_seleccionado = null;
    vm.actualizarListaCapitulos=function(){
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
    }
    vm.actualizarListaCapitulos();
    // $scope.hasPerm = Auth.hasPerm;
    vm.actualizar = function () {
      if ( vm.capitulo_seleccionado != null) {
        var putReq={
          id:vm.capitulos[vm.capitulo_seleccionado].id_chapter,
          status:true
        }
        console.log(putReq);
        console.log(vm.capitulo_seleccionado);
        Auth.LiberarCapitulo(putReq)
        .then(function(res){
          console.log(res);
        })
        .catch(function(err){
          console.log(err);
        });
      }
      else {

      }
    }




  });
