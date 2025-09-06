document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.getElementById('carrito-container');
    const carritoVacioMsg = document.getElementById('carrito-vacio');
    const resumenContainer = document.getElementById('resumen-compra-container');
    const subtotalPrecioEl = document.getElementById('subtotal-precio');
    const totalPrecioEl = document.getElementById('total-precio');
    const contadorCarritoEl = document.getElementById('carrito-contador');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function renderizarCarrito() {
        // Limpiar el contenedor antes de renderizar
        carritoContainer.innerHTML = '';
        actualizarContador();

        if (carrito.length === 0) {
            carritoVacioMsg.classList.remove('d-none');
            resumenContainer.classList.add('d-none');
        } else {
            carritoVacioMsg.classList.add('d-none');
            resumenContainer.classList.remove('d-none');
            
            carrito.forEach(producto => {
                const productoHTML = `
                    <div class="card item-carrito mb-3">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <img src="${producto.imagen}" class="img-fluid rounded" alt="${producto.nombre}">
                                <div class="ms-3 flex-grow-1">
                                    <h5 class="card-title mb-1">${producto.nombre}</h5>
                                    <p class="card-text text-muted small">Clave de activación digital</p>
                                </div>
                                <div class="text-end ms-3">
                                    <p class="fs-5 fw-bold mb-2">S/ ${producto.precio.toFixed(2)}</p>
                                    <button class="btn btn-sm btn-outline-danger btn-quitar" data-id="${producto.id}">
                                        <i class="bi bi-trash-fill"></i> Quitar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                carritoContainer.insertAdjacentHTML('beforeend', productoHTML);
            });
        }
        actualizarTotales();
        agregarEventosBotones();
    }

    function actualizarTotales() {
        const subtotal = carrito.reduce((total, producto) => total + producto.precio, 0);
        subtotalPrecioEl.textContent = `S/ ${subtotal.toFixed(2)}`;
        totalPrecioEl.textContent = `S/ ${subtotal.toFixed(2)}`;
    }

    function agregarEventosBotones() {
        const botonesQuitar = document.querySelectorAll('.btn-quitar');
        botonesQuitar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const idProducto = e.currentTarget.dataset.id;
                quitarDelCarrito(idProducto);
            });
        });
    }

    function quitarDelCarrito(id) {
        carrito = carrito.filter(producto => producto.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito(); // Volver a dibujar todo el carrito
    }

    function actualizarContador() {
        if (contadorCarritoEl) {
            const totalItems = carrito.length;
            if (totalItems > 0) {
                contadorCarritoEl.textContent = totalItems;
                contadorCarritoEl.classList.remove('d-none');
            } else {
                contadorCarritoEl.classList.add('d-none');
            }
        }
    }

    renderizarCarrito();
});
