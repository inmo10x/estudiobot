window.Onboarding = {
  QUIZ: [
    {
      q: 'Cuando aprendes algo nuevo, ¿qué te ayuda más?',
      opts: [
        { text: 'Ver dibujos, esquemas o tablas', style: 'visual' },
        { text: 'Leer explicaciones paso a paso', style: 'lector' },
        { text: 'Probar enseguida con un ejercicio', style: 'practico' }
      ]
    },
    {
      q: 'Si tienes que estudiar para una prueba, prefieres...',
      opts: [
        { text: 'Hacer un mapa conceptual o resumen visual', style: 'visual' },
        { text: 'Leer y subrayar los apuntes', style: 'lector' },
        { text: 'Resolver ejercicios o pruebas anteriores', style: 'practico' }
      ]
    },
    {
      q: 'Cuando alguien te explica un tema, prefieres que...',
      opts: [
        { text: 'Te lo dibuje o use ejemplos visuales', style: 'visual' },
        { text: 'Te lo explique con palabras claras', style: 'lector' },
        { text: 'Te muestre cómo se hace con un ejemplo real', style: 'practico' }
      ]
    }
  ],

  selections: [],

  init() {
    window.UI.$('#btn-onb-1').addEventListener('click', () => this.step1Done());
    document.getElementById('student-name').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.step1Done();
    });
    window.UI.$('#btn-onb-3').addEventListener('click', () => this.step3Done());
    this.renderQuiz();
  },

  step1Done() {
    const name = window.UI.$('#student-name').value.trim();
    if (!name) {
      window.UI.toast('Pon tu nombre 😊');
      return;
    }
    window.App.state.name = name;
    window.App.persist();
    this.showStep(2);
  },

  step3Done() {
    const key = window.UI.$('#apikey-input').value.trim();
    if (!key) {
      window.UI.toast('Pega tu API key');
      return;
    }
    window.App.state.apiKey = key;
    window.App.state.onboarded = true;
    window.App.persist();
    window.UI.showScreen('screen-main');
    window.App.renderAll();
  },

  showStep(n) {
    window.UI.$$('.onb-step').forEach(s => s.classList.remove('active'));
    window.UI.$('#onboarding-step-' + n).classList.add('active');
  },

  renderQuiz() {
    const root = window.UI.$('#quiz-container');
    root.innerHTML = '';
    this.selections = [];
    this.QUIZ.forEach((q, i) => {
      const block = document.createElement('div');
      block.className = 'quiz-q';
      block.innerHTML = `<p>${i + 1}. ${q.q}</p>`;
      q.opts.forEach((o, j) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt';
        btn.textContent = o.text;
        btn.addEventListener('click', () => {
          block.querySelectorAll('.quiz-opt').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          this.selections[i] = o.style;
          this.maybeAdvance();
        });
        block.appendChild(btn);
      });
      root.appendChild(block);
    });
  },

  maybeAdvance() {
    const filled = this.selections.filter(Boolean);
    if (filled.length === this.QUIZ.length) {
      const tally = { visual: 0, lector: 0, practico: 0 };
      filled.forEach(s => { tally[s]++; });
      const style = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
      window.App.state.learning_style = style;
      window.App.persist();
      window.UI.toast(`Estilo detectado: ${this.labelStyle(style)} ✨`);
      setTimeout(() => this.showStep(3), 1200);
    }
  },

  labelStyle(s) {
    return { visual: 'Visual 🎨', lector: 'Lector 📖', practico: 'Práctico ⚡' }[s] || s;
  },

  retake() {
    this.renderQuiz();
    this.showStep(2);
    window.UI.showScreen('screen-onboarding');
  }
};
