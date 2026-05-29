"use client";

import type React from "react"

import { forwardRef, useImperativeHandle, useEffect, useRef, useMemo, useState, Component, type FC, type ReactNode } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import { degToRad } from "three/src/math/MathUtils.js"
import { ArrowRight, GitBranch, Star } from "lucide-react"

// ============================================================================
// BEAMS COMPONENT (3D Background)
// ============================================================================

type UniformValue = THREE.IUniform<unknown> | unknown

interface ExtendMaterialConfig {
  header: string
  vertexHeader?: string
  fragmentHeader?: string
  material?: THREE.MeshPhysicalMaterialParameters & { fog?: boolean }
  uniforms?: Record<string, UniformValue>
  vertex?: Record<string, string>
  fragment?: Record<string, string>
}

type ShaderWithDefines = THREE.ShaderLibShader & {
  defines?: Record<string, string | number | boolean>
}

function extendMaterial<T extends THREE.Material = THREE.Material>(
  BaseMaterial: new (params?: THREE.MaterialParameters) => T,
  cfg: ExtendMaterialConfig,
): THREE.ShaderMaterial {
  const physical = THREE.ShaderLib.physical as ShaderWithDefines
  const { vertexShader: baseVert, fragmentShader: baseFrag, uniforms: baseUniforms } = physical
  const baseDefines = physical.defines ?? {}

  const uniforms: Record<string, THREE.IUniform> = THREE.UniformsUtils.clone(baseUniforms)

  const defaults = new BaseMaterial(cfg.material || {}) as T & {
    color?: THREE.Color
    roughness?: number
    metalness?: number
    envMap?: THREE.Texture
    envMapIntensity?: number
  }

  if (defaults.color) uniforms.diffuse.value = defaults.color
  if ("roughness" in defaults) uniforms.roughness.value = defaults.roughness
  if ("metalness" in defaults) uniforms.metalness.value = defaults.metalness
  if ("envMap" in defaults) uniforms.envMap.value = defaults.envMap
  if ("envMapIntensity" in defaults) uniforms.envMapIntensity.value = defaults.envMapIntensity

  Object.entries(cfg.uniforms ?? {}).forEach(([key, u]) => {
    uniforms[key] =
      u !== null && typeof u === "object" && "value" in u
        ? (u as THREE.IUniform<unknown>)
        : ({ value: u } as THREE.IUniform<unknown>)
  })

  let vert = `${cfg.header}
${cfg.vertexHeader ?? ""}
${baseVert}`
  let frag = `${cfg.header}
${cfg.fragmentHeader ?? ""}
${baseFrag}`

  for (const [inc, code] of Object.entries(cfg.vertex ?? {})) {
    vert = vert.replace(inc, `${inc}
${code}`)
  }

  for (const [inc, code] of Object.entries(cfg.fragment ?? {})) {
    frag = frag.replace(inc, `${inc}
${code}`)
  }

  const mat = new THREE.ShaderMaterial({
    defines: { ...baseDefines },
    uniforms,
    vertexShader: vert,
    fragmentShader: frag,
    lights: true,
    fog: !!cfg.material?.fog,
  })

  return mat
}

/* ── WebGL error boundary — silently swaps to null on Canvas failure ─ */
class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

const CanvasWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <WebGLBoundary>
    <Canvas dpr={[1, 2]} frameloop="always" className="w-full h-full relative">
      {children}
    </Canvas>
  </WebGLBoundary>
)

const hexToNormalizedRGB = (hex: string): [number, number, number] => {
  const clean = hex.replace("#", "")
  const r = Number.parseInt(clean.substring(0, 2), 16)
  const g = Number.parseInt(clean.substring(2, 4), 16)
  const b = Number.parseInt(clean.substring(4, 6), 16)
  return [r / 255, g / 255, b / 255]
}

const noise = `
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
           (c - a)* u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
}

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec3 P){
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
  vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y);
  float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x);
  return 2.2 * n_xyz;
}
`

interface BeamsProps {
  beamWidth?: number
  beamHeight?: number
  beamNumber?: number
  lightColor?: string
  speed?: number
  noiseIntensity?: number
  scale?: number
  rotation?: number
}

