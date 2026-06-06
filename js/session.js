window.Session = {
  BLOCK_MIN: 40,
  state: null,
  timerId: null,

  start(subjectKey) {
    const st = window.App.state;
    if (!st.apiKey) {
      window.UI.toast('Configura tu API key en ⚙️');
      window.UI.switchTab('ajustes');
      return;
    }
    const { level, oa } = window.Progression.currentOA(subjectKey, st.progress);

    this.state = {
      subjectKey,
      level,
      oa,
      totalSec: this.BLOCK_MIN * 60,
      remaining: this.BLOCK_MIN * 60,
      blockIdx: 0,
      blocks: 1,
      history: [],
      startedAt: Date.now(),
      messages: 0,
      lastWasHint: false
    };

    window.UI.showSession();
    window.UI.setSessionInfo(subjectKey, oa);
    window.UI.renderBlocks(this.state.blocks, this.state.blockIdx);
    window.UI.clearChat();
    window.UI.setTimer(this.state.remaining, this.state.totalSec);
    this.startTimer();

    // Saludo inicial del tutor
    this.sendToTutor('__inicio_bloque__', true);
  },

  startTimer() {
    clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      if (!this.state) return clearInterval(this.timerId);
      this.state.remaining -= 1;
      if (this.state.remaining <= 0) {
        this.completeBlock();
        return;
      }
      window.UI.setTimer(this.state.remaining, this.state.totalSec);
    }, 1000);
  },

  end() {
    clearInterval(this.timerId);
    this.state = null;
    window.UI.hideSession();
    window.UI.resetAccent();
  },

  completeBlock() {
    clearInterval(this.timerId);
    const st = window.App.state;
    const minutes = this.BLOCK_MIN;
    st.total_minutes = (st.total_minutes || 0) + minutes;
    st.sessions_completed = (st.sessions_completed || 0) + 1;
    st.subjects_studied = Array.from(new Set([...(st.subjects_studied || []), this.state.subjectKey]));
    window.App.addXP(window.Gamification.XP.SESSION_COMPLETE, '¡Sesión completa! +100 XP 🎉');
    window.App.updateStreak();
    window.App.checkAchievementsAndPersist();
    window.UI.toast('¡Terminaste el bloque de 40 minutos! 🌟', 3500);
    this.end();
    window.UI.switchTab('progreso');
    window.UI.renderProgress(st);
    window.UI.renderHeader(st);
  },

  async sendUserMessage(text) {
    if (!this.state) return;
    const trimmed = text.trim();
    if (!trimmed) return;
    window.UI.addMessage('user', trimmed);
    this.state.history.push({ role: 'user', content: trimmed });
    this.state.messages += 1;
    window.App.addXP(window.Gamification.XP.MESSAGE);
    await this.sendToTutor(trimmed, false);
  },

  async sendToTutor(userText, isInitial) {
    const st = window.App.state;
    const typing = window.UI.addTyping();

    const { level, oa } = window.Progression.currentOA(this.state.subjectKey, st.progress);
    this.state.level = level;
    this.state.oa = oa;
    window.UI.setSessionInfo(this.state.subjectKey, oa);

    const systemPrompt = window.Tutor.buildSystemPrompt({
      materia: window.CURRICULUM[this.state.subjectKey].name,
      oa,
      nivel: level.n,
      estilo: st.learning_style || 'práctico',
      aciertos: st.progress[this.state.subjectKey].aciertos_consecutivos
    });

    const historyForApi = isInitial
      ? [{ role: 'user', content: 'Hola, empecemos el bloque de estudio.' }]
      : this.state.history.slice(-16);

    try {
      const raw = await window.Tutor.send({
        apiKey: st.apiKey,
        systemPrompt,
        history: historyForApi.slice(0, -1),
        userMessage: historyForApi[historyForApi.length - 1].content
      });
      typing.remove();

      const { flags, clean } = window.Tutor.parseFlags(raw);
      window.UI.addMessage('bot', clean);
      if (!isInitial) {
        this.state.history.push({ role: 'assistant', content: clean });
      }

      // Procesar flags
      if (flags.hit) {
        window.App.addXP(window.Gamification.XP.HIT, '¡Acierto! +15 XP');
        if (flags.auto) {
          window.App.addXP(window.Gamification.XP.SELF_DISCOVERY, 'Llegaste sola 🌟 +10 XP');
        }
        const result = window.Progression.registerHit(this.state.subjectKey, st.progress);
        if (result.advancedOA) {
          window.App.addXP(window.Gamification.XP.OA_DOMINATED, 'OA dominado +30 XP 🎯');
          st.oas_dominated = (st.oas_dominated || 0) + 1;
          if (result.advancedLevel) {
            st.level_completed = true;
            window.UI.toast('¡Subiste de nivel curricular! 🏔️', 3200);
          }
        }
      } else if (flags.miss) {
        window.Progression.registerMiss(this.state.subjectKey, st.progress);
      }

      window.App.checkAchievementsAndPersist();
      window.UI.renderHeader(st);
      window.UI.renderProgress(st);
    } catch (err) {
      typing.remove();
      window.UI.addMessage('bot', '⚠️ ' + err.message);
    }
  }
};
