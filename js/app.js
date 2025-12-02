var app = angular.module('TiendaApp', []);

app.controller('MainController', function($scope) {
    $scope.categoriaSeleccionada = null;
    $scope.busquedaTexto = '';
});

app.controller('ProductosCtrl', function ($scope, $http) {
    $scope.productos = [];
    $scope.productosBusqueda = [];

    $http.get("https://fakestoreapi.com/products")
        .then(function (response) {
            $scope.productos = response.data || [];
            $scope.productosBusqueda = $scope.productos.map(function(p) {
                return {
                    id: p.id,
                    text: ((p.title || '') + ' ' + (p.description || '') + ' ' + (p.category || '')).toLowerCase()
                };
            });
        })
        .catch(function (error) {
            console.error("Error al cargar los productos", error);
        });
});