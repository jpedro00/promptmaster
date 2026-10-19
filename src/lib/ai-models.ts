export type PlanId = "free" | "pro" | "max";

export type AiModel = {
  id: string;
  name: string;
  provider: string;
  color: string;
  /** Formato de prompt que a IA responde melhor, usado ao otimizar para ela. */
  promptStyle: string;
};

export const AI_MODELS: AiModel[] = [
  { id: "claude", name: "Claude", provider: "Anthropic", color: "#d97757", promptStyle: "Seções delimitadas por tags XML" },
  { id: "gpt", name: "GPT", provider: "OpenAI", color: "#10a37f", promptStyle: "Mensagens system/user separadas" },
  { id: "gemini", name: "Gemini", provider: "Google", color: "#4285f4", promptStyle: "Instruções diretas com exemplos" },
  { id: "other", name: "Outras", provider: "Llama, Mistral...", color: "#a78bfa", promptStyle: "Texto simples e objetivo" },
];

type PlanRules = {
  /** Se o usuário pode escolher qual IA monta o prompt. */
  chooseBuilder: boolean;
  /** Se o usuário pode escolher para qual IA o prompt é designado. */
  chooseTarget: boolean;
};

export const PLAN_RULES: Record<PlanId, PlanRules> = {
  free: { chooseBuilder: false, chooseTarget: false },
  pro: { chooseBuilder: false, chooseTarget: true },
  max: { chooseBuilder: true, chooseTarget: true },
};

export const DEFAULT_BUILDER = "claude";
export const DEFAULT_TARGET = "gpt";

/** Resolve a escolha pedida contra o plano; escolhas não permitidas voltam ao padrão. */
export function resolveSelection(
  plan: PlanId,
  requested: { builder?: string; target?: string },
): { builder: string; target: string } {
  const rules = PLAN_RULES[plan];
  const valid = (id?: string) => AI_MODELS.some((m) => m.id === id);
  return {
    builder: rules.chooseBuilder && valid(requested.builder) ? requested.builder! : DEFAULT_BUILDER,
    target: rules.chooseTarget && valid(requested.target) ? requested.target! : DEFAULT_TARGET,
  };
}
