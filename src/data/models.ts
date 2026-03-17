// ---------------------------------------------------------------------------
// Model data — single source of truth for the /model page.
// ---------------------------------------------------------------------------

export type ModelCategory = "Foundation" | "Reasoning" | "Multi-Modal";

export interface ModelItem {
  title: string;
  date: string;
  category: ModelCategory;
  blogSlug: string;
  description?: string;
}

export const MODEL_ITEMS: ModelItem[] = [
  // Foundation / Language
  {
    title: "Ling: A MoE LLM Provided and Open-sourced by InclusionAI",
    date: "May 8, 2025",
    category: "Foundation",
    blogSlug: "ling",
    description:
      "A Mixture-of-Experts large language model fully open-sourced by InclusionAI.",
  },
  {
    title: "Ring: A Reasoning MoE LLM Provided and Open-sourced by InclusionAI",
    date: "Apr 1, 2025",
    category: "Reasoning",
    blogSlug: "ring",
    description:
      "A reasoning-focused MoE language model open-sourced by InclusionAI.",
  },
  {
    title: "Introducing Ring-lite-2507",
    date: "Aug 5, 2025",
    category: "Reasoning",
    blogSlug: "ring-lite-2507",
    description:
      "An updated lightweight reasoning model with improved performance.",
  },
  {
    title: "PromptCoT & PromptCoT-Mamba: Advancing the Frontiers of Reasoning",
    date: "Apr 1, 2025",
    category: "Reasoning",
    blogSlug: "promptcot",
    description:
      "Novel chain-of-thought prompting methods for enhanced reasoning.",
  },
  {
    title:
      "M2-Reasoning: Empowering MLLMs with Unified General and Spatial Reasoning",
    date: "Jul 11, 2025",
    category: "Reasoning",
    blogSlug: "m2-reasoning",
    description:
      "A unified reasoning framework covering general and spatial understanding.",
  },
  // Multi-Modal
  {
    title:
      "Ming-Omni: A Unified Multimodal Model for Perception and Generation",
    date: "Jun 11, 2025",
    category: "Multi-Modal",
    blogSlug: "ming-omni",
    description:
      "Unified multimodal model processing images, text, audio, and video.",
  },
  {
    title: "Introducing Ming-Lite-Omni V1.5",
    date: "Jul 21, 2025",
    category: "Multi-Modal",
    blogSlug: "ming-lite-omni-1_5",
    description:
      "Updated lightweight omni model with improved multimodal capabilities.",
  },
  {
    title:
      "Ming-Lite-Omni-Preview: A MoE Model Designed to Perceive a Wide Range of Modalities",
    date: "May 5, 2025",
    category: "Multi-Modal",
    blogSlug: "ming-lite-omni-preview",
    description:
      "Preview release of Ming-Lite-Omni with broad modality support.",
  },
  {
    title:
      "Ming-flash-omni-Preview: A Sparse, Unified Architecture for Multimodal Perception and Generation",
    date: "Oct 28, 2025",
    category: "Multi-Modal",
    blogSlug: "ming-flash-omni-preview",
    description:
      "Flash variant with sparse architecture for efficient multimodal processing.",
  },
  {
    title: "Segmentation-as-Editing for Unified Multimodal AI",
    date: "Sep 13, 2025",
    category: "Multi-Modal",
    blogSlug: "ming-lite-omni-1_5-seg",
    description:
      "Extends Ming-Lite-Omni with segmentation-as-editing capabilities.",
  },
  {
    title:
      "Ming-Lite-Uni: Advancements in Unified Architecture for Natural Multimodal Interaction",
    date: "May 7, 2025",
    category: "Multi-Modal",
    blogSlug: "ming-lite-uni",
    description:
      "Unified architecture enabling natural interaction across modalities.",
  },
  {
    title:
      "Ming-Omni-TTS: Simple and Efficient Unified Generation of Speech, Music, and Sound with Precise Control",
    date: "Mar 4, 2026",
    category: "Multi-Modal",
    blogSlug: "ming-omni-tts",
    description:
      "Text-to-speech and audio generation with fine-grained control.",
  },
  {
    title:
      "Ming-UniAudio: Speech LLM for Joint Understanding, Generation and Editing with Unified Representation",
    date: "Oct 1, 2025",
    category: "Multi-Modal",
    blogSlug: "ming-uniaudio",
    description:
      "Speech language model unifying audio understanding and generation.",
  },
  {
    title:
      "Ming-UniVision: Joint Image Understanding and Generation via a Unified Continuous Tokenizer",
    date: "Oct 1, 2025",
    category: "Multi-Modal",
    blogSlug: "mingtok",
    description:
      "Unified vision model for joint image understanding and generation.",
  },
];
