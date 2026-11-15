// Funciones compartidas. La fuente única de productos es data/productos.json.
'use strict';
const Catalogo = {
  dinero(valor) {
    return 'S/ ' + valor.toFixed(2);
  },
  elemento(etiqueta, texto, clase) {
    const nodo = document.createElement(etiqueta);
    if (texto !== undefined) nodo.textContent = texto;
    if (clase) nodo.className = clase;
    return nodo;
  },
  async cargar() {
    const respuesta = await fetch('data/productos.json');
    if (!respuesta.ok) throw new Error('No se pudo cargar el catálogo.');
    const productos = await respuesta.json();
    if (!Array.isArray(productos)) throw new Error('Catálogo inválido.');
    return productos;
  },
  error() {
    document.getElementById('estado').textContent = 'No se pudo cargar la carta. Abre el proyecto con Live Server y comprueba data/productos.json.';
  },
  // Reemplaza el HTML repetido de platos por tarjetas creadas con forEach.
  mostrar(productos, alAgregar) {
    const destino = document.getElementById('catalogo');
    destino.replaceChildren();
    const categorias = [...new Set(productos.map(producto => producto.categoria))];
    const nav = this.elemento('nav', undefined, 'category-nav');
    nav.setAttribute('aria-label', 'Categorías de la carta');
    destino.append(nav);
    categorias.forEach((categoria, indice) => {
      const seccion = this.elemento('section', undefined, 'catalog-section section');
      seccion.id = ['desayunos', 'almuerzos', 'bebidas', 'menu-dia'][indice];
      const enlace = this.elemento('a', categoria);
      enlace.href = '#' + seccion.id;
      nav.append(enlace);
      seccion.append(this.elemento('h2', categoria));
      const grilla = this.elemento('div', undefined, 'dish-grid');
      productos.filter(producto => producto.categoria === categoria).forEach(producto => {
        const tarjeta = this.elemento('article', undefined, 'dish-card');
        if (producto.imagen) {
          const imagen = this.elemento('img');
          imagen.src = producto.imagen;
          imagen.alt = producto.nombre;
          imagen.loading = 'lazy';
          tarjeta.append(imagen);
        }
        const cuerpo = this.elemento('div', undefined, 'dish-body');
        cuerpo.append(this.elemento('p', producto.grupo, 'eyebrow'));
        cuerpo.append(this.elemento('h3', producto.nombre));
        cuerpo.append(this.elemento('p', producto.precio === null ? 'Consultar precio' : this.dinero(producto.precio), 'price'));
        if (alAgregar && producto.precio !== null) {
          const label = this.elemento('label', 'Cantidad de ' + producto.nombre);
          label.htmlFor = 'cantidad-' + producto.id;
          const cantidad = this.elemento('input');
          cantidad.id = label.htmlFor;
          cantidad.type = 'number';
          cantidad.min = '1'; cantidad.max = '99'; cantidad.step = '1'; cantidad.value = '1';
          const boton = this.elemento('button', 'Añadir al pedido', 'button dark');
          boton.type = 'button';
          boton.addEventListener('click', () => {
            const unidades = Number(cantidad.value);
            if (!Number.isInteger(unidades) || unidades < 1 || unidades > 99) {
              cantidad.setCustomValidity('Ingresa una cantidad entera entre 1 y 99.');
              cantidad.reportValidity();
              return;
            }
            cantidad.setCustomValidity('');
            alAgregar(producto, unidades);
          });
          cantidad.addEventListener('input', () => cantidad.setCustomValidity(''));
          const controles = this.elemento('div', undefined, 'form-field');
          controles.append(label, cantidad, boton);
          cuerpo.append(controles);
        } else if (!alAgregar) {
          const enlace = this.elemento('a', 'Ingresar para pedir →', 'text-link');
          enlace.href = 'login.html';
          cuerpo.append(enlace);
        } else {
          cuerpo.append(this.elemento('p', 'No disponible para cálculo hasta confirmar el precio.', 'small-note'));
        }
        tarjeta.append(cuerpo);
        grilla.append(tarjeta);
      });
      seccion.append(grilla);
      destino.append(seccion);
    });
    document.getElementById('estado').textContent = productos.length + ' productos y bebidas disponibles para consultar.';
  },
  // Solo navegación de demostración: sessionStorage NO protege información.
  acceso(rol) {
    let autorizado = false;
    try { autorizado = sessionStorage.getItem('demo-' + rol) === 'activo'; } catch (_) { /* almacenamiento bloqueado */ }
    if (!autorizado) {
      location.replace(rol === 'admin' ? 'login-admin.html' : 'login.html');
      return false;
    }
    document.getElementById('zona-' + rol).hidden = false;
    document.getElementById('salir').addEventListener('click', () => {
      sessionStorage.removeItem('demo-' + rol);
      location.href = rol === 'admin' ? 'login-admin.html' : 'carta.html';
    });
    return true;
  }
};
