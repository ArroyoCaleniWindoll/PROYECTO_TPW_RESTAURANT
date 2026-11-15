# La Cabaña de Don Víctor - Avance 3

Abrir index.html con Live Server y en Carta (ingresar) para pedir.


## Lo nuevo implementado
- carta.html tiene contenedores, no productos escritos a mano.
- data/productos.json contiene 105 registros extraídos de la carta original, sin duplicar las tarjetas destacadas.
- js/catalogo.js lee el JSON con fetch y genera los elementos HTML mediante forEach.
- login.html y login-admin.html tienen accesos separados.
- admin.html: tabla y JSON en crudo, solo lectura. NO tiene registrar, editar, borrar ni delivery.
- Productos con precio null muestran Consultar y no entran en el cálculo.
- El pedido se mantiene únicamente en memoria cache, al recargar o salir, se vacía.
- No hay envío de pedidos, cobros, base de datos ni PHP.

## Explicación
1. JSON separa los datos del HTML y evita repetir la información.
2. fetch obtiene el archivo; response.json() lo convierte en un arreglo JavaScript.
3. forEach recorre productos y crea las tarjetas o filas del administrador.
4. El cliente selecciona cantidades; precio por cantidad produce el subtotal.
5. Los subtotales se acumulan para obtener el total.
6. El administrador reutiliza la misma fuente, sin modificarla.