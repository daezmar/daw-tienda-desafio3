app.controller('CategoriasController', function($scope, $http, $rootScope) {
    $scope.categorias = [];
    $scope.categoriasMeta = [];

    $http.get("https://fakestoreapi.com/products/categories")
        .then(function(response){
            $scope.categorias = response.data || [];
            $scope.categoriasMeta = $scope.categorias.map(function(c){ return { name: c, slug: (c||'').toLowerCase() }; });
        })
        .catch(function(error){ console.error("Error cargando categorías:", error); });

    $scope.seleccionarCategoria = function(categoria){
        if ($scope.$parent) { $scope.$parent.categoriaSeleccionada = categoria; }
        $rootScope.$broadcast("categoriaSeleccionada", categoria);
    };
});
