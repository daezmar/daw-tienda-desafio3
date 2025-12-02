angular.module('TiendaApp').controller('MainController', ['$scope', function($scope) {
    
    const cargarCarritoDeCompras = () => {
        const carritoGuardadoCorrectamente = localStorage.getItem("carrito");
        if (carritoGuardadoCorrectamente) {
            try {
                $scope.carrito = JSON.parse(carritoGuardadoCorrectamente);
            } catch (error) {
                console.error("Error al obtener el carrito", error);
                $scope.carrito = [];
            }
        } else {
            $scope.carrito = [];
        }
        $scope.calcularTotal(); 
    };

    const guardarCarrito = () => {
        localStorage.setItem("carrito", JSON.stringify($scope.carrito));
        $scope.calcularTotal();
    };

    cargarCarritoDeCompras();

    $scope.totalGeneralDisplay = '0.00';
    $scope.productoSeleccionado = null; 
    $scope.categoriaSeleccionada = null;
    
    $scope.calcularTotal = () => {
        const total = $scope.carrito.reduce((sum, item) => sum + (parseFloat(item.price) * parseInt(item.quantity)), 0);
        $scope.totalGeneralDisplay = total.toFixed(2);
    };


    $scope.agregarProductoAlCarrito = (producto, cantidad = 1) => {
        const itemExistente = $scope.carrito.find(item => item.id === producto.id);

        if (itemExistente) {
            itemExistente.quantity += cantidad;
        } else {
            $scope.carrito.push({
                id: producto.id,
                title: producto.title,
                price: parseFloat(producto.price), 
                image: producto.image,
                quantity: cantidad
            });
        }
        
        guardarCarrito();
    };

    $scope.calcularSubtotal = (item) => {
        return (item.price * item.quantity).toFixed(2);
    };
    
    $scope.incrementarCantidad = (item) => {
        item.quantity++;
        guardarCarrito();
    };

    $scope.decrementarCantidad = (item) => {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            $scope.carrito = $scope.carrito.filter(i => i.id !== item.id);
        }
        guardarCarrito();
    };
    
    $scope.eliminarItem = (item) => {
        $scope.carrito = $scope.carrito.filter(i => i.id !== item.id);
        guardarCarrito();
    };
    
    $scope.verDetalles = (producto) => {
        $scope.productoSeleccionado = producto;
    };


    $scope.RealizarPago = () => {
        if ($scope.carrito.length === 0) {
            alert("El carrito está vacío.");
            return;
        }
        
        alert("Pago exitoso.");

        $scope.carrito = [];
        localStorage.removeItem("carrito"); 
        $scope.calcularTotal(); 

        const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
        carritoModal.hide();
    };
    
}]);