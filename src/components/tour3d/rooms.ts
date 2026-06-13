// Single source of truth for the bakery tour rooms. Shared by the 3D scene
// (geometry + accent lights), the HTML overlays (page.tsx) and the orientation
// compass. `z` is the world depth of each room along the hall; the camera
// flies from the street (positive z) inward (negative z).

export type Room3DType =
  | 'street'
  | 'display'
  | 'corridor'
  | 'lab'
  | 'breadcase'
  | 'workshop'
  | 'bench'
  | 'cellar'
  | 'pantry'
  | 'library'
  | 'exit';

export type Room3D = {
  id: string;
  number: string;
  es: string;
  en: string;
  accent: string; // hex, used for lights + UI
  type: Room3DType;
};

// The journey. Index 0 is the street/entrance; the rest map existing sections.
export const ROOMS: Room3D[] = [
  { id: 'hero',        number: '0',    es: 'La Calle',           en: 'The Street',    accent: '#e0902a', type: 'street'    },
  { id: 'origins',     number: 'I',    es: 'La Vitrina',         en: 'The Display',   accent: '#c0741a', type: 'display'   },
  { id: 'timeline',    number: 'II',   es: 'Pasillo del Tiempo', en: 'Time Corridor', accent: '#b06a28', type: 'corridor'  },
  { id: 'laboratory',  number: 'III',  es: 'El Laboratorio',     en: 'The Lab',       accent: '#0e9a86', type: 'lab'       },
  { id: 'breads',      number: 'IV',   es: 'Vitrina de Panes',   en: 'Bread Case',    accent: '#c8642a', type: 'breadcase' },
  { id: 'process',     number: 'V',    es: 'El Obrador',         en: 'The Workshop',  accent: '#a8852e', type: 'workshop'  },
  { id: 'composition', number: 'VI',   es: 'El Banco',           en: 'The Bench',     accent: '#b07030', type: 'bench'     },
  { id: 'baking',      number: 'VII',  es: 'El Sótano · Horno',  en: 'Cellar · Oven', accent: '#e0561e', type: 'cellar'    },
  { id: 'benefits',    number: 'VIII', es: 'La Despensa',        en: 'The Pantry',    accent: '#9a7030', type: 'pantry'    },
  { id: 'references',  number: 'IX',   es: 'La Biblioteca',      en: 'The Library',   accent: '#8a6a3a', type: 'library'   },
  { id: 'closing',     number: 'X',    es: 'La Salida',          en: 'The Exit',      accent: '#e0902a', type: 'exit'      },
];

// Depth spacing between rooms (world units). The camera dollies along z.
export const ROOM_GAP = 18;
// z of room i (street is in front / positive, rooms recede negative).
export const roomZ = (i: number) => 10 - i * ROOM_GAP;
export const HALL_W = 7; // half-width of the hall
export const HALL_H = 6; // ceiling height
export const EYE_Y = 2.4; // camera eye height
