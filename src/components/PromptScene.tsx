"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Text } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";
import { AI_MODELS } from "@/lib/ai-models";
import GlbModel from "./GlbModel";

const GEOMETRY: Record<string, React.ReactNode> = {
  claude: <octahedronGeometry args={[0.45]} />,
  gpt: <torusKnotGeometry args={[0.28, 0.1, 96, 16]} />,
  gemini: <dodecahedronGeometry args={[0.4]} />,
  other: <icosahedronGeometry args={[0.4, 0]} />,
};

/** O prompt: núcleo orgânico dentro de uma malha em wireframe. */
function PromptCore() {
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.95, 64, 64]} />
        <MeshDistortMaterial color="#8b5cf6" distort={0.4} speed={2} roughness={0.2} metalness={0.4} />
      </mesh>
    </Float>
  );
}

/** Cada IA do catálogo orbita o prompt com forma e cor próprias. */
function ModelOrbit() {
  const group = useRef<Group>(null);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.4;
  });

  return (
    <group ref={group}>
      {AI_MODELS.map((m, i) => {
        const angle = (i / AI_MODELS.length) * Math.PI * 2;
        return (
          <group key={m.id} position={[Math.cos(angle) * 3, Math.sin(i * 1.7) * 0.5, Math.sin(angle) * 3]}>
            <Float speed={3} floatIntensity={0.6}>
              <mesh>
                {GEOMETRY[m.id]}
                <meshStandardMaterial color={m.color} emissive={m.color} emissiveIntensity={0.4} metalness={0.5} roughness={0.3} />
              </mesh>
            </Float>
            <Text position={[0, -0.8, 0]} fontSize={0.25} color="#e5e7eb" anchorX="center">
              {m.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

export default function PromptScene() {
  return (
    <Canvas camera={{ position: [0, 1.5, 7], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={80} />
      <PromptCore />
      <ModelOrbit />
      {/* Lanterna: a ideia que vira prompt. BoomBox: o prompt sendo transmitido ao destino. */}
      <GlbModel url="/models/Lantern.glb" height={1.8} position={[0, 2.4, 0]} />
      <GlbModel url="/models/BoomBox.glb" height={1.1} position={[0, -2.3, 0]} />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}
