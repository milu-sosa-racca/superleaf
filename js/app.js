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
  if (id === 'test') quizIniciar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function comenzar() {
  irA('personajes');
}

// ── QUIZ ──────────────────────────────────────────────────────────────────────

const QUIZ_PREGUNTAS = [
  {
    texto: "¿Cómo preferís pasar la tarde libre?",
    opciones: [
      { texto: "En la naturaleza con mis mascotas", key: "mimi" },
      { texto: "Estudiando algo nuevo para ser la mejor", key: "cata_star" },
      { texto: "Nadando o corriendo — siempre en movimiento", key: "calu" },
      { texto: "Dibujando, pintando o inventando historias", key: "lara" }
    ]
  },
  {
    texto: "¿Cómo sos con personas que no conocés?",
    opciones: [
      { texto: "Tranquila y reservada, tardo en abrirme", key: "sofi" },
      { texto: "Seria y pensativa, las observo primero", key: "cata_psy" },
      { texto: "Enseguida bromeo y las hago reír", key: "juana" },
      { texto: "Amistosa y brillante, me destaco de una", key: "cata_star" }
    ]
  },
  {
    texto: "Hay un problema grande. ¿Qué hacés?",
    opciones: [
      { texto: "Me tiro de cabeza a resolverlo con energía", key: "juana" },
      { texto: "Analizo cada detalle antes de moverme", key: "cata_psy" },
      { texto: "Intento calmar la situación y ayudar a todos", key: "mimi" },
      { texto: "Me quedo seria y espero el momento exacto", key: "sofi" }
    ]
  },
  {
    texto: "¿Cuál de estos poderes elegirías?",
    opciones: [
      { texto: "Hablar con animales y hacer crecer plantas", key: "mimi" },
      { texto: "Lanzar fuego y volar a toda velocidad", key: "juana" },
      { texto: "Controlar el hielo y el frío", key: "sofi" },
      { texto: "Saltar a cualquier lugar y controlar el agua", key: "calu" }
    ]
  },
  {
    texto: "¿Cuál de estas frases te representa más?",
    opciones: [
      { texto: "Sabía que algo así iba a pasar", key: "cata_psy" },
      { texto: "Quiero aprenderlo todo y ser la mejor", key: "cata_star" },
      { texto: "Correr descalza por la orilla del mar es lo mejor", key: "calu" },
      { texto: "Los colores y las flores me inspiran", key: "lara" }
    ]
  },
  {
    texto: "Un Pokémon perdido aparece frente a vos. ¿Qué hacés?",
    opciones: [
      { texto: "Lo cuido con amor y busco su hogar", key: "mimi" },
      { texto: "Lo analizo para saber qué le pasa", key: "cata_psy" },
      { texto: "Le armo una bienvenida divertida", key: "juana" },
      { texto: "Le dibujo un retrato y lo decoro con flores", key: "lara" }
    ]
  }
];

const QUIZ_RESULTADOS = {
  mimi:     { nombre: "Mimi",  hero: "Super Leaf",  emoji: "🌿", color: "#1a5c2a", bg: "#e8f5e9", pokemon: "Leafeon",    desc: "Sos empática, conectás con la naturaleza y siempre pensás en los demás antes que en vos misma. Tenés un corazón enorme y los animales te adoran." },
  cata_star:{ nombre: "Cata",  hero: "Superstar",   emoji: "⭐", color: "#b8860b", bg: "#fff9e6", pokemon: "Eevee",      desc: "Brillante, curiosa y siempre querés destacarte. Sos de las que estudian todo para ser la mejor, y casi siempre tienen razón. ¡Imparable!" },
  sofi:     { nombre: "Sofi",  hero: "Super Ice",   emoji: "❄️", color: "#1565c0", bg: "#e3f2fd", pokemon: "Spheal",     desc: "Seria, tranquila y muy reflexiva. Pensás dos veces antes de hablar, y cuando actuás, lo hacés con precisión. Tu calma es tu mayor poder." },
  juana:    { nombre: "Juana", hero: "Super Fire",  emoji: "🔥", color: "#bf360c", bg: "#fff3f0", pokemon: "Charmander", desc: "Alegre, impulsiva y llena de energía. Siempre tenés una broma lista y actuás antes de pensar. ¡Con vos en el equipo nunca hay un momento aburrido!" },
  lara:     { nombre: "Lara",  hero: "Super Fairy", emoji: "🧚", color: "#6a1b9a", bg: "#f9f0ff", pokemon: "Cleffa",     desc: "Soñadora, creativa y con una imaginación enorme. Siempre estás dibujando, inventando o decorando algo. El mundo es más lindo con vos en él." },
  cata_psy: { nombre: "Cata",  hero: "Super Psy",   emoji: "🔮", color: "#4a148c", bg: "#ede7f6", pokemon: "Psyduck",    desc: "Observadora, seria y muy inteligente. Siempre sabés más de lo que decís. Analizás todo antes de actuar y casi nunca te equivocás." },
  calu:     { nombre: "Calu",  hero: "Super Aqua",  emoji: "💧", color: "#01579b", bg: "#e1f5fe", pokemon: "Marill",     desc: "Alegre como las olas y siempre en movimiento. Sos energética, espontánea y te lanzás a la aventura sin dudar. ¡Nadie te para!" }
};

