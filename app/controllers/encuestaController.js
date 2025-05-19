angular.module('encuestaMusicalApp')
.controller('EncuestaController', function(EncuestaService) {
    var vm = this;
    
    vm.nuevaEncuesta = {
        correo: '',
        estiloMusical: ''
    };
    
    vm.encuestas = [];
    vm.cargando = false;
    vm.mensaje = '';
    
    // Cargar encuestas al iniciar
    cargarEncuestas();
    
    vm.guardarEncuesta = function() {
        if (!vm.nuevaEncuesta.correo || !vm.nuevaEncuesta.estiloMusical) {
            vm.mensaje = 'Por favor complete todos los campos';
            return;
        }
        
        vm.cargando = true;
        vm.mensaje = '';
        
        EncuestaService.guardarEncuesta(vm.nuevaEncuesta)
            .then(function() {
                vm.mensaje = 'Encuesta guardada correctamente';
                vm.nuevaEncuesta = {
                    correo: '',
                    estiloMusical: ''
                };
                cargarEncuestas();
            })
            .catch(function(error) {
                vm.mensaje = 'Error al guardar la encuesta: ' + (error.data || error.statusText);
            })
            .finally(function() {
                vm.cargando = false;
            });
    };
    
    function cargarEncuestas() {
        EncuestaService.obtenerEncuestas()
            .then(function(data) {
                vm.encuestas = data;
            })
            .catch(function(error) {
                console.error('Error:', error);
                vm.mensaje = 'Error al cargar encuestas';
            });
    }
});