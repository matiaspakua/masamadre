import Nav from '@/components/Nav';
import Divider from '@/components/Divider';
import Hero from '@/components/sections/Hero';
import Origins from '@/components/sections/Origins';
import Timeline from '@/components/sections/Timeline';
import Laboratory from '@/components/sections/Laboratory';
import BreadTypes from '@/components/sections/BreadTypes';
import Process from '@/components/sections/Process';
import Composition from '@/components/sections/Composition';
import Baking from '@/components/sections/Baking';
import Benefits from '@/components/sections/Benefits';
import Closing from '@/components/sections/Closing';

export default function Home() {
  return (
    <>
      <Nav />
      {/* content rides above the ambient field (z-0) */}
      <main className="relative z-10">
        <Hero />
        <Divider />
        <Origins />
        <Timeline />
        <Laboratory />
        <BreadTypes />
        <Divider />
        <Process />
        <Composition />
        <Baking />
        <Benefits />
        <Closing />
      </main>
    </>
  );
}
