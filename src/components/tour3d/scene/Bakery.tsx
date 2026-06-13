'use client';

import { useMemo } from 'react';
import { RoomGroup } from './RoomGroup';
import { Lamp } from './props';
import { ROOMS, roomZ, ROOM_GAP, HALL_W, HALL_H } from '../rooms';

// The whole illustrated bakery, built from primitives along the z hall.
// Static geometry (memoized). The camera (Rig) flies through it on scroll.
export default function Bakery() {
  const startZ = roomZ(0) + 14;
  const endZ = roomZ(ROOMS.length - 1) - 8;
  const len = startZ - endZ;
  const midZ = (startZ + endZ) / 2;

  // Ceiling beams for depth rhythm
  const beams = useMemo(() => {
    const out: number[] = [];
    for (let z = startZ; z > endZ; z -= ROOM_GAP / 2) out.push(z);
    return out;
  }, [startZ, endZ]);

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, 0, midZ]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[HALL_W * 2, len]} />
        <meshStandardMaterial color="#4a2f17" roughness={0.95} />
      </mesh>
      {/* Floorboard seams */}
      {[-4.5, -2.2, 0, 2.2, 4.5].map((x) => (
        <mesh key={x} position={[x, 0.01, midZ]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.05, len]} />
          <meshStandardMaterial color="#2e1c0d" roughness={1} />
        </mesh>
      ))}

      {/* Ceiling */}
      <mesh position={[0, HALL_H, midZ]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[HALL_W * 2, len]} />
        <meshStandardMaterial color="#180f07" roughness={1} />
      </mesh>
      {beams.map((z) => (
        <mesh key={z} position={[0, HALL_H - 0.18, z]} castShadow>
          <boxGeometry args={[HALL_W * 2, 0.36, 0.4]} />
          <meshStandardMaterial color="#2a1a0d" roughness={0.9} />
        </mesh>
      ))}

      {/* Side walls */}
      {([-1, 1] as const).map((side) => (
        <mesh key={side} position={[side * HALL_W, HALL_H / 2, midZ]} rotation={[0, side > 0 ? -Math.PI / 2 : Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[len, HALL_H]} />
          <meshStandardMaterial color="#7a5a38" roughness={0.95} />
        </mesh>
      ))}
      {/* Wainscot stripe along both walls */}
      {([-1, 1] as const).map((side) => (
        <mesh key={side} position={[side * (HALL_W - 0.02), 1.1, midZ]} rotation={[0, side > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
          <planeGeometry args={[len, 0.5]} />
          <meshStandardMaterial color="#5a3f22" roughness={0.9} />
        </mesh>
      ))}

      {/* Doorway portals between rooms (the "entering" beat) */}
      {ROOMS.slice(0, -1).map((_, i) => (
        <Portal key={i} z={roomZ(i) - ROOM_GAP / 2} />
      ))}

      {/* Lamps + per-room scenes */}
      {ROOMS.map((room, i) => (
        <group key={room.id}>
          {i > 0 && <Lamp position={[0, HALL_H - 1, roomZ(i)]} />}
          <RoomGroup room={room} z={roomZ(i)} side={i % 2 === 0 ? -1 : 1} />
        </group>
      ))}
    </group>
  );
}

function Portal({ z }: { z: number }) {
  const w = 3.0;
  const h = 4.4;
  return (
    <group position={[0, 0, z]}>
      {/* posts */}
      {([-1, 1] as const).map((s) => (
        <mesh key={s} position={[s * w, h / 2, 0]} castShadow>
          <boxGeometry args={[0.4, h, 0.5]} />
          <meshStandardMaterial color="#3a2616" roughness={0.9} />
        </mesh>
      ))}
      {/* lintel / arch */}
      <mesh position={[0, h, 0]} castShadow>
        <boxGeometry args={[w * 2 + 0.4, 0.5, 0.5]} />
        <meshStandardMaterial color="#3a2616" roughness={0.9} />
      </mesh>
      {/* arch curve */}
      <mesh position={[0, h, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[w, 0.16, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#4a3018" roughness={0.9} />
      </mesh>
    </group>
  );
}
