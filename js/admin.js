'use strict';
if (Catalogo.acceso('admin')) {
  Catalogo.cargar().then(productos => {
    const tabla = document.getElementById('datos-admin');
    // Datos de lectura; no hay botones CRUD ni modificación del JSON.
    productos.forEach(producto => {
      const fila = Catalogo.elemento('tr');
      [producto.id, producto.nombre, producto.categoria, producto.grupo,
        producto.precio === null ? 'Consultar' : Catalogo.dinero(producto.precio),
        producto.imagen || 'Sin fotografía'].forEach(valor => fila.append(Catalogo.elemento('td', valor)));
      tabla.append(fila);
    });
    document.getElementById('json-preview').textContent = JSON.stringify(productos, null, 2);
    document.getElementById('estado').textContent = productos.length + ' registros · Vista previa sin edición.';
  }).catch(() => Catalogo.error());
}
