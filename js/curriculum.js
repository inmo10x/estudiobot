// Currículo oficial MINEDUC 8° básico
// Fuente: curriculumnacional.cl — Bases Curriculares 7° Básico a 2° Medio

window.CURRICULUM = {
  matematica: {
    name: 'Matemática',
    emoji: '🔢',
    color: '#ff6b6b',
    levels: [
      {
        n: 1,
        nombre: 'Números',
        oas: [
          { code: 'OA01', desc: 'Multiplicación y división de números enteros (regla de signos)' },
          { code: 'OA02', desc: 'Multiplicación y división de números racionales (fracciones y decimales)' },
          { code: 'OA03', desc: 'Potencias de base natural, exponente hasta 3' },
          { code: 'OA04', desc: 'Raíces cuadradas de números naturales' },
          { code: 'OA05', desc: 'Variaciones porcentuales (interés, descuentos, IVA)' }
        ]
      },
      {
        n: 2,
        nombre: 'Álgebra y funciones',
        oas: [
          { code: 'OA06', desc: 'Operaciones con expresiones algebraicas, factorización básica' },
          { code: 'OA07', desc: 'Concepto de función, tablas y plano cartesiano' },
          { code: 'OA08', desc: 'Ecuaciones lineales (ax=b, ax+b=c, ax+b=cx+d)' },
          { code: 'OA09', desc: 'Inecuaciones lineales con coeficientes racionales' },
          { code: 'OA10', desc: 'Función afín, traslaciones, interés simple' }
        ]
      },
      {
        n: 3,
        nombre: 'Geometría',
        oas: [
          { code: 'OA11', desc: 'Área de superficie y volumen de prismas y cilindros' },
          { code: 'OA12', desc: 'Teorema de Pitágoras y aplicaciones' },
          { code: 'OA13', desc: 'Transformaciones en el plano (traslación, rotación, reflexión)' },
          { code: 'OA14', desc: 'Composición de transformaciones y simetrías' }
        ]
      },
      {
        n: 4,
        nombre: 'Probabilidad y estadística',
        oas: [
          { code: 'OA15', desc: 'Probabilidad de eventos simples y compuestos' },
          { code: 'OA16', desc: 'Estadística descriptiva: media, mediana, moda, rango' }
        ]
      }
    ]
  },

  ingles: {
    name: 'Inglés',
    emoji: '🌎',
    color: '#4d96ff',
    levels: [
      {
        n: 1,
        nombre: 'Vocabulario y fonética base',
        oas: [
          { code: 'ING1.1', desc: 'Saludos, presentaciones y números' },
          { code: 'ING1.2', desc: 'Colores, familia y objetos del aula' },
          { code: 'ING1.3', desc: 'Pronunciación básica y alfabeto en inglés' },
          { code: 'ING1.4', desc: 'Verbos to be y to have' }
        ]
      },
      {
        n: 2,
        nombre: 'Gramática elemental',
        oas: [
          { code: 'ING2.1', desc: 'Presente simple (afirmativo, negativo, interrogativo)' },
          { code: 'ING2.2', desc: 'Pronombres personales y posesivos' },
          { code: 'ING2.3', desc: 'Artículos (a, an, the) y plurales' },
          { code: 'ING2.4', desc: 'Adjetivos calificativos básicos' }
        ]
      },
      {
        n: 3,
        nombre: 'Comprensión y expresión simple',
        oas: [
          { code: 'ING3.1', desc: 'Rutinas diarias y actividades cotidianas' },
          { code: 'ING3.2', desc: 'Presente continuo' },
          { code: 'ING3.3', desc: 'There is / There are' },
          { code: 'ING3.4', desc: 'Preguntas con Wh- (What, Where, When, Who, Why, How)' }
        ]
      },
      {
        n: 4,
        nombre: 'Expresión extendida',
        oas: [
          { code: 'ING4.1', desc: 'Pasado simple (verbos regulares e irregulares frecuentes)' },
          { code: 'ING4.2', desc: 'Descripción de lugares, personas y experiencias pasadas' },
          { code: 'ING4.3', desc: 'Comprensión de textos cortos auténticos (≤150 palabras)' }
        ]
      }
    ]
  },

  ciencias: {
    name: 'Ciencias Naturales',
    emoji: '🔬',
    color: '#6bcb77',
    levels: [
      {
        n: 1,
        nombre: 'Estructura y función celular',
        oas: [
          { code: 'CN1.1', desc: 'Célula procariota vs eucariota' },
          { code: 'CN1.2', desc: 'Organelos celulares y sus funciones' },
          { code: 'CN1.3', desc: 'División celular: mitosis y meiosis (conceptual)' }
        ]
      },
      {
        n: 2,
        nombre: 'Genética y herencia',
        oas: [
          { code: 'CN2.1', desc: 'ADN, genes y cromosomas' },
          { code: 'CN2.2', desc: 'Leyes de Mendel (dominancia, segregación)' },
          { code: 'CN2.3', desc: 'Herencia de características simples' }
        ]
      },
      {
        n: 3,
        nombre: 'Fuerzas y movimiento',
        oas: [
          { code: 'CN3.1', desc: 'Tipos de fuerzas (gravitacional, normal, fricción)' },
          { code: 'CN3.2', desc: 'Leyes de Newton (1ª, 2ª, 3ª)' },
          { code: 'CN3.3', desc: 'Velocidad, aceleración, movimiento rectilíneo' }
        ]
      },
      {
        n: 4,
        nombre: 'Energía',
        oas: [
          { code: 'CN4.1', desc: 'Formas de energía (cinética, potencial, térmica)' },
          { code: 'CN4.2', desc: 'Transformaciones de energía' },
          { code: 'CN4.3', desc: 'Energías renovables y no renovables en Chile' }
        ]
      }
    ]
  },

  historia: {
    name: 'Historia',
    emoji: '🏛️',
    color: '#ffd93d',
    levels: [
      {
        n: 1,
        nombre: 'Chile en el siglo XIX',
        oas: [
          { code: 'HI1.1', desc: 'Independencia de Chile: causas y proceso' },
          { code: 'HI1.2', desc: 'Organización del Estado chileno (1820–1830)' },
          { code: 'HI1.3', desc: 'Constitución de 1833 y sistema portaliano' }
        ]
      },
      {
        n: 2,
        nombre: 'Chile moderno (siglo XX temprano)',
        oas: [
          { code: 'HI2.1', desc: 'Guerra del Pacífico: causas, desarrollo, consecuencias' },
          { code: 'HI2.2', desc: 'Cuestión social en Chile' },
          { code: 'HI2.3', desc: 'Parlamentarismo y su crisis' }
        ]
      },
      {
        n: 3,
        nombre: 'Mundo contemporáneo',
        oas: [
          { code: 'HI3.1', desc: 'Primera y Segunda Guerra Mundial (causas y consecuencias)' },
          { code: 'HI3.2', desc: 'Guerra Fría: bloques, conflictos, caída del muro' },
          { code: 'HI3.3', desc: 'Proceso de descolonización' }
        ]
      },
      {
        n: 4,
        nombre: 'Chile reciente y globalización',
        oas: [
          { code: 'HI4.1', desc: 'Dictadura y transición democrática en Chile' },
          { code: 'HI4.2', desc: 'Globalización: características y efectos' },
          { code: 'HI4.3', desc: 'Derechos humanos y organismos internacionales' }
        ]
      }
    ]
  },

  lenguaje: {
    name: 'Lengua y Literatura',
    emoji: '📖',
    color: '#c77dff',
    levels: [
      {
        n: 1,
        nombre: 'Comprensión lectora básica',
        oas: [
          { code: 'LE1.1', desc: 'Identificar tema, idea principal e ideas secundarias' },
          { code: 'LE1.2', desc: 'Reconocer tipos de textos (narrativo, descriptivo, expositivo)' },
          { code: 'LE1.3', desc: 'Vocabulario en contexto e inferencias simples' }
        ]
      },
      {
        n: 2,
        nombre: 'Análisis literario',
        oas: [
          { code: 'LE2.1', desc: 'Narrador y punto de vista' },
          { code: 'LE2.2', desc: 'Personajes principales y secundarios' },
          { code: 'LE2.3', desc: 'Tiempo y espacio en el relato' },
          { code: 'LE2.4', desc: 'Figuras literarias: metáfora, comparación, hipérbole, personificación' }
        ]
      },
      {
        n: 3,
        nombre: 'Gramática y ortografía',
        oas: [
          { code: 'LE3.1', desc: 'Categorías gramaticales: sustantivo, adjetivo, verbo, adverbio, preposición' },
          { code: 'LE3.2', desc: 'Oraciones: sujeto y predicado, tipos de oraciones' },
          { code: 'LE3.3', desc: 'Uso de tildes (reglas generales, tilde diacrítica, hiatos)' },
          { code: 'LE3.4', desc: 'Puntuación: coma, punto, punto y coma, dos puntos' }
        ]
      },
      {
        n: 4,
        nombre: 'Producción escrita',
        oas: [
          { code: 'LE4.1', desc: 'Estructura del párrafo: idea principal + desarrollo + cierre' },
          { code: 'LE4.2', desc: 'Texto argumentativo: tesis, argumentos, conclusión' },
          { code: 'LE4.3', desc: 'Coherencia y cohesión textual' },
          { code: 'LE4.4', desc: 'Corrección de textos propios' }
        ]
      }
    ]
  }
};

