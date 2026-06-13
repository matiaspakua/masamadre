'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Vector3, MathUtils } from 'three';
import { tourState } from '@/lib/tourScroll';
import { ROOM_GAP, EYE_Y, ROOMS } from '../rooms';

// Winding path values for a given (continuous) room index.
function pathAt(room: number) {
  const z = 10 - room * ROOM_GAP; // dolly down the hall
  const x = Math.sin(room * 0.85) * 1.3; // gentle weave
  // descend into the basement around the oven room (index 7)
  const cellar = ROOMS.findIndex((r) => r.type === 'cellar');
  const dip = Math.exp(-((room - cellar) ** 2) / 1.6) * 1.3;
  const y = EYE_Y - dip;
  return { x, y, z };
}

export default function Rig({ reduced }: { reduced: boolean }) {
  const { camera } = useThree();
  const cur = useRef(new Vector3(...Object.values(pathAt(0)) as [number, number, number]));
  const look = useRef(new Vector3(0, EYE_Y, -10));

  useFrame((_, dt) => {
    const room = tourState.room;
    const p = pathAt(room);
    const ahead = pathAt(room + 0.5);

    const target = new Vector3(p.x, p.y, p.z);
    const lookTarget = new Vector3(ahead.x, ahead.y - 0.1, ahead.z - 5);

    if (reduced) {
      cur.current.copy(target);
      look.current.copy(lookTarget);
    } else {
      // frame-rate independent smoothing
      const s = 1 - Math.exp(-6 * Math.min(dt, 0.05));
      cur.current.lerp(target, s);
      look.current.lerp(lookTarget, s);
    }

    camera.position.copy(cur.current);
    camera.lookAt(look.current);
    // subtle breathing FOV for life
    const persp = camera as typeof camera & { fov: number; updateProjectionMatrix: () => void };
    const targetFov = 58 + Math.sin(performance.now() / 3000) * 0.6;
    persp.fov = MathUtils.lerp(persp.fov, targetFov, 0.02);
    persp.updateProjectionMatrix();
  });

  return null;
}
