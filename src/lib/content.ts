// All editorial content for Masa Madre lives here, derived from the
// sourdough history (Wikipedia) and the reference PDF (fermentation science,
// the 12-step process, thermal transformations, phytic acid & minerals).
// Keeping copy as data lets the components stay about motion & structure.

export const SECTIONS = [
  { id: 'hero', label: 'Opening' },
  { id: 'origins', label: 'Origins' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'laboratory', label: 'Laboratory' },
  { id: 'process', label: 'Process' },
  { id: 'composition', label: 'Composition' },
  { id: 'baking', label: 'The Oven' },
  { id: 'benefits', label: 'Nuance' },
  { id: 'closing', label: 'Closing' },
] as const;

export type TimelineEvent = {
  era: string;
  year: string;
  region: string;
  title: string;
  body: string;
};

export const TIMELINE: TimelineEvent[] = [
  {
    era: 'I',
    year: 'c. 8000 BCE',
    region: 'Fertile Crescent',
    title: 'The first grain',
    body: 'Wild wheat and barley are domesticated. Agriculture binds people to a place, and ground grain mixed with water becomes the first porridges and flatbreads — the raw material of everything that follows.',
  },
  {
    era: 'II',
    year: 'c. 3700 BCE',
    region: 'Switzerland',
    title: 'The oldest leaven',
    body: 'One of the oldest sourdough breads on record is excavated here. Long before anyone could name a microbe, wild yeast and bacteria living in the flour were already lifting dough on their own.',
  },
  {
    era: 'III',
    year: 'c. 3000 BCE',
    region: 'Ancient Egypt',
    title: 'Bread as currency',
    body: 'Egyptian bakeries industrialise leavening. Bread and beer share the same living ferment; loaves become wages, offerings, and a fixture of daily life along the Nile.',
  },
  {
    era: 'IV',
    year: 'c. 77 CE',
    region: 'Rome',
    title: 'Pliny writes it down',
    body: 'Pliny the Elder documents several methods of keeping and renewing a leaven. Sourdough is now a recorded craft, carried across the Empire on the strength of a jar of fermenting dough.',
  },
  {
    era: 'V',
    year: 'c. 1300 CE',
    region: 'Medieval Europe',
    title: 'The age of barm',
    body: 'Brewing and baking entwine. Barm — the foam skimmed from fermenting beer — begins to replace wild leaven, trading sourness and keeping-quality for speed and a lighter crumb.',
  },
  {
    era: 'VI',
    year: '1857',
    region: 'France',
    title: 'Fermentation explained',
    body: 'Louis Pasteur shows fermentation to be the work of living microorganisms. The invisible cultures bakers had managed by intuition for millennia finally have a biology.',
  },
  {
    era: 'VII',
    year: '1849',
    region: 'San Francisco',
    title: 'A city and its strain',
    body: 'French bakers carry their leaven into Gold Rush California. The local culture becomes so distinctive that its dominant bacterium is later named Fructilactobacillus sanfranciscensis — a place written into a species.',
  },
  {
    era: 'VIII',
    year: '1898',
    region: 'Klondike & Alaska',
    title: 'The sourdoughs',
    body: 'Prospectors guard a pot of starter through the northern winter, sometimes sleeping beside it for warmth. They name themselves "sourdoughs," and Robert Service sets them in verse.',
  },
  {
    era: 'IX',
    year: '1961',
    region: 'Industrial world',
    title: 'The quiet eclipse',
    body: 'Fast commercial yeast and the Chorleywood process let factories make bread in hours. Wild leaven all but vanishes from the supermarket shelf — preserved by a stubborn minority of bakers.',
  },
  {
    era: 'X',
    year: '2020',
    region: 'Everywhere',
    title: 'The kitchen revival',
    body: 'With commercial yeast scarce during lockdowns, millions feed a jar of flour and water and watch it come alive. The most ancient leaven becomes, again, the most personal.',
  },
];

export type LabStage = {
  key: string;
  label: string;
  hours: string;
  ph: number;
  temp: string;
  activity: number; // 0..1 microbial intensity for the bubble field
  note: string;
};

// pH descends from a fresh, near-neutral mix toward the acidic range that
// defines a mature sourdough (typically pH 3.8–4.5).
export const LAB_STAGES: LabStage[] = [
  {
    key: 'mix',
    label: 'Fresh mix',
    hours: '0 h',
    ph: 6.0,
    temp: '24°C',
    activity: 0.12,
    note: 'Flour meets water. Wild yeast and lactic acid bacteria wake from the grain and begin to feed on released sugars.',
  },
  {
    key: 'rise',
    label: 'Active rise',
    hours: '6 h',
    ph: 4.8,
    temp: '26°C',
    activity: 0.55,
    note: 'Yeast exhale carbon dioxide; the culture froths and domes. Bacteria pour out lactic acid and the pH begins its long fall.',
  },
  {
    key: 'peak',
    label: 'Peak',
    hours: '12 h',
    ph: 4.1,
    temp: '27°C',
    activity: 0.92,
    note: 'Gas production peaks. The starter triples and smells of yoghurt and cider — the symbiosis at full voice.',
  },
  {
    key: 'mature',
    label: 'Mature & acidic',
    hours: '24 h',
    ph: 3.8,
    temp: '25°C',
    activity: 0.4,
    note: 'Acidity settles into the 3.8–4.5 range. Below pH 4.6 most pathogens cannot survive — the loaf protects itself.',
  },
];

