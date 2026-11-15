'use strict';
// Credenciales públicas de prueba.
const formulario = document.getElementById('login-form');
formulario.addEventListener('submit', evento => {
  evento.preventDefault();
  const rol = formulario.dataset.rol;
  const usuario = document.getElementById('usuario').value.trim();
  const clave = document.getElementById('clave').value;
  const error = document.getElementById('login-error');
  if (usuario !== rol || clave !== rol + '123') {
    error.textContent = 'Usuario o contraseña de demostración incorrectos.';
    return;
  }
  try {
    // No guardamos la contraseña ni datos personales.
    sessionStorage.setItem('demo-' + rol, 'activo');
    location.href = rol === 'admin' ? 'admin.html' : 'cliente.html';
  } catch (_) {
    error.textContent = 'Permite el almacenamiento de sesión del navegador para probar el acceso.';
  }
});