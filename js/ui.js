window.UI = {
  $(sel) { return document.querySelector(sel); },
  $$(sel) { return document.querySelectorAll(sel); },

  toast(msg, duration = 2600) {
    const el = this.$('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(this._t);
    this._t = setTimeout(() => el.classList.remove('show'), duration);
  },

  showScreen(id) {
    this.$$('.screen').forEach(s => s.classList.remove('active'));
    this.$('#' + id).classList.add('active');
  },

  switchTab(name) {
    this.$$('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    this.$$('.tab-content').forEach(c => c.classList.toggle('active', c.id === 'tab-' + name));
  },

  renderSubjects(state) {
    const grid = this.$('#subjects-grid');
    grid.innerHTML = '';
    Object.entries(window.CURRICULUM).forEach(([key, subj]) => {
      const p = state.progress[key];
      const level = subj.levels.find(l => l.n === p.nivel_actual);
      const btn = document.createElement('button');
      btn.className = 'subject-btn';
      btn.dataset.subject = key;
      btn.innerHTML = `
        <span class="emoji">${subj.emoji}</span>
        <div class="name">${subj.name}</div>
        <div class="lvl">Nivel ${p.nivel_actual}: ${level.nombre}</div>
      `;
      btn.addEventListener('click', () => window.Session.start(key));
      grid.appendChild(btn);
    });
  },

  renderHeader(state) {
    const lvl = window.Gamification.levelFor(state.xp || 0);
    this.$('#greeting').textContent = `¡Hola, ${state.name || 'estudiante'}!`;
    this.$('#level-name').textContent = `${lvl.name} · Nivel ${lvl.n}`;
    this.$('#xp-num').textContent = state.xp || 0;
    this.$('#streak-num').textContent = state.streak_days || 0;
  },

  renderProgress(state) {
    const root = this.$('#progress-grid');
    root.innerHTML = '';
    Object.entries(window.CURRICULUM).forEach(([key, subj]) => {
      const p = state.progress[key];
      const { level, oa } = window.Progression.currentOA(key, state.progress);
      const totalOA = level.oas.length;
      const doneOA = p.oa_idx;
      const pct = Math.round((doneOA / totalOA) * 100);
      const dots = [0, 1, 2].map(i =>
        `<span class="${i < p.aciertos_consecutivos ? 'on' : ''}"></span>`
      ).join('');

      const div = document.createElement('div');
      div.className = 'prog-subject';
      div.dataset.subject = key;
      div.innerHTML = `
        <h4>${subj.emoji} ${subj.name}</h4>
        <div class="lvl-name">Nivel ${level.n}/4 — ${level.nombre}</div>
        <div class="oa-code">${oa.code}</div>
        <div class="oa-desc">${oa.desc}</div>
        <div class="prog-bar"><div class="prog-bar-fill" style="width:${pct}%"></div></div>
        <small style="color:var(--muted)">${doneOA}/${totalOA} OAs del nivel</small>
        <div class="acertados-dots" title="Aciertos consecutivos">${dots}</div>
      `;
      root.appendChild(div);
    });
  },

  renderAchievements(state) {
    const root = this.$('#achievements-list');
    const have = new Set(state.achievements || []);
    root.innerHTML = '';
    window.ACHIEVEMENTS.forEach(a => {
      const div = document.createElement('div');
      div.className = 'ach-item' + (have.has(a.id) ? ' unlocked' : '');
      div.innerHTML = `
        <div class="ach-emoji">${a.emoji}</div>
        <div>
          <div class="ach-name">${a.name}</div>
          <div class="ach-desc">${a.desc}</div>
        </div>
      `;
      root.appendChild(div);
    });
  },

  addMessage(role, text) {
    const chat = this.$('#chat');
    const msg = document.createElement('div');
    msg.className = `msg ${role}`;
    msg.innerHTML = `<div class="msg-bubble"></div>`;
    msg.querySelector('.msg-bubble').textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
    return msg;
  },

  addTyping() {
    const chat = this.$('#chat');
    const msg = document.createElement('div');
    msg.className = 'msg bot typing';
    msg.innerHTML = `<div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
    return msg;
  },

  clearChat() { this.$('#chat').innerHTML = ''; },

  renderBlocks(blocks, currentIdx) {
    const bar = this.$('#blocks-bar');
    bar.innerHTML = '';
    for (let i = 0; i < blocks; i++) {
      const pill = document.createElement('div');
      pill.className = 'block-pill' + (i < currentIdx ? ' done' : '') + (i === currentIdx ? ' active' : '');
      bar.appendChild(pill);
    }
  },

  setTimer(remaining, total) {
    const m = Math.floor(remaining / 60).toString().padStart(2, '0');
    const s = Math.floor(remaining % 60).toString().padStart(2, '0');
    this.$('#timer-display').textContent = `${m}:${s}`;
    const circumference = 339.292;
    const pct = remaining / total;
    this.$('#ring-fg').style.strokeDashoffset = circumference * (1 - pct);
  },

  setSessionInfo(subjectKey, oa) {
    const subj = window.CURRICULUM[subjectKey];
    this.$('#session-subject').textContent = `${subj.emoji} ${subj.name}`;
    this.$('#session-oa-info').textContent = `${oa.code} — ${oa.desc}`;
    document.documentElement.style.setProperty('--accent', subj.color);
  },

  resetAccent() {
    document.documentElement.style.setProperty('--accent', '#ffd93d');
  },

  showSession() {
    this.$('#session-card').classList.remove('hidden');
    this.$('.subjects-card').classList.add('hidden');
  },

  hideSession() {
    this.$('#session-card').classList.add('hidden');
    this.$('.subjects-card').classList.remove('hidden');
  }
};