export type Microbe = {
  key: string;
  name: string;
  latin: string;
  role: string;
  makes: string;
};

export const MICROBES: Microbe[] = [
  {
    key: 'yeast',
    name: 'Wild yeast',
    latin: 'Saccharomyces cerevisiae · Kazachstania humilis',
    role: 'The leavening engine',
    makes: 'Ferments sugars into carbon dioxide — the gas that inflates the dough — plus a trace of ethanol for aroma.',
  },
  {
    key: 'bacteria',
    name: 'Lactic acid bacteria',
    latin: 'Fructilactobacillus sanfranciscensis · Limosilactobacillus pontis',
    role: 'The acidifier',
    makes: 'Converts sugars into lactic acid (and a little acetic acid), lowering pH, deepening flavour, and guarding the loaf.',
  },
];

export type ProcessStep = {
  n: number;
  name: string;
  detail: string;
  temp?: string;
};

// The 12-step journey from the reference, with the three oven transformations
// pulled out explicitly (caramelisation, protein coagulation, starch setting).
export const PROCESS: ProcessStep[] = [
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
];

export type OvenChange = {
  temp: string;
  title: string;
  body: string;
};

export const OVEN_CHANGES: OvenChange[] = [
  {
    temp: '150°C+',
    title: 'Caramelisation',
    body: 'Sugars freed during fermentation brown on the surface, building the crust’s colour, aroma, and bittersweet depth.',
  },
  {
    temp: '160°C',
    title: 'Proteins coagulate',
    body: 'Gluten sets. The proteins align and lock, fixing the airy structure of the crumb in place for good.',
  },
  {
    temp: '180°C',
    title: 'Starches solidify',
    body: 'Gelatinised starch firms into a stable matrix. The interior turns from batter-like to true, sliceable bread.',
  },
];

export type CompositionFact = {
  key: string;
  title: string;
  body: string;
};

export const COMPOSITION: CompositionFact[] = [
  {
    key: 'gluten',
    title: 'Gluten',
    body: 'The wheat protein, formed when glutenin and gliadin hydrate and bond. Strength here is the capacity to hold water and gas — the difference between a dense slab and an open, lifted crumb.',
  },
  {
    key: 'starch',
    title: 'Starch',
    body: 'A reserve macromolecule of amylose and amylopectin. Enzymes break it into sugars — food for the yeast, sweetness on the tongue, and fuel for the crust’s browning.',
  },
  {
    key: 'enzymes',
    title: 'Enzymes',
    body: 'Protein catalysts that make slow reactions fast. Acidification during fermentation switches on cereal enzymes — phytases, proteases — that quietly remodel the grain.',
  },
  {
    key: 'acids',
    title: 'Acids',
    body: 'Lactic acid dominates, with a sharper note of acetic acid. Together they set the flavour and drive pH down into the protective acidic range of 3.8–4.5.',
  },
];

export type Benefit = {
  title: string;
  body: string;
};

export const BENEFITS: Benefit[] = [
  {
    title: 'Pre-digested by microbes',
    body: 'Fermentation breaks proteins down toward their amino-acid building blocks and pre-processes starch. The loaf arrives partly digested, which many find gentler.',
  },
  {
    title: 'Minerals unlocked',
    body: 'Whole grains carry phytic acid, which binds iron, zinc, magnesium, and calcium out of reach. Lactic fermentation activates phytase, releasing those minerals for absorption.',
  },
  {
    title: 'A slower sugar',
    body: 'Acidification retards starch digestibility, tending toward a lower glycaemic response than fast-leavened white bread.',
  },
  {
    title: 'Honest nuance',
    body: 'Sourdough is bread, not medicine. The gains are real but modest, and depend on flour, time, and hydration. Claims of a cure-all overreach the evidence.',
  },
];

export const HERO = {
  eyebrow: 'A digital museum & living laboratory',
  title: 'Masa Madre',
  thesis:
    'Bread is the oldest technology we still eat. Sourdough is older still — a culture of wild yeast and bacteria that has been quietly alive for six thousand years. This is its story across time, and its biology under glass.',
  scrollCue: 'Descend',
};

export const CLOSING = {
  title: 'Time you can taste',
  body: 'A jar of flour and water, kept warm and fed, holds an unbroken thread of fermentation reaching back to the first farmers. To bake with masa madre is to tend a living archive — part culture, part chemistry, part craft — and to hand it, still alive, to whoever bakes next.',
  signature: 'flour · water · salt · time',
};
