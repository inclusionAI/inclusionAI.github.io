// ---------------------------------------------------------------------------
// Landscape data — single source of truth for the /landscape page.
//
// This mirrors the "inclusionAI: Bringing AI Advances to Everyday Life"
// architecture poster. Each project has a required `logo` field that points to
// an image (site-root path or full URL). When a project should keep the
// default image, set `logo` to DEFAULT_LOGO — swap in the real artwork later
// by changing just the `logo` value here.
// ---------------------------------------------------------------------------

/**
 * Default logo shown for projects that do not have dedicated artwork yet.
 * Replace a project's `logo` with a real image path to override it.
 */
export const DEFAULT_LOGO = "/img/logo.png";

export interface LandscapeProject {
  /** Display name of the project / product. */
  name: string;
  /** Short tagline or description shown under the name. */
  description?: string;
  /**
   * Logo image link — a site-root path (e.g. "/img/landscape/aworld.png") or a
   * full URL. Required; use DEFAULT_LOGO when no dedicated artwork exists yet.
   */
  logo: string;
  /** Optional external / internal link for the project. */
  link?: string;
}

export interface LandscapeGroup {
  /** Category label (rendered as a pill above the projects). */
  label: string;
  /** Projects that belong to this category. */
  projects: LandscapeProject[];
}

export interface LandscapeLayer {
  /** Layer title, e.g. "AI Service". */
  title: string;
  /** Optional one-line summary describing the layer. */
  summary?: string;
  /** Groups of projects inside the layer. */
  groups: LandscapeGroup[];
}

