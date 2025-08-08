import ibaiImg from "@/assets/ibai-llanos-hero.jpg";
import elxocasImg from "@/assets/elxocas-hero.jpg";
import illojImg from "@/assets/illojuan-hero.jpg";
import grefgImg from "@/assets/thegrefg-hero.jpg";
import coscuImg from "@/assets/coscu-hero.jpg";
import { amazonSearchUrl } from "@/lib/affiliate";

export type SetupItem = { name: string; link: string; note?: string; image?: string };
export type SetupCategory = { name: string; items: SetupItem[] };
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  coverImage: string;
  keywords: string[];
  bio: string;
  funFacts: string[];
  setup: SetupCategory[];
};

const today = new Date().toISOString().slice(0, 10);

export const posts: Post[] = [
  {
    slug: "ibai-llanos",
    title: "Setup de streaming de Ibai Llanos (2025): Guía completa",
    excerpt:
      "Descubre el equipo de streaming de Ibai: micrófono, cámara, iluminación, PC y periféricos para un directo de máxima calidad.",
    date: today,
    author: "Equipo Setups de Streamers",
    coverImage: ibaiImg,
    keywords: [
      "setup de streaming",
      "Ibai Llanos",
      "equipo streamer",
      "micrófono Shure SM7B",
      "cámara Sony",
    ],
    bio: "Ibai Llanos es uno de los creadores de contenido más influyentes de habla hispana. Con eventos masivos y directos diarios, su setup está optimizado para fiabilidad y calidad audiovisual.",
    funFacts: [
      "Ha presentado eventos con decenas de miles de espectadores simultáneos.",
      "Suele priorizar la comodidad y la calidad de audio en su setup.",
    ],
    setup: [
      {
        name: "Audio",
        items: [
          { name: "Shure SM7B", link: amazonSearchUrl("Shure SM7B"), note: "Micrófono dinámico icónico para voz" },
          { name: "Soporte de brazo", link: amazonSearchUrl("brazo micrófono broadcast"), note: "Ajuste preciso y estable" },
          { name: "Interfaz GoXLR / Focusrite", link: amazonSearchUrl("GoXLR Focusrite Scarlett"), note: "Control de mezcla y ganancia" },
        ],
      },
      {
        name: "Cámara",
        items: [
          { name: "Sony Alpha (A7 III/A7S III)", link: amazonSearchUrl("Sony A7 III"), note: "Calidad full-frame" },
          { name: "Objetivo 24-70mm", link: amazonSearchUrl("objetivo 24-70mm full frame"), note: "Versatilidad en plano" },
          { name: "Capturadora HDMI", link: amazonSearchUrl("capturadora HDMI 4K"), note: "Entrada limpia a OBS" },
        ],
      },
      {
        name: "Iluminación",
        items: [
          { name: "Elgato Key Light", link: amazonSearchUrl("Elgato Key Light"), note: "Iluminación uniforme" },
          { name: "Luz de relleno RGB", link: amazonSearchUrl("luz RGB streaming"), note: "Ambiente y profundidad" },
        ],
      },
      {
        name: "Periféricos",
        items: [
          { name: "Stream Deck", link: amazonSearchUrl("Elgato Stream Deck"), note: "Accesos directos en directo" },
          { name: "Auriculares cerrados", link: amazonSearchUrl("auriculares cerrados estudio"), note: "Monitoreo sin fugas" },
        ],
      },
      {
        name: "PC",
        items: [
          { name: "RTX Serie 40", link: amazonSearchUrl("RTX 4070 4080 4090"), note: "Rendimiento en juegos y codificación" },
          { name: "CPU alto rendimiento", link: amazonSearchUrl("Intel i7 i9 Ryzen 7 9"), note: "Multitarea fluida" },
        ],
      },
    ],
  },
  {
    slug: "elxocas",
    title: "Setup de streaming de ElXocas (2025): Potencia y estilo",
    excerpt:
      "Analizamos el setup de ElXocas: audio potente, cámaras nítidas y una iluminación dramática ideal para directos intensos.",
    date: today,
    author: "Equipo Setups de Streamers",
    coverImage: elxocasImg,
    keywords: ["ElXocas", "setup streamer", "audio profesional", "stream deck"],
    bio: "ElXocas destaca por su energía y presencia ante cámara. Su equipo está pensado para capturar cada momento con contundencia.",
    funFacts: [
      "Es conocido por su cercanía con la comunidad y un estilo directo.",
      "Apuesta por configuraciones robustas y micrófonos dinámicos.",
    ],
    setup: [
      {
        name: "Audio",
        items: [
          { name: "Shure SM7B o MV7", link: amazonSearchUrl("Shure SM7B MV7"), note: "Voces con cuerpo y rechazo de ruido" },
          { name: "Interfaz con preamplificación", link: amazonSearchUrl("GoXLR Mini Focusrite"), note: "Preamp limpio y control" },
        ],
      },
      {
        name: "Cámara",
        items: [
          { name: "Sony/Canon con salida limpia", link: amazonSearchUrl("cámara mirrorless salida limpia"), note: "Imagen clara y nítida" },
          { name: "Capturadora 4K", link: amazonSearchUrl("capturadora 4K"), note: "Señal estable" },
        ],
      },
      {
        name: "Iluminación",
        items: [
          { name: "Panel key light", link: amazonSearchUrl("panel luz led key light"), note: "Tonos piel naturales" },
          { name: "Luces RGB decorativas", link: amazonSearchUrl("paneles RGB pared"), note: "Fondo con personalidad" },
        ],
      },
      {
        name: "Extras",
        items: [
          { name: "Stream Deck XL", link: amazonSearchUrl("Stream Deck XL"), note: "Máximo control" },
          { name: "Brazo articulado premium", link: amazonSearchUrl("brazo micrófono premium"), note: "Posicionamiento preciso" },
        ],
      },
    ],
  },
  {
    slug: "illojuan",
    title: "Setup de streaming de illoJuan (2025): Calidez y calidad",
    excerpt:
      "El espacio de illoJuan combina un ambiente acogedor con equipo profesional: audio claro, buena luz y cámara confiable.",
    date: today,
    author: "Equipo Setups de Streamers",
    coverImage: illojImg,
    keywords: ["illoJuan", "setup de streaming", "Elgato", "Sony"],
    bio: "illoJuan ha crecido con una comunidad fiel gracias a su estilo cercano. Su setup busca naturalidad y confort sin sacrificar calidad.",
    funFacts: [
      "Suele jugar con iluminación cálida y fondos con carácter.",
      "Equilibrio entre minimalismo y funcionalidad.",
    ],
    setup: [
      {
        name: "Audio",
        items: [
          { name: "Shure SM7B", link: amazonSearchUrl("Shure SM7B"), note: "Estándar en streaming" },
          { name: "Interfaz USB confiable", link: amazonSearchUrl("Focusrite Solo 3rd Gen"), note: "Setup simple y estable" },
        ],
      },
      {
        name: "Cámara",
        items: [
          { name: "Sony A6400/A7C", link: amazonSearchUrl("Sony A6400 A7C"), note: "Autofoco rápido" },
          { name: "Objetivo 16-50mm/24-70mm", link: amazonSearchUrl("objetivo 16-50 24-70"), note: "Planos versátiles" },
        ],
      },
      {
        name: "Iluminación",
        items: [
          { name: "Elgato Key Light Air", link: amazonSearchUrl("Elgato Key Light Air"), note: "Compacto y eficaz" },
          { name: "Luz trasera cálida", link: amazonSearchUrl("luz ambiente cálida"), note: "Profundidad de campo" },
        ],
      },
    ],
  },
  {
    slug: "thegrefg",
    title: "Setup de streaming de TheGrefg (2025): Estética y rendimiento",
    excerpt:
      "Configuración atrevida con iluminación roja, cámaras rápidas y un PC listo para juegos exigentes y directos largos.",
    date: today,
    author: "Equipo Setups de Streamers",
    coverImage: grefgImg,
    keywords: ["TheGrefg", "setup gamer", "RTX", "cámara 4K"],
    bio: "TheGrefg destaca por su energía y estilo visual. Su setup refleja una estética marcada y potencia suficiente para cualquier directo.",
    funFacts: [
      "Apuesta por fondos llamativos con paneles RGB.",
      "Suele combinar monitor ultrawide con monitor vertical.",
    ],
    setup: [
      {
        name: "Audio",
        items: [
          { name: "Shure SM7B/MV7", link: amazonSearchUrl("Shure SM7B MV7"), note: "Audio con pegada" },
          { name: "Mezclador streaming", link: amazonSearchUrl("GoXLR"), note: "Efectos y routing" },
        ],
      },
      {
        name: "Cámara",
        items: [
          { name: "Mirrorless 4K", link: amazonSearchUrl("mirrorless 4K streaming"), note: "Nitidez y rango dinámico" },
          { name: "Capturadora 4K30", link: amazonSearchUrl("capturadora 4K 30fps"), note: "Compatibilidad OBS" },
        ],
      },
      {
        name: "Iluminación",
        items: [
          { name: "Key light potente", link: amazonSearchUrl("key light led potente"), note: "Evitar sombras" },
          { name: "Paneles RGB pared", link: amazonSearchUrl("paneles RGB nanoleaf"), note: "Fondo llamativo" },
        ],
      },
      {
        name: "PC",
        items: [
          { name: "RTX 4080/4090", link: amazonSearchUrl("RTX 4080 4090"), note: "Sobrado para gaming 4K" },
          { name: "CPU tope de gama", link: amazonSearchUrl("Intel i9 Ryzen 9"), note: "Codificación + juego" },
        ],
      },
    ],
  },
  {
    slug: "coscu",
    title: "Setup de streaming de Coscu (2025): Energía y presencia",
    excerpt:
      "Un setup que apuesta por el carisma: gran sonido, iluminación con personalidad y periféricos de alto rendimiento.",
    date: today,
    author: "Equipo Setups de Streamers",
    coverImage: coscuImg,
    keywords: ["Coscu", "setup streaming", "micrófono", "iluminación RGB"],
    bio: "Coscu es referente en la escena hispanohablante. Su setup transmite energía y cercanía con la audiencia.",
    funFacts: [
      "Suele incorporar elementos decorativos musicales en su fondo.",
      "Equilibra estética RGB con lectura clara de piel.",
    ],
    setup: [
      {
        name: "Audio",
        items: [
          { name: "Shure SM7B / Rode PodMic", link: amazonSearchUrl("Shure SM7B Rode PodMic"), note: "Dinamismo y nitidez" },
          { name: "Interfaz USB con buen preamp", link: amazonSearchUrl("interfaz audio USB preamp"), note: "Ganancia suficiente" },
        ],
      },
      {
        name: "Cámara",
        items: [
          { name: "Mirrorless APS-C/Full-frame", link: amazonSearchUrl("cámara mirrorless streaming"), note: "Buen rendimiento con poca luz" },
          { name: "Objetivo luminoso (f/1.8)", link: amazonSearchUrl("objetivo 35mm 50mm 1.8"), note: "Desenfoque agradable" },
        ],
      },
      {
        name: "Iluminación",
        items: [
          { name: "Key light + relleno RGB", link: amazonSearchUrl("key light relleno rgb"), note: "Volumen y separación" },
        ],
      },
      {
        name: "Periféricos",
        items: [
          { name: "Teclado mecánico", link: amazonSearchUrl("teclado mecánico"), note: "Respuesta rápida" },
          { name: "Ratón gaming", link: amazonSearchUrl("ratón gaming"), note: "Precisión" },
        ],
      },
    ],
  },
];
