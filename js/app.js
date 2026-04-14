let paginaActual = null;

function abrirSidebar() {
  document.getElementById('sidebar').classList.add('abierto');
  document.getElementById('overlay').classList.add('visible');
}

function cerrarSidebar() {
  document.getElementById('sidebar').classList.remove('abierto');
  document.getElementById('overlay').classList.remove('visible');
}

function irAPortada() {
  cerrarSidebar();
  if (paginaActual) {
    document.getElementById(paginaActual).style.display = 'none';
    paginaActual = null;
  }
  document.getElementById('portada-page').style.display = 'flex';
  document.getElementById('topbar').classList.remove('visible');
  document.getElementById('sidebar').classList.remove('visible');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function irA(id) {
  cerrarSidebar();
  if (paginaActual) {
    document.getElementById(paginaActual).style.display = 'none';
  }
  document.getElementById(id).style.display = 'block';
  paginaActual = id;
  document.getElementById('topbar').classList.add('visible');
  document.getElementById('sidebar').classList.add('visible');
  document.getElementById('portada-page').style.display = 'none';
  document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('activo'));
  const btn = document.querySelector(`.sidebar-btn[data-page="${id}"]`);
  if (btn) btn.classList.add('activo');
  if (id === 'test' && typeof quizIniciar === 'function') quizIniciar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function comenzar() {
  irA('personajes');
}
