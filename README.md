# 📚 EstudioBot

App de estudio personal para una estudiante de 8° básico en Chile, con tutor IA
(Claude API) que sigue estrictamente el currículo oficial del MINEDUC y aumenta
la dificultad de forma progresiva según el avance real.

## ✨ Características

- **Sesiones de 40 minutos** con timer circular y bloques.
- **Tutor IA personalizado** (Claude Sonnet 4) que:
  - Sigue el OA actual sin saltarse temas.
  - Adapta su estilo a Visual / Lector / Práctico.
  - Avanza al siguiente OA tras 3 aciertos consecutivos.
- **Currículo oficial MINEDUC 8° básico** en 5 materias:
  - Matemática · Inglés · Ciencias Naturales · Historia · Lengua y Literatura
- **Progresión adaptativa** con niveles 1 → 4 por materia.
- **Gamificación**: XP, 5 niveles de experiencia, racha de días, 10 logros.
- **100% en el navegador**: HTML + CSS + JS vanilla, sin frameworks ni build.
- **Privacidad**: la API key y todo el progreso se guardan solo en `localStorage`.

## 🚀 Uso

1. Abre el sitio.
2. Pon tu nombre y haz el test de estilo de aprendizaje (3 preguntas).
3. Pega tu API key de Claude (obtenla en [console.anthropic.com](https://console.anthropic.com/)).
4. Elige una materia y empieza un bloque de 40 minutos.

## 🛠 Estructura

```
estudiobot/
├── index.html
├── css/style.css
└── js/
    ├── app.js          ← init, estado global, localStorage
    ├── onboarding.js   ← test inicial y detección de estilo
    ├── session.js      ← timer, bloques, lógica de sesión
    ├── tutor.js        ← integración Claude API, system prompts
    ├── curriculum.js   ← contenidos MINEDUC + sistema de progresión
    ├── gamification.js ← XP, niveles, racha, logros
    └── ui.js           ← tabs, toast, popups, render
```

## 📖 Fuente curricular

[curriculumnacional.cl](https://www.curriculumnacional.cl/) — Bases Curriculares 7° Básico a 2° Medio.
