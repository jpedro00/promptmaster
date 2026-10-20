"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, type Group } from "three";
import type { HeroModel } from "@/lib/hero-models";
import { scroll } from "@/lib/scroll-state";
import GlbModel from "./GlbModel";

const { damp, lerp, smoothstep } = MathUtils;

/** Lanterna e rádio acompanham a rolagem: giram, trocam de lado e se alternam. */
function Stage({ model }: { model: HeroModel }) {
  const lantern = useRef<Group>(null);
  const radio = useRef<Group>(null);

  useFrame(({ clock }, dt) => {
    const p = scroll.progress;
    const t = clock.elapsedTime;
    const wide = window.innerWidth > 800;

    if (lantern.current) {
      const l = lantern.current;
      const x = wide ? lerp(1.9, -2.2, smoothstep(p, 0.05, 0.45)) : 0;
      const gone = smoothstep(p, 0.45, 0.6);
      l.position.x = damp(l.position.x, x, 4, dt);
      l.position.y = damp(l.position.y, lerp(0.1, -3.5, gone) + Math.sin(t * 1.4) * 0.12, 4, dt);
      l.rotation.y = damp(l.rotation.y, p * Math.PI * 6 + t * 0.2, 3, dt);
    }

    if (radio.current) {
      const r = radio.current;
      const arrive = smoothstep(p, 0.45, 0.75);
      const x = wide ? lerp(2.4, 1.9, smoothstep(p, 0.75, 1)) : 0;
      r.position.x = damp(r.position.x, x, 4, dt);
      r.position.y = damp(r.position.y, lerp(-4, 0, arrive) + Math.sin(t * 1.2) * 0.1, 4, dt);
      r.rotation.y = damp(r.rotation.y, -p * Math.PI * 4 + Math.PI, 3, dt);
    }
  });

  return (
    <>
      <GlbModel key={model.id} ref={lantern} url={model.url} size={model.size} animation={model.animation} />
      <GlbModel ref={radio} url="/models/BoomBox.glb" size={2.4} />
    </>
  );
}

export default function PromptScene({ model }: { model: HeroModel }) {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 40 }} dpr={[1, 2]} gl={{ alpha: true }}>
      <hemisphereLight args={["#ffffff", "#3b3bf2", 1.4]} />
      <directionalLight position={[4, 5, 6]} intensity={3} color="#fff4e0" />
      <directionalLight position={[-5, -2, 3]} intensity={1.6} color="#8f8fff" />
      <Stage model={model} />
    </Canvas>
  );
}
