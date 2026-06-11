import Nav from '@/components/Nav';
import Hero from '@/components/sections/Hero';
import Origins from '@/components/sections/Origins';
import Timeline from '@/components/sections/Timeline';
import Laboratory from '@/components/sections/Laboratory';
import Process from '@/components/sections/Process';
import Composition from '@/components/sections/Composition';
import Baking from '@/components/sections/Baking';
import Benefits from '@/components/sections/Benefits';
import Closing from '@/components/sections/Closing';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="rule-fade mx-auto max-w-6xl" />
        <Origins />
        <Timeline />
        <Laboratory />
        <div className="rule-fade mx-auto max-w-6xl" />
        <Process />
        <Composition />
        <Baking />
        <Benefits />
        <Closing />
      </main>
    </>
  );
}
