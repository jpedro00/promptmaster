"use client";

import { Float, useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { Box3, Vector3 } from "three";

type Props = {
  url: string;
  /** Altura final do modelo em unidades da cena. */
  height: number;
  position: [number, number, number];
};

/** Carrega um .glb e o normaliza: centraliza e escala para a altura pedida. */
export default function GlbModel({ url, height, position }: Props) {
  const { scene } = useGLTF(url);
  const { object, scale } = useMemo(() => {
    const object = scene.clone(true);
    const box = new Box3().setFromObject(object);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    object.position.sub(center);
    return { object, scale: height / size.y };
  }, [scene, height]);

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position} scale={scale}>
        <primitive object={object} />
      </group>
    </Float>
  );
}
