'use strict';
Catalogo.cargar().then(productos => Catalogo.mostrar(productos)).catch(() => Catalogo.error());
