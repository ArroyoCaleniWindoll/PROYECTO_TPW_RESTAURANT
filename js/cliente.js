'use strict';
// El pedido vive en memoria: al recargar o salir se vacía. No se envía al negocio.
const pedido = [];
function actualizarResumen() {
  const resumen = document.getElementById('resumen');
  resumen.replaceChildren();
  let totalCentimos = 0;
  let cantidadTotal = 0;
  if (!pedido.length) resumen.append(Catalogo.elemento('p', 'Tu pedido está vacío. Añade productos del catálogo.'));
  pedido.forEach(linea => {
    const subtotal = Math.round(linea.producto.precio * 100) * linea.cantidad;
    totalCentimos += subtotal;
    cantidadTotal += linea.cantidad;
    const fila = Catalogo.elemento('div', undefined, 'order-line');
    fila.append(Catalogo.elemento('p', linea.producto.nombre + ' · ' + linea.cantidad + ' × ' + Catalogo.dinero(linea.producto.precio) + ' = ' + Catalogo.dinero(subtotal / 100)));
    const quitar = Catalogo.elemento('button', 'Quitar', 'button dark');
    quitar.type = 'button';
    quitar.setAttribute('aria-label', 'Quitar ' + linea.producto.nombre);
    quitar.addEventListener('click', () => {
      pedido.splice(pedido.indexOf(linea), 1);
      actualizarResumen();
    });
    fila.append(quitar);
    resumen.append(fila);
  });
  document.getElementById('total').textContent = cantidadTotal + ' unidades · Total: ' + Catalogo.dinero(totalCentimos / 100);
  document.getElementById('limpiar').disabled = pedido.length === 0;
}
function agregar(producto, cantidad) {
  const existente = pedido.find(linea => linea.producto.id === producto.id);
  if (existente && existente.cantidad + cantidad > 99) {
    document.getElementById('estado').textContent = 'Máximo 99 unidades por producto en este prototipo.';
    return;
  }
  if (existente) existente.cantidad += cantidad;
  else pedido.push({ producto, cantidad });
  actualizarResumen();
  document.getElementById('estado').textContent = 'Añadido: ' + producto.nombre + '. Revisa el resumen al inicio.';
}
if (Catalogo.acceso('cliente')) {
  actualizarResumen();
  document.getElementById('limpiar').addEventListener('click', () => {
    pedido.length = 0;
    actualizarResumen();
  });
  Catalogo.cargar().then(productos => Catalogo.mostrar(productos, agregar)).catch(() => Catalogo.error());
}