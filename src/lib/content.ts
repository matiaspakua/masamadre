// Bilingual content for Masa Madre. Spanish is the default; English is the
// alternate. The shape is enforced by the SiteContent interface so both
// language trees can never drift apart. Components read content through the
// useContent() hook (see i18n.tsx), never importing a language directly.

export type Lang = 'es' | 'en';

export type TimelineEvent = {
  era: string;
  year: string;
  region: string;
  title: string;
  body: string;
};

export type LabStage = {
  key: string;
  label: string;
  hours: string;
  ph: number;
  temp: string;
  activity: number;
  note: string;
};

export type Microbe = {
  key: string;
  name: string;
  latin: string;
  role: string;
  makes: string;
};

export type MicroLevel = {
  key: string;
  mag: string;
  scale: string;
  title: string;
  body: string;
  notes: string[];
};

export type ProcessStep = { n: number; name: string; detail: string };
export type OvenChange = { temp: string; title: string; body: string };
export type CompositionFact = { key: string; title: string; body: string };
export type Benefit = { title: string; body: string };
export type Ingredient = {
  key: string;
  name: string;
  tag: string;
  body: string;
  img: string;
};
export type BreadType = {
  key: string;
  name: string;
  origin: string;
  body: string;
  img: string;
};
export type Reference = {
  authors?: string;
  title: string;
  source: string;
  year?: string;
  url?: string;
  note?: string;
};
export type ReferenceShelf = {
  key: string;
  label: string;
  blurb: string;
  items: Reference[];
};

export interface SiteContent {
  nav: { sections: { id: string; label: string }[]; langLabel: string };
  hero: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    thesis: string;
    scrollCue: string;
    imageAlt: string;
  };
  origins: {
    index: string;
    eyebrow: string;
    titleA: string;
    titleB: string;
    p1: string;
    p2: string;
    ingredientsHeading: string;
  };
  ingredients: Ingredient[];
  timeline: {
    index: string;
    eyebrow: string;
    title: string;
    cue: string;
    events: TimelineEvent[];
  };
  lab: {
    index: string;
    eyebrow: string;
    titleA: string;
    titleB: string;
    intro: string;
    inhabitants: string;
    quote: string;
    stages: LabStage[];
    microbes: Microbe[];
    readout: { temp: string; elapsed: string; gas: string };
    calc: {
      heading: string;
      sub: string;
      flour: string;
      hydration: string;
      saltPct: string;
      starterPct: string;
      water: string;
      salt: string;
      starter: string;
      total: string;
      grams: string;
      note: string;
    };
    micro: {
      heading: string;
      sub: string;
      magLabel: string;
      scaleLabel: string;
      levels: MicroLevel[];
    };
    bake: {
      heading: string;
      sub: string;
      blendLabel: string;
      blendHint: string;
      addFlour: string;
      totalFlourLabel: string;
      seedsLabel: string;
      seedsHint: string;
      addSeed: string;
      emptyBlend: string;
      tempLabel: string;
      steamLabel: string;
      bakeBtn: string;
      bakingBtn: string;
      resetBtn: string;
      clock: string;
      phaseLabel: string;
      stages: {
        shape: string;
        proof: string;
        load: string;
        spring: string;
        crust: string;
        done: string;
        cooling: string;
      };
      result: {
        title: string;
        bakeTime: string;
        spring: string;
        crust: string;
        crumb: string;
        min: string;
      };
      crustLevels: string[];
      crumbLevels: string[];
      flours: { key: string; name: string; note: string }[];
      seeds: { key: string; name: string }[];
    };
  };
  starter: {
    index: string;
    eyebrow: string;
    titleA: string;
    titleB: string;
    intro: string;
    feed: string;
    signLabel: string;
    days: { d: string; phase: string; action: string; sign: string }[];
    test: { tag: string; title: string; body: string };
  };
  breadTypes: {
    index: string;
    eyebrow: string;
    titleA: string;
    titleB: string;
    intro: string;
    items: BreadType[];
  };
  process: {
    index: string;
    eyebrow: string;
    titleA: string;
    titleB: string;
    steps: ProcessStep[];
  };
  composition: {
    index: string;
    eyebrow: string;
    titleA: string;
    titleB: string;
    facts: CompositionFact[];
    equationLabel: string;
    equationNote: string;
    sugar: string;
  };
  oven: {
    index: string;
    eyebrow: string;
    titleA: string;
    titleB: string;
    intro: string;
    changes: OvenChange[];
    cooling: string;
  };
  benefits: {
    index: string;
    eyebrow: string;
    titleA: string;
    titleB: string;
    items: Benefit[];
  };
  references: {
    index: string;
    eyebrow: string;
    titleA: string;
    titleB: string;
    intro: string;
    cover: { kicker: string; title: string; subtitle: string };
    prev: string;
    next: string;
    pageLabel: string;
    openLabel: string;
    disclaimer: string;
    shelves: ReferenceShelf[];
  };
  closing: {
    index: string;
    title: string;
    body: string;
    signature: string;
    footer: string;
  };
  notFound: { code: string; titleA: string; titleB: string; body: string; back: string };
}

