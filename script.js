// script.js

const carritoIcono = document.getElementById('icono-carrito');
const menuCarrito = document.getElementById('menu-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
const finalizarCompraBtn = document.getElementById('finalizar-compra');

let carrito = {};

// Mostrar/ocultar menú carrito
carritoIcono.addEventListener('click', () => {
  menuCarrito.classList.toggle('oculto');
});

// Cerrar carrito con botón
cerrarCarritoBtn.addEventListener('click', () => {
  menuCarrito.classList.add('oculto');
});

// Función para agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
  if (carrito[nombre]) {
    carrito[nombre].cantidad++;
  } else {
    carrito[nombre] = { precio, cantidad: 1 };
  }
  actualizarCarrito();
}

// Actualizar la lista y total en el carrito
function actualizarCarrito() {
  listaCarrito.innerHTML = '';

  let total = 0;
  for (const producto in carrito) {
    const item = carrito[producto];
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const li = document.createElement('li');
    li.textContent = `${producto} x${item.cantidad} : $${subtotal}`;
    listaCarrito.appendChild(li);
  }
  totalCarrito.textContent = `Total: $${total}`;
}

// Función para compra instantánea
function ventaInstantanea(nombre, precio) {
  alert(`Has comprado instantáneamente: ${nombre} por $${precio}`);
  // Aquí podrías agregar más lógica para procesar la venta instantánea en un backend o similar
}

// Botón finalizar compra
finalizarCompraBtn.addEventListener('click', () => {
  if (Object.keys(carrito).length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  alert('Compra finalizada con éxito.\nGracias por comprar en Verdulería Pocho.');
  carrito = {}; // Vaciar carrito
  actualizarCarrito();
  menuCarrito.classList.add('oculto');
});