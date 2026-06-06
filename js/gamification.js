window.LEVELS = [
  { n: 1, name: 'Estudiante Aprendiz', xp: 0 },
  { n: 2, name: 'Exploradora Curiosa', xp: 200 },
  { n: 3, name: 'Pensadora Avanzada', xp: 500 },
  { n: 4, name: 'Experta en Formación', xp: 900 },
  { n: 5, name: 'Maestra del Saber', xp: 1400 }
];

window.ACHIEVEMENTS = [
  { id: 'first_session', emoji: '🎯', name: 'Primera sesión', desc: 'Completaste tu primera sesión de 40 minutos' },
  { id: 'first_oa', emoji: '⭐', name: 'Primer OA dominado', desc: 'Dominaste tu primer objetivo de aprendizaje' },
  { id: 'streak_3', emoji: '🔥', name: 'Racha de 3 días', desc: '3 días consecutivos estudiando' },
  { id: 'streak_7', emoji: '🔥🔥', name: 'Una semana entera', desc: '7 días consecutivos estudiando' },
  { id: 'min_60', emoji: '⏱️', name: 'Una hora total', desc: 'Acumulaste 60 minutos de estudio' },
  { id: 'all_subjects', emoji: '🌈', name: 'Versátil', desc: 'Estudiaste las 5 materias al menos una vez' },
  { id: 'level_done', emoji: '🏔️', name: 'Nivel completo', desc: 'Completaste todos los OA de un nivel' },
  { id: 'xp_lvl2', emoji: '🥈', name: 'Exploradora Curiosa', desc: 'Llegaste al nivel 2 de experiencia' },
  { id: 'sessions_10', emoji: '🎖️', name: '10 sesiones', desc: 'Completaste 10 sesiones de estudio' },
  { id: 'ingles_up', emoji: '🌎', name: 'English up!', desc: 'Subiste un nivel de dificultad en inglés' }
];

window.Gamification = {
  XP: {
    MESSAGE: 5,
    HIT: 15,
    OA_DOMINATED: 30,
    SESSION_COMPLETE: 100,
    SELF_DISCOVERY: 10
  },

  levelFor(xp) {
    let lvl = window.LEVELS[0];
    for (const l of window.LEVELS) {
      if (xp >= l.xp) lvl = l;
    }
    return lvl;
  },

  nextLevel(xp) {
    return window.LEVELS.find(l => l.xp > xp) || null;
  },

  // Devuelve lista de IDs de logros nuevamente desbloqueados
  checkAchievements(state) {
    const newly = [];
    const have = new Set(state.achievements || []);
    const add = (id) => { if (!have.has(id)) { have.add(id); newly.push(id); } };

    if ((state.sessions_completed || 0) >= 1) add('first_session');
    if ((state.oas_dominated || 0) >= 1) add('first_oa');
    if ((state.streak_days || 0) >= 3) add('streak_3');
    if ((state.streak_days || 0) >= 7) add('streak_7');
    if ((state.total_minutes || 0) >= 60) add('min_60');
    if ((state.subjects_studied || []).length >= 5) add('all_subjects');
    if (state.level_completed) add('level_done');
    if (this.levelFor(state.xp || 0).n >= 2) add('xp_lvl2');
    if ((state.sessions_completed || 0) >= 10) add('sessions_10');
    if ((state.progress?.ingles?.nivel_actual || 1) >= 2) add('ingles_up');

    state.achievements = Array.from(have);
    return newly;
  }
};
