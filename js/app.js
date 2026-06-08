window.App = {
  STORAGE_KEY: 'estudiobot_state_v1',
  APIKEY_KEY: 'estudiobot_apikey',

  state: null,

  defaultState() {
    return {
      name: '',
      onboarded: false,
      learning_style: 'practico',
      xp: 0,
      streak_days: 0,
      last_study_date: null,
      total_minutes: 0,
      sessions_completed: 0,
      oas_dominated: 0,
      subjects_studied: [],
      level_completed: false,
      achievements: [],
      progress: window.Progression.initial(),
      school_materials: {},
      school_progress: {},
      preloaded_dismissed: [],
      apiKey: ''
    };
  },

  load() {
    let s;
    try {
      s = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || this.defaultState();
    } catch (e) {
      s = this.defaultState();
    }
    // separar API key
    const sep = localStorage.getItem(this.APIKEY_KEY);
    if (sep) s.apiKey = sep;
    // asegurar campos
    const d = this.defaultState();
    for (const k of Object.keys(d)) {
      if (s[k] === undefined) s[k] = d[k];
    }
    // asegurar todas las materias en progress
    for (const k of Object.keys(window.CURRICULUM)) {
      if (!s.progress[k]) s.progress[k] = window.Progression.initial()[k];
    }
    // mergear materiales precargados del cole (solo los que el usuario no haya descartado)
    window.SchoolProgression.mergePreloaded(s);
    this.state = s;
  },

  persist() {
    const { apiKey, ...rest } = this.state;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(rest));
    if (apiKey) localStorage.setItem(this.APIKEY_KEY, apiKey);
    else localStorage.removeItem(this.APIKEY_KEY);
  },

  addXP(amount, toast) {
    const prevLvl = window.Gamification.levelFor(this.state.xp).n;
    this.state.xp = (this.state.xp || 0) + amount;
    const newLvl = window.Gamification.levelFor(this.state.xp).n;
    this.persist();
    window.UI.renderHeader(this.state);
    if (toast) window.UI.toast(toast);
    if (newLvl > prevLvl) {
      const lvl = window.Gamification.levelFor(this.state.xp);
      setTimeout(() => window.UI.toast(`¡Subiste de nivel! ${lvl.name} 🚀`, 3500), 600);
    }
  },

  updateStreak() {
    const today = new Date().toISOString().slice(0, 10);
    const last = this.state.last_study_date;
    if (last === today) return;
    if (last) {
      const lastDate = new Date(last);
      const diff = Math.floor((new Date(today) - lastDate) / 86400000);
      if (diff === 1) this.state.streak_days = (this.state.streak_days || 0) + 1;
      else if (diff > 1) this.state.streak_days = 1;
    } else {
      this.state.streak_days = 1;
    }
    this.state.last_study_date = today;
    this.persist();
  },

  checkAchievementsAndPersist() {
    const newly = window.Gamification.checkAchievements(this.state);
    if (newly.length) {
      newly.forEach((id, i) => {
        const a = window.ACHIEVEMENTS.find(x => x.id === id);
        if (a) setTimeout(() => window.UI.toast(`🏆 ${a.name} desbloqueado`), 400 * (i + 1));
      });
    }
    this.persist();
    window.UI.renderAchievements(this.state);
  },

  renderAll() {
    window.UI.renderHeader(this.state);
    window.UI.renderSubjects(this.state);
    window.UI.renderProgress(this.state);
    window.UI.renderAchievements(this.state);
    window.UI.renderMaterials(this.state);
    const styleLabels = { visual: 'Visual 🎨', lector: 'Lector 📖', practico: 'Práctico ⚡' };
    const el = document.getElementById('learning-style-display');
    if (el) el.textContent = styleLabels[this.state.learning_style] || '—';
    const ak = document.getElementById('apikey-settings');
    if (ak) ak.value = this.state.apiKey || '';
  },

  bindEvents() {
    window.UI.$$('.tab').forEach(t =>
      t.addEventListener('click', () => window.UI.switchTab(t.dataset.tab))
    );

    document.getElementById('btn-send').addEventListener('click', () => {
      const inp = document.getElementById('chat-input');
      const v = inp.value;
      inp.value = '';
      window.Session.sendUserMessage(v);
    });
    document.getElementById('chat-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('btn-send').click();
    });
    document.getElementById('btn-end-session').addEventListener('click', () => {
      if (confirm('¿Terminar la sesión sin completar el bloque?')) window.Session.end();
    });
    document.getElementById('btn-save-apikey').addEventListener('click', () => {
      const v = document.getElementById('apikey-settings').value.trim();
      this.state.apiKey = v;
      this.persist();
      window.UI.toast('API key guardada ✅');
    });
    document.getElementById('btn-retake-quiz').addEventListener('click', () => {
      window.Onboarding.retake();
    });
    // Material del cole — extraer PDF
    const pdfInput = document.getElementById('mat-pdf');
    if (pdfInput) {
      pdfInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const status = document.getElementById('mat-pdf-status');
        if (!window.pdfjsLib) {
          status.textContent = '⚠️ pdf.js no cargó — pega el texto manualmente.';
          return;
        }
        status.textContent = '⏳ Extrayendo texto del PDF...';
        try {
          const buf = await file.arrayBuffer();
          const pdf = await window.pdfjsLib.getDocument({ data: buf }).promise;
          let full = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            full += content.items.map(it => it.str).join(' ') + '\n\n';
          }
          document.getElementById('mat-text').value = full.trim();
          if (!document.getElementById('mat-title').value) {
            document.getElementById('mat-title').value = file.name.replace(/\.pdf$/i, '');
          }
          status.textContent = `✅ Extraído (${pdf.numPages} páginas, ${full.length} caracteres)`;
        } catch (err) {
          status.textContent = '⚠️ Error: ' + err.message;
        }
      });
    }

    document.getElementById('btn-add-material').addEventListener('click', () => {
      const subj = document.getElementById('mat-subject').value;
      const title = document.getElementById('mat-title').value.trim();
      const text = document.getElementById('mat-text').value.trim();
      if (!subj || !title || !text) {
        window.UI.toast('Falta materia, título o contenido');
        return;
      }
      // Para materiales subidos por usuario: una sola sección con todo el contenido
      const id = 'user-' + Date.now().toString(36);
      const material = {
        id,
        title,
        source: 'user-upload',
        uploaded_at: new Date().toISOString().slice(0, 10),
        origin: 'Subido manualmente',
        sections: [{ id: id + '-1', title, content: text }]
      };
      window.SchoolProgression.addMaterial(this.state, subj, material);
      this.persist();
      this.renderAll();
      document.getElementById('mat-title').value = '';
      document.getElementById('mat-text').value = '';
      document.getElementById('mat-pdf').value = '';
      document.getElementById('mat-pdf-status').textContent = '';
      window.UI.toast('Material agregado ✅');
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
      if (!confirm('Esto borra TODO tu progreso. ¿Seguir?')) return;
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.APIKEY_KEY);
      location.reload();
    });
  },

  init() {
    this.load();
    window.Onboarding.init();
    this.bindEvents();
    if (this.state.onboarded) {
      window.UI.showScreen('screen-main');
      this.renderAll();
    } else {
      window.UI.showScreen('screen-onboarding');
      if (this.state.name) {
        document.getElementById('student-name').value = this.state.name;
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => window.App.init());
