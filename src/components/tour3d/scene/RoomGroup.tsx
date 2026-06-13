'use client';

import { Shelf, Jar, Loaf, Flask, Book, Sack, FireLight } from './props';
import { HALL_W, type Room3D } from '../rooms';

// The signature props for one room, placed against a wall (alternating side).
export function RoomGroup({ room, z, side }: { room: Room3D; z: number; side: -1 | 1 }) {
  const wx = side * (HALL_W - 0.5); // near the wall
  const accent = room.accent;

  // Per-room accent fill light (gives each space its own mood + depth)
  const fill = (
    <pointLight position={[side * 3, 2.6, z]} color={accent} intensity={4.5} distance={15} decay={2} />
  );

  switch (room.type) {
    case 'street':
      return (
        <group>
          {/* warm doorway glow welcoming you in */}
          <pointLight position={[0, 2.4, z - 2]} color="#ffcf7a" intensity={7} distance={18} decay={2} />
        </group>
      );

    case 'display':
      return (
        <group>
          {fill}
          {[2.6, 1.5].map((y, r) => (
            <group key={y}>
              <Shelf position={[wx, y, z]} color="#3a2616" />
              {[-1.2, 0, 1.2].map((dz, j) => (
                <Jar key={j} position={[wx - side * 0.05, y + 0.33, z + dz]} color={accent} />
              ))}
            </group>
          ))}
        </group>
      );

    case 'corridor':
      // framed pictures on both walls — a timeline gallery
      return (
        <group>
          {fill}
          {([-1, 1] as const).map((s) =>
            [-1.6, 0, 1.6].map((dz, j) => (
              <mesh key={`${s}-${j}`} position={[s * (HALL_W - 0.12), 2.6, z + dz]} rotation={[0, s > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
                <planeGeometry args={[1.1, 1.4]} />
                <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.25} roughness={0.6} />
              </mesh>
            )),
          )}
        </group>
      );

    case 'lab':
      return (
        <group>
          {fill}
          {/* lab bench */}
          <mesh position={[wx, 1.0, z]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.12, 3.4]} />
            <meshStandardMaterial color="#2e2620" roughness={0.6} metalness={0.2} />
          </mesh>
          {[-1, 0, 1].map((dz) => (
            <Flask key={dz} position={[wx - side * 0.05, 1.35, z + dz]} color={accent} />
          ))}
          {/* a soft chalkboard glow on the opposite wall */}
          <mesh position={[-wx, 2.6, z]} rotation={[0, side > 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
            <planeGeometry args={[3, 1.6]} />
            <meshStandardMaterial color="#10322c" emissive={accent} emissiveIntensity={0.12} roughness={0.8} />
          </mesh>
        </group>
      );

    case 'breadcase':
      return (
        <group>
          {fill}
          {/* counter */}
          <mesh position={[wx, 1.0, z]} castShadow receiveShadow>
            <boxGeometry args={[0.9, 1.0, 3.6]} />
            <meshStandardMaterial color="#5a3a1e" roughness={0.85} />
          </mesh>
          {[-1.2, -0.4, 0.4, 1.2].map((dz, j) => (
            <Loaf key={dz} position={[wx - side * 0.1, 1.65, z + dz]} color={j % 2 ? '#c8843e' : '#a85a2a'} rot={j} />
          ))}
        </group>
      );

    case 'workshop':
    case 'bench':
      return (
        <group>
          {fill}
          {/* workbench */}
          <mesh position={[wx, 1.0, z]} castShadow receiveShadow>
            <boxGeometry args={[1.0, 1.0, 3.4]} />
            <meshStandardMaterial color="#6a4626" roughness={0.85} />
          </mesh>
          {/* dough / flour on the bench */}
          <Loaf position={[wx - side * 0.15, 1.62, z - 0.6]} color="#e8d8b0" />
          <Sack position={[wx - side * 0.2, 0.4, z + 1.4]} />
          {/* hanging tools */}
          {[-1, 0.2, 1.2].map((dz, j) => (
            <mesh key={dz} position={[wx - side * 0.4, 3.2 - (j % 2) * 0.3, z + dz]}>
              <torusGeometry args={[0.16, 0.03, 6, 16]} />
              <meshStandardMaterial color="#caa" metalness={0.6} roughness={0.4} />
            </mesh>
          ))}
        </group>
      );

    case 'cellar':
      return (
        <group>
          {/* the wood-fired oven — protagonist of the basement */}
          <mesh position={[wx, 1.4, z]} castShadow receiveShadow>
            <boxGeometry args={[1.6, 2.8, 4.2]} />
            <meshStandardMaterial color="#3a201a" roughness={0.95} />
          </mesh>
          {/* arched oven mouth */}
          <mesh position={[wx - side * 0.82, 1.2, z]} rotation={[0, side > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
            <circleGeometry args={[0.85, 24, 0, Math.PI]} />
            <meshStandardMaterial color="#1a0a06" />
          </mesh>
          <FireLight position={[wx - side * 1.0, 1.0, z]} />
          {/* warm reddish ground glow */}
          <pointLight position={[0, 0.6, z]} color="#e0561e" intensity={3} distance={14} decay={2} />
        </group>
      );

    case 'pantry':
      return (
        <group>
          {fill}
          {[2.6, 1.7, 0.8].map((y) => (
            <group key={y}>
              <Shelf position={[wx, y, z]} color="#3a2616" />
              {[-1.2, 0, 1.2].map((dz, j) =>
                j === 1 ? (
                  <Sack key={dz} position={[wx - side * 0.05, y + 0.4, z + dz]} />
                ) : (
                  <Jar key={dz} position={[wx - side * 0.05, y + 0.33, z + dz]} color={accent} />
                ),
              )}
            </group>
          ))}
        </group>
      );

    case 'library': {
      const colors = ['#7a3a2a', '#5a4828', '#3a4a5a', '#6a5a3a', '#4a3a2a'];
      return (
        <group>
          {fill}
          {[2.7, 1.9, 1.1].map((y) => (
            <group key={y}>
              <Shelf position={[wx, y, z]} width={4} color="#2e1c0d" />
              {Array.from({ length: 14 }, (_, k) => (
                <Book
                  key={k}
                  position={[wx - side * 0.02, y + 0.36, z - 1.7 + k * 0.26]}
                  color={colors[k % colors.length]}
                  h={0.5 + (k % 3) * 0.06}
                />
              ))}
            </group>
          ))}
        </group>
      );
    }

    case 'exit':
      return (
        <group>
          {/* the way out — a bright warm doorway ahead */}
          <mesh position={[0, 2.2, z - 1]}>
            <planeGeometry args={[3, 4.4]} />
            <meshStandardMaterial color="#ffcf7a" emissive="#ffcf7a" emissiveIntensity={1.4} toneMapped={false} />
          </mesh>
          <pointLight position={[0, 2.2, z]} color="#ffcf7a" intensity={9} distance={20} decay={2} />
        </group>
      );

    default:
      return <group>{fill}</group>;
  }
}
