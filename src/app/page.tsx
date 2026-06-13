import TourClient from '@/components/tour3d/TourClient';
import StreetIntro from '@/components/tour3d/StreetIntro';
import Overlay from '@/components/tour3d/Overlay';
import TourCompass from '@/components/tour/TourCompass';
import { ROOMS } from '@/components/tour3d/rooms';
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

const room = (id: string) => ROOMS.find((r) => r.id === id)!;

export default function Home() {
  return (
    <>
      {/* The live WebGL bakery, fixed behind everything */}
      <TourClient />

      {/* Orientation: building cross-section + quick jump */}
      <TourCompass rooms={ROOMS} />

      {/* Readable content, floating as glass panels over the 3D tour */}
      <main className="relative z-10">
        <StreetIntro />
        <Overlay room={room('origins')}><Origins /></Overlay>
        <Overlay room={room('timeline')}><Timeline /></Overlay>
        <Overlay room={room('laboratory')}><Laboratory /></Overlay>
        <Overlay room={room('breads')}><BreadTypes /></Overlay>
        <Overlay room={room('process')}><Process /></Overlay>
        <Overlay room={room('composition')}><Composition /></Overlay>
        <Overlay room={room('baking')}><Baking /></Overlay>
        <Overlay room={room('benefits')}><Benefits /></Overlay>
        <Overlay room={room('references')}><References /></Overlay>
        <Overlay room={room('closing')}><Closing /></Overlay>
      </main>
    </>
  );
}
