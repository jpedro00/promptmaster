"use client";

import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, type Ref } from "react";
import { AnimationMixer, Box3, Group, Vector3 } from "three";
import { SkeletonUtils } from "three-stdlib";

type Props = {
  url: string;
  /** Maior dimensão final do modelo, em unidades da cena. */
  size: number;
  /** Nome da animação a tocar; sem ela, toca a primeira, se houver. */
  animation?: string;
  ref?: Ref<Group>;
};

/** Carrega um .glb e o normaliza: centraliza e escala pela maior dimensão. */
export default function GlbModel({ url, size, animation, ref }: Props) {
  const { scene, animations } = useGLTF(url);
  const holder = useRef<Group>(null);
  const { actions, names } = useAnimations(animations, holder);

  const { object, scale } = useMemo(() => {
    const object = SkeletonUtils.clone(scene);

    // Mede num clone separado, já na pose da animação: com esqueleto, a pose de
    // repouso pode ter tamanho e posição bem diferentes do que aparece na tela.
    const probe = SkeletonUtils.clone(scene);
    const stage = new Group();
    stage.add(probe);
    const clip = animations.find((a) => a.name === animation) ?? animations[0];
    if (clip) new AnimationMixer(probe).clipAction(clip).play().getMixer().update(0);
    stage.updateMatrixWorld(true);
    const box = new Box3().setFromObject(stage, true);

    const dims = box.getSize(new Vector3());
    object.position.sub(box.getCenter(new Vector3()));
    return { object, scale: size / Math.max(dims.x, dims.y, dims.z) };
  }, [scene, animations, animation, size]);

  useEffect(() => {
    const name = animation && names.includes(animation) ? animation : names[0];
    const action = name ? actions[name] : null;
    action?.reset().fadeIn(0.3).play();
    return () => {
      action?.fadeOut(0.2);
    };
  }, [actions, names, animation]);

  return (
    <group ref={ref} scale={scale}>
      <group ref={holder}>
        <primitive object={object} />
      </group>
    </group>
  );
}
