import { AI_MODELS } from "./ai-models";

export type PromptCategory = "Projeto" | "Cena 3D" | "Scroll" | "Transições" | "Modelos" | "Qualidade";

export const PROMPT_CATEGORIES: PromptCategory[] = ["Projeto", "Cena 3D", "Scroll", "Transições", "Modelos", "Qualidade"];

export type LibraryPrompt = {
  id: string;
  title: string;
  category: PromptCategory;
  summary: string;
  objective: string;
  requirements: string[];
  deliverable: string;
};

/** Stack usada no site do PromptMaster; entra em todo prompt da biblioteca. */
export const BASE_STACK = [
  "Next.js (App Router) com TypeScript",
  "three.js com @react-three/fiber e @react-three/drei",
  "GSAP com ScrollTrigger e Lenis para rolagem",
];

/** Variações de estilo visual que podem ser somadas a qualquer prompt. */
export const STYLE_VARIANTS = [
  { id: "none", label: "Sem estilo", text: "" },
  { id: "night", label: "Escuro e neon", text: "Estilo visual: fundo quase preto, uma única cor de destaque saturada, brilho suave nos modelos 3D." },
  { id: "editorial", label: "Editorial claro", text: "Estilo visual: fundo claro, tipografia grande com peso alto, muito espaço em branco, modelos 3D como peça central." },
  { id: "lowpoly", label: "Low-poly", text: "Estilo visual: formas facetadas, paleta de 4 cores chapadas, iluminação plana sem texturas realistas." },
  { id: "retro", label: "Retrofuturista", text: "Estilo visual: gradientes de pôr do sol, grade em perspectiva, tipografia geométrica larga." },
] as const;

