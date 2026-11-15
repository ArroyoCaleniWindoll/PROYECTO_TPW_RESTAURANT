# La Cabaña de Don Víctor — Avance 3

## Abrir en VS Code
1. Extrae el ZIP completo en una carpeta nueva.
2. Abre esa carpeta en VS Code.
3. Abre index.html con Live Server (clic derecho: Open with Live Server).
4. Entra en Carta → Ingresar para pedir.

IMPORTANTE: usa un servidor HTTP como Live Server. No abras con doble clic (file://): fetch necesita HTTP para leer data/productos.json.

## Accesos públicos de demostración
- Cliente: usuario cliente, contraseña cliente123.
- Administrador: usuario admin, contraseña admin123.
- El acceso administrativo está en el pie de página.
- No uses datos personales ni contraseñas reales.

Estos logins son simulaciones en JavaScript. Las credenciales son visibles en el código y sessionStorage puede modificarse. NO existe autenticación segura ni protección de datos. Los accesos son independientes y duran la sesión de la pestaña.

## Lo implementado
- Las seis páginas públicas del avance 2 se conservan.
- carta.html tiene contenedores, no 105 productos escritos a mano.
- data/productos.json contiene 105 registros extraídos de la carta original, sin duplicar las tarjetas destacadas.
- js/catalogo.js lee el JSON con fetch y genera los elementos HTML mediante forEach.
- login.html y login-admin.html: accesos separados.
- cliente.html: seleccionar cantidades enteras de 1 a 99, añadir productos, sumar unidades, calcular subtotales y total, quitar y vaciar.
- Los cálculos se hacen en céntimos para evitar errores de decimales.
- admin.html: tabla y JSON en crudo, solo lectura. NO tiene registrar, editar, borrar ni delivery.
- Productos con precio null muestran Consultar y no entran en el cálculo.
- El pedido se mantiene únicamente en memoria: al recargar o salir se vacía.
- No hay envío de pedidos, cobros, base de datos ni PHP.
- El formulario de reservas del avance 2 sigue siendo demostrativo.

## Explicación breve para sustentar
1. JSON separa los datos del HTML y evita repetir la información.
2. fetch obtiene el archivo; response.json() lo convierte en un arreglo JavaScript.
3. forEach recorre productos y crea las tarjetas o filas del administrador.
4. El cliente selecciona cantidades; precio por cantidad produce el subtotal.
5. Los subtotales se acumulan para obtener el total.
6. El administrador reutiliza la misma fuente, sin modificarla.

Archivos JavaScript: catalogo.js (funciones compartidas), carta.js (carta pública), login.js (accesos), cliente.js (pedido), admin.js (preview).
Estilos nuevos: css/avance3.css, además del estilo original.

## Prueba manual
- Visita Carta sin login: debe mostrar 105 productos.
- Prueba credenciales incorrectas: debe aparecer un mensaje de error.
- Ingresa como cliente, añade 2 unidades de chicharrón de ¼ kg (S/ 35): S/ 70.
- Añade 1 unidad de chicharrón de ½ kg (S/ 65): total S/ 135.
- Prueba cantidad negativa o decimal: no debe añadirse.
- Quita el primer producto: quedan S/ 65. Vacía: S/ 0.
- Visita admin.html sin sesión admin: debe mostrar su login.
- Entra como admin: 105 filas y JSON, sin controles de edición.
- Cierra sesión y comprueba que el área correspondiente pide acceso otra vez.

## Pendiente para el final
Autenticación y autorización del lado del servidor, base de datos, registro/edición de alimentos y gestión de pedidos/delivery. También confirmar precios pendientes, horarios y ubicación exacta. No presentar estas funciones como implementadas.

## Alcance de la entrega
Copia local derivada del ZIP del avance 2. No se modificó el ZIP original, no se publicó el sitio ni se realizaron commits.

