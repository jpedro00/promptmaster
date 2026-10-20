export type HeroModel = {
  id: string;
  label: string;
  url: string;
  /** Maior dimensão do modelo na cena, em unidades. */
  size: number;
  /** Animação a tocar, quando o modelo tiver. */
  animation?: string;
};

export const HERO_MODELS: HeroModel[] = [
  { id: "lantern", label: "Lanterna (atual)", url: "/models/Lantern.glb", size: 3.2 },
  { id: "helmet", label: "Capacete sci-fi", url: "/models/SciFiHelmet.glb", size: 2.8 },
  { id: "robot", label: "Robô", url: "/models/RobotExpressive.glb", size: 3, animation: "Wave" },
  { id: "ion", label: "Propulsor de íons", url: "/models/PrimaryIonDrive.glb", size: 3.6 },
  { id: "suzanne", label: "Suzanne iridescente", url: "/models/IridescenceSuzanne.glb", size: 3.4 },
  { id: "shaderball", label: "Bola de shader", url: "/models/USDShaderBallForGltf.glb", size: 2.6 },
  { id: "cube", label: "Cubo animado", url: "/models/AnimatedCube.glb", size: 2.2 },
  { id: "carbon", label: "Fibra de carbono", url: "/models/CarbonFibre.glb", size: 2.2 },
  { id: "toycar", label: "Carro de brinquedo", url: "/models/ToyCar.glb", size: 3.2 },
  { id: "chess", label: "Xadrez", url: "/models/ABeautifulGame.glb", size: 3.4 },
  { id: "boombox", label: "Rádio", url: "/models/BoomBox.glb", size: 2.4 },
  { id: "camera", label: "Câmera steampunk", url: "/models/SteampunkCamera.glb", size: 2.8 },
  { id: "flighthelmet", label: "Capacete de voo", url: "/models/FlightHelmet.glb", size: 2.6 },
  { id: "lamp-iri", label: "Luminária iridescente", url: "/models/IridescenceLamp.glb", size: 2.8 },
  { id: "lamp-glass", label: "Luminária de vitral", url: "/models/StainedGlassLamp.glb", size: 2.8 },
  { id: "lamp-punctual", label: "Luminária articulada", url: "/models/LightsPunctualLamp.glb", size: 3 },
];

export const DEFAULT_HERO_MODEL = HERO_MODELS[0].id;