function createStackedPlanesBufferGeometry(
  n: number,
  width: number,
  height: number,
  spacing: number,
  heightSegments: number,
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry()
  const numVertices = n * (heightSegments + 1) * 2
  const numFaces = n * heightSegments * 2

  const positions = new Float32Array(numVertices * 3)
  const indices = new Uint32Array(numFaces * 3)
  const uvs = new Float32Array(numVertices * 2)

  let vertexOffset = 0
  let indexOffset = 0
  let uvOffset = 0

  const totalWidth = n * width + (n - 1) * spacing
  const xOffsetBase = -totalWidth / 2

  for (let i = 0; i < n; i++) {
    const xOffset = xOffsetBase + i * (width + spacing)
    const uvXOffset = Math.random() * 300
    const uvYOffset = Math.random() * 300

    for (let j = 0; j <= heightSegments; j++) {
      const y = height * (j / heightSegments - 0.5)
      const v0 = [xOffset, y, 0]
      const v1 = [xOffset + width, y, 0]

      positions.set([...v0, ...v1], vertexOffset * 3)

      const uvY = j / heightSegments
      uvs.set([uvXOffset, uvY + uvYOffset, uvXOffset + 1, uvY + uvYOffset], uvOffset)

      if (j < heightSegments) {
        const a = vertexOffset,
          b = vertexOffset + 1,
          c = vertexOffset + 2,
          d = vertexOffset + 3
        indices.set([a, b, c, c, b, d], indexOffset)
        indexOffset += 6
      }

      vertexOffset += 2
      uvOffset += 4
    }
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2))
  geometry.setIndex(new THREE.BufferAttribute(indices, 1))
  geometry.computeVertexNormals()

  return geometry
}

const MergedPlanes = forwardRef<
  THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>,
  {
    material: THREE.ShaderMaterial
    width: number
    count: number
    height: number
  }
>(({ material, width, count, height }, ref) => {
  const mesh = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null!)

  useImperativeHandle(ref, () => mesh.current)

  const geometry = useMemo(
    () => createStackedPlanesBufferGeometry(count, width, height, 0, 100),
    [count, width, height],
  )

  useFrame((_, delta) => {
    mesh.current.material.uniforms.time.value += 0.1 * delta
  })

  return <mesh ref={mesh} geometry={geometry} material={material} />
})

MergedPlanes.displayName = "MergedPlanes"

const PlaneNoise = forwardRef<
  THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>,
  {
    material: THREE.ShaderMaterial
    width: number
    count: number
    height: number
  }
>((props, ref) => (
  <MergedPlanes ref={ref} material={props.material} width={props.width} count={props.count} height={props.height} />
))

PlaneNoise.displayName = "PlaneNoise"

const DirLight: FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  const dir = useRef<THREE.DirectionalLight>(null!)

  useEffect(() => {
    if (!dir.current) return
    const cam = dir.current.shadow.camera as THREE.Camera & {
      top: number
      bottom: number
      left: number
      right: number
      far: number
    }
    cam.top = 24
    cam.bottom = -24
    cam.left = -24
    cam.right = 24
    cam.far = 64
    dir.current.shadow.bias = -0.004
  }, [])

  return <directionalLight ref={dir} color={color} intensity={1} position={position} />
}

const Beams: FC<BeamsProps> = ({
  beamWidth = 2,
  beamHeight = 15,
  beamNumber = 12,
  lightColor = "#ffffff",
  speed = 2,
  noiseIntensity = 1.75,
  scale = 0.2,
  rotation = 0,
}) => {
  const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null!)

  const beamMaterial = useMemo(
    () =>
      extendMaterial(THREE.MeshStandardMaterial, {
        header: `
  varying vec3 vEye;
  varying float vNoise;
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float time;
  uniform float uSpeed;
  uniform float uNoiseIntensity;
  uniform float uScale;
  ${noise}`,
        vertexHeader: `
  float getPos(vec3 pos) {
    vec3 noisePos =
      vec3(pos.x * 0., pos.y - uv.y, pos.z + time * uSpeed * 3.) * uScale;
    return cnoise(noisePos);
  }

  vec3 getCurrentPos(vec3 pos) {
    vec3 newpos = pos;
    newpos.z += getPos(pos);
    return newpos;
  }

  vec3 getNormal(vec3 pos) {
    vec3 curpos = getCurrentPos(pos);
    vec3 nextposX = getCurrentPos(pos + vec3(0.01, 0.0, 0.0));
    vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.01, 0.0));
    vec3 tangentX = normalize(nextposX - curpos);
    vec3 tangentZ = normalize(nextposZ - curpos);
    return normalize(cross(tangentZ, tangentX));
  }`,
        fragmentHeader: "",
        vertex: {
          "#include <begin_vertex>": `transformed.z += getPos(transformed.xyz);`,
          "#include <beginnormal_vertex>": `objectNormal = getNormal(position.xyz);`,
        },
        fragment: {
          "#include <dithering_fragment>": `
    float randomNoise = noise(gl_FragCoord.xy);
    gl_FragColor.rgb -= randomNoise / 15. * uNoiseIntensity;`,
        },
        material: { fog: true },
        uniforms: {
          diffuse: new THREE.Color(...hexToNormalizedRGB("#000000")),
          time: { shared: true, mixed: true, linked: true, value: 0 },
          roughness: 0.3,
          metalness: 0.3,
          uSpeed: { shared: true, mixed: true, linked: true, value: speed },
          envMapIntensity: 10,
          uNoiseIntensity: noiseIntensity,
          uScale: scale,
        },
      }),
    [speed, noiseIntensity, scale],
  )

  return (
    <CanvasWrapper>
      <group rotation={[0, 0, degToRad(rotation)]}>
        <PlaneNoise ref={meshRef} material={beamMaterial} count={beamNumber} width={beamWidth} height={beamHeight} />
        <DirLight color={lightColor} position={[0, 3, 10]} />
      </group>
      <ambientLight intensity={1} />
      <color attach="background" args={["#000000"]} />
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={30} />
    </CanvasWrapper>
  )
}

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "lg"
  children: React.ReactNode
}

