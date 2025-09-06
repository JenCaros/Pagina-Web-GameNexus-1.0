document.addEventListener('DOMContentLoaded', () => {
    // Verifica si estamos en la página del carrito para ejecutar el código correspondiente
    if (document.getElementById('carrito-container')) {
        cargarCarrito();
    }

    // Código para la página principal (index.html)
    const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');
    if (botonesAgregar.length > 0) {
        const agregadoAlCarritoModal = new bootstrap.Modal(document.getElementById('agregadoAlCarritoModal'));
        const modalImagen = document.getElementById('modal-producto-imagen');
        const modalNombre = document.getElementById('modal-producto-nombre');
        const modalPrecio = document.getElementById('modal-producto-precio');

        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                e.preventDefault();

                const producto = {
                    id: e.currentTarget.getAttribute('data-id'),
                    nombre: e.currentTarget.getAttribute('data-nombre'),
                    precio: parseFloat(e.currentTarget.getAttribute('data-precio')),
                    imagen: e.currentTarget.getAttribute('data-imagen')
                };

                // Añadir producto al localStorage
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const yaExiste = carrito.some(item => item.id === producto.id);

                if (!yaExiste) {
                    carrito.push(producto);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                }

                // Actualizar el contenido del modal
                modalImagen.src = producto.imagen;
                modalNombre.textContent = producto.nombre;
                modalPrecio.textContent = `S/ ${producto.precio.toFixed(2)}`;

                // Mostrar el modal
                agregadoAlCarritoModal.show();
            });
        });
    }
});


// Función para la página carrito.html
function cargarCarrito() {
    const carritoContainer = document.getElementById('carrito-container');
    const carritoVacioMsg = document.getElementById('carrito-vacio');
    const resumenCompra = document.getElementById('resumen-compra');
    const subtotalPrecio = document.getElementById('subtotal-precio');
    const totalPrecio = document.getElementById('total-precio');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function renderizarCarrito() {
        carritoContainer.innerHTML = '';

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
        totalPrecio.textContent = `S/ ${subtotal.toFixed(2)}`;
    }

    function agregarEventosRemover() {
        const botonesRemover = document.querySelectorAll('.btn-remover');
        botonesRemover.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const productoId = e.currentTarget.getAttribute('data-id');
                carrito = carrito.filter(producto => producto.id !== productoId);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                renderizarCarrito();
            });
        });
    }

    renderizarCarrito();
}