import BakeryExterior from '@/components/BakeryExterior';
import BakeryMap from '@/components/BakeryMap';
import RoomFrame, { type RoomConfig } from '@/components/RoomFrame';
import Divider from '@/components/Divider';
import Origins from '@/components/sections/Origins';
import Timeline from '@/components/sections/Timeline';
import Laboratory from '@/components/sections/Laboratory';
import BreadTypes from '@/components/sections/BreadTypes';
import Process from '@/components/sections/Process';
import Composition from '@/components/sections/Composition';
import Baking from '@/components/sections/Baking';
import Benefits from '@/components/sections/Benefits';
import References from '@/components/sections/References';
import Closing from '@/components/sections/Closing';

// Room configurations — each maps a bakery zone to one or more site sections.
const VITRINA: RoomConfig   = { id: 'origins',     number: 'I',   es: 'La Vitrina',    en: 'The Display',  accent: '#c0741a', side: 'left'   };
const HISTORIA: RoomConfig  = { id: 'timeline',    number: 'II',  es: 'La Historia',   en: 'The History',  accent: '#b06a28', side: 'center' };
const LAB: RoomConfig       = { id: 'laboratory',  number: 'III', es: 'El Laboratorio',en: 'The Lab',      accent: '#0e7a6b', side: 'center' };
const PANES: RoomConfig     = { id: 'breads',      number: 'IV',  es: 'Los Panes',     en: 'The Breads',   accent: '#c0741a', side: 'right'  };
const PROCESO: RoomConfig   = { id: 'process',     number: 'V',   es: 'El Proceso',    en: 'The Process',  accent: '#8a6030', side: 'left'   };
const COCINA: RoomConfig    = { id: 'composition', number: 'VI',  es: 'La Cocina',     en: 'The Kitchen',  accent: '#a05828', side: 'center' };
const HORNO: RoomConfig     = { id: 'baking',      number: 'VII', es: 'El Horno',      en: 'The Oven',     accent: '#a03810', side: 'right'  };
const DESPENSA: RoomConfig  = { id: 'benefits',    number: 'VIII',es: 'La Despensa',   en: 'The Pantry',   accent: '#7a5828', side: 'left'   };
const BIBLIOTECA: RoomConfig= { id: 'references',  number: 'IX',  es: 'La Biblioteca', en: 'The Library',  accent: '#5a4828', side: 'center' };

export default function Home() {
  return (
    <>
      <BakeryMap />

      <main className="relative z-10">
        {/* ── I. Entrada — the bakery facade ── */}
        <BakeryExterior />

        {/* ── II. La Vitrina — ingredients & origins ── */}
        <RoomFrame config={VITRINA}>
          <Origins />
        </RoomFrame>

        <Divider />

        {/* ── III. La Historia — timeline ── */}
        <RoomFrame config={HISTORIA}>
          <Timeline />
        </RoomFrame>

        <Divider />

        {/* ── IV. El Laboratorio — fermentation science ── */}
        <RoomFrame config={LAB}>
          <Laboratory />
        </RoomFrame>

        <Divider />

        {/* ── V. Los Panes — bread varieties ── */}
        <RoomFrame config={PANES}>
          <BreadTypes />
        </RoomFrame>

        <Divider />

        {/* ── VI. El Proceso — step-by-step craft ── */}
        <RoomFrame config={PROCESO}>
          <Process />
        </RoomFrame>

        {/* ── VII. La Cocina — composition ── */}
        <RoomFrame config={COCINA}>
          <Composition />
        </RoomFrame>

        <Divider />

        {/* ── VIII. El Horno — bake simulation ── */}
        <RoomFrame config={HORNO}>
          <Baking />
        </RoomFrame>

        {/* ── IX. La Despensa — benefits ── */}
        <RoomFrame config={DESPENSA}>
          <Benefits />
        </RoomFrame>

        <Divider />

        {/* ── X. La Biblioteca — references ── */}
        <RoomFrame config={BIBLIOTECA}>
          <References />
        </RoomFrame>

        {/* ── Salida — closing ── */}
        <Closing />
      </main>
    </>
  );
}
