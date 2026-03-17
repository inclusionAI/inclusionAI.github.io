// ---------------------------------------------------------------------------
// System data — single source of truth for the /system page.
// ---------------------------------------------------------------------------

export type SystemCategory =
  | "Reinforcement Learning"
  | "Agentic Environment"
  | "Expert Benchmarks";

export interface SystemItem {
  title: string;
  date: string;
  category: SystemCategory;
  blogSlug: string;
  description?: string;
}

export const SYSTEM_ITEMS: SystemItem[] = [
  {
    title: "AReaL: Ant Reasoning Reinforcement Learning for LLMs",
    date: "Apr 1, 2025",
    category: "Reinforcement Learning",
    blogSlug: "areal",
    description:
      "A fully asynchronous open-source RL training system for large reasoning models.",
  },
  {
    title: "Agentic Learning",
    date: "Apr 1, 2025",
    category: "Reinforcement Learning",
    blogSlug: "agenticlearning",
    description:
      "Research and techniques for training agentic models via reinforcement learning.",
  },
  {
    title: "AWorld: The Agent Runtime for Self-Improvement",
    date: "Jul 7, 2025",
    category: "Agentic Environment",
    blogSlug: "aworld",
    description:
      "A scalable multi-agent platform and runtime enabling agent self-improvement.",
  },
  {
    title: "ABench: An Evolving Open-Source Benchmark",
    date: "Jul 8, 2025",
    category: "Expert Benchmarks",
    blogSlug: "abench",
    description:
      "A dynamic, evolving benchmark suite for evaluating LLM capabilities.",
  },
];
