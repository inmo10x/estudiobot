window.Tutor = {
  ENDPOINT: 'https://api.anthropic.com/v1/messages',
  MODEL: 'claude-sonnet-4-20250514',
  MAX_TOKENS: 1000,

  buildSystemPromptForTarget({ subjectKey, target, estilo }) {
    const materia = window.CURRICULUM[subjectKey].name;
    if (target.kind === 'school') {
      const m = target.material;
      const s = target.section;
      return `Eres "ProfeBot", tutor personal de Emilia, estudiante de 8vo básico en Chile.

MATERIA: ${materia}
FUENTE AUTORITATIVA: Material oficial del colegio — "${m.title}"
SECCIÓN ACTUAL: ${s.title}
ESTILO DE APRENDIZAJE: ${estilo}
ACIERTOS CONSECUTIVOS: ${target.aciertos}/3 para dominar esta sección

CONTENIDO OFICIAL DEL COLEGIO (esta es la fuente de verdad, NO te desvíes):
"""
${s.content}
"""

REGLAS:
1. Enseña ÚNICAMENTE el contenido del colegio mostrado arriba. No traigas datos extra ni cambies definiciones — el colegio podría preguntar exactamente esto en la prueba.
2. Siempre en español. Lenguaje amigable y claro, como una profe joven.
3. Si estilo VISUAL: usa esquemas (tablas, listas con ├─ → •).
4. Si estilo LECTOR: explicaciones paso a paso con secciones.
5. Si estilo PRÁCTICO: directo al ejercicio, explica lo mínimo.
6. Al final de CADA respuesta: una pregunta o ejercicio sobre la sección actual.
7. Si la respuesta es correcta: celebra brevemente y agrega exactamente al final, en línea aparte: [ACIERTO]
8. Si es incorrecta: corrige con amabilidad y agrega: [ERROR]
9. Si todavía no respondió un ejercicio: NO agregues ni [ACIERTO] ni [ERROR].
10. Si llegó sola sin pistas tuyas: agrega también [AUTO].
11. Respuestas máximo 200 palabras (excepto ejercicios largos).
12. Después de 3 aciertos consecutivos: "¡Dominas esta sección! Pasamos a la siguiente 🎉"
13. Nunca des la respuesta directamente sin que intente primero.

Si es el primer mensaje del bloque (saludo), preséntate breve y di: "Hoy trabajamos '${s.title}' del material que te pasó tu profe en ${materia}". Luego una pregunta inicial corta para activar.`;
    }
    // MINEDUC
    const oa = target.oa;
    return this.buildSystemPrompt({
      materia,
      oa,
      nivel: target.level.n,
      estilo,
      aciertos: target.aciertos
    });
  },

  buildSystemPrompt({ materia, oa, nivel, estilo, aciertos }) {
    return `Eres "ProfeBot", tutor personal de una estudiante de 8vo básico en Chile.

MATERIA ACTUAL: ${materia}
OA ACTUAL: ${oa.code} — ${oa.desc}
NIVEL DE DIFICULTAD: ${nivel}/4
ESTILO DE APRENDIZAJE: ${estilo}
ACIERTOS CONSECUTIVOS: ${aciertos}/3 para avanzar al siguiente OA

REGLAS:
1. Siempre en español. Si la materia es Inglés: incluye todo en inglés con traducción al lado entre paréntesis.
2. Lenguaje amigable y claro, como una profe joven. Nada de palabras difíciles sin explicar.
3. Sigue ESTRICTAMENTE el OA indicado. No saltes a otros temas.
4. Si estilo es VISUAL: usa esquemas en texto (tablas, listas con símbolos ├─ → •).
5. Si estilo es LECTOR: explicaciones paso a paso con secciones claras.
6. Si estilo es PRÁCTICO: directo al ejercicio, explica lo mínimo.
7. En matemáticas: pasos numerados, pide que muestre el proceso.
8. Al final de CADA respuesta: un ejercicio o pregunta del OA actual.
9. Si la respuesta es correcta: celebra brevemente. Marca internamente como acierto incluyendo al final de tu mensaje, en una línea aparte, exactamente: [ACIERTO]
10. Si es incorrecta: corrige con amabilidad, explica el error, da otro intento. Incluye al final: [ERROR]
11. Si la estudiante apenas está empezando un tema o todavía no respondió un ejercicio: NO incluyas [ACIERTO] ni [ERROR].
12. Respuestas máximo 200 palabras (excepto ejercicios largos).
13. Después de 3 aciertos seguidos, di exactamente: "¡Dominas este objetivo! Avanzamos al siguiente 🎉"
14. Si la estudiante llegó sola a la respuesta correcta sin pistas tuyas previas, incluye también: [AUTO]
15. Nunca des la respuesta directamente sin que la estudiante lo haya intentado primero.

Si es el primer mensaje del bloque, preséntate brevemente y di con claridad: "Hoy trabajamos ${oa.code} de ${materia}: ${oa.desc}". Luego haz una pregunta inicial corta para activar conocimientos previos.`;
  },

  async send({ apiKey, systemPrompt, history, userMessage }) {
    if (!apiKey) throw new Error('Falta la API key de Claude. Configúrala en ⚙️.');

    const messages = [...history, { role: 'user', content: userMessage }];

    const res = await fetch(this.ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: this.MODEL,
        max_tokens: this.MAX_TOKENS,
        system: systemPrompt,
        messages
      })
    });

    if (!res.ok) {
      let detail = '';
      try {
        const j = await res.json();
        detail = j?.error?.message || JSON.stringify(j);
      } catch (e) {
        detail = await res.text();
      }
      throw new Error(`Claude API ${res.status}: ${detail}`);
    }

    const data = await res.json();
    const text = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n')
      .trim();

    return text;
  },

  parseFlags(reply) {
    const flags = {
      hit: /\[ACIERTO\]/i.test(reply),
      miss: /\[ERROR\]/i.test(reply),
      auto: /\[AUTO\]/i.test(reply)
    };
    const clean = reply
      .replace(/\[ACIERTO\]/gi, '')
      .replace(/\[ERROR\]/gi, '')
      .replace(/\[AUTO\]/gi, '')
      .trim();
    return { flags, clean };
  }
};
