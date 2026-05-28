"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

type Variant = "semi" | "reefer" | "tanker";

interface Props {
  rotate?: boolean;
  variant?: Variant;
  bodyColor?: string;
  trailerColor?: string;
  accent?: string;
  wireframe?: boolean;
  wireframeOpacity?: number;
}

/**
 * Cinematic Class-8 semi-truck.
 * Key upgrades over v1:
 *  - RoundedBox for all major bodies (no Minecraft hard edges)
 *  - envMapIntensity boosted on paint (2.5) and chrome (3.5)
 *  - headlight / taillight emissiveIntensity tuned for Bloom
 *  - Aerodynamic roof fairing added to cab
 */
export default function PlaceholderTruck({
  rotate = false,
  variant = "semi",
  bodyColor = "#22242A",
  trailerColor = "#1B1D22",
  accent = "#FF5A1F",
}: Props) {
  const groupRef = useRef<THREE.Group>(null);

  // ─────────────────────────────────────────────────── MATERIALS

  const paint = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: bodyColor,
        metalness: 0.45,
        roughness: 0.28,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        envMapIntensity: 2.5,
      }),
    [bodyColor]
  );

  const trailerPaint = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: trailerColor,
        metalness: 0.4,
        roughness: 0.36,
        clearcoat: 0.7,
        clearcoatRoughness: 0.12,
        envMapIntensity: 1.8,
      }),
    [trailerColor]
  );

  const chrome = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#DADBE0",
        metalness: 1,
        roughness: 0.05,
        clearcoat: 1,
        envMapIntensity: 3.5,
      }),
    []
  );

  const dark = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0A0A0B",
        roughness: 0.85,
        metalness: 0.1,
      }),
    []
  );

  const tire = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0C0C0D",
        roughness: 0.95,
        metalness: 0.05,
      }),
    []
  );

  const hub = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#5A5C61",
        metalness: 0.95,
        roughness: 0.2,
        envMapIntensity: 2.0,
      }),
    []
  );

  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#0A1014",
        metalness: 0.1,
        roughness: 0.03,
        transmission: 0.6,
        ior: 1.45,
        thickness: 0.2,
        envMapIntensity: 1.5,
      }),
    []
  );

  /* emissiveIntensity 5 → bright enough for Bloom threshold 0.8 */
  const headlight = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FFFAEC",
        emissive: "#FFFAEC",
        emissiveIntensity: 5.0,
      }),
    []
  );

  const taillight = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FF1F1F",
        emissive: "#FF1F1F",
        emissiveIntensity: 3.5,
      }),
    []
  );

  const accentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: 0.65,
        roughness: 0.5,
      }),
    [accent]
  );

  // ─────────────────────────────────────────────────── IDLE MOTION
  useFrame((state) => {
    if (rotate && groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.035;
    }
  });

  const wheelRadius = 0.55;
  const wheelWidth  = 0.35;
  const wheelY      = wheelRadius;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>

      {/* ═══════════════════════════════════════════════ TRACTOR */}
      <group position={[0, 0, 2.6]}>

        {/* Chassis frame */}
        <mesh position={[0, 0.6, 0]} castShadow material={dark}>
          <boxGeometry args={[1.7, 0.25, 4.4]} />
        </mesh>

        {/* Hood — ROUNDED (key upgrade) */}
        <RoundedBox
          args={[2.05, 0.95, 1.6]}
          radius={0.05}
          smoothness={4}
          position={[0, 1.3, 1.7]}
          castShadow
          material={paint}
        />
        <mesh position={[0, 1.15, 2.55]} castShadow material={paint}>
          <boxGeometry args={[1.95, 0.7, 0.2]} />
        </mesh>

        {/* Grille */}
        <mesh position={[0, 1.25, 2.65]} castShadow material={chrome}>
          <boxGeometry args={[1.5, 0.55, 0.06]} />
        </mesh>
        {[-0.2, -0.07, 0.06, 0.19].map((y) => (
          <mesh key={`grille-${y}`} position={[0, 1.25 + y, 2.69]} material={dark}>
            <boxGeometry args={[1.4, 0.04, 0.02]} />
          </mesh>
        ))}

        {/* Bumper */}
        <mesh position={[0, 0.55, 2.7]} castShadow material={chrome}>
          <boxGeometry args={[2.15, 0.35, 0.18]} />
        </mesh>
        <mesh position={[0, 0.55, 2.79]} material={accentMat}>
          <boxGeometry args={[2.1, 0.04, 0.02]} />
        </mesh>

        {/* Headlights (high emissive → Bloom glow) */}
        <mesh position={[-0.78, 1.05, 2.66]} material={headlight}>
          <boxGeometry args={[0.32, 0.18, 0.08]} />
        </mesh>
        <mesh position={[0.78, 1.05, 2.66]} material={headlight}>
          <boxGeometry args={[0.32, 0.18, 0.08]} />
        </mesh>

        {/* Cab body — ROUNDED */}
        <RoundedBox
          args={[2.15, 2.05, 1.4]}
          radius={0.07}
          smoothness={4}
          position={[0, 1.85, 0.7]}
          castShadow
          material={paint}
        />

        {/* Sleeper — ROUNDED */}
        <RoundedBox
          args={[2.15, 2.25, 1.1]}
          radius={0.07}
          smoothness={4}
          position={[0, 1.95, -0.55]}
          castShadow
          material={paint}
        />

        {/* Aerodynamic roof fairing (NEW) */}
        <RoundedBox
          args={[2.1, 0.52, 1.9]}
          radius={0.1}
          smoothness={4}
          position={[0, 3.25, 0.05]}
          castShadow
          material={paint}
        />

        {/* Cab roof accent line */}
        <mesh position={[0, 3.08, 0.1]} material={accentMat}>
          <boxGeometry args={[2.16, 0.04, 2.6]} />
        </mesh>

        {/* Windshield */}
        <mesh position={[0, 2.25, 1.41]} material={glass} rotation={[-0.18, 0, 0]}>
          <boxGeometry args={[1.95, 1.0, 0.05]} />
        </mesh>

        {/* Side windows */}
        <mesh position={[-1.08, 2.25, 0.7]}  material={glass}><boxGeometry args={[0.04, 0.85, 1.2]} /></mesh>
        <mesh position={[ 1.08, 2.25, 0.7]}  material={glass}><boxGeometry args={[0.04, 0.85, 1.2]} /></mesh>
        <mesh position={[-1.08, 2.4,  -0.55]} material={glass}><boxGeometry args={[0.04, 0.45, 0.6]} /></mesh>
        <mesh position={[ 1.08, 2.4,  -0.55]} material={glass}><boxGeometry args={[0.04, 0.45, 0.6]} /></mesh>

        {/* Mirrors */}
        {[-1.25, 1.25].map((x) => (
          <group key={`mirror-${x}`} position={[x, 2.05, 1.25]}>
            <mesh material={dark}><boxGeometry args={[0.04, 0.7, 0.04]} /></mesh>
            <mesh position={[Math.sign(x) * 0.18, 0, 0]} material={paint}>
              <boxGeometry args={[0.32, 0.55, 0.12]} />
            </mesh>
          </group>
        ))}

        {/* Exhaust stacks */}
        {[-0.95, 0.95].map((x) => (
          <mesh key={`stack-${x}`} position={[x, 2.7, -0.2]} material={chrome} castShadow>
            <cylinderGeometry args={[0.09, 0.09, 2.1, 16]} />
          </mesh>
        ))}
        {[-0.95, 0.95].map((x) => (
          <mesh key={`scap-${x}`} position={[x, 3.78, -0.2]} material={dark}>
            <cylinderGeometry args={[0.11, 0.11, 0.08, 16]} />
          </mesh>
        ))}

        {/* Fuel tanks */}
        {[-1.05, 1.05].map((x) => (
          <mesh key={`fuel-${x}`} position={[x, 0.75, -0.2]} material={chrome}
            rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.32, 0.32, 1.4, 24]} />
          </mesh>
        ))}
        {[-1.05, 1.05].map((x) => (
          <mesh key={`step-${x}`} position={[x, 0.4, -0.2]} material={dark}>
            <boxGeometry args={[0.12, 0.06, 1.4]} />
          </mesh>
        ))}

        {/* Fifth wheel */}
        <mesh position={[0, 0.85, -1.55]} material={dark}>
          <boxGeometry args={[1.2, 0.12, 0.6]} />
        </mesh>

        {/* Chassis side skirts */}
        {[-1.06, 1.06].map((x) => (
          <mesh key={`skirt-${x}`} position={[x, 0.55, -0.6]} material={paint}>
            <boxGeometry args={[0.06, 0.7, 2.6]} />
          </mesh>
        ))}

        {/* ── Tractor wheels ── */}
        <Wheel position={[-1.0, wheelY, 1.55]} r={wheelRadius} w={wheelWidth} tireMat={tire} hubMat={hub} />
        <Wheel position={[ 1.0, wheelY, 1.55]} r={wheelRadius} w={wheelWidth} tireMat={tire} hubMat={hub} />
        {[-0.65, -1.65].map((z) => (
          <group key={`drive-${z}`}>
            <Wheel position={[-0.85, wheelY, z]} r={wheelRadius} w={wheelWidth} tireMat={tire} hubMat={hub} />
            <Wheel position={[-1.18, wheelY, z]} r={wheelRadius} w={wheelWidth} tireMat={tire} hubMat={hub} />
            <Wheel position={[ 0.85, wheelY, z]} r={wheelRadius} w={wheelWidth} tireMat={tire} hubMat={hub} />
            <Wheel position={[ 1.18, wheelY, z]} r={wheelRadius} w={wheelWidth} tireMat={tire} hubMat={hub} />
          </group>
        ))}

        {[-1.0, 1.0].map((x) => (
          <mesh key={`flap-${x}`} position={[x, 0.45, -2.15]} material={dark}>
            <boxGeometry args={[0.5, 0.7, 0.04]} />
          </mesh>
        ))}
      </group>

      {/* ═══════════════════════════════════════════════ TRAILER */}
      <group position={[0, 0, -3.0]}>
        {variant === "semi" && (
          <ContainerTrailer trailerPaint={trailerPaint} dark={dark} accentMat={accentMat} taillight={taillight} />
        )}
        {variant === "reefer" && (
          <ReeferTrailer trailerPaint={trailerPaint} dark={dark} accentMat={accentMat} chrome={chrome} taillight={taillight} />
        )}
        {variant === "tanker" && (
          <TankerTrailer chrome={chrome} dark={dark} accentMat={accentMat} taillight={taillight} />
        )}

        {/* Trailer wheels */}
        {[-2.6, -3.5].map((z) => (
          <group key={`tr-${z}`}>
            <Wheel position={[-0.95, wheelY, z]} r={wheelRadius} w={wheelWidth} tireMat={tire} hubMat={hub} />
            <Wheel position={[-1.28, wheelY, z]} r={wheelRadius} w={wheelWidth} tireMat={tire} hubMat={hub} />
            <Wheel position={[ 0.95, wheelY, z]} r={wheelRadius} w={wheelWidth} tireMat={tire} hubMat={hub} />
            <Wheel position={[ 1.28, wheelY, z]} r={wheelRadius} w={wheelWidth} tireMat={tire} hubMat={hub} />
          </group>
        ))}

        {[-1.1, 1.1].map((x) => (
          <mesh key={`tflap-${x}`} position={[x, 0.45, -3.95]} material={dark}>
            <boxGeometry args={[0.55, 0.7, 0.04]} />
          </mesh>
        ))}
      </group>

    </group>
  );
}

