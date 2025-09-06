document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.getElementById('carrito-container');
    const carritoVacioMsg = document.getElementById('carrito-vacio');
    const resumenCompra = document.getElementById('resumen-compra');
    const subtotalPrecio = document.getElementById('subtotal-precio');
    const totalPrecio = document.getElementById('total-precio');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function renderizarCarrito() {
        carritoContainer.innerHTML = ''; // Limpiar el contenedor

        if (carrito.length === 0) {
            carritoVacioMsg.classList.remove('d-none');
            resumenCompra.classList.add('d-none');
        } else {
            carritoVacioMsg.classList.add('d-none');
            resumenCompra.classList.remove('d-none');
            
            carrito.forEach(producto => {
                const itemHTML = `
                    <div class="card mb-3 item-carrito">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <img src="${producto.imagen}" class="img-fluid rounded" alt="${producto.nombre}">
                                <div class="flex-grow-1 ms-3">
                                    <h5 class="card-title">${producto.nombre}</h5>
                                    <p class="card-text text-muted">Clave de activación digital</p>
                                </div>
                                <div class="text-end">
                                    <p class="fs-5 fw-bold mb-1">S/ ${producto.precio.toFixed(2)}</p>
                                    <button class="btn btn-sm btn-outline-danger btn-remover" data-id="${producto.id}">
                                        <i class="bi bi-trash-fill"></i> Quitar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                carritoContainer.innerHTML += itemHTML;
            });
        }
        actualizarTotales();
        agregarEventosRemover();
    }

    function actualizarTotales() {
        const subtotal = carrito.reduce((acc, producto) => acc + producto.precio, 0);
        subtotalPrecio.textContent = `S/ ${subtotal.toFixed(2)}`;
        totalPrecio.textContent = `S/ ${subtotal.toFixed(2)}`; // Asumiendo que no hay otros costos
    }

    function agregarEventosRemover() {
        const botonesRemover = document.querySelectorAll('.btn-remover');
        botonesRemover.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const productoId = e.currentTarget.getAttribute('data-id');
                // Filtrar el carrito para remover el producto
                carrito = carrito.filter(producto => producto.id !== productoId);
                // Actualizar localStorage
                localStorage.setItem('carrito', JSON.stringify(carrito));
                // Volver a renderizar
                renderizarCarrito();
            });
        });
    }

    renderizarCarrito();
});