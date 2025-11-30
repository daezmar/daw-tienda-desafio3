app.controller('ProductosCategoriaController', function($scope, $http) {
    $scope.productosPorCategoria = [];
    $scope.productosPorCategoriaBusqueda = [];
    $scope.categoriaSeleccionada = null;

    $scope.$on("categoriaSeleccionada", function(event, categoria){
        $scope.categoriaSeleccionada = categoria;
        if ($scope.$parent) { $scope.$parent.categoriaSeleccionada = categoria; }

        $http.get("https://fakestoreapi.com/products/category/" + categoria)
            .then(function(response){
                $scope.productosPorCategoria = response.data || [];
                $scope.productosPorCategoriaBusqueda = $scope.productosPorCategoria.map(function(p){ return { id: p.id, text: ((p.title || '') + ' ' + (p.description || '') + ' ' + (p.category || '')).toLowerCase() }; });
            })
            .catch(function(error){ console.error('Error cargando productos por categoría:', error); });
    });

    $scope.cargarCategoria = function(categoria) {
        $scope.$emit('categoriaSeleccionada', categoria);
        if ($scope.$parent) { $scope.$parent.categoriaSeleccionada = categoria; }
    };
});
