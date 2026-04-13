const TITULOS = {
  personajes: '👥 Personajes',
  dedicatoria: '💖 Dedicatoria',
  intro: '📖 Introducción',
  cap0: 'Capítulo 0',
  cap1: 'Capítulo 1',
  cap2: 'Capítulo 2',
  cap3: 'Capítulo 3',
  cap4: 'Capítulo 4',
  cap5: 'Capítulo 5',
  cap6: 'Capítulo 6',
  cap7: 'Capítulo 7',
  cap8: 'Capítulo 8',
  cap9: 'Capítulo 9',
  cap10: 'Capítulo 10',
  indice: '📋 Índice',
  glosario: '💫 Glosario',
  curiosidades: '🌟 Curiosidades',
  historias: '📖 Historias',
  creditos: '✍️ Créditos',
};

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
  document.getElementById('portada-page').style.display = 'flex';
  document.getElementById('topbar').classList.remove('visible');
  document.getElementById('sidebar').classList.remove('visible');
  document.getElementById('contenido-pagina').innerHTML = '';
  paginaActual = null;
}

async function irA(id) {
  cerrarSidebar();
  paginaActual = id;

  // Mostrar topbar y sidebar
  document.getElementById('topbar').classList.add('visible');
  document.getElementById('sidebar').classList.add('visible');
  document.getElementById('portada-page').style.display = 'none';

  // Actualizar título
  document.getElementById('topbar-titulo').textContent = TITULOS[id] || id;

  // Marcar activo en sidebar
  document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('activo'));
  const btn = document.querySelector(`.sidebar-btn[data-page="${id}"]`);
  if (btn) btn.classList.add('activo');

  // Cargar página
  const contenedor = document.getElementById('contenido-pagina');
  contenedor.innerHTML = '<div style="text-align:center;padding:60px;color:#aaa;">Cargando...</div>';
  try {
    const res = await fetch(`pages/${id}.html`);
    const html = await res.text();
    contenedor.innerHTML = html;
  } catch(e) {
    contenedor.innerHTML = '<div style="text-align:center;padding:60px;color:#c00;">Error cargando la página.</div>';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function comenzar() {
  irA('indice');
}
