const carrito = {}; // Objeto para agrupar productos por nombre
let total = 0;

const listaCarrito = document.getElementById('lista-carrito');
const totalElemento = document.getElementById('total');
const vaciarBtn = document.getElementById('vaciar-carrito');
const finalizarBtn = document.getElementById('finalizar-compra');

document.querySelectorAll('.carrito-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const producto = this.closest('.producto');
        const nombre = producto.getAttribute('data-nombre');
        const precio = parseFloat(producto.getAttribute('data-precio'));

        if (carrito[nombre]) {
            carrito[nombre].cantidad += 1;
        } else {
            carrito[nombre] = {
                precio: precio,
                cantidad: 1
            };
        }

        total += precio;
        actualizarCarrito();
    });
});

document.querySelectorAll('.comprar-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const producto = this.closest('.producto');
        const nombre = producto.getAttribute('data-nombre');
        const precio = parseFloat(producto.getAttribute('data-precio'));

        alert(`Compraste ${nombre} por $${precio.toFixed(2)}.`);
    });
});

vaciarBtn.addEventListener('click', function () {
    for (let key in carrito) {
        delete carrito[key];
    }
    total = 0;
    actualizarCarrito();
});

finalizarBtn.addEventListener('click', function () {
    if (Object.keys(carrito).length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let mensaje = "Resumen de tu compra:\n";
    for (let nombre in carrito) {
        const item = carrito[nombre];
        mensaje += `${nombre} x ${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}\n`;
    }
    mensaje += `\nTotal: $${total.toFixed(2)}`;
    alert(mensaje);

    // Limpia el carrito después de finalizar
    for (let key in carrito) {
        delete carrito[key];
    }
    total = 0;
    actualizarCarrito();
});

function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    for (let nombre in carrito) {
        const item = carrito[nombre];
        const li = document.createElement('li');
        li.textContent = `${nombre} x ${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;
        listaCarrito.appendChild(li);
    }
    totalElemento.textContent = total.toFixed(2);
}

/* OCULTAR LOADER */
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.transition = "opacity 0.5s ease";
        setTimeout(() => loader.style.display = "none", 500);
    }, 3000);
});