const Button = ({ variant = "default", size = "sm", className = "", children, ...props }: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-white text-black hover:bg-gray-100",
    outline: "border border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/30",
    ghost: "text-white/90 hover:text-white hover:bg-white/10",
  }

  const sizes = {
    sm: "h-9 px-4 py-2 text-sm",
    lg: "px-8 py-6 text-lg",
  }

  return (
    <button
      className={`group relative overflow-hidden rounded-full ${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center">{children}</span>
      <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
    </button>
  )
}

// ============================================================================
// MAIN HERO COMPONENT
// ============================================================================

/**
 * Ethereal Beams Hero
 *
 * A mesmerizing hero section featuring animated 3D light beams with glassmorphic navigation.
 * Perfect for modern SaaS, creative agencies, and tech startups looking to make a bold first impression.
 *
 * Features:
 * - Animated 3D light beams background
 * - Glassmorphic pill-shaped navigation
 * - Shimmer button effects
 * - Fully responsive design
 * - Black & white aesthetic
 */
const scrollTo = (id: string) =>
  document.querySelector(`#${id.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" })

// ── Stat card sub-animations ──────────────────────────────────────────────

function BarsVisual({ active }: { active: boolean }) {
  const bars = [55, 85, 70, 95, 60];
  return (
    <div style={{
      position: "absolute", bottom: 10, right: 14,
      display: "flex", alignItems: "flex-end", gap: 3, height: 36,
      opacity: active ? 0.45 : 0.1, transition: "opacity 0.4s ease",
      pointerEvents: "none",
    }}>
      {bars.map((h, i) => (
        <div key={i} style={{
          width: 5, borderRadius: 3, background: "#fff",
          height: active ? `${h}%` : "8%",
          transition: `height 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.06}s`,
        }} />
      ))}
    </div>
  );
}

function RingVisual({ active }: { active: boolean }) {
  const r = 16, circ = 2 * Math.PI * r;
  return (
    <svg width="40" height="40" style={{
      position: "absolute", top: 10, right: 12,
      opacity: active ? 0.5 : 0.12, transition: "opacity 0.4s ease",
      pointerEvents: "none",
    }}>
      <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" />
      <circle cx="20" cy="20" r={r} fill="none" stroke="white" strokeWidth="2.5"
        strokeDasharray={circ}
        strokeDashoffset={active ? circ * 0.08 : circ}
        strokeLinecap="round"
        transform="rotate(-90 20 20)"
        style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.4,0,0.2,1)" }}
      />
      <text x="20" y="24" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" opacity={active ? 0.9 : 0}>5</text>
    </svg>
  );
}

function TrendVisual({ active }: { active: boolean }) {
  // SVG polyline: upward trend path
  const points = "4,36 14,28 24,32 34,18 44,22 54,10 64,14";
  const len = 120;
  return (
    <svg width="72" height="44" viewBox="0 0 72 44" style={{
      position: "absolute", bottom: 10, right: 10,
      opacity: active ? 1 : 0.15, transition: "opacity 0.35s ease",
      pointerEvents: "none", overflow: "visible",
    }}>
      {/* Area fill */}
      <polyline
        points={`4,44 ${points} 64,44`}
        fill="rgba(255,255,255,0.08)"
        stroke="none"
      />
      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={len}
        strokeDashoffset={active ? 0 : len}
        style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1)" }}
      />
      {/* End dot */}
      <circle cx="64" cy="14" r="3.5" fill="white"
        opacity={active ? 1 : 0}
        style={{ transition: "opacity 0.3s ease 0.5s" }}
      />
    </svg>
  );
}

