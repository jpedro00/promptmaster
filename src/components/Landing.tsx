"use client";

import dynamic from "next/dynamic";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import PromptLibrary from "./PromptLibrary";
import { HERO_MODELS, DEFAULT_HERO_MODEL } from "@/lib/hero-models";
import { AI_MODELS, PLAN_RULES, type PlanId } from "@/lib/ai-models";
import { scroll } from "@/lib/scroll-state";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PromptScene = dynamic(() => import("./PromptScene"), { ssr: false });

const STEPS = [
  { title: "Descreva o que você quer", text: "Escreva a ideia do jeito que ela vier, sem se preocupar com formato." },
  { title: "Uma IA monta o prompt", text: "A IA construtora transforma sua ideia em instruções claras e completas." },
  { title: "Outra IA recebe", text: "O prompt sai no formato que a IA de destino entende melhor." },
];

const PLANS: { id: PlanId; name: string; line: string }[] = [
  { id: "free", name: "Free", line: "Constrói com a IA padrão e envia para a IA padrão." },
  { id: "pro", name: "Pro", line: "Escolhe para qual IA o prompt é otimizado." },
  { id: "max", name: "Max", line: "Escolhe a IA que monta e a IA que recebe." },
];

export default function Landing() {
  const root = useRef<HTMLDivElement>(null);
  const [heroId, setHeroId] = useState(DEFAULT_HERO_MODEL);
  const hero = HERO_MODELS.find((m) => m.id === heroId)!;

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const lenis = new Lenis({ smoothWheel: !reduce });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          scroll.progress = self.progress;
        },
      });

      // Única entrada automática da página: o título sobe linha a linha.
      gsap.from(".hero-line", { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.12 });

      // Seção fixa: o trilho anda para o lado enquanto você rola para baixo.
      const track = root.current!.querySelector<HTMLElement>(".track")!;
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: ".steps",
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Planos: abrem juntos quando a seção entra.
      ScrollTrigger.batch(".plan", {
        start: "top 85%",
        onEnter: (els) =>
          gsap.from(els, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "power3.out", stagger: 0.12 }),
        once: true,
      });

      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="page">
      <div className="stage" aria-hidden="true">
        <PromptScene model={hero} />
      </div>

      <header className="hero">
        <p className="brand">PromptMaster</p>
        <h1>
          <span className="mask">
            <span className="hero-line">Escreva o prompt uma vez.</span>
          </span>
          <span className="mask">
            <span className="hero-line">Entregue para a IA certa.</span>
          </span>
        </h1>
        <p className="lede">Uma IA monta o prompt. Outra o recebe. Nos planos mais altos, você escolhe as duas.</p>
        <label className="model-picker">
          Modelo 3D
          <select value={heroId} onChange={(e) => setHeroId(e.target.value)}>
            {HERO_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
      </header>

      <section className="steps" aria-label="Como funciona">
        <div className="track">
          {STEPS.map((s, i) => (
            <article key={s.title} className="step">
              <span className="step-n">{i + 1}</span>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="marquee" aria-label="IAs compatíveis">
        <div className="marquee-row">
          {[...AI_MODELS, ...AI_MODELS, ...AI_MODELS, ...AI_MODELS].map((m, i) => (
            <span key={i} style={{ color: m.color }}>
              {m.name}
            </span>
          ))}
        </div>
      </section>

      <section className="plans" aria-label="Planos">
        <h2>Quanto controle você quer?</h2>
        <div className="plan-grid">
          {PLANS.map((p) => (
            <article key={p.id} className="plan">
              <h3>{p.name}</h3>
              <p>{p.line}</p>
              <dl>
                <dt>Escolher IA construtora</dt>
                <dd>{PLAN_RULES[p.id].chooseBuilder ? "Sim" : "Não"}</dd>
                <dt>Escolher IA de destino</dt>
                <dd>{PLAN_RULES[p.id].chooseTarget ? "Sim" : "Não"}</dd>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <PromptLibrary />

      <footer className="foot">Modelos 3D: Khronos glTF Sample Assets, three.js examples e Sketchfab (CC0 e CC BY 4.0). Créditos completos em /models/CREDITS.md.</footer>
    </div>
  );
}