export const PROMPTS: LibraryPrompt[] = [
  {
    id: "site-do-zero",
    title: "Site completo com 3D, do zero",
    category: "Projeto",
    summary: "O prompt mestre: cria o site inteiro com cena 3D guiada pela rolagem.",
    objective:
      "Criar do zero um site de uma página, em português, com uma cena 3D fixa atrás do conteúdo cujos modelos reagem à rolagem.",
    requirements: [
      "Estrutura: hero, uma seção fixa com rolagem horizontal, uma faixa de marquee e uma seção final de planos ou contato.",
      "A cena 3D fica em um Canvas fixo (position: fixed, pointer-events: none) atrás do conteúdo e é carregada só no cliente.",
      "Usar modelos .glb prontos com licença CC0, otimizados com meshopt e texturas WebP de 1024px.",
      "Compartilhar o progresso de rolagem (0 a 1) com a cena por um objeto simples fora do React, lido em useFrame.",
      "Rolagem suave com Lenis sincronizado ao ticker do GSAP.",
      "Respeitar prefers-reduced-motion, ter foco visível e funcionar no celular.",
    ],
    deliverable: "Todos os arquivos do projeto, a lista de dependências com versões e os comandos para rodar.",
  },
  {
    id: "estrutura-next",
    title: "Estrutura do projeto Next.js",
    category: "Projeto",
    summary: "Pastas, dependências e configuração antes de qualquer cena.",
    objective: "Montar a estrutura inicial de um projeto Next.js pronto para receber uma cena 3D e animações de rolagem.",
    requirements: [
      "Separar src/components (cena, modelos, seções), src/lib (estado de rolagem, catálogo de modelos) e public/models.",
      "Importar a cena com next/dynamic e ssr: false dentro de um Client Component.",
      "Configurar fontes com next/font e variáveis CSS para a paleta.",
      "Explicar por que cada dependência é necessária.",
    ],
    deliverable: "Árvore de pastas, package.json e os arquivos base com comentários curtos.",
  },
  {
    id: "canvas-fixo",
    title: "Canvas 3D fixo atrás do conteúdo",
    category: "Cena 3D",
    summary: "Cena que fica parada na tela enquanto o texto rola por cima.",
    objective: "Criar um componente de cena 3D em tela cheia, fixo atrás do conteúdo, com fundo transparente.",
    requirements: [
      "Canvas com alpha ligado, dpr limitado a [1, 2] e câmera perspectiva com fov entre 35 e 45.",
      "Container com position: fixed, inset: 0, z-index 0 e pointer-events: none.",
      "Conteúdo da página com position: relative e z-index 1.",
      "Luz hemisférica mais duas luzes direcionais de cores diferentes para dar volume sem HDRI externo.",
    ],
    deliverable: "O componente da cena e o CSS necessário.",
  },
  {
    id: "iluminacao",
    title: "Iluminação sem HDRI externo",
    category: "Cena 3D",
    summary: "Modelos PBR bem iluminados sem baixar imagens de ambiente.",
    objective: "Iluminar modelos PBR de forma que não fiquem escuros, sem depender de um HDRI baixado de CDN.",
    requirements: [
      "Combinar hemisphereLight, uma luz principal quente e uma luz de preenchimento fria.",
      "Explicar a função de cada luz e como ajustar a intensidade.",
      "Dar uma alternativa usando Environment com um arquivo local em public/.",
    ],
    deliverable: "Trecho de JSX da iluminação e uma tabela curta de valores sugeridos.",
  },
  {
    id: "camera-scroll",
    title: "Movimento dos modelos guiado pela rolagem",
    category: "Scroll",
    summary: "Posição, giro e troca de modelos de acordo com o progresso da página.",
    objective: "Fazer os modelos 3D se moverem de acordo com a rolagem, de forma suave e sem engasgar.",
    requirements: [
      "Objeto compartilhado { progress } atualizado por um ScrollTrigger que cobre a página inteira.",
      "Em useFrame, ler progress e usar MathUtils.smoothstep para definir o trecho de cada movimento.",
      "Suavizar com MathUtils.damp para não haver saltos ao rolar rápido.",
      "Um modelo sai da tela e outro entra em trechos diferentes do progresso.",
      "No celular, centralizar os modelos em vez de alternar os lados.",
    ],
    deliverable: "O componente da cena com os trechos de progresso comentados.",
  },
  {
    id: "rolagem-horizontal",
    title: "Seção fixa com rolagem horizontal",
    category: "Scroll",
    summary: "Painéis que andam de lado enquanto o usuário rola para baixo.",
    objective: "Criar uma seção que fica fixa na tela enquanto um trilho de painéis anda na horizontal conforme a rolagem vertical.",
    requirements: [
      "Usar ScrollTrigger com pin: true, scrub: true e invalidateOnRefresh.",
      "O deslocamento é calculado por track.scrollWidth - window.innerWidth em função, para recalcular ao redimensionar.",
      "Cada painel ocupa 100vw e tem um número grande, um título e uma frase.",
      "Só numerar os painéis se o conteúdo for uma sequência de passos.",
    ],
    deliverable: "O componente da seção, o CSS e o trecho de GSAP.",
  },
  {
    id: "lenis-gsap",
    title: "Rolagem suave com Lenis e GSAP",
    category: "Scroll",
    summary: "Inércia na rolagem sem quebrar o ScrollTrigger.",
    objective: "Integrar Lenis ao GSAP para que a rolagem tenha inércia e os ScrollTriggers continuem exatos.",
    requirements: [
      "Chamar ScrollTrigger.update dentro do evento scroll do Lenis.",
      "Mover o Lenis pelo gsap.ticker e desligar o lagSmoothing.",
      "Desativar smoothWheel quando prefers-reduced-motion estiver ligado.",
      "Limpar ticker e instância no retorno do useGSAP.",
    ],
    deliverable: "O trecho de código e uma explicação de cada linha em até cinco frases.",
  },
  {
    id: "titulo-mascara",
    title: "Entrada do título com máscara",
    category: "Transições",
    summary: "Linhas do título que sobem de dentro de uma máscara.",
    objective: "Animar a entrada do título principal, linha por linha, subindo de dentro de uma máscara com overflow oculto.",
    requirements: [
      "Cada linha em um span com overflow: hidden e, dentro dele, outro span que anima yPercent de 110 a 0.",
      "Duração por volta de 1,1 segundo, easing power4.out e atraso de 0,12 s entre linhas.",
      "Ser a única animação automática da página, as demais respondem à rolagem.",
    ],
    deliverable: "O JSX do título, o CSS da máscara e a chamada do GSAP.",
  },
  {
    id: "revelar-cards",
    title: "Cards que abrem ao entrar na tela",
    category: "Transições",
    summary: "Revelação em grupo, com atraso entre os itens.",
    objective: "Revelar um grupo de cards juntos quando a seção entra na viewport.",
    requirements: [
      "Usar ScrollTrigger.batch com once: true e start em top 85%.",
      "Animar clipPath de inset(0 0 100% 0) para o estado normal, com stagger de 0,12 s.",
      "Hover com translateY de -6px e mudança leve de fundo.",
    ],
    deliverable: "O código do batch e o CSS do hover.",
  },
  {
    id: "marquee",
    title: "Faixa de nomes que corre sozinha",
    category: "Transições",
    summary: "Marquee infinito feito só com CSS.",
    objective: "Criar uma faixa horizontal que se move em loop contínuo, sem JavaScript.",
    requirements: [
      "Duplicar a lista de itens quatro vezes e animar translateX de 0 a -50%.",
      "Duração de 28 s, linear, infinita.",
      "Desligar a animação com prefers-reduced-motion.",
    ],
    deliverable: "O JSX e o CSS com @keyframes.",
  },
  {
    id: "carregar-glb",
    title: "Carregar e normalizar modelos .glb",
    category: "Modelos",
    summary: "Qualquer modelo entra centralizado e na altura certa.",
    objective: "Criar um componente que carrega um .glb com useGLTF e o normaliza para centro e altura escolhidos.",
    requirements: [
      "Clonar a cena, calcular Box3, subtrair o centro e escalar por height / size.y.",
      "Aceitar um ref para que quem usa o componente anime o grupo.",
      "Memoizar o cálculo para não repetir a cada render.",
    ],
    deliverable: "O componente GlbModel completo, tipado.",
  },
  {
    id: "otimizar-glb",
    title: "Baixar e otimizar modelos prontos",
    category: "Modelos",
    summary: "De 10 MB para menos de 300 KB, com licença livre.",
    objective: "Explicar e automatizar o processo de baixar modelos 3D com licença CC0 e reduzi-los para uso na web.",
    requirements: [
      "Indicar o repositório glTF Sample Assets da Khronos e como conferir o arquivo LICENSE.md de cada modelo.",
      "Comando do gltf-transform: optimize com --compress meshopt, --texture-compress webp e --texture-size 1024.",
      "Tratar modelos que só existem em glTF separado, com .bin e texturas.",
      "Registrar autoria e licença em um arquivo CREDITS.md.",
    ],
    deliverable: "Um script de shell e o modelo do CREDITS.md.",
  },
  {
    id: "trocar-modelo",
    title: "Seletor para trocar o modelo principal",
    category: "Modelos",
    summary: "Compare vários modelos na mesma cena, ao vivo.",
    objective: "Criar um seletor de interface que troca o modelo 3D principal sem recarregar a página.",
    requirements: [
      "Catálogo em um arquivo com id, rótulo, url e altura de cada modelo.",
      "Estado no componente de página repassado à cena por prop; usar key para reiniciar o modelo.",
      "Botões acessíveis, com aria-pressed e foco visível.",
    ],
    deliverable: "O catálogo, o seletor e a alteração na cena.",
  },
  {
    id: "desempenho",
    title: "Desempenho no celular",
    category: "Qualidade",
    summary: "Manter 60 quadros por segundo em aparelhos modestos.",
    objective: "Revisar uma cena three.js e reduzir seu custo para rodar bem em celulares.",
    requirements: [
      "Limitar dpr, evitar sombras em tempo real e reaproveitar materiais.",
      "Usar frameloop sob demanda quando a aba não está visível.",
      "Medir com o Stats do drei antes e depois e relatar a diferença.",
      "Listar o tamanho em KB de cada arquivo carregado.",
    ],
    deliverable: "Lista priorizada de mudanças com o código de cada uma.",
  },
  {
    id: "acessibilidade",
    title: "Acessibilidade em sites com 3D e animação",
    category: "Qualidade",
    summary: "Movimento reduzido, foco visível e conteúdo legível.",
    objective: "Auditar um site com cena 3D e animações de rolagem quanto à acessibilidade e corrigir os problemas.",
    requirements: [
      "Marcar a cena com aria-hidden, já que é decorativa.",
      "Respeitar prefers-reduced-motion na rolagem suave, no marquee e nas entradas.",
      "Garantir contraste mínimo de 4,5:1 no texto e foco visível em todo controle.",
      "Conferir a navegação completa só por teclado.",
    ],
    deliverable: "Relatório com cada problema, o motivo e a correção em código.",
  },
  {
    id: "revisao",
    title: "Revisão de código da cena",
    category: "Qualidade",
    summary: "Encontrar vazamentos de memória e renders desnecessários.",
    objective: "Revisar o código de uma cena react-three-fiber em busca de bugs e desperdício.",
    requirements: [
      "Procurar objetos criados dentro do useFrame, listeners sem limpeza e materiais duplicados.",
      "Verificar se a cena é descartada ao sair da página.",
      "Separar o que é bug do que é melhoria opcional.",
    ],
    deliverable: "Lista de achados ordenada por gravidade, cada um com o trecho e a correção.",
  },
];