function useCountUp(active: boolean, target: number, duration = 600) {
  const [n, setN] = useState(target);
  useEffect(() => {
    if (!active) { setN(target); return; }
    setN(0);
    let cur = 0;
    const steps = 20;
    const step = Math.max(1, Math.ceil(target / steps));
    const delay = Math.floor(duration / steps);
    const id = setInterval(() => {
      cur = Math.min(cur + step, target);
      setN(cur);
      if (cur >= target) clearInterval(id);
    }, delay);
    return () => clearInterval(id);
  }, [active, target, duration]);
  return n;
}

function AnimatedStats() {
  const [hovered, setHovered] = useState<number | null>(null);

  const n0 = useCountUp(hovered === 0, 15);
  const n2 = useCountUp(hovered === 2, 150);
  const n3 = useCountUp(hovered === 3, 5);

  const items = [
    { key: "clients", value: `${n0}+`,  label: "Logistics clients",  i: 0, visual: <BarsVisual  active={hovered === 0} /> },
    { key: "revenue", value: `$${n2}K`, label: "Revenue generated",  i: 2, visual: <BarsVisual  active={hovered === 2} /> },
    { key: "years",   value: `${n3} yr`,label: "In logistics mktg",  i: 3, visual: <RingVisual  active={hovered === 3} /> },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mx-auto" style={{ maxWidth: 520 }}>
      {items.map(({ key, value, label, i, visual }) => {
        const isActive = hovered === i;
        return (
          <div
            key={key}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="hero-stat-card"
            style={{
              position: "relative",
              overflow: "hidden",
              flex: "1 1 130px",
              minWidth: 120,
              maxWidth: 160,
              padding: "18px 18px 14px",
              borderRadius: 16,
              border: `1px solid ${isActive ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"}`,
              background: isActive ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
              backdropFilter: "blur(12px)",
              cursor: "default",
              userSelect: "none",
              textAlign: "left",
              transform: isActive ? "translateY(-4px)" : "translateY(0)",
              transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, background 0.3s",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "#fff",
                lineHeight: 1,
                marginBottom: 6,
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {label}
            </div>
            {visual}
          </div>
        );
      })}
    </div>
  );
}

export default function EtherealBeamsHero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">

      {/* ── 3D Light Beams Background ────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Beams
          beamWidth={2.5}
          beamHeight={18}
          beamNumber={15}
          lightColor="#ffffff"
          speed={2.5}
          noiseIntensity={2}
          scale={0.15}
          rotation={43}
        />
      </div>


      {/* ── Hero Content ──────────────────────────────────── */}
      <div className="relative z-10 flex min-h-screen items-center pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 w-full">
          <div className="max-w-5xl mx-auto text-center">

            {/* Badge */}
            <div
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-1.5"
              style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
            >
              <Star className="h-3 w-3 text-white/50" />
              <span className="text-xs font-semibold tracking-widest uppercase text-white/60">
                Marketing Agency for Logistics
              </span>
            </div>

            {/* Headline — 2 lines */}
            <h1
              className="font-bold text-white hero-headline"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.8vw, 6rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                marginBottom: "clamp(16px, 2.5vw, 36px)",
              }}
            >
              BIG ONE — Marketing Agency<br />
              <span
                style={{
                  background: "linear-gradient(90deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                for Trucking Companies
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-white/60 leading-relaxed mx-auto mb-16"
              style={{ fontSize: "clamp(15px, 1.35vw, 18px)", maxWidth: 560, lineHeight: 1.75 }}
            >
              BigOne handles everything — brand identity, website, social content,
              paid ads, and lead generation — so trucking and freight companies
              can stay focused on the road. We don't do generic marketing.
              Every strategy is built from the ground up for logistics.
            </p>

            {/* Stats strip */}
            <AnimatedStats />

          </div>
        </div>
      </div>

      {/* ── Gradient overlay ─────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />
    </div>
  )
}
