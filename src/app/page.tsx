import SceneClient from "@/components/SceneClient";
import { AI_MODELS } from "@/lib/ai-models";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#0b0b14", color: "#e5e7eb" }}>
      <section style={{ height: "70vh" }}>
        <SceneClient />
      </section>
      <section style={{ textAlign: "center", padding: "0 1rem 3rem" }}>
        <h1 style={{ fontSize: "2.5rem", margin: 0 }}>PromptMaster</h1>
        <p style={{ opacity: 0.7 }}>
          Uma IA monta o prompt. Outra o recebe. Nos planos mais altos, você escolhe as duas.
        </p>
        <p style={{ opacity: 0.5 }}>{AI_MODELS.map((m) => m.name).join(" · ")}</p>
      </section>
    </main>
  );
}