// Sistema de progresión adaptativa
window.Progression = {
  initial() {
    const state = {};
    Object.keys(window.CURRICULUM).forEach(key => {
      state[key] = {
        nivel_actual: 1,
        oa_idx: 0,
        aciertos_consecutivos: 0,
        intentos_total: {}
      };
    });
    return state;
  },

  currentOA(subjectKey, progress) {
    const subj = window.CURRICULUM[subjectKey];
    const p = progress[subjectKey];
    const level = subj.levels.find(l => l.n === p.nivel_actual);
    const oa = level.oas[p.oa_idx];
    return { level, oa };
  },

  // Devuelve { advancedOA, advancedLevel, message }
  registerHit(subjectKey, progress) {
    const p = progress[subjectKey];
    p.aciertos_consecutivos = (p.aciertos_consecutivos || 0) + 1;
    const { level, oa } = this.currentOA(subjectKey, progress);
    p.intentos_total[oa.code] = (p.intentos_total[oa.code] || 0) + 1;

    if (p.aciertos_consecutivos >= 3) {
      p.aciertos_consecutivos = 0;
      // avanzar OA
      if (p.oa_idx + 1 < level.oas.length) {
        p.oa_idx += 1;
        return { advancedOA: true, advancedLevel: false };
      } else {
        // subir nivel
        const subj = window.CURRICULUM[subjectKey];
        const nextLevel = subj.levels.find(l => l.n === p.nivel_actual + 1);
        if (nextLevel) {
          p.nivel_actual += 1;
          p.oa_idx = 0;
          return { advancedOA: true, advancedLevel: true };
        } else {
          // ya en el último, se queda
          return { advancedOA: true, advancedLevel: false, maxed: true };
        }
      }
    }
    return { advancedOA: false, advancedLevel: false };
  },

  registerMiss(subjectKey, progress) {
    const p = progress[subjectKey];
    p.aciertos_consecutivos = 0;
    const { oa } = this.currentOA(subjectKey, progress);
    p.intentos_total[oa.code] = (p.intentos_total[oa.code] || 0) + 1;
  }
};