const es: SiteContent = {
  nav: {
    langLabel: 'EN',
    sections: [
      { id: 'hero', label: 'Inicio' },
      { id: 'origins', label: 'Orígenes' },
      { id: 'timeline', label: 'Historia' },
      { id: 'laboratory', label: 'Laboratorio' },
      { id: 'starter', label: 'Crear fermento' },
      { id: 'breads', label: 'Panes' },
      { id: 'process', label: 'Proceso' },
      { id: 'composition', label: 'Composición' },
      { id: 'baking', label: 'El Horno' },
      { id: 'benefits', label: 'Beneficios' },
      { id: 'references', label: 'Referencias' },
      { id: 'closing', label: 'Cierre' },
    ],
  },
  hero: {
    eyebrow: 'Un museo digital y laboratorio vivo',
    titleA: 'Masa',
    titleB: 'Madre',
    thesis:
      'El pan es la tecnología más antigua que todavía comemos. La masa madre lo es aún más: un cultivo de levaduras salvajes y bacterias que lleva seis mil años vivo. Esta es su historia a través del tiempo, y su biología bajo el microscopio.',
    scrollCue: 'Descender',
    imageAlt: 'Hogaza de pan de masa madre recién horneada',
  },
  origins: {
    index: 'I',
    eyebrow: 'Orígenes',
    titleA: 'Grano molido,',
    titleB: 'aire salvaje',
    p1: 'El primer fermento fue un accidente de paciencia. Harina y agua, dejadas el tiempo suficiente, nunca están realmente solas: el grano lleva levaduras salvajes y el aire lleva bacterias lácticas. Espera, y la mezcla empieza a respirar.',
    p2: 'Cualquier harina fermenta, pero una hogaza porosa y aireada necesita fuerza: una harina capaz de absorber agua y formar gluten a partir de sus proteínas. La sal afina el trabajo, frenando las enzimas y tensando la masa. De esas cuatro cosas —harina, agua, sal y tiempo— desciende todo el pan de este archivo.',
    ingredientsHeading: 'Cuatro materias',
  },
  ingredients: [
    { key: 'flour', name: 'Harina', tag: 'Estructura y combustible', body: 'La proteína del trigo construye el gluten; su almidón alimenta a la levadura.', img: 'flour' },
    { key: 'water', name: 'Agua', tag: 'El medio de la vida', body: 'Hidrata la harina, activa las enzimas y despierta al cultivo dormido.', img: 'water' },
    { key: 'salt', name: 'Sal', tag: 'Control y sabor', body: 'Regula la actividad enzimática y la fermentación, y tensa la estructura.', img: 'salt' },
    { key: 'wheat', name: 'Grano', tag: 'El origen del trigo', body: 'Domesticado hace diez mil años, el cereal que ató al ser humano a la tierra.', img: 'wheat' },
  ],
  timeline: {
    index: 'II',
    eyebrow: 'Historia',
    title: 'Seis mil años',
    cue: 'Desliza para avanzar en el tiempo →',
    events: [
      { era: 'I', year: 'c. 8000 a.C.', region: 'Creciente Fértil', title: 'El primer grano', body: 'Se domestican el trigo y la cebada silvestres. La agricultura ata a la gente a un lugar, y el grano molido con agua se convierte en las primeras gachas y panes planos: la materia prima de todo lo que sigue.' },
      { era: 'II', year: 'c. 3700 a.C.', region: 'Suiza', title: 'El fermento más antiguo', body: 'Aquí se excava uno de los panes de masa madre más antiguos que se conocen. Mucho antes de poder nombrar un microbio, las levaduras y bacterias salvajes de la harina ya levantaban la masa por sí solas.' },
      { era: 'III', year: 'c. 3000 a.C.', region: 'Antiguo Egipto', title: 'El pan como moneda', body: 'Las panaderías egipcias industrializan la fermentación. El pan y la cerveza comparten el mismo fermento vivo; las hogazas se vuelven salario, ofrenda y vida cotidiana a orillas del Nilo.' },
      { era: 'IV', year: 'c. 77 d.C.', region: 'Roma', title: 'Plinio lo escribe', body: 'Plinio el Viejo documenta varios métodos para conservar y renovar un fermento. La masa madre es ya un oficio registrado, llevado por todo el Imperio en un tarro de masa en fermentación.' },
      { era: 'V', year: 'c. 1300 d.C.', region: 'Europa medieval', title: 'La era del barm', body: 'Cervecería y panadería se entrelazan. El barm —la espuma de la cerveza en fermentación— empieza a reemplazar al fermento salvaje, cambiando acidez y conservación por velocidad y una miga más ligera.' },
      { era: 'VI', year: '1857', region: 'Francia', title: 'La fermentación explicada', body: 'Louis Pasteur demuestra que la fermentación es obra de microorganismos vivos. Los cultivos invisibles que los panaderos manejaban por intuición desde hace milenios tienen al fin una biología.' },
      { era: 'VII', year: '1849', region: 'San Francisco', title: 'Una ciudad y su cepa', body: 'Panaderos franceses llevan su fermento a la California de la fiebre del oro. El cultivo local se vuelve tan distintivo que su bacteria dominante acaba llamándose Fructilactobacillus sanfranciscensis: un lugar inscrito en una especie.' },
      { era: 'VIII', year: '1898', region: 'Klondike y Alaska', title: 'Los sourdoughs', body: 'Los buscadores de oro guardan un tarro de fermento durante el invierno boreal, a veces durmiendo a su lado para darle calor. Se llaman a sí mismos «sourdoughs», y Robert Service los lleva al verso.' },
      { era: 'IX', year: '1961', region: 'Mundo industrial', title: 'El eclipse silencioso', body: 'La levadura comercial rápida y el proceso Chorleywood permiten hacer pan en horas. El fermento salvaje casi desaparece del supermercado, preservado por una minoría tenaz de panaderos.' },
      { era: 'X', year: '2020', region: 'En todas partes', title: 'El renacer en la cocina', body: 'Con la levadura comercial escasa durante los confinamientos, millones alimentan un tarro de harina y agua y lo ven cobrar vida. El fermento más antiguo se vuelve, de nuevo, el más personal.' },
    ],
  },
  lab: {
    index: 'III',
    eyebrow: 'El Laboratorio',
    titleA: 'Un cultivo,',
    titleB: 'observado',
    intro:
      'La masa madre es una simbiosis: levaduras salvajes y bacterias lácticas que viven en harina y agua. Avanza la fermentación y observa cómo responde la estación de trabajo: el gas subiendo, el pH bajando, la hogaza aprendiendo a protegerse.',
    inhabitants: 'Habitantes · toca para inspeccionar',
    quote:
      '«La levadura hace el gas. Las bacterias hacen el ácido. Juntas hacen el pan, y lo mantienen seguro.»',
    stages: [
      { key: 'mix', label: 'Mezcla fresca', hours: '0 h', ph: 6.0, temp: '24°C', activity: 0.12, note: 'La harina se encuentra con el agua. Las levaduras salvajes y las bacterias lácticas despiertan del grano y empiezan a comer los azúcares liberados.' },
      { key: 'rise', label: 'Subida activa', hours: '6 h', ph: 4.8, temp: '26°C', activity: 0.55, note: 'Las levaduras exhalan dióxido de carbono; el cultivo se llena de espuma y se abomba. Las bacterias vierten ácido láctico y el pH inicia su larga caída.' },
      { key: 'peak', label: 'Pico', hours: '12 h', ph: 4.1, temp: '27°C', activity: 0.92, note: 'La producción de gas alcanza su máximo. El fermento triplica su volumen y huele a yogur y sidra: la simbiosis a plena voz.' },
      { key: 'mature', label: 'Maduro y ácido', hours: '24 h', ph: 3.8, temp: '25°C', activity: 0.4, note: 'La acidez se asienta en el rango 3,8–4,5. Por debajo de pH 4,6 la mayoría de patógenos no sobreviven: la hogaza se protege a sí misma.' },
    ],
    microbes: [
      { key: 'yeast', name: 'Levadura salvaje', latin: 'Saccharomyces cerevisiae · Kazachstania humilis', role: 'El motor de la subida', makes: 'Fermenta los azúcares en dióxido de carbono —el gas que infla la masa— más una traza de etanol para el aroma.' },
      { key: 'bacteria', name: 'Bacterias lácticas', latin: 'Fructilactobacillus sanfranciscensis · Limosilactobacillus pontis', role: 'El acidificante', makes: 'Convierte los azúcares en ácido láctico (y algo de ácido acético), bajando el pH, profundizando el sabor y protegiendo la hogaza.' },
    ],
    readout: { temp: 'Temp', elapsed: 'Tiempo', gas: 'Gas' },
    calc: {
      heading: 'Calculadora de masa',
      sub: 'Porcentaje de panadero',
      flour: 'Harina',
      hydration: 'Hidratación',
      saltPct: 'Sal',
      starterPct: 'Masa madre',
      water: 'Agua',
      salt: 'Sal',
      starter: 'Masa madre',
      total: 'Masa total',
      grams: 'g',
      note: 'Todo se calcula como porcentaje del peso de la harina. Ajusta los controles y observa cómo cambia la receta.',
    },
    micro: {
      heading: 'Del pan a la molécula',
      sub: 'Microscopio · acerca para explorar',
      magLabel: 'Aumento',
      scaleLabel: 'Escala',
      levels: [
        { key: 'loaf', mag: '1×', scale: '≈ 12 cm', title: 'La hogaza', body: 'A simple vista: corteza, miga y greña. La corteza es azúcar caramelizado; la miga, una espuma sólida de gas atrapado. El carácter del pan empieza aquí.', notes: ['Corteza caramelizada', 'Greña y forma', 'Miga abierta y elástica'] },
        { key: 'crumb', mag: '12×', scale: '≈ 5 mm', title: 'La miga', body: 'Acercándonos, la miga es una red de alvéolos: burbujas de dióxido de carbono que la levadura exhaló, atrapadas por paredes de masa que el calor fijó.', notes: ['Alvéolos de CO₂', 'Paredes de masa', 'La red que retiene el gas'] },
        { key: 'gluten', mag: '250×', scale: '≈ 200 µm', title: 'Gluten y almidón', body: 'Las paredes son gluten: una malla elástica de glutenina y gliadina hidratadas. Entre sus hilos, gránulos de almidón gelatinizado dan cuerpo a la estructura.', notes: ['Malla de gluten (glutenina + gliadina)', 'Gránulos de almidón', 'Elasticidad y retención de agua'] },
        { key: 'microbes', mag: '3000×', scale: '≈ 20 µm', title: 'Los microbios', body: 'En la masa viva: levaduras en gemación y bacterias lácticas en forma de bacilo. Las primeras producen CO₂; las segundas, ácido láctico que baja el pH.', notes: ['Levadura en gemación (Saccharomyces)', 'Bacterias lácticas (Lactobacillus)', 'CO₂ + ácido láctico'] },
        { key: 'molecular', mag: '60 000×', scale: '≈ 2 nm', title: 'El nivel molecular', body: 'Hasta la materia misma: cadenas de amilosa y amilopectina (almidón), proteínas plegadas del gluten y moléculas de ácido láctico. Aquí nacen la estructura y el sabor.', notes: ['Amilosa y amilopectina', 'Proteína de gluten plegada', 'Ácido láctico · C₃H₆O₃'] },
      ],
    },
    bake: {
      heading: 'El horno · simulador',
      sub: 'Diseña tu fórmula y hornéala',
      blendLabel: 'Mezcla de harinas',
      blendHint: 'Combina harinas en gramos. Ej.: 700 g blanca + 200 g integral + 100 g espelta.',
      addFlour: 'Añadir harina',
      totalFlourLabel: 'Harina total',
      seedsLabel: 'Semillas',
      seedsHint: 'Suma las semillas que quieras, en gramos.',
      addSeed: 'Añadir semilla',
      emptyBlend: 'Añade al menos una harina para empezar.',
      tempLabel: 'Temperatura',
      steamLabel: 'Vapor',
      bakeBtn: 'Hornear',
      bakingBtn: 'Horneando…',
      resetBtn: 'Otra hornada',
      clock: 'min',
      phaseLabel: 'Fase',
      stages: {
        shape: 'Formado',
        proof: 'Fermentación',
        load: 'Al horno',
        spring: 'Subida en horno',
        crust: 'Formando corteza',
        done: 'Horneado',
        cooling: 'Enfriando',
      },
      result: {
        title: 'Resultado',
        bakeTime: 'Tiempo de horneado',
        spring: 'Subida',
        crust: 'Corteza',
        crumb: 'Miga',
        min: 'min',
      },
      crustLevels: ['Pálida', 'Dorada', 'Profunda', 'Intensa'],
      crumbLevels: ['Cerrada', 'Pareja', 'Abierta', 'Salvaje'],
      flours: [
        { key: 'white', name: 'Blanca', note: 'Floja y clara; miga tierna.' },
        { key: 'strong', name: 'De fuerza', note: 'Mucho gluten, gran subida.' },
        { key: 'wholewheat', name: 'Integral', note: 'Más fibra, sube menos, tuesta antes.' },
        { key: 'spelt', name: 'Espelta', note: 'Nuez y dulzor, gluten delicado.' },
        { key: 'rye', name: 'Centeno', note: 'Densa y oscura, muy húmeda.' },
        { key: 'oat', name: 'Avena', note: 'Suave y pálida, mejor mezclada.' },
        { key: 'semolina', name: 'Sémola', note: 'Trigo duro, miga amarilla y firme.' },
        { key: 'einkorn', name: 'Escanda', note: 'Grano antiguo, dorado y dulce.' },
      ],
      seeds: [
        { key: 'sesame', name: 'Sésamo' },
        { key: 'poppy', name: 'Amapola' },
        { key: 'sunflower', name: 'Girasol' },
        { key: 'flax', name: 'Lino' },
        { key: 'pumpkin', name: 'Calabaza' },
        { key: 'chia', name: 'Chía' },
        { key: 'millet', name: 'Mijo' },
        { key: 'caraway', name: 'Alcaravea' },
      ],
    },
  },
  starter: {
    index: 'IV',
    eyebrow: 'Guía · de la nada a la vida',
    titleA: 'Cría tu',
    titleB: 'masa madre',
    intro:
      'No se compra: se cría. Con harina, agua y siete días de paciencia, un frasco pasa de inerte a burbujeante. Cada día descartas la mitad y vuelves a alimentar; el cultivo aprende un ritmo y, al final, levanta una hogaza por sí solo.',
    feed: 'Alimentación 1:1:1 · harina : agua : fermento, en peso',
    signLabel: 'Señal',
    days: [
      { d: '01', phase: 'La mezcla', action: 'Une 50 g de harina integral y 50 g de agua tibia en un frasco. Tápalo sin cerrar y déjalo a 24–26 °C.', sign: 'Nada todavía, o alguna burbuja suelta. El grano y el aire empiezan a poblarlo.' },
      { d: '02', phase: 'Primeras señales', action: 'Descarta la mitad. Alimenta con 50 g de harina y 50 g de agua, y remueve bien.', sign: 'Burbujas dispersas y un olor crudo, casi avinagrado. La población despierta.' },
      { d: '03', phase: 'El falso arranque', action: 'Vuelve a descartar la mitad y alimentar 1:1:1, a la misma hora cada día.', sign: 'Sube, huele fuerte… y se calma. Mandan las bacterias; las levaduras aún no.' },
      { d: '04', phase: 'Cambia el aroma', action: 'Descarta y alimenta. Si hace calor, hazlo dos veces al día.', sign: 'De avinagrado pasa a yogur y fruta. Más burbujas, más constancia.' },
      { d: '05', phase: 'Su propio ritmo', action: 'Sigue alimentando 1:1:1 a la misma hora. Marca el nivel con una banda.', sign: 'Sube y baja de forma predecible. Casi dobla entre comidas.' },
      { d: '06', phase: 'Casi listo', action: 'Alimenta y cronometra cuánto tarda en llegar al pico.', sign: 'Dobla en 4–8 h, con cúpula de burbujas y olor a sidra.' },
      { d: '07', phase: 'Vivo y maduro', action: 'Alimenta, espera el pico y hornea —o guárdalo en la nevera y aliméntalo cada semana.', sign: 'Triplica, huele a yogur y manzana, y pasa la prueba de flotación.' },
    ],
    test: {
      tag: 'La prueba',
      title: '¿Está listo? Que flote.',
      body: 'Deja caer una cucharadita del fermento en su pico sobre un vaso de agua. Si flota, el gas atrapado confirma que tiene fuerza para levantar una hogaza. Si se hunde, dale otra alimentación y prueba de nuevo mañana.',
    },
  },
  breadTypes: {
    index: 'V',
    eyebrow: 'Familias del pan',
    titleA: 'Un grano,',
    titleB: 'mil panes',
    intro:
      'La misma química —harina, agua, sal, tiempo— se ramifica en tradiciones según el clima, el cereal y la mano. Una pequeña colección del archivo.',
    items: [
      { key: 'sourdough', name: 'Masa madre', origin: 'Universal', body: 'Corteza profunda, miga abierta y acidez limpia. El pan que fermenta solo, con levaduras salvajes.', img: 'hero-sourdough' },
      { key: 'baguette', name: 'Baguette', origin: 'Francia', body: 'Corteza fina y crujiente sobre una miga ligera y alveolada. Geometría de la simplicidad.', img: 'baguette' },
      { key: 'rye', name: 'Pan de centeno', origin: 'Norte de Europa', body: 'Denso, oscuro y húmedo. El centeno acidifica fuerte y conserva durante semanas.', img: 'rye' },
      { key: 'ciabatta', name: 'Chapata', origin: 'Italia', body: 'Muy hidratada y plana, con grandes alvéolos irregulares. Nacida para mojar en aceite.', img: 'ciabatta' },
      { key: 'wholewheat', name: 'Trigo integral', origin: 'Universal', body: 'Con el salvado y el germen intactos: más fibra, más minerales, sabor a campo.', img: 'wholewheat' },
    ],
  },
  process: {
    index: 'VI',
    eyebrow: 'Del fermento al horno',
    titleA: 'Doce pasos,',
    titleB: 'una subida',
    steps: [
      { n: 1, name: 'Mise en place', detail: 'Todo en su lugar. Harina, agua, sal y una masa madre madura, pesadas y a la espera.' },
      { n: 2, name: 'Autólisis', detail: 'La harina y el agua reposan solas. Las enzimas empiezan a liberar azúcares del almidón: sabor, combustible y corteza futura.' },
      { n: 3, name: 'Amasado', detail: 'Se unen masa madre y masa. La glutenina y la gliadina se hidratan y se enlazan formando el gluten, el andamio elástico de la masa.' },
      { n: 4, name: 'Desarrollo del gluten', detail: 'Estirar y plegar alinea la red proteica hasta que la masa se vuelve lisa, fuerte y capaz de atrapar gas.' },
      { n: 5, name: 'Fermentación en bloque', detail: 'El cultivo come azúcares y exhala dióxido de carbono. La masa crece; el ácido láctico se acumula; la transformación está en marcha.' },
      { n: 6, name: 'División', detail: 'La masa se corta en piezas del tamaño de una hogaza, cada una con su parte del fermento vivo.' },
      { n: 7, name: 'Preformado', detail: 'Un boleado suelto da tensión y dirección a la masa sin forzarla.' },
      { n: 8, name: 'Reposo en mesa', detail: 'El gluten se relaja. La masa toma aire para que la forma final aguante.' },
      { n: 9, name: 'Formado final', detail: 'Se construye la hogaza: tensión en la superficie, una estructura abierta y llena de gas por dentro.' },
      { n: 10, name: 'Fermentación final', detail: 'La última subida. Una presión suave que vuelve despacio dice que la masa está viva y lista para el calor.' },
      { n: 11, name: 'Horneado', detail: 'Al horno, donde ocurren tres transformaciones a la vez y una masa húmeda se vuelve pan.' },
      { n: 12, name: 'Enfriado', detail: 'Las proteínas se asientan, la miga se estabiliza, y el crujido de la corteza es la hogaza terminándose al enfriar.' },
    ],
  },
  composition: {
    index: 'VII',
    eyebrow: 'Composición y química',
    titleA: 'De qué está hecha',
    titleB: 'una hogaza',
    facts: [
      { key: 'gluten', title: 'Gluten', body: 'La proteína del trigo, formada cuando la glutenina y la gliadina se hidratan y se enlazan. Fuerza aquí significa capacidad de retener agua y gas: la diferencia entre una loseta densa y una miga abierta y aireada.' },
      { key: 'starch', title: 'Almidón', body: 'Una macromolécula de reserva de amilosa y amilopectina. Las enzimas la rompen en azúcares: alimento para la levadura, dulzor en la lengua y combustible para el dorado de la corteza.' },
      { key: 'enzymes', title: 'Enzimas', body: 'Catalizadores proteicos que aceleran reacciones lentas. La acidificación durante la fermentación enciende enzimas del cereal —fitasas, proteasas— que remodelan el grano en silencio.' },
      { key: 'acids', title: 'Ácidos', body: 'Domina el ácido láctico, con una nota más punzante de ácido acético. Juntos fijan el sabor y empujan el pH al rango ácido protector de 3,8–4,5.' },
    ],
    equationLabel: 'Fermentación láctica',
    equationNote:
      'La fermentación homoláctica produce solo ácido láctico; la heteroláctica —la vía de la fosfocetolasa— libera además el dióxido de carbono que levanta la masa y el etanol que la aromatiza.',
    sugar: '(azúcar)',
  },
  oven: {
    index: 'VIII',
    eyebrow: 'El Horno',
    titleA: 'Tres cambios,',
    titleB: 'a la vez',
    intro:
      'El calor termina la fermentación y empieza el pan. En unos cientos de grados, una masa floja y viva queda fijada para siempre en corteza y miga.',
    changes: [
      { temp: '150°C+', title: 'Caramelización', body: 'Los azúcares liberados en la fermentación se doran en la superficie, construyendo el color, el aroma y la profundidad agridulce de la corteza.' },
      { temp: '160°C', title: 'Las proteínas coagulan', body: 'El gluten se fija. Las proteínas se alinean y se traban, fijando para siempre la estructura aireada de la miga.' },
      { temp: '180°C', title: 'Los almidones solidifican', body: 'El almidón gelatinizado se afirma en una matriz estable. El interior pasa de masa a pan verdadero, que se puede cortar.' },
    ],
    cooling:
      'Después llega el enfriado: el paso final y silencioso. Las proteínas se asientan, la miga se estabiliza y la corteza canta al contraerse. La hogaza sigue haciéndose mucho después de salir del calor.',
  },
  benefits: {
    index: 'IX',
    eyebrow: 'Beneficios y matices',
    titleA: 'Ventajas reales,',
    titleB: 'contadas con honestidad',
    items: [
      { title: 'Predigerido por microbios', body: 'La fermentación descompone las proteínas en sus aminoácidos y preprocesa el almidón. La hogaza llega en parte digerida, lo que muchos encuentran más suave.' },
      { title: 'Minerales liberados', body: 'Los granos enteros llevan ácido fítico, que secuestra hierro, zinc, magnesio y calcio. La fermentación láctica activa la fitasa, liberando esos minerales para su absorción.' },
      { title: 'Un azúcar más lento', body: 'La acidificación retrasa la digestibilidad del almidón, tendiendo a una respuesta glucémica más baja que el pan blanco de levadura rápida.' },
      { title: 'Matiz honesto', body: 'La masa madre es pan, no medicina. Las ventajas son reales pero modestas, y dependen de la harina, el tiempo y la hidratación. Hablar de panacea es exagerar la evidencia.' },
    ],
  },
  references: {
    index: 'X',
    eyebrow: 'El libro de referencias',
    titleA: 'Las fuentes',
    titleB: 'que lo sostienen',
    intro:
      'Cada afirmación de este archivo se apoya en literatura revisada por pares, libros de referencia e instituciones que estudian la masa madre. Pasa las páginas de este libro para leer la bibliografía.',
    cover: {
      kicker: 'Bibliografía · masa madre',
      title: 'El libro de\nreferencias',
      subtitle: 'Ciencia, historia y oficio del pan fermentado',
    },
    prev: 'Anterior',
    next: 'Siguiente',
    pageLabel: 'Página',
    openLabel: 'Abrir fuente ↗',
    disclaimer:
      'Bibliografía con fines divulgativos. Verifica siempre las recetas y datos nutricionales con la fuente original.',
    shelves: [
      {
        key: 'books',
        label: 'Libros',
        blurb: 'El canon: divulgación y manuales de oficio que sustentan la historia y la técnica.',
        items: [
          {
            authors: 'Michael Pollan',
            title: 'Cooked: A Natural History of Transformation',
            source: 'The Penguin Press',
            year: '2013',
            url: 'https://michaelpollan.com/books/cooked/',
            note: 'La parte «Aire» sigue el aprendizaje del pan con masa madre junto a Chad Robertson.',
          },
          {
            authors: 'Michael Pollan',
            title: 'The Omnivore’s Dilemma',
            source: 'The Penguin Press',
            year: '2006',
            url: 'https://michaelpollan.com/books/the-omnivores-dilemma/',
            note: 'El recorrido del trigo y el grano dentro de la cadena alimentaria moderna.',
          },
          {
            authors: 'Chad Robertson',
            title: 'Tartine Bread',
            source: 'Chronicle Books',
            year: '2010',
            url: 'https://www.chroniclebooks.com/products/tartine-bread',
            note: 'El manual de referencia de la hogaza de campo de masa madre.',
          },
          {
            authors: 'Harold McGee',
            title: 'On Food and Cooking: The Science and Lore of the Kitchen',
            source: 'Scribner',
            year: '2004',
            note: 'Obra de cabecera sobre la química del gluten, el almidón y la fermentación.',
          },
        ],
      },
      {
        key: 'papers',
        label: 'Artículos científicos',
        blurb: 'Investigación revisada por pares sobre la microbiología y bioquímica del fermento.',
        items: [
          {
            authors: 'Landis, E. A., Oliverio, A. M., et al.',
            title: 'The diversity and function of sourdough starter microbiomes',
            source: 'eLife 10:e61644',
            year: '2021',
            url: 'https://elifesciences.org/articles/61644',
            note: '500 fermentos de cuatro continentes secuenciados con ciencia ciudadana.',
          },
          {
            authors: 'Gänzle, M. G.',
            title: 'Enzymatic and bacterial conversions during sourdough fermentation',
            source: 'Food Microbiology 37, 2–10',
            year: '2014',
            url: 'https://doi.org/10.1016/j.fm.2013.04.007',
            note: 'Cómo las enzimas del cereal y las bacterias lácticas remodelan la masa.',
          },
          {
            authors: 'Gobbetti, M. & Gänzle, M. (eds.)',
            title: 'Handbook on Sourdough Biotechnology',
            source: 'Springer Nature (2.ª ed.)',
            year: '2023',
            url: 'https://link.springer.com/book/10.1007/978-1-4614-5425-0',
            note: 'La obra de referencia dedicada por completo a la biotecnología de la masa madre.',
          },
        ],
      },
      {
        key: 'institutions',
        label: 'Instituciones y proyectos',
        blurb: 'Centros y proyectos que preservan y estudian la biodiversidad del fermento.',
        items: [
          {
            authors: 'Puratos · Karl De Smedt',
            title: 'The Sourdough Library & Quest for Sourdough',
            source: 'Sankt Vith, Bélgica',
            url: 'https://www.questforsourdough.com/',
            note: 'La única biblioteca de masas madre del mundo: cepas vivas de todo el planeta.',
          },
          {
            authors: 'Rob Dunn Lab · NC State University',
            title: 'Wild Sourdough & Global Sourdough Project',
            source: 'Dept. of Applied Ecology, EE. UU.',
            url: 'https://robdunnlab.com/projects/sourdough/',
            note: 'Ciencia ciudadana sobre la ecología microbiana de los fermentos caseros.',
          },
          {
            authors: 'Vanessa Kimbell',
            title: 'The Sourdough School',
            source: 'Northamptonshire, Reino Unido',
            url: 'https://www.sourdough.co.uk/',
            note: 'Investigación y formación sobre fermentación, digestibilidad y nutrición.',
          },
        ],
      },
      {
        key: 'open',
        label: 'Fuentes abiertas',
        blurb: 'Referencias de acceso libre usadas para fechas, nombres y el hilo histórico.',
        items: [
          {
            title: 'Sourdough',
            source: 'Wikipedia (inglés)',
            url: 'https://en.wikipedia.org/wiki/Sourdough',
            note: 'Cronología histórica, cepas y panorama general.',
          },
          {
            title: 'Bread',
            source: 'Wikipedia (inglés)',
            url: 'https://en.wikipedia.org/wiki/Bread',
            note: 'Contexto sobre cereales, gluten y procesos de panificación.',
          },
        ],
      },
    ],
  },
  closing: {
    index: 'XI',
    title: 'Tiempo que se saborea',
    body: 'Un tarro de harina y agua, mantenido tibio y alimentado, guarda un hilo ininterrumpido de fermentación que llega hasta los primeros agricultores. Hornear con masa madre es cuidar un archivo vivo —parte cultura, parte química, parte oficio— y entregarlo, todavía vivo, a quien hornee después.',
    signature: 'harina · agua · sal · tiempo',
    footer:
      'Un museo digital y laboratorio vivo · construido con Next.js, GSAP y Lenis · fuentes: Wikipedia, sourdough.co.uk y archivo de referencia · imágenes: Wikimedia Commons',
  },
  notFound: {
    code: 'Error · 404',
    titleA: 'Sobre',
    titleB: 'fermentada',
    body: 'Esta página subió demasiado y se vino abajo. Aquí no hay nada que hornear.',
    back: '← Volver al fermento',
  },
};

