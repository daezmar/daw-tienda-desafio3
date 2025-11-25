var app = angular.module('TiendaApp', []);

app.controller('ProductosCtrl', function ($scope, $http) {

    $scope.productos = []; 

    $http.get("https://fakestoreapi.com/products")
        .then(function (response) {
            $scope.productos = response.data;
        })
        .catch(function (error) {
            console.error("Error al cargar los productos", error);
        });

});