/** Monta o texto final do prompt no formato que a IA de destino responde melhor. */
export function renderPrompt(prompt: LibraryPrompt, targetId: string, styleId = "none"): string {
  const style = STYLE_VARIANTS.find((s) => s.id === styleId)?.text ?? "";
  const requirements = [...prompt.requirements, ...(style ? [style] : [])];
  const stack = BASE_STACK;

  switch (targetId) {
    case "claude":
      return [
        `<objetivo>\n${prompt.objective}\n</objetivo>`,
        `<tecnologias>\n${stack.map((s) => `- ${s}`).join("\n")}\n</tecnologias>`,
        `<requisitos>\n${requirements.map((r) => `- ${r}`).join("\n")}\n</requisitos>`,
        `<entrega>\n${prompt.deliverable}\n</entrega>`,
      ].join("\n\n");
    case "gpt":
      return [
        "### System",
        "Você é um desenvolvedor front-end sênior especialista em three.js e animação na web. Responda em português, com código completo e funcional.",
        "",
        "### User",
        `${prompt.objective}`,
        "",
        `Tecnologias:\n${stack.map((s) => `- ${s}`).join("\n")}`,
        "",
        `Requisitos:\n${requirements.map((r) => `- ${r}`).join("\n")}`,
        "",
        `Entrega: ${prompt.deliverable}`,
      ].join("\n");
    case "gemini":
      return [
        `${prompt.objective}`,
        "",
        "Siga estes passos:",
        ...requirements.map((r, i) => `${i + 1}. ${r}`),
        "",
        `Tecnologias: ${stack.join("; ")}.`,
        `Entrega: ${prompt.deliverable}`,
      ].join("\n");
    default:
      return [
        prompt.objective,
        "",
        `Use: ${stack.join(", ")}.`,
        "",
        ...requirements.map((r) => `- ${r}`),
        "",
        `Entrega: ${prompt.deliverable}`,
      ].join("\n");
  }
}

export const LIBRARY_TARGETS = AI_MODELS;
