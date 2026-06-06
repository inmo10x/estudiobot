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
