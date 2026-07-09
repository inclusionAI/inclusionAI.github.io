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
            logo: DEFAULT_LOGO, // replace with "/img/landscape/ling-guang.png"
          },
        ],
      },
      {
        label: "Financial",
        projects: [
          {
            name: "MA XIAO CAI",
            description: "Financial AI Assistant",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/ma-xiao-cai.png"
          },
        ],
      },
      {
        label: "Healthcare",
        projects: [
          {
            name: "AQ",
            description: "A Health Steward You Can Trust",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/aq.png"
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
            logo: DEFAULT_LOGO, // replace with "/img/landscape/aworld.png"
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
            logo: DEFAULT_LOGO, // replace with "/img/landscape/aenvironment.png"
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
            logo: DEFAULT_LOGO, // replace with "/img/landscape/asearcher.png"
          },
        ],
      },
    ],
  },
  {
    title: "Model Infra",
    summary:
      "Training, inference, and kernel infrastructure powering the models.",
    groups: [
      {
        label: "AI library",
        projects: [
          {
            name: "cuLA",
            description:
              "High-performance CUDA kernels for linear attention variants",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/cula.png"
          },
          {
            name: "Humming",
            description:
              "GEMM kernel library specifically designed for quantized inference",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/humming.png"
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
            logo: DEFAULT_LOGO, // replace with "/img/landscape/dlrover.png"
          },
          {
            name: "ATorch",
            description:
              "An industrial extension library of PyTorch to accelerate large scale model training",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/atorch.png"
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
            link: "https://github.com/inclusionAI/AReaL",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/areal.png"
          },
          {
            name: "Asystem",
            description: "A Post-training Self-learning Infrastructure",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/asystem.png"
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
            logo: DEFAULT_LOGO, // replace with "/img/landscape/dinfer.png"
          },
          {
            name: "dFactory",
            description: "Easy and Efficient dLLM Fine-Tuning",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/dfactory.png"
          },
        ],
      },
    ],
  },
  {
    title: "Model",
    summary:
      "Open-sourced across all sizes, all modalities, and all series, building a solid foundation for AGI.",
    groups: [
      {
        label: "Language",
        projects: [
          {
            name: "Ling",
            link: "/blog/ling",
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
            logo: DEFAULT_LOGO, // replace with "/img/landscape/ring.png"
          },
        ],
      },
      {
        label: "Efficiency",
        projects: [
          {
            name: "LLaDA",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/llada.png"
          },
        ],
      },
    ],
  },
  {
    title: "Embodied Intelligence Model",
    summary:
      "Bridging intelligence from the digital realm to the physical world.",
    groups: [
      {
        label: "Spatial Intelligence",
        projects: [
          {
            name: "LingBot-Depth",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/lingbot-depth.png"
          },
          {
            name: "LingBot-Map",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/lingbot-map.png"
          },
        ],
      },
      {
        label: "Action",
        projects: [
          {
            name: "LingBot-VLA",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/lingbot-vla.png"
          },
          {
            name: "LingBot-VA",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/lingbot-va.png"
          },
        ],
      },
      {
        label: "Environment Reward",
        projects: [
          {
            name: "LingBot-World",
            logo: DEFAULT_LOGO, // replace with "/img/landscape/lingbot-world.png"
          },
        ],
      },
    ],
  },
];
