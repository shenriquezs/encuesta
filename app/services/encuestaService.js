angular.module('encuestaMusicalApp')
.service('EncuestaService', function($http) {
    var apiUrl = 'http://localhost:8085';
    
    this.guardarEncuesta = function(encuesta) { console.log(encuesta);
        return $http.post(apiUrl + '/saveEncuesta', encuesta)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.error('Error al guardar encuesta:', error);
                throw error;
            });
    };
    
    this.obtenerEncuestas = function() {
        return $http.get(apiUrl + '/findAllEncuesta')
            .then(function(response) { console.log(response.data);
                return response.data;
            })
            .catch(function(error) {
                console.error('Error al obtener encuestas:', error);
                throw error;
            });
    };
});