export const LANDSCAPE_LAYERS: LandscapeLayer[] = [
  {
    title: "AI Service",
    summary:
      "Consumer-facing AI assistants bringing AI advances into everyday life.",
    groups: [
      {
        label: "General",
        projects: [
          {
            name: "Ling Guang",
            description: "Omni-modal AI assistant",
            link: "https://www.lingguang.com/",
            logo: "/img/landscape/lingguang.png",
          },
        ],
      },
      {
        label: "Financial",
        projects: [
          {
            name: "MA XIAO CAI",
            description: "Financial AI Assistant",
            logo: "/img/landscape/maxiaocai.png",
          },
        ],
      },
      {
        label: "Healthcare",
        projects: [
          {
            name: "AQ",
            description: "A Health Steward You Can Trust",
            link: "https://www.antafu.com/?language=en-US",
            logo: "https://mdn.alipayobjects.com/huamei_pngx9v/afts/img/CeCLS6Zq980AAAAAQFAAAAgADoZmAQFr/original",
          },
        ],
      },
      {
        label: "Life Services",
        projects: [
          {
            name: "Payment, Transport, Home Assistant…",
            description: "Everyday life services powered by AI",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/life-services.png"
          },
        ],
      },
    ],
  },
  {
    title: "Agent Infra",
    summary:
      "Infrastructure for building, running, and improving autonomous agents.",
    groups: [
      {
        label: "Agent Harness",
        projects: [
          {
            name: "AWorld",
            description:
              "Search, understand, reproduce, and improve an idea with ease",
            link: "https://github.com/inclusionAI/AWorld",
            logo: "/img/landscape/aworld.png",
          },
        ],
      },
      {
        label: "Agentic Sandbox",
        projects: [
          {
            name: "AEnvironment",
            description:
              "Standardized environment infrastructure for Agentic AI development",
            logo: "/img/landscape/aenv.png",
            link: "https://github.com/inclusionAI/AEnvironment",
          },
        ],
      },
      {
        label: "Agent Search",
        projects: [
          {
            name: "ASearcher",
            description:
              "An Open-Source Large-Scale Reinforcement Learning Project for Search Agents",
            link: "https://github.com/inclusionAI/ASearcher",
            logo: "/img/landscape/aresearcher.png",
          },
        ],
      },
    ],
  },
  {
    title: "Model Infra",
    summary:
      "Training, inference, and kernel infrastructure powering the models, for more info about our projects, visit our <a href='/system'>system page</a>.",
    groups: [
      {
        label: "AI library",
        projects: [
          {
            name: "cuLA",
            description:
              "High-performance CUDA kernels for linear attention variants",
            link: "https://github.com/inclusionAI/cuLA",
            logo: "https://github.com/inclusionAI/cuLA/raw/main/docs/cuLA-logo.png", // replace with "/img/landscape/cula.png"
          },
          {
            name: "Humming",
            description:
              "GEMM kernel library specifically designed for quantized inference",
            link: "https://github.com/inclusionAI/Humming",
            logo: "/img/landscape/humming.png", // replace with "/img/landscape/humming.png"
          },
        ],
      },
      {
        label: "Pre Train",
        projects: [
          {
            name: "DLRover",
            description: "An Automatic Distributed Deep Learning System",
            link: "https://github.com/intelligent-machine-learning/dlrover",
            logo: "https://github.com/intelligent-machine-learning/dlrover/raw/master/docs/figures/dlrover_logo.png", // replace with "/img/landscape/dlrover.png"
          },
          {
            name: "ATorch",
            description:
              "An industrial extension library of PyTorch to accelerate large scale model training",
            link: "https://github.com/intelligent-machine-learning/ATorch",
            logo: "/img/landscape/atorch.png", // replace with "/img/landscape/atorch.png"
          },
        ],
      },
      {
        label: "Post Train",
        projects: [
          {
            name: "AReaL",
            description:
              "The RL Bridge for LLM-based Agent Applications. Made Simple & Flexible",
            link: "https://areal-ai.io",
            logo: "/img/landscape/areal.png", // replace with "/img/landscape/areal.png"
          },
          {
            name: "Asystem",
            description: "A Post-training Self-learning Infrastructure",
            link: "https://github.com/inclusionAI/Asystem",
            logo: "/img/landscape/asystem.jpg",
          },
        ],
      },
      {
        label: "DLLM",
        projects: [
          {
            name: "dInfer",
            description:
              "An Efficient Inference Framework for Diffusion Language Models",
            link: "https://github.com/inclusionAI/dInfer",
            logo: "https://github.com/inclusionAI/dInfer/raw/master/assets/logo.svg", // replace with "/img/landscape/dinfer.png"
          },
          {
            name: "dFactory",
            description: "Easy and Efficient dLLM Fine-Tuning",
            link: "https://github.com/inclusionAI/dFactory",
            logo: "https://camo.githubusercontent.com/0268975668a19bd2c1c5f16b3d6ec65d640cc4d5ca8da4b127a232f9ada487cd/68747470733a2f2f6d646e2e616c697061796f626a656374732e636f6d2f6875616d65695f7161387178752f616674732f696d672f412a3979415a5436314e58526b41414141415242414141416741656d4a3741512f6f726967696e616c", // replace with "/img/landscape/dfactory.png"
          },
        ],
      },
    ],
  },
  {
    title: "Model",
    summary:
      "<img src='/img/logo.png' width='100' style='display:block;margin:3em auto;' />Open-sourced across all sizes, all modalities, and all series, building a solid foundation for AGI, for more details and latest news, please refer to our <a href='/model'>model page</a> or <a href='https://www.ant-ling.com/'>official website</a>.",
    groups: [
      {
        label: "Language",
        projects: [
          {
            name: "Ling",
            link: "/blog/ling",
            description:
              "A Large Language Model for Multi-Modal Understanding and Generation",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/ling.png"
          },
        ],
      },
      {
        label: "Multimodal",
        projects: [
          {
            name: "Ming",
            link: "/blog/ming-omni",
            description: "A Multi-Modal Understanding and Generation Model",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/ming.png"
          },
        ],
      },
      {
        label: "Reasoning",
        projects: [
          {
            name: "Ring",
            link: "/blog/ring",
            description:
              "A Reasoning Model for Multi-Modal Understanding and Generation",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/ring.png"
          },
        ],
      },
      {
        label: "Efficiency",
        projects: [
          {
            name: "LLaDA",
            description: "A Series of Large Diffusion Language Models",
            link: "https://github.com/inclusionAI/LLaDA2.X",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/llada.png"
          },
        ],
      },
    ],
  },
  {
    title: "Embodied Intelligence Model",
    summary:
      "<img width='200' src='https://raw.githubusercontent.com/Robbyant/.github/main/assets/robbyant-tech.png' style='display:block;margin:3em auto;' /> Bridging intelligence from the digital realm to the physical world, for more details and latest news, please refer to our <a href='https://www.robbyant.com/'>official website</a>.",
    groups: [
      {
        label: "Visual Foundation Model",
        projects: [
          {
            name: "LingBot-Vision",
            description:
              "A spatially-native visual foundation model built on stitched-boundary modeling.",
            logo: DEFAULT_LOGO,
            link: "https://github.com/Robbyant/lingbot-vision",
          },
        ],
      },
      {
        label: "Spatial Perception Model",
        projects: [
          {
            name: "LingBot-Depth",
            description:
              "A high-precision depth perception model that lets robots clearly see transparent and reflective objects.",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/lingbot-depth.png"
            link: "https://github.com/Robbyant/lingbot-depth",
          },
        ],
      },
      {
        label: "3D Reconstruction Model",
        projects: [
          {
            name: "LingBot-Map",
            description:
              "A purely autoregressive streaming 3D reconstruction foundation model, enabling high-precision real-time 3D reconstruction from long videos of over 10,000 frames.",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/lingbot-map.png"
            link: "https://github.com/Robbyant/lingbot-map",
          },
        ],
      },
      {
        label: "World Model",
        projects: [
          {
            name: "LingBot-World",
            description:
              "A high-fidelity, controllable, and logically-consistent world model providing interactive physics simulation environments.",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/lingbot-world.png"
            link: "https://github.com/Robbyant/lingbot-world",
          },
        ],
      },
      {
        label: "VLA Model",
        projects: [
          {
            name: "LingBot-VLA",
            description:
              "A cross-embodiment, multi-task open-source embodied foundation model for robotic manipulation.",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/lingbot-vla.png"k
            link: "https://github.com/Robbyant/lingbot-vla-v2",
          },
        ],
      },
      {
        label: "Video-Action World Model",
        projects: [
          {
            name: "LingBot-VA",
            description:
              "A world-action model for dynamic physical interaction, improving robot generalization and real-time reasoning.",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/lingbot-va.png"
            link: "https://github.com/Robbyant/lingbot-va",
          },
        ],
      },
      {
        label: "Video Generation Model",
        projects: [
          {
            name: "LingBot-Video",
            description:
              "A video foundation model for multi-scene dynamic generation, covering real-world physics, human actions, robot tasks, and open-scene creation.",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/lingbot-video.png"
            link: "https://github.com/Robbyant/lingbot-video",
          },
        ],
      },
    ],
  },
];