/* ──────────────────────────────────────────────────────── WHEEL */
function Wheel({
  position, r, w, tireMat, hubMat,
}: {
  position: [number, number, number];
  r: number; w: number;
  tireMat: THREE.Material; hubMat: THREE.Material;
}) {
  return (
    <group position={position} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow material={tireMat}>
        <cylinderGeometry args={[r, r, w, 28]} />
      </mesh>
      <mesh position={[ w * 0.5 + 0.001, 0, 0]} material={hubMat}>
        <cylinderGeometry args={[r * 0.55, r * 0.55, 0.04, 20]} />
      </mesh>
      <mesh position={[-w * 0.5 - 0.001, 0, 0]} material={hubMat}>
        <cylinderGeometry args={[r * 0.55, r * 0.55, 0.04, 20]} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────── TRAILER VARIANTS */
function ContainerTrailer({ trailerPaint, dark, accentMat, taillight }: {
  trailerPaint: THREE.Material; dark: THREE.Material;
  accentMat: THREE.Material; taillight: THREE.Material;
}) {
  return (
    <group>
      {/* Main body — ROUNDED */}
      <RoundedBox
        args={[2.45, 2.7, 7.6]}
        radius={0.06}
        smoothness={4}
        position={[0, 2.0, -1.6]}
        castShadow
        material={trailerPaint}
      />
      {/* Top accent strip */}
      <mesh position={[0, 3.32, -1.6]} material={accentMat}>
        <boxGeometry args={[2.46, 0.05, 7.6]} />
      </mesh>
      {/* Side accent stripe */}
      <mesh position={[ 1.226, 1.4, -1.6]} material={accentMat}><boxGeometry args={[0.01, 0.06, 6.8]} /></mesh>
      <mesh position={[-1.226, 1.4, -1.6]} material={accentMat}><boxGeometry args={[0.01, 0.06, 6.8]} /></mesh>
      {/* Rear doors */}
      <mesh position={[0, 2.0, -5.41]} castShadow material={dark}><boxGeometry args={[2.4, 2.6, 0.05]} /></mesh>
      <mesh position={[0, 2.0, -5.43]} material={dark}><boxGeometry args={[0.04, 2.5, 0.02]} /></mesh>
      {/* Taillights */}
      <mesh position={[-1.0, 1.0, -5.44]} material={taillight}><boxGeometry args={[0.3, 0.18, 0.05]} /></mesh>
      <mesh position={[ 1.0, 1.0, -5.44]} material={taillight}><boxGeometry args={[0.3, 0.18, 0.05]} /></mesh>
      {/* Underside */}
      <mesh position={[0, 0.6, -1.6]} material={dark}><boxGeometry args={[1.7, 0.2, 7.4]} /></mesh>
    </group>
  );
}

function ReeferTrailer({ trailerPaint, dark, accentMat, chrome, taillight }: {
  trailerPaint: THREE.Material; dark: THREE.Material;
  accentMat: THREE.Material; chrome: THREE.Material; taillight: THREE.Material;
}) {
  return (
    <group>
      <mesh position={[0, 3.05, 1.5]} castShadow material={chrome}><boxGeometry args={[2.3, 0.7, 0.5]} /></mesh>
      <mesh position={[0, 3.05, 1.78]} material={dark}><boxGeometry args={[1.6, 0.5, 0.04]} /></mesh>
      {/* Body — ROUNDED */}
      <RoundedBox
        args={[2.5, 2.7, 7.4]}
        radius={0.06}
        smoothness={4}
        position={[0, 2.0, -1.6]}
        castShadow
        material={trailerPaint}
      />
      <mesh position={[0, 3.4,  -1.6]} material={chrome}><boxGeometry args={[2.5, 0.06, 7.4]} /></mesh>
      <mesh position={[0, 1.4,  -1.6]} material={accentMat}><boxGeometry args={[2.51, 0.06, 7.4]} /></mesh>
      <mesh position={[0, 2.0, -5.31]} castShadow material={dark}><boxGeometry args={[2.45, 2.6, 0.05]} /></mesh>
      <mesh position={[-1.0, 1.0, -5.34]} material={taillight}><boxGeometry args={[0.3, 0.18, 0.05]} /></mesh>
      <mesh position={[ 1.0, 1.0, -5.34]} material={taillight}><boxGeometry args={[0.3, 0.18, 0.05]} /></mesh>
      <mesh position={[0, 0.6, -1.6]} material={dark}><boxGeometry args={[1.7, 0.2, 7.2]} /></mesh>
    </group>
  );
}

function TankerTrailer({ chrome, dark, accentMat, taillight }: {
  chrome: THREE.Material; dark: THREE.Material;
  accentMat: THREE.Material; taillight: THREE.Material;
}) {
  return (
    <group>
      <mesh position={[0, 1.85, -1.6]} rotation={[Math.PI / 2, 0, 0]} castShadow material={chrome}>
        <cylinderGeometry args={[1.15, 1.15, 7.6, 32]} />
      </mesh>
      {[-3.2, -1.6, 0].map((z) => (
        <mesh key={`baf-${z}`} position={[0, 1.85, z]} rotation={[Math.PI / 2, 0, 0]} material={dark}>
          <torusGeometry args={[1.16, 0.04, 8, 32]} />
        </mesh>
      ))}
      {[-3.2, -1.6, 0].map((z) => (
        <mesh key={`hatch-${z}`} position={[0, 3.05, z]} material={dark}>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
        </mesh>
      ))}
      <mesh position={[0, 1.85, 2.2]} rotation={[Math.PI / 2, 0, 0]} material={accentMat}>
        <torusGeometry args={[1.16, 0.05, 8, 32]} />
      </mesh>
      <mesh position={[0, 1.0, -5.2]} material={dark}><boxGeometry args={[2.3, 0.1, 0.4]} /></mesh>
      <mesh position={[-0.9, 1.0, -5.42]} material={taillight}><boxGeometry args={[0.3, 0.18, 0.05]} /></mesh>
      <mesh position={[ 0.9, 1.0, -5.42]} material={taillight}><boxGeometry args={[0.3, 0.18, 0.05]} /></mesh>
      <mesh position={[0, 0.6, -1.6]} material={dark}><boxGeometry args={[1.5, 0.2, 7.2]} /></mesh>
    </group>
  );
}
