// Material precargado del colegio.
// Estos materiales tienen PRIORIDAD sobre el currículo MINEDUC.
// Cuando todas las secciones de un material están dominadas, el tutor
// vuelve al currículo MINEDUC de esa materia como respaldo.

window.PRELOADED_MATERIALS = {
  ciencias: [
    {
      id: 'sistema-digestivo',
      title: 'Sistema Digestivo',
      source: 'preloaded',
      uploaded_at: '2026-06-07',
      origin: 'PDF del colegio (41 páginas)',
      sections: [
        {
          id: 'sd-1',
          title: 'Conceptos básicos de la digestión',
          content: `CONCEPTOS BÁSICOS DEL SISTEMA DIGESTIVO:

• INGESTIÓN: incorporación voluntaria de los alimentos a la cavidad bucal.
• DIGESTIÓN: reducción del alimento a moléculas pequeñas, capaces de incorporarse al metabolismo celular.
• DEGLUCIÓN: paso del bolo alimenticio desde la boca al esófago y de éste al estómago.
• ABSORCIÓN: paso de nutrientes básicos desde el tubo digestivo a la sangre o a la linfa.
• EGESTIÓN: eliminación de las sustancias no absorbidas o no digeridas por el sistema digestivo.

Estos 5 procesos ocurren en distintos órganos del aparato digestivo en orden secuencial.`
        },
        {
          id: 'sd-2',
          title: 'Boca: ingestión y saliva',
          content: `LA BOCA — INGESTIÓN Y DIGESTIÓN INICIAL:

En la boca ocurren 3 procesos en paralelo:
1. Trituración mecánica del alimento (MASTICACIÓN).
2. Humedecimiento del alimento por la saliva (INSALIVACIÓN).
3. Inicio de la digestión química de los glúcidos (carbohidratos).

El alimento masticado y mezclado con saliva forma el BOLO ALIMENTICIO, una masa uniforme y húmeda que la lengua empuja hacia la faringe en el proceso de deglución.

COMPOSICIÓN DE LA SALIVA:
• 99,5% agua
• Iones (Na+, K+, Cl-, HCO3-)
• Moco
• Lisozima (enzima bactericida)
• Amilasa salival (enzima digestiva que actúa sobre el almidón)

FUNCIONES DE LA SALIVA:
• El agua disuelve los alimentos.
• Los iones cloruro activan la amilasa salival.
• El moco lubrica los alimentos.
• La lisozima mata bacterias.
• La amilasa salival degrada el almidón a MALTOSA (disacárido).

REACCIÓN CLAVE: Almidón --(Amilasa salival)--> Maltosa
pH de la boca: NEUTRO`
        },
        {
          id: 'sd-3',
          title: 'Estómago: digestión mecánica y química',
          content: `ESTÓMAGO — DIGESTIÓN MECÁNICA Y QUÍMICA:

DIGESTIÓN MECÁNICA:
El bolo alimenticio entra por el esfínter esofágico inferior. Las contracciones musculares del estómago (movimientos de segmentación y ondas peristálticas) mezclan el alimento con el jugo gástrico, transformándolo en una sustancia cremosa y espesa llamada QUIMO.

Las ondas peristálticas son más intensas en la mitad inferior del estómago, empujando el quimo hacia el ESFÍNTER PILÓRICO. Cuando éste se abre (estimulado por el quimo), deja pasar el alimento al duodeno en pequeñas cantidades.

DIGESTIÓN QUÍMICA:
La enzima principal del jugo gástrico es la PEPSINA. Se secreta en forma inactiva como PEPSINÓGENO y se activa por el ácido clorhídrico (HCl) del estómago.

REACCIÓN CLAVE: Proteínas --(Pepsina)--> Polipéptidos y péptidos
pH del estómago: ÁCIDO (~2)`
        },
        {
          id: 'sd-4',
          title: 'Intestino delgado: anatomía y digestión química',
          content: `INTESTINO DELGADO — ANATOMÍA:

Está dividido en 3 segmentos: DUODENO, YEYUNO e ÍLEON.

ADAPTACIONES DE LA MUCOSA INTESTINAL (aumentan la superficie de absorción):
• PLIEGUES CIRCULARES (x5 de superficie)
• VELLOSIDADES INTESTINALES (x10)
• MICROVELLOSIDADES

JUGO INTESTINAL — COMPONENTES:
• Agua
• Bicarbonato
• Enzimas digestivas:
  - Dipeptidasa (degrada dipéptidos)
  - Lipasa intestinal (degrada grasas)

Además, en la membrana plasmática de las microvellosidades hay enzimas:
• Sacarasa (degrada Sacarosa)
• Lactasa (degrada Lactosa)
• Maltasa (degrada Maltosa)

pH del jugo intestinal: 7,6 (ligeramente alcalino)`
        },
        {
          id: 'sd-5',
          title: 'Glándulas anexas: hígado, vesícula y páncreas',
          content: `GLÁNDULAS ANEXAS DEL SISTEMA DIGESTIVO:

HÍGADO — FUNCIONES:
• Produce BILIS.
• Convierte el exceso de glucosa en glucógeno y lo almacena.
• Almacena hierro y vitaminas (A, B12, D, E, K).
• Detoxifica el organismo.
• Sintetiza proteínas de la coagulación sanguínea.
• Las células de Kupffer fagocitan eritrocitos y leucocitos viejos.

BILIS — COMPONENTES:
• Agua, sales biliares, pigmentos biliares (bilirrubina y biliverdina), colesterol, lecitina.
• pH: alcalino.

BILIS — FUNCIONES:
• Elimina colesterol y pigmentos biliares.
• EMULSIONA las grasas: dispersa las moléculas de grasa (como un jabón) para que la Lipasa Pancreática pueda digerirlas.

VESÍCULA BILIAR:
• No es una verdadera glándula.
• Almacena y concentra la bilis.

PÁNCREAS — FUNCIONES:
• Produce JUGO PANCREÁTICO (líquido alcalino rico en bicarbonato y enzimas).
• Fabrica hormonas (insulina, glucagón).

ENZIMAS DEL JUGO PANCREÁTICO:
• Tripsina y Quimotripsina: digieren polipéptidos y proteínas.
• Lipasa pancreática: digiere grasas.
• Amilasa pancreática: degrada almidón.
• Ribonucleasa y Desoxirribonucleasa: digieren ARN y ADN.

pH del jugo pancreático: alcalino.`
        },
        {
          id: 'sd-6',
          title: 'Digestión química por tipo de nutriente',
          content: `DIGESTIÓN QUÍMICA EN EL INTESTINO DELGADO POR NUTRIENTE:

PROTEÍNAS:
Proteínas y polipéptidos
  --(Tripsina, Quimotripsina, Carboxipeptidasa)--> Péptidos
  --(Dipeptidasa)--> Aminoácidos

LÍPIDOS (grasas):
Grasa --(Sales biliares, emulsión)--> Gotitas pequeñas
  --(Lipasa pancreática e intestinal)--> Monoglicéridos + Ácidos grasos

CARBOHIDRATOS:
Almidón --(Amilasa pancreática)--> Maltosa
Maltosa --(Maltasa)--> 2 Glucosas
Lactosa --(Lactasa)--> Glucosa + Galactosa
Sacarosa --(Sacarasa)--> Glucosa + Fructosa

Al final, todos los nutrientes complejos quedan en sus unidades básicas: aminoácidos, ácidos grasos, monosacáridos.`
        },
        {
          id: 'sd-7',
          title: 'Absorción de nutrientes',
          content: `ABSORCIÓN DE NUTRIENTES EN EL INTESTINO DELGADO:

Los nutrientes pasan desde el interior del intestino delgado a través de las células epiteliales de las vellosidades hacia los vasos sanguíneos y linfáticos.

MECANISMOS DE TRANSPORTE POR NUTRIENTE:
• GLUCOSA y GALACTOSA: transporte activo secundario con Na+ → sangre
• FRUCTOSA: difusión facilitada → sangre
• AMINOÁCIDOS: transporte activo o secundario con Na+ → sangre
• DIPÉPTIDOS y TRIPÉPTIDOS: transporte activo o secundario con H+ → sangre
• ÁCIDOS GRASOS pequeños: difusión simple → sangre
• ÁCIDOS GRASOS grandes (QUILOMICRONES): difusión → LINFA

VÍAS DE ABSORCIÓN:
1. Vía sanguínea: nutrientes básicos (glucosa, aminoácidos, ácidos grasos pequeños, vitaminas) → VENA PORTA-HEPÁTICA → HÍGADO → resto del cuerpo.
2. Vía linfática: quilomicrones (grasas) → quilífero central → vena subclavia izquierda → resto del cuerpo (saltándose el hígado).`
        },
        {
          id: 'sd-8',
          title: 'Intestino grueso y egestión',
          content: `INTESTINO GRUESO:

DIGESTIÓN QUÍMICA:
La etapa final de la digestión ocurre en el COLON por la actividad de las bacterias intestinales (flora intestinal).

Las bacterias intestinales:
• Fermentan los carbohidratos residuales liberando H2, CO2 y metano.
• Convierten las proteínas residuales en aminoácidos y luego en indol y sulfuro de hidrógeno.
• Sintetizan vitaminas del complejo B y vitamina K, que se absorben en el colon.

ABSORCIÓN Y FORMACIÓN DE HECES:
El quilo permanece 3 a 10 horas en el intestino grueso. Al absorberse agua, adquiere consistencia sólida o semisólida → HECES FECALES.

Las heces contienen: agua, sales minerales, células epiteliales, bacterias, productos de descomposición bacteriana, materiales digeridos y no absorbidos, partes no digeribles.

El intestino grueso absorbe 0,5 a 1 litro de agua diarios, electrólitos y algunas vitaminas.

EGESTIÓN: eliminación de las heces por el ano.

SÍNTESIS GENERAL — TRANSFORMACIONES DEL ALIMENTO:
Boca → Bolo alimenticio (digestión carbohidratos)
Esófago → Bolo
Estómago → Quimo (digestión proteínas)
Intestino delgado → Quilo (digestión proteínas, lípidos, carbohidratos + ABSORCIÓN)
Intestino grueso → Heces (EGESTIÓN)`
        }
      ]
    }
  ]
};

