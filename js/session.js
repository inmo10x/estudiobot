window.Session = {
  BLOCK_MIN: 40,
  state: null,
  timerId: null,

  // Resuelve qué se va a enseñar: material del cole (prioridad) o MINEDUC (respaldo)
  resolveTarget(subjectKey) {
    const st = window.App.state;
    const school = window.SchoolProgression.nextActive(subjectKey, st);
    if (school && !school.allMastered) {
      return {
        kind: 'school',
        material: school.material,
        section: school.section,
        sectionIdx: school.idx,
        aciertos: (school.mp && school.mp.aciertos) || 0
      };
    }
    const { level, oa } = window.Progression.currentOA(subjectKey, st.progress);
    return {
      kind: 'mineduc',
      level,
      oa,
      aciertos: st.progress[subjectKey].aciertos_consecutivos
    };
  },

  start(subjectKey) {
    const st = window.App.state;
    if (!st.apiKey) {
      window.UI.toast('Configura tu API key en ⚙️');
      window.UI.switchTab('ajustes');
      return;
    }
    const target = this.resolveTarget(subjectKey);

    this.state = {
      subjectKey,
      target,
      totalSec: this.BLOCK_MIN * 60,
      remaining: this.BLOCK_MIN * 60,
      blockIdx: 0,
      blocks: 1,
      history: [],
      startedAt: Date.now(),
      messages: 0
    };

    window.UI.showSession();
    window.UI.setSessionInfoFromTarget(subjectKey, target);
    window.UI.renderBlocks(this.state.blocks, this.state.blockIdx);
    window.UI.clearChat();
    window.UI.setTimer(this.state.remaining, this.state.totalSec);
    this.startTimer();

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

    // re-resolver objetivo cada turno (puede haber avanzado de sección/OA)
    const target = this.resolveTarget(this.state.subjectKey);
    this.state.target = target;
    window.UI.setSessionInfoFromTarget(this.state.subjectKey, target);

    const systemPrompt = window.Tutor.buildSystemPromptForTarget({
      subjectKey: this.state.subjectKey,
      target,
      estilo: st.learning_style || 'practico'
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

      if (flags.hit) {
        window.App.addXP(window.Gamification.XP.HIT, '¡Acierto! +15 XP');
        if (flags.auto) {
          window.App.addXP(window.Gamification.XP.SELF_DISCOVERY, 'Llegaste sola 🌟 +10 XP');
        }
        if (target.kind === 'school') {
          const r = window.SchoolProgression.registerHit(st, this.state.subjectKey, target.material.id, target.section.id);
          if (r.sectionMastered) {
            window.App.addXP(window.Gamification.XP.OA_DOMINATED, 'Sección dominada +30 XP 🎯');
            st.oas_dominated = (st.oas_dominated || 0) + 1;
            window.UI.toast('¡Dominaste esta sección del cole! 🌟', 2800);
          }
        } else {
          const r = window.Progression.registerHit(this.state.subjectKey, st.progress);
          if (r.advancedOA) {
            window.App.addXP(window.Gamification.XP.OA_DOMINATED, 'OA dominado +30 XP 🎯');
            st.oas_dominated = (st.oas_dominated || 0) + 1;
            if (r.advancedLevel) {
              st.level_completed = true;
              window.UI.toast('¡Subiste de nivel curricular! 🏔️', 3200);
            }
          }
        }
      } else if (flags.miss) {
        if (target.kind === 'school') {
          window.SchoolProgression.registerMiss(st, this.state.subjectKey, target.material.id, target.section.id);
        } else {
          window.Progression.registerMiss(this.state.subjectKey, st.progress);
        }
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
