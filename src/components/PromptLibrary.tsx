"use client";

import { useState } from "react";
import { AI_MODELS } from "@/lib/ai-models";
import {
  PROMPTS,
  PROMPT_CATEGORIES,
  STYLE_VARIANTS,
  renderPrompt,
  type PromptCategory,
} from "@/lib/prompt-library";

export default function PromptLibrary() {
  const [category, setCategory] = useState<PromptCategory | "Todos">("Todos");
  const [target, setTarget] = useState(AI_MODELS[0].id);
  const [style, setStyle] = useState<string>("none");
  const [copied, setCopied] = useState<string | null>(null);

  const visible = PROMPTS.filter((p) => category === "Todos" || p.category === category);
  const targetModel = AI_MODELS.find((m) => m.id === target)!;

  async function copy(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied((c) => (c === id ? null : c)), 1800);
    } catch {
      setCopied(null);
    }
  }

  return (
    <section className="library" aria-labelledby="library-title">
      <h2 id="library-title">Biblioteca de prompts</h2>
      <p className="library-lede">
        {PROMPTS.length} prompts para criar um site com three.js como este, do zero. Cada um sai no formato da IA que
        você escolher: {targetModel.promptStyle.toLowerCase()}.
      </p>

      <div className="library-controls">
        <fieldset>
          <legend>Categoria</legend>
          {["Todos", ...PROMPT_CATEGORIES].map((c) => (
            <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c as typeof category)}>
              {c}
            </button>
          ))}
        </fieldset>
        <fieldset>
          <legend>IA de destino</legend>
          {AI_MODELS.map((m) => (
            <button key={m.id} type="button" aria-pressed={target === m.id} onClick={() => setTarget(m.id)}>
              {m.name}
            </button>
          ))}
        </fieldset>
        <fieldset>
          <legend>Estilo visual</legend>
          {STYLE_VARIANTS.map((s) => (
            <button key={s.id} type="button" aria-pressed={style === s.id} onClick={() => setStyle(s.id)}>
              {s.label}
            </button>
          ))}
        </fieldset>
      </div>

      <div className="library-list">
        {visible.map((p) => {
          const text = renderPrompt(p, target, style);
          return (
            <details key={p.id} className="prompt">
              <summary>
                <span className="prompt-title">{p.title}</span>
                <span className="prompt-cat">{p.category}</span>
                <span className="prompt-sum">{p.summary}</span>
              </summary>
              <pre>{text}</pre>
              <button type="button" className="copy" onClick={() => copy(p.id, text)}>
                {copied === p.id ? "Copiado" : "Copiar prompt"}
              </button>
            </details>
          );
        })}
      </div>
    </section>
  );
}