let quizScores = {};
let quizPreguntaActual = 0;

function quizIniciar() {
  quizScores = { mimi: 0, cata_star: 0, sofi: 0, juana: 0, lara: 0, cata_psy: 0, calu: 0 };
  quizPreguntaActual = 0;
  quizMostrarPregunta();
}

function quizMostrarPregunta() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  const p = QUIZ_PREGUNTAS[quizPreguntaActual];
  const progreso = Math.round((quizPreguntaActual / QUIZ_PREGUNTAS.length) * 100);

  let html = `<div style="font-family:'Bubblegum Sans',cursive;font-size:0.85rem;color:#9b59b6;margin-bottom:8px;">
    Pregunta ${quizPreguntaActual + 1} de ${QUIZ_PREGUNTAS.length}
  </div>
  <div style="background:#f0e0ff;border-radius:4px;height:6px;margin-bottom:18px;overflow:hidden;">
    <div style="background:#9b59b6;height:100%;width:${progreso}%;"></div>
  </div>
  <p style="font-family:'Bubblegum Sans',cursive;font-size:1.1rem;color:#222;margin-bottom:16px;">${p.texto}</p>`;

  p.opciones.forEach(op => {
    html += `<button class="quiz-opcion" onclick="quizResponder('${op.key}')">${op.texto}</button>`;
  });

  container.innerHTML = html;
}

function quizResponder(key) {
  quizScores[key]++;
  quizPreguntaActual++;
  if (quizPreguntaActual >= QUIZ_PREGUNTAS.length) {
    quizMostrarResultado();
  } else {
    quizMostrarPregunta();
  }
}

function quizMostrarResultado() {
  const winner = Object.keys(quizScores).reduce((a, b) => quizScores[a] >= quizScores[b] ? a : b);
  const r = QUIZ_RESULTADOS[winner];
  const container = document.getElementById('quiz-container');
  container.innerHTML = `
    <div style="text-align:center;padding:10px 0;">
      <div style="font-size:4rem;margin-bottom:12px;">${r.emoji}</div>
      <p style="font-family:'Bubblegum Sans',cursive;font-size:1rem;color:#888;margin-bottom:6px;">¡Sos...</p>
      <p style="font-family:'Bubblegum Sans',cursive;font-size:2.2rem;color:${r.color};margin-bottom:2px;">${r.nombre}</p>
      <p style="font-family:'Bubblegum Sans',cursive;font-size:1.1rem;color:${r.color};opacity:0.8;margin-bottom:18px;">${r.hero}</p>
      <div style="background:${r.bg};border-radius:12px;padding:16px;margin-bottom:18px;text-align:left;">
        <p style="font-size:0.95rem;color:#333;line-height:1.75;margin-bottom:10px;">${r.desc}</p>
        <p style="font-size:0.85rem;color:#666;">🐾 Tu Pokémon: <strong>${r.pokemon}</strong></p>
      </div>
      <button onclick="quizIniciar()" style="background:#9b59b6;color:white;border:none;border-radius:20px;padding:10px 28px;font-family:'Bubblegum Sans',cursive;font-size:1rem;cursor:pointer;">🔄 Hacerlo de nuevo</button>
    </div>`;
}
