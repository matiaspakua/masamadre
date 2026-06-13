'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import Bakery from './scene/Bakery';
import Rig from './scene/Rig';
import { startTourScroll, tourState } from '@/lib/tourScroll';
import { EYE_Y } from './rooms';

// A warm light that rides along with the camera so whatever room you are in is
// always lit as you move through the bakery.
function CameraLight() {
  const ref = useRef<THREE.PointLight>(null);
  const { camera } = useThree();
  useFrame(() => {
    if (ref.current) ref.current.position.set(camera.position.x, camera.position.y + 1.2, camera.position.z + 0.5);
  });
  return <pointLight ref={ref} color="#ffd89a" intensity={5} distance={14} decay={2} />;
}

// Slow-drifting flour dust for atmosphere/depth.
function Dust() {
  const geom = useMemo(() => {
    const n = 500;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = Math.random() * 6;
      arr[i * 3 + 2] = 12 - Math.random() * 200;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.05) * 0.04;
  });
  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial transparent color="#e9d4a8" size={0.05} sizeAttenuation depthWrite={false} opacity={0.5} />
    </points>
  );
}

export default function BakeryTour3D() {
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setMobile(window.innerWidth < 768);
    const stop = startTourScroll();
    return stop;
  }, []);

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        shadows={false}
        dpr={mobile ? [1, 1.4] : [1, 1.9]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, EYE_Y, 10], fov: 58, near: 0.1, far: 400 }}
        onCreated={({ camera }) => camera.lookAt(0, EYE_Y, -10)}
      >
        <color attach="background" args={['#120a05']} />
        <fogExp2 attach="fog" args={['#1a0e06', 0.02]} />

        {/* base ambience */}
        <ambientLight intensity={0.35} color="#ffe6c0" />
        <hemisphereLight intensity={0.3} color="#ffd89a" groundColor="#1a0e06" />

        <CameraLight />
        <Bakery />
        {!mobile && <Dust />}
        <Rig reduced={reduced} />
      </Canvas>
    </div>
  );
}
