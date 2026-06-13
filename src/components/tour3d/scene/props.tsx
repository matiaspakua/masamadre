'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh, PointLight } from 'three';

// Stylized, low-poly bakery props. Warm matte materials; a few emissive
// accents for lamps, ovens and lab glassware. Kept lightweight for mobile.

// Hanging lamp. Emissive bulb only (no per-lamp point light) — the camera
// follow-light lights the hall as you pass, keeping the dynamic light count low.
export function Lamp({ position, color = '#ffcf7a' }: { position: [number, number, number]; color?: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.8, 6]} />
        <meshStandardMaterial color="#2a1c10" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.6} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function Shelf({ position, width = 4, color = '#3a2616' }: { position: [number, number, number]; width?: number; color?: string }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[width, 0.12, 0.6]} />
      <meshStandardMaterial color={color} roughness={0.85} />
    </mesh>
  );
}

export function Jar({ position, color = '#c0741a' }: { position: [number, number, number]; color?: string }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.5, 14]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.05} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.13, 0.16, 0.12, 14]} />
        <meshStandardMaterial color="#2a1c10" />
      </mesh>
    </group>
  );
}

export function Loaf({ position, color = '#b5732e', rot = 0 }: { position: [number, number, number]; color?: string; rot?: number }) {
  return (
    <mesh position={position} rotation={[0, rot, 0]} scale={[1, 0.62, 0.78]} castShadow>
      <sphereGeometry args={[0.42, 18, 14]} />
      <meshStandardMaterial color={color} roughness={0.95} />
    </mesh>
  );
}

export function Flask({ position, color = '#0e9a86' }: { position: [number, number, number]; color?: string }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <coneGeometry args={[0.26, 0.5, 16]} />
        <meshStandardMaterial color="#cfe8e4" roughness={0.15} transparent opacity={0.5} />
      </mesh>
      {/* glowing contents */}
      <mesh position={[0, -0.12, 0]}>
        <coneGeometry args={[0.2, 0.26, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} toneMapped={false} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.18, 10]} />
        <meshStandardMaterial color="#cfe8e4" roughness={0.15} transparent opacity={0.5} />
      </mesh>
      <pointLight color={color} intensity={1.4} distance={3} decay={2} />
    </group>
  );
}

export function Book({ position, color, h = 0.5 }: { position: [number, number, number]; color: string; h?: number }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[0.12, h, 0.34]} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
}

export function Sack({ position, color = '#d8c39a' }: { position: [number, number, number]; color?: string }) {
  return (
    <mesh position={position} scale={[1, 1.15, 1]} castShadow>
      <sphereGeometry args={[0.4, 12, 10]} />
      <meshStandardMaterial color={color} roughness={1} />
    </mesh>
  );
}

// A flickering warm light — used for the wood-fired oven.
export function FireLight({ position, color = '#ff7a1e' }: { position: [number, number, number]; color?: string }) {
  const light = useRef<PointLight>(null);
  const mesh = useRef<Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const f = 1 + Math.sin(t * 9) * 0.18 + Math.sin(t * 23) * 0.1;
    if (light.current) light.current.intensity = 9 * f;
    if (mesh.current) {
      const m = mesh.current.material as { emissiveIntensity?: number };
      m.emissiveIntensity = 2.4 * f;
    }
  });
  return (
    <group position={position}>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.4} toneMapped={false} />
      </mesh>
      <pointLight ref={light} color={color} intensity={9} distance={16} decay={2} />
    </group>
  );
}