const en: SiteContent = {
  nav: {
    langLabel: 'ES',
    sections: [
      { id: 'hero', label: 'Opening' },
      { id: 'origins', label: 'Origins' },
      { id: 'timeline', label: 'Timeline' },
      { id: 'laboratory', label: 'Laboratory' },
      { id: 'starter', label: 'Your starter' },
      { id: 'breads', label: 'Breads' },
      { id: 'process', label: 'Process' },
      { id: 'composition', label: 'Composition' },
      { id: 'baking', label: 'The Oven' },
      { id: 'benefits', label: 'Nuance' },
      { id: 'references', label: 'References' },
      { id: 'closing', label: 'Closing' },
    ],
  },
  hero: {
    eyebrow: 'A digital museum & living laboratory',
    titleA: 'Masa',
    titleB: 'Madre',
    thesis:
      'Bread is the oldest technology we still eat. Sourdough is older still — a culture of wild yeast and bacteria that has been quietly alive for six thousand years. This is its story across time, and its biology under glass.',
    scrollCue: 'Descend',
    imageAlt: 'A freshly baked sourdough loaf',
  },
  origins: {
    index: 'I',
    eyebrow: 'Origins',
    titleA: 'Ground grain,',
    titleB: 'wild air',
    p1: 'The first leaven was an accident of patience. Flour and water, left long enough, are never truly alone — the grain itself carries wild yeast, and the air carries lactic acid bacteria. Wait, and the mixture begins to breathe.',
    p2: 'Any flour can ferment, but a porous, lifted loaf needs strength: a flour able to absorb water and build gluten from its proteins. Salt tunes the work, slowing enzymes and tightening the dough. From those four things — flour, water, salt, and time — every bread in this archive descends.',
    ingredientsHeading: 'Four materials',
  },
  ingredients: [
    { key: 'flour', name: 'Flour', tag: 'Structure & fuel', body: 'Wheat protein builds the gluten; its starch feeds the yeast.', img: 'flour' },
    { key: 'water', name: 'Water', tag: 'The medium of life', body: 'Hydrates the flour, wakes the enzymes, and rouses the sleeping culture.', img: 'water' },
    { key: 'salt', name: 'Salt', tag: 'Control & flavour', body: 'Regulates enzyme activity and fermentation, and tightens the structure.', img: 'salt' },
    { key: 'wheat', name: 'Grain', tag: 'The origin of wheat', body: 'Domesticated ten thousand years ago — the cereal that tied us to the land.', img: 'wheat' },
  ],
  timeline: {
    index: 'II',
    eyebrow: 'Timeline',
    title: 'Six thousand years',
    cue: 'Scroll to travel forward in time →',
    events: [
      { era: 'I', year: 'c. 8000 BCE', region: 'Fertile Crescent', title: 'The first grain', body: 'Wild wheat and barley are domesticated. Agriculture binds people to a place, and ground grain mixed with water becomes the first porridges and flatbreads — the raw material of everything that follows.' },
      { era: 'II', year: 'c. 3700 BCE', region: 'Switzerland', title: 'The oldest leaven', body: 'One of the oldest sourdough breads on record is excavated here. Long before anyone could name a microbe, wild yeast and bacteria living in the flour were already lifting dough on their own.' },
      { era: 'III', year: 'c. 3000 BCE', region: 'Ancient Egypt', title: 'Bread as currency', body: 'Egyptian bakeries industrialise leavening. Bread and beer share the same living ferment; loaves become wages, offerings, and a fixture of daily life along the Nile.' },
      { era: 'IV', year: 'c. 77 CE', region: 'Rome', title: 'Pliny writes it down', body: 'Pliny the Elder documents several methods of keeping and renewing a leaven. Sourdough is now a recorded craft, carried across the Empire on the strength of a jar of fermenting dough.' },
      { era: 'V', year: 'c. 1300 CE', region: 'Medieval Europe', title: 'The age of barm', body: 'Brewing and baking entwine. Barm — the foam skimmed from fermenting beer — begins to replace wild leaven, trading sourness and keeping-quality for speed and a lighter crumb.' },
      { era: 'VI', year: '1857', region: 'France', title: 'Fermentation explained', body: 'Louis Pasteur shows fermentation to be the work of living microorganisms. The invisible cultures bakers had managed by intuition for millennia finally have a biology.' },
      { era: 'VII', year: '1849', region: 'San Francisco', title: 'A city and its strain', body: 'French bakers carry their leaven into Gold Rush California. The local culture becomes so distinctive that its dominant bacterium is later named Fructilactobacillus sanfranciscensis — a place written into a species.' },
      { era: 'VIII', year: '1898', region: 'Klondike & Alaska', title: 'The sourdoughs', body: 'Prospectors guard a pot of starter through the northern winter, sometimes sleeping beside it for warmth. They name themselves "sourdoughs," and Robert Service sets them in verse.' },
      { era: 'IX', year: '1961', region: 'Industrial world', title: 'The quiet eclipse', body: 'Fast commercial yeast and the Chorleywood process let factories make bread in hours. Wild leaven all but vanishes from the supermarket shelf — preserved by a stubborn minority of bakers.' },
      { era: 'X', year: '2020', region: 'Everywhere', title: 'The kitchen revival', body: 'With commercial yeast scarce during lockdowns, millions feed a jar of flour and water and watch it come alive. The most ancient leaven becomes, again, the most personal.' },
    ],
  },
  lab: {
    index: 'III',
    eyebrow: 'The Laboratory',
    titleA: 'A culture,',
    titleB: 'observed',
    intro:
      'Masa madre is a symbiosis: wild yeast and lactic acid bacteria living in flour and water. Advance the ferment and watch the workstation respond — gas rising, pH falling, the loaf learning to protect itself.',
    inhabitants: 'Inhabitants · tap to inspect',
    quote:
      '“Yeast makes the gas. Bacteria make the sour. Together they make the bread — and keep it safe.”',
    stages: [
      { key: 'mix', label: 'Fresh mix', hours: '0 h', ph: 6.0, temp: '24°C', activity: 0.12, note: 'Flour meets water. Wild yeast and lactic acid bacteria wake from the grain and begin to feed on released sugars.' },
      { key: 'rise', label: 'Active rise', hours: '6 h', ph: 4.8, temp: '26°C', activity: 0.55, note: 'The yeast exhales carbon dioxide; the culture froths and domes. Bacteria pour out lactic acid and the pH begins its long fall.' },
      { key: 'peak', label: 'Peak', hours: '12 h', ph: 4.1, temp: '27°C', activity: 0.92, note: 'Gas production peaks. The starter triples and smells of yoghurt and cider — the symbiosis at full voice.' },
      { key: 'mature', label: 'Mature & acidic', hours: '24 h', ph: 3.8, temp: '25°C', activity: 0.4, note: 'Acidity settles into the 3.8–4.5 range. Below pH 4.6 most pathogens cannot survive — the loaf protects itself.' },
    ],
    microbes: [
      { key: 'yeast', name: 'Wild yeast', latin: 'Saccharomyces cerevisiae · Kazachstania humilis', role: 'The leavening engine', makes: 'Ferments sugars into carbon dioxide — the gas that inflates the dough — plus a trace of ethanol for aroma.' },
      { key: 'bacteria', name: 'Lactic acid bacteria', latin: 'Fructilactobacillus sanfranciscensis · Limosilactobacillus pontis', role: 'The acidifier', makes: 'Converts sugars into lactic acid (and a little acetic acid), lowering pH, deepening flavour, and guarding the loaf.' },
    ],
    readout: { temp: 'Temp', elapsed: 'Elapsed', gas: 'Gas' },
    calc: {
      heading: 'Dough calculator',
      sub: "Baker's percentage",
      flour: 'Flour',
      hydration: 'Hydration',
      saltPct: 'Salt',
      starterPct: 'Starter',
      water: 'Water',
      salt: 'Salt',
      starter: 'Starter',
      total: 'Total dough',
      grams: 'g',
      note: "Everything is computed as a percentage of the flour weight. Adjust the controls and watch the recipe rebalance.",
    },
    micro: {
      heading: 'From loaf to molecule',
      sub: 'Microscope · zoom to explore',
      magLabel: 'Magnification',
      scaleLabel: 'Scale',
      levels: [
        { key: 'loaf', mag: '1×', scale: '≈ 12 cm', title: 'The loaf', body: 'To the naked eye: crust, crumb, and ear. The crust is caramelised sugar; the crumb, a solid foam of trapped gas. The bread’s character begins here.', notes: ['Caramelised crust', 'Scoring & shape', 'Open, elastic crumb'] },
        { key: 'crumb', mag: '12×', scale: '≈ 5 mm', title: 'The crumb', body: 'Closer in, the crumb is a web of alveoli — bubbles of carbon dioxide the yeast exhaled, caught by dough walls that the oven set.', notes: ['CO₂ alveoli', 'Dough walls', 'The web that holds the gas'] },
        { key: 'gluten', mag: '250×', scale: '≈ 200 µm', title: 'Gluten & starch', body: 'Those walls are gluten: an elastic mesh of hydrated glutenin and gliadin. Threaded through it, gelatinised starch granules give the structure body.', notes: ['Gluten mesh (glutenin + gliadin)', 'Starch granules', 'Elasticity & water retention'] },
        { key: 'microbes', mag: '3000×', scale: '≈ 20 µm', title: 'The microbes', body: 'Inside the living dough: budding yeast and rod-shaped lactic acid bacteria. The first make CO₂; the second make lactic acid that drops the pH.', notes: ['Budding yeast (Saccharomyces)', 'Lactic acid bacteria (Lactobacillus)', 'CO₂ + lactic acid'] },
        { key: 'molecular', mag: '60,000×', scale: '≈ 2 nm', title: 'The molecular level', body: 'Down to matter itself: chains of amylose and amylopectin (starch), folded gluten proteins, and lactic acid molecules. Structure and flavour are born here.', notes: ['Amylose & amylopectin', 'Folded gluten protein', 'Lactic acid · C₃H₆O₃'] },
      ],
    },
    bake: {
      heading: 'The oven · simulator',
      sub: 'Design your formula and bake it',
      blendLabel: 'Flour blend',
      blendHint: 'Combine flours by the gram. E.g. 700 g white + 200 g whole wheat + 100 g spelt.',
      addFlour: 'Add flour',
      totalFlourLabel: 'Total flour',
      seedsLabel: 'Seeds',
      seedsHint: 'Add any seeds you like, by the gram.',
      addSeed: 'Add seed',
      emptyBlend: 'Add at least one flour to begin.',
      tempLabel: 'Temperature',
      steamLabel: 'Steam',
      bakeBtn: 'Bake',
      bakingBtn: 'Baking…',
      resetBtn: 'Bake again',
      clock: 'min',
      phaseLabel: 'Phase',
      stages: {
        shape: 'Shaping',
        proof: 'Proofing',
        load: 'Into the oven',
        spring: 'Oven spring',
        crust: 'Crust forming',
        done: 'Baked',
        cooling: 'Cooling',
      },
      result: {
        title: 'Result',
        bakeTime: 'Bake time',
        spring: 'Oven spring',
        crust: 'Crust',
        crumb: 'Crumb',
        min: 'min',
      },
      crustLevels: ['Pale', 'Golden', 'Deep', 'Dark'],
      crumbLevels: ['Tight', 'Even', 'Open', 'Wild'],
      flours: [
        { key: 'white', name: 'White', note: 'Soft and pale; tender crumb.' },
        { key: 'strong', name: 'Strong / bread', note: 'High gluten, big rise.' },
        { key: 'wholewheat', name: 'Whole wheat', note: 'More fibre, less rise, browns sooner.' },
        { key: 'spelt', name: 'Spelt', note: 'Nutty and sweet, delicate gluten.' },
        { key: 'rye', name: 'Rye', note: 'Dense and dark, very moist.' },
        { key: 'oat', name: 'Oat', note: 'Soft and pale, best blended.' },
        { key: 'semolina', name: 'Semolina', note: 'Durum wheat, golden firm crumb.' },
        { key: 'einkorn', name: 'Einkorn', note: 'Ancient grain, golden and sweet.' },
      ],
      seeds: [
        { key: 'sesame', name: 'Sesame' },
        { key: 'poppy', name: 'Poppy' },
        { key: 'sunflower', name: 'Sunflower' },
        { key: 'flax', name: 'Flax' },
        { key: 'pumpkin', name: 'Pumpkin' },
        { key: 'chia', name: 'Chia' },
        { key: 'millet', name: 'Millet' },
        { key: 'caraway', name: 'Caraway' },
      ],
    },
  },
  starter: {
    index: 'IV',
    eyebrow: 'Guide · from nothing to life',
    titleA: 'Raise your',
    titleB: 'own starter',
    intro:
      'You don’t buy it — you raise it. With flour, water and seven days of patience, a jar turns from inert to bubbling. Each day you discard half and feed again; the culture learns a rhythm and, by the end, lifts a loaf on its own.',
    feed: '1:1:1 feed · flour : water : starter, by weight',
    signLabel: 'Sign',
    days: [
      { d: '01', phase: 'The mix', action: 'Stir 50 g wholegrain flour into 50 g warm water in a jar. Cover loosely and leave it at 24–26 °C.', sign: 'Nothing yet, or a stray bubble. Grain and air begin to settle in.' },
      { d: '02', phase: 'First signs', action: 'Discard half. Feed with 50 g flour and 50 g water, and stir well.', sign: 'Scattered bubbles and a raw, almost vinegary smell. The population wakes.' },
      { d: '03', phase: 'The false start', action: 'Discard half and feed 1:1:1 again — same time each day.', sign: 'It rises, smells sharp… then settles. Bacteria lead; yeast hasn’t arrived.' },
      { d: '04', phase: 'The smell turns', action: 'Discard and feed. In warm weather, feed twice a day.', sign: 'Vinegar gives way to yoghurt and fruit. More bubbles, more consistency.' },
      { d: '05', phase: 'Its own rhythm', action: 'Keep feeding 1:1:1 at the same hour. Mark the level with a band.', sign: 'It rises and falls predictably. Nearly doubles between feeds.' },
      { d: '06', phase: 'Almost there', action: 'Feed, then time how long it takes to peak.', sign: 'Doubles in 4–8 h, with a dome of bubbles and a cidery smell.' },
      { d: '07', phase: 'Alive and mature', action: 'Feed, wait for the peak and bake — or keep it in the fridge and feed weekly.', sign: 'Triples, smells of yoghurt and apple, and passes the float test.' },
    ],
    test: {
      tag: 'The test',
      title: 'Ready? Make it float.',
      body: 'Drop a teaspoon of starter at its peak into a glass of water. If it floats, the trapped gas confirms it has the strength to lift a loaf. If it sinks, give it another feed and try again tomorrow.',
    },
  },
  breadTypes: {
    index: 'V',
    eyebrow: 'Families of bread',
    titleA: 'One grain,',
    titleB: 'a thousand breads',
    intro:
      'The same chemistry — flour, water, salt, time — branches into traditions by climate, cereal, and hand. A small collection from the archive.',
    items: [
      { key: 'sourdough', name: 'Sourdough', origin: 'Universal', body: 'Deep crust, open crumb, clean acidity. The bread that leavens itself, on wild yeast alone.', img: 'hero-sourdough' },
      { key: 'baguette', name: 'Baguette', origin: 'France', body: 'A thin, crackling crust over a light, alveolar crumb. The geometry of simplicity.', img: 'baguette' },
      { key: 'rye', name: 'Rye bread', origin: 'Northern Europe', body: 'Dense, dark, and moist. Rye acidifies hard and keeps for weeks.', img: 'rye' },
      { key: 'ciabatta', name: 'Ciabatta', origin: 'Italy', body: 'High-hydration and flat, with big irregular holes. Born to be dipped in oil.', img: 'ciabatta' },
      { key: 'wholewheat', name: 'Whole wheat', origin: 'Universal', body: 'Bran and germ left intact: more fibre, more minerals, the taste of the field.', img: 'wholewheat' },
    ],
  },
  process: {
    index: 'VI',
    eyebrow: 'Starter to oven',
    titleA: 'Twelve steps,',
    titleB: 'one rise',
    steps: [
      { n: 1, name: 'Mise en place', detail: 'Everything in its place. Flour, water, salt, and a ripe starter, weighed and waiting.' },
      { n: 2, name: 'Autolyse', detail: 'Flour and water rest alone. Enzymes begin freeing sugars from starch — flavour, fuel, and future crust.' },
      { n: 3, name: 'Mixing', detail: 'Starter and dough are worked together. Glutenin and gliadin hydrate and link into gluten, the dough’s elastic scaffold.' },
      { n: 4, name: 'Gluten development', detail: 'Stretching and folding align the protein network until the dough turns smooth, strong, and able to trap gas.' },
      { n: 5, name: 'Bulk fermentation', detail: 'The culture eats sugars and breathes out carbon dioxide. The dough swells; lactic acid builds; transformation is underway.' },
      { n: 6, name: 'Dividing', detail: 'The mass is cut into loaf-sized pieces, each carrying its share of the living ferment.' },
      { n: 7, name: 'Pre-shaping', detail: 'A loose round gives the dough tension and a sense of direction without forcing it.' },
      { n: 8, name: 'Bench rest', detail: 'Gluten relaxes. The dough catches its breath so the final shape will hold.' },
      { n: 9, name: 'Final shaping', detail: 'The loaf is built — surface tension on the outside, an open, gas-filled structure within.' },
      { n: 10, name: 'Proofing', detail: 'The last rise. A gentle press that springs back slowly says the dough is alive and ready for heat.' },
      { n: 11, name: 'Baking', detail: 'Into the oven, where three transformations happen at once and a wet dough becomes bread.' },
      { n: 12, name: 'Cooling', detail: 'Proteins set, the crumb stabilises, and the crackle of the crust is the loaf still finishing as it cools.' },
    ],
  },
  composition: {
    index: 'VII',
    eyebrow: 'Composition & chemistry',
    titleA: 'What a loaf is',
    titleB: 'made of',
    facts: [
      { key: 'gluten', title: 'Gluten', body: 'The wheat protein, formed when glutenin and gliadin hydrate and bond. Strength here is the capacity to hold water and gas — the difference between a dense slab and an open, lifted crumb.' },
      { key: 'starch', title: 'Starch', body: 'A reserve macromolecule of amylose and amylopectin. Enzymes break it into sugars — food for the yeast, sweetness on the tongue, and fuel for the crust’s browning.' },
      { key: 'enzymes', title: 'Enzymes', body: 'Protein catalysts that make slow reactions fast. Acidification during fermentation switches on cereal enzymes — phytases, proteases — that quietly remodel the grain.' },
      { key: 'acids', title: 'Acids', body: 'Lactic acid dominates, with a sharper note of acetic acid. Together they set the flavour and drive pH down into the protective acidic range of 3.8–4.5.' },
    ],
    equationLabel: 'Lactic acid fermentation',
    equationNote:
      'Homolactic fermentation yields lactic acid alone; heterolactic fermentation — the phosphoketolase pathway — also releases the carbon dioxide that lifts the dough and the ethanol that flavours it.',
    sugar: '(sugar)',
  },
  oven: {
    index: 'VIII',
    eyebrow: 'The Oven',
    titleA: 'Three changes,',
    titleB: 'at once',
    intro:
      'Heat ends the fermentation and begins the bread. At a few hundred degrees, a slack, living dough is fixed forever into crust and crumb.',
    changes: [
      { temp: '150°C+', title: 'Caramelisation', body: 'Sugars freed during fermentation brown on the surface, building the crust’s colour, aroma, and bittersweet depth.' },
      { temp: '160°C', title: 'Proteins coagulate', body: 'Gluten sets. The proteins align and lock, fixing the airy structure of the crumb in place for good.' },
      { temp: '180°C', title: 'Starches solidify', body: 'Gelatinised starch firms into a stable matrix. The interior turns from batter-like to true, sliceable bread.' },
    ],
    cooling:
      'Then comes cooling — the quiet final step. Proteins settle, the crumb stabilises, and the crust sings as it contracts. The loaf is still becoming itself long after it leaves the heat.',
  },
  benefits: {
    index: 'IX',
    eyebrow: 'Benefits & nuance',
    titleA: 'Real gains,',
    titleB: 'honestly told',
    items: [
      { title: 'Pre-digested by microbes', body: 'Fermentation breaks proteins down into their amino-acid building blocks and pre-processes starch. The loaf arrives partly digested, which many find gentler.' },
      { title: 'Minerals unlocked', body: 'Whole grains carry phytic acid, which binds iron, zinc, magnesium, and calcium out of reach. Lactic fermentation activates phytase, releasing those minerals for absorption.' },
      { title: 'A slower sugar', body: 'Acidification retards starch digestibility, tending toward a lower glycaemic response than fast-leavened white bread.' },
      { title: 'Honest nuance', body: 'Sourdough is bread, not medicine. The gains are real but modest, and depend on flour, time, and hydration. Claims of a cure-all overreach the evidence.' },
    ],
  },
  references: {
    index: 'X',
    eyebrow: 'The book of references',
    titleA: 'The sources',
    titleB: 'that hold it up',
    intro:
      'Every claim in this archive rests on peer-reviewed literature, reference books, and institutions that study sourdough. Turn the pages of this book to read the bibliography.',
    cover: {
      kicker: 'Bibliography · sourdough',
      title: 'The book of\nreferences',
      subtitle: 'Science, history & craft of leavened bread',
    },
    prev: 'Previous',
    next: 'Next',
    pageLabel: 'Page',
    openLabel: 'Open source ↗',
    disclaimer:
      'Bibliography for educational purposes. Always verify recipes and nutritional figures against the original source.',
    shelves: [
      {
        key: 'books',
        label: 'Books',
        blurb: 'The canon: popular science and craft manuals behind the history and technique.',
        items: [
          {
            authors: 'Michael Pollan',
            title: 'Cooked: A Natural History of Transformation',
            source: 'The Penguin Press',
            year: '2013',
            url: 'https://michaelpollan.com/books/cooked/',
            note: 'The “Air” section follows an apprenticeship in sourdough with Chad Robertson.',
          },
          {
            authors: 'Michael Pollan',
            title: 'The Omnivore’s Dilemma',
            source: 'The Penguin Press',
            year: '2006',
            url: 'https://michaelpollan.com/books/the-omnivores-dilemma/',
            note: 'The journey of wheat and grain through the modern food chain.',
          },
          {
            authors: 'Chad Robertson',
            title: 'Tartine Bread',
            source: 'Chronicle Books',
            year: '2010',
            url: 'https://www.chroniclebooks.com/products/tartine-bread',
            note: 'The reference manual for the sourdough country loaf.',
          },
          {
            authors: 'Harold McGee',
            title: 'On Food and Cooking: The Science and Lore of the Kitchen',
            source: 'Scribner',
            year: '2004',
            note: 'The standard work on the chemistry of gluten, starch, and fermentation.',
          },
        ],
      },
      {
        key: 'papers',
        label: 'Scientific papers',
        blurb: 'Peer-reviewed research on the microbiology and biochemistry of the ferment.',
        items: [
          {
            authors: 'Landis, E. A., Oliverio, A. M., et al.',
            title: 'The diversity and function of sourdough starter microbiomes',
            source: 'eLife 10:e61644',
            year: '2021',
            url: 'https://elifesciences.org/articles/61644',
            note: '500 starters across four continents, sequenced via citizen science.',
          },
          {
            authors: 'Gänzle, M. G.',
            title: 'Enzymatic and bacterial conversions during sourdough fermentation',
            source: 'Food Microbiology 37, 2–10',
            year: '2014',
            url: 'https://doi.org/10.1016/j.fm.2013.04.007',
            note: 'How cereal enzymes and lactic acid bacteria remodel the dough.',
          },
          {
            authors: 'Gobbetti, M. & Gänzle, M. (eds.)',
            title: 'Handbook on Sourdough Biotechnology',
            source: 'Springer Nature (2nd ed.)',
            year: '2023',
            url: 'https://link.springer.com/book/10.1007/978-1-4614-5425-0',
            note: 'The reference volume devoted entirely to sourdough biotechnology.',
          },
        ],
      },
      {
        key: 'institutions',
        label: 'Institutions & projects',
        blurb: 'Centres and projects preserving and studying the ferment’s biodiversity.',
        items: [
          {
            authors: 'Puratos · Karl De Smedt',
            title: 'The Sourdough Library & Quest for Sourdough',
            source: 'Sankt Vith, Belgium',
            url: 'https://www.questforsourdough.com/',
            note: 'The world’s only sourdough library — living strains from across the globe.',
          },
          {
            authors: 'Rob Dunn Lab · NC State University',
            title: 'Wild Sourdough & Global Sourdough Project',
            source: 'Dept. of Applied Ecology, USA',
            url: 'https://robdunnlab.com/projects/sourdough/',
            note: 'Citizen science on the microbial ecology of home starters.',
          },
          {
            authors: 'Vanessa Kimbell',
            title: 'The Sourdough School',
            source: 'Northamptonshire, UK',
            url: 'https://www.sourdough.co.uk/',
            note: 'Research and teaching on fermentation, digestibility, and nutrition.',
          },
        ],
      },
      {
        key: 'open',
        label: 'Open references',
        blurb: 'Open-access references used for dates, names, and the historical thread.',
        items: [
          {
            title: 'Sourdough',
            source: 'Wikipedia (English)',
            url: 'https://en.wikipedia.org/wiki/Sourdough',
            note: 'Historical timeline, strains, and general overview.',
          },
          {
            title: 'Bread',
            source: 'Wikipedia (English)',
            url: 'https://en.wikipedia.org/wiki/Bread',
            note: 'Context on cereals, gluten, and bread-making processes.',
          },
        ],
      },
    ],
  },
  closing: {
    index: 'XI',
    title: 'Time you can taste',
    body: 'A jar of flour and water, kept warm and fed, holds an unbroken thread of fermentation reaching back to the first farmers. To bake with masa madre is to tend a living archive — part culture, part chemistry, part craft — and to hand it, still alive, to whoever bakes next.',
    signature: 'flour · water · salt · time',
    footer:
      'A digital museum & living laboratory · built with Next.js, GSAP & Lenis · sources: Wikipedia, sourdough.co.uk & reference archive · images: Wikimedia Commons',
  },
  notFound: {
    code: 'Error · 404',
    titleA: 'Over',
    titleB: 'proofed',
    body: 'This page rose too far and collapsed. Nothing to bake here.',
    back: '← Back to the starter',
  },
};

export const CONTENT: Record<Lang, SiteContent> = { es, en };
export const getContent = (lang: Lang): SiteContent => CONTENT[lang];
