// ---------------------------------------------------------------------------
// Research data — single source of truth for the /research page and any
// other page / template that wants to display papers or releases.
// ---------------------------------------------------------------------------

export type PaperType = "Model" | "System" | "Research";

export interface ResearchPaper {
  title: string;
  /** Raw date string (Chinese "YYYY年M月D日" or English "Mon D,YYYY") */
  time: string;
  type: PaperType;
  link: string;
}

export interface ReleaseArticle {
  cover: string;
  title: string;
  time: string;
  type: string;
  /** Optional direct link; omit to fall back to the blog listing */
  link?: string;
}

// ---------------------------------------------------------------------------
// Papers list  (sorted newest-first at runtime via parsePaperDate)
// ---------------------------------------------------------------------------
export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    title:
      "Bootstrapping your behavior: a new pretraining strategy for user behavior sequence data",
    time: "May 22, 2025",
    link: "https://arxiv.org/abs/2506.11053",
    type: "Model",
  },
  {
    title:
      "Ming-Omni: A Unified Multimodal Model for Perception and Generation",
    time: "Jun 11, 2025",
    link: "https://arxiv.org/abs/2506.09344",
    type: "Model",
  },
  {
    title:
      "Ming-Lite-Uni: Advancements in Unified Architecture for Natural Multimodal Interaction",
    time: "May 5, 2025",
    link: "https://arxiv.org/abs/2505.02471",
    type: "Model",
  },
  {
    title:
      "Enhancing Cross-task Transfer of Large Language Models via Activation Steering",
    time: "Jul 17, 2025",
    link: "https://arxiv.org/abs/2507.13236",
    type: "Model",
  },
  {
    title:
      "Toward Real-World Table Agents: Capabilities, Workflows, and Design Principles for LLM-based Table Intelligence",
    time: "Jul 14, 2025",
    link: "https://arxiv.org/abs/2507.10281",
    type: "System",
  },
  {
    title:
      "Ring-lite: Scalable Reasoning via C3PO-Stabilized Reinforcement Learning for LLMs",
    time: "Jun 17, 2025",
    link: "https://arxiv.org/abs/2506.14731",
    type: "Model",
  },
  {
    title:
      "ABench-Physics: Benchmarking Physical Reasoning in LLMs via High-Difficulty and Dynamic Physics Problems",
    time: "Jul 7, 2025",
    link: "https://arxiv.org/abs/2507.04766",
    type: "System",
  },
  {
    title:
      "AREAL: A Large-Scale Asynchronous Reinforcement Learning System for Language Reasoning",
    time: "Jun 4, 2025",
    link: "https://arxiv.org/abs/2505.24298",
    type: "System",
  },
  {
    title:
      "QuestA: Expanding Reasoning Capacity in LLMs via Question Augmentation",
    time: "Jul 17, 2025",
    link: "https://arxiv.org/abs/2507.13266",
    type: "System",
  },
  {
    title:
      "Code Graph Model (CGM): A Graph-Integrated Large Language Model for Repository-Level Software Engineering Tasks",
    time: "May 22, 2025",
    link: "https://arxiv.org/abs/2505.16901",
    type: "Model",
  },
  {
    title:
      "Every Sample Matters: Leveraging Mixture-of-Experts and High-Quality Data for Efficient and Accurate Code LLM",
    time: "Mar 22, 2025",
    link: "https://arxiv.org/abs/2503.17793",
    type: "Model",
  },
  {
    title:
      "Why Do Open-Source LLMs Struggle with Data Analysis? A Systematic Empirical Study",
    time: "Jun 24, 2025",
    link: "https://arxiv.org/abs/2506.19794",
    type: "Research",
  },
  {
    title: "AutoMind: Adaptive Knowledgeable Agent for Automated Data Science",
    time: "Jun 12, 2025",
    link: "https://arxiv.org/abs/2506.10974",
    type: "Research",
  },
  {
    title:
      "Right Is Not Enough: The Pitfalls of Outcome Supervision in Training LLMs for Math Reasoning",
    time: "Jun 7, 2025",
    link: "https://arxiv.org/abs/2506.06877",
    type: "Research",
  },
];

// ---------------------------------------------------------------------------
// Releases / blog release articles
// ---------------------------------------------------------------------------
export const RELEASE_ARTICLES: ReleaseArticle[] = [
  {
    cover:
      "https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*wPBvSI_KNXgAAAAAQGAAAAgAekZ_AQ/original",
    title: "AReaL v0.1: Reliable RL Training of 1.5B and 7B…",
    time: "Feb 24, 2025",
    type: "System",
    link: "/blog/areal",
  },
  {
    cover:
      "https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*9LBXTKR5D3gAAAAAQGAAAAgAekZ_AQ/original",
    title: "AReaL v0.2: Training a SOTA 7B LRM with 1.5x...",
    time: "Mar 31, 2025",
    type: "System",
    link: "/blog/areal",
  },
  {
    cover:
      "https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*eNqeQrtvfWMAAAAAQHAAAAgAekZ_AQ/original",
    title: "AReaL v0.3",
    time: "Mar 31, 2025",
    type: "System",
    link: "/blog/areal",
  },
  {
    cover:
      "https://mdn.alipayobjects.com/huamei_ljitfi/afts/img/A*W0AuR6mZaxEAAAAAQKAAAAgAekZ_AQ/original",
    title: "Ming-Lite-Omni",
    time: "Mar 31, 2025",
    type: "Model",
    link: "/blog/ming-lite-omni-preview",
  },
];

// ---------------------------------------------------------------------------
// Date utilities
// ---------------------------------------------------------------------------

/**
 * Parse a raw date string (Chinese "YYYY年M月D日" or English "Mon D, YYYY")
 * to a sortable timestamp (ms).
 */
export function parsePaperDate(raw: string): number {
  const cleaned = raw.replace(/\s/g, "");
  // Chinese format
  const zh = cleaned.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日$/);
  if (zh) {
    return new Date(
      `${zh[1]}-${zh[2].padStart(2, "0")}-${zh[3].padStart(2, "0")}`,
    ).getTime();
  }
  // English fallback
  const ts = Date.parse(raw.trim());
  return isNaN(ts) ? 0 : ts;
}

/**
 * Format a raw date string to "YYYY-MM-DD" for display.
 */
export function formatPaperDate(raw: string): string {
  const cleaned = raw.replace(/\s/g, "");
  const zh = cleaned.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日$/);
  if (zh) {
    return `${zh[1]}-${zh[2].padStart(2, "0")}-${zh[3].padStart(2, "0")}`;
  }
  const ts = Date.parse(raw.trim());
  if (!isNaN(ts)) {
    return new Date(ts).toISOString().slice(0, 10);
  }
  return raw.trim();
}
