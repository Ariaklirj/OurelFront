'use strict';

angular.module('frontend')
  .controller('AdministradorController', function (Auth, $scope) {

    var vm = this;
    vm.capitulos = {};
    var criteria = {};
    vm.capitulo_seleccionado = null;
    Auth.ObtenerCapitulos(criteria)
      .then(function (respuesta) {


        for (var i = 0; i < respuesta.data.length; i++) {
          respuesta.data[i].index = i;
        }
        vm.capitulos = respuesta.data;
        console.log(vm.capitulos);
      })
      .catch(function (err) {
        console, log(err);
      });
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