// Estado de progresión por material del cole (paralelo al de MINEDUC)
window.SchoolProgression = {
  initialState() {
    // map por materia: lista de material progress
    const out = {};
    Object.keys(window.CURRICULUM).forEach(k => { out[k] = {}; });
    return out;
  },

  // Devuelve {material, section, idx, allMastered} o null si no hay material activo en esa materia
  nextActive(subjectKey, state) {
    const materials = (state.school_materials || {})[subjectKey] || [];
    if (!materials.length) return null;
    const sp = (state.school_progress || {})[subjectKey] || {};
    for (const m of materials) {
      const mp = sp[m.id] || { mastered: [], aciertos: 0, attempts: {} };
      for (let i = 0; i < m.sections.length; i++) {
        if (!mp.mastered.includes(m.sections[i].id)) {
          return { material: m, section: m.sections[i], idx: i, mp };
        }
      }
    }
    return { allMastered: true };
  },

  ensureProgress(state, subjectKey, materialId) {
    state.school_progress = state.school_progress || {};
    state.school_progress[subjectKey] = state.school_progress[subjectKey] || {};
    if (!state.school_progress[subjectKey][materialId]) {
      state.school_progress[subjectKey][materialId] = { mastered: [], aciertos: 0, attempts: {} };
    }
    return state.school_progress[subjectKey][materialId];
  },

  registerHit(state, subjectKey, materialId, sectionId) {
    const mp = this.ensureProgress(state, subjectKey, materialId);
    mp.attempts[sectionId] = (mp.attempts[sectionId] || 0) + 1;
    mp.aciertos = (mp.aciertos || 0) + 1;
    if (mp.aciertos >= 3) {
      mp.aciertos = 0;
      if (!mp.mastered.includes(sectionId)) mp.mastered.push(sectionId);
      return { sectionMastered: true };
    }
    return { sectionMastered: false };
  },

  registerMiss(state, subjectKey, materialId, sectionId) {
    const mp = this.ensureProgress(state, subjectKey, materialId);
    mp.attempts[sectionId] = (mp.attempts[sectionId] || 0) + 1;
    mp.aciertos = 0;
  },

  addMaterial(state, subjectKey, material) {
    state.school_materials = state.school_materials || {};
    state.school_materials[subjectKey] = state.school_materials[subjectKey] || [];
    // evitar duplicados por id
    const existing = state.school_materials[subjectKey].findIndex(m => m.id === material.id);
    if (existing >= 0) {
      state.school_materials[subjectKey][existing] = material;
    } else {
      state.school_materials[subjectKey].push(material);
    }
  },

  removeMaterial(state, subjectKey, materialId) {
    if (!state.school_materials?.[subjectKey]) return;
    state.school_materials[subjectKey] = state.school_materials[subjectKey].filter(m => m.id !== materialId);
    if (state.school_progress?.[subjectKey]?.[materialId]) {
      delete state.school_progress[subjectKey][materialId];
    }
    // recordar para no re-mergear si era precargado
    state.preloaded_dismissed = state.preloaded_dismissed || [];
    if (!state.preloaded_dismissed.includes(materialId)) {
      state.preloaded_dismissed.push(materialId);
    }
  },

  // Cargar materiales precargados solo si no existen en el estado del usuario
  // y no fueron descartados previamente.
  mergePreloaded(state) {
    state.school_materials = state.school_materials || {};
    const dismissed = new Set(state.preloaded_dismissed || []);
    Object.entries(window.PRELOADED_MATERIALS).forEach(([subj, mats]) => {
      state.school_materials[subj] = state.school_materials[subj] || [];
      mats.forEach(m => {
        if (dismissed.has(m.id)) return;
        if (!state.school_materials[subj].some(x => x.id === m.id)) {
          state.school_materials[subj].push(m);
        }
      });
    });
  }
};
