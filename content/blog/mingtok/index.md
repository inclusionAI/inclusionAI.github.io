---
title: "Ming-UniVision: Joint Image Understanding and Generation via a Unified Continuous Tokenizer"
date: 2025-10-01T00:00:03+08:00
weight: 1
math: true
# draft: true
show_reading_time: true
show_bread_crumbs: true
show_post_nav_links: false # the prev/next after the content
show_code_copy_buttons: true
show_word_count: true
---

{{< button href="https://github.com/inclusionAI/Ming" label="GITHUB" external=true >}} 🤗 <a href="https://huggingface.co/inclusionAI/Ming-UniVision">Hugging Face</a>｜ 🤖 <a href="https://www.modelscope.cn/models/inclusionAI/Ming-UniVision">ModelScope</a>
<video src="https://gw.alipayobjects.com/v/huamei_qlf8jc/afts/video/A*ZBkgTruOxA4AAAAAgyAAAAgAehi-AQ" width="768px" height="580px" controls></video>

# Ming-UniVision: Joint Image Understanding and Generation via a Unified Continuous Tokenizer

## 🚀 Technical Highlights

1.  **First Continuous Unified Tokenizer for Vision:** **MingTok** seamlessly supports both image understanding and generation within a single continuous latent space—eliminating quantization and bridging modalities.
2.  **First NTP-style Autoregressive MLLM with Unified Continuous Visual Tokens:** By building on MingTok, **Ming-UniVision** unifies vision and language under a shared next-token prediction framework, enabling end-to-end autoregressive modeling of diverse vision tasks.
3.  **Reduced Representational Competition → 3.5× Faster Convergence:** The unified continuous representation aligns semantic understanding and generative dynamics, significantly accelerating joint training without performance trade-offs.
4.  **Multi-Round In-Context Learning in a Single Feature Space:** All operations—understanding, generation, and editing—occur in the same continuous space, eliminating costly cross-space conversions and enabling simpler, more efficient training and inference.


## The Challenge: The Inverse Nature of Seeing and Drawing

Autoregression—the powerful paradigm of modeling the world by “predicting the next token”—has already unified diverse modalities like language and audio. The next frontier is to bring visual understanding (seeing) and visual generation (drawing) into this unified sequence‑to‑sequence framework.

However, this ambition encounters a deep challenge: in many respects, understanding and generation are inverse tasks.
*   **Understanding:** Pixels → high‑dimensional, abstract semantic concepts
*   **Generation:** Concepts → fine‑grained, high‑fidelity pixels

These tasks have drastically different—and often competing—preferences for their underlying visual representation.

### Why Previous Approaches Fell Short

Existing models attempt unification via two limited strategies:

1.  **Asymmetric Designs:** Use different, heterogeneous feature spaces for each task. During multi‑turn interactions, this forces inefficient “round‑trips” between spaces, causing latency and complexity.
2.  **Shared Discrete Tokens:** Unify the token space but introduce quantization errors. This hurts image fidelity and degrades understanding capability.

### Our Solution: Ming-UniVision and MingTok

To break this impasse, we introduce **Ming-UniVision**, a new generation of autoregressive vision‑language model built on a foundational innovation: **MingTok**.

**MingTok** is the first visual tokenizer based on a continuous latent space. It delivers a truly unified and efficient representation that serves as the bedrock for Ming‑UniVision’s unified NTP (Next‑Token Prediction) framework—harmonizing image understanding, generation, and editing in one in‑context multimodal loop.

## The Core Design: A Three-Stage Architecture to Reconcile Competition

At the heart of Ming-UniVision is the **MingTok** tokenizer, a three-stage sequential architecture elegantly designed to reconcile the competing representational demands of understanding and generation within a single framework.

![Figure 1: Architecture Comparison](https://mdn.alipayobjects.com/huamei_qlf8jc/afts/img/A*VVx0SJQR5K4AAAAARBAAAAgAehi-AQ/original)
*Figure 1: (a) Existing models use separate visual representations. (b) MingTok, the engine of Ming-UniVision, uses a unified scheme for both semantic and generative representations. (c) This unified approach leads to over 3.5x faster training convergence.*

1.  **Low-level Encoder:** Maps an input image into a sequence of compact, continuous latent codes, optimized for high-quality and efficient autoregressive generation.
2.  **Semantic Decoder:** Autoregressively "refines" the compact latent codes into high-dimensional, rich semantic features aligned with top-tier understanding models like CLIP.
3.  **Pixel Decoder:** Serves as a quality-assurance module, ensuring the original image can be reconstructed with high fidelity, guaranteeing a high-fidelity representation process.

> **The Key Innovation:** MingTok creates a unified, differentiable interface. The high-level features for understanding can be directly fed as conditional input for the next round of generation or editing. This **completely eliminates the costly detour through pixel space.**

## The Breakthrough: A Fundamental Leap in Efficiency

By integrating MingTok, Ming-UniVision achieves competitive results on both understanding and generation tasks. The shared continuous latent space unlocks two fundamental layers of efficiency, resolving bottlenecks that have plagued previous architectures.

![Figure 2: Benchmark Results](https://mdn.alipayobjects.com/huamei_qlf8jc/afts/img/A*oi4-RqyoAvIAAAAARPAAAAgAehi-AQ/original)
*Figure 2: On general recognition tasks, our method approaches the performance of models with separated representations and significantly outperforms other unified representation models. For generation, our model shows a clear advantage on fine-grained tasks.*

### 1. A Revolution in Training: >3.5x Faster Convergence

Traditional approaches expend massive resources aligning heterogeneous representations, creating an intrinsic "task competition" that slows learning. MingTok solves this at its root.

*   **Synergistic Enhancement:** Our ablation studies show that using MingTok for both tasks fosters a synergy where understanding and generation capabilities enhance each other, rather than competing.
*   **>3.5x Speedup:** By avoiding inefficient alignment, the model focuses its energy on learning, reaching the same performance level in a fraction of the time compared to traditional schemes.

![Figure 3: Pre-training Performance](https://mdn.alipayobjects.com/huamei_qlf8jc/afts/img/A*dkPxS4hNZx8AAAAARAAAAAgAehi-AQ/original)
*Figure 3: The performance drop between generation-only training and joint training is minimal with MingTok, proving the advantage of our unified approach.*

### 2. A Revolution in Interaction: Goodbye to the "Pixel Round-Trip"

The efficiency of multi-turn interactions (e.g., *generate → edit → re-generate*) depends on the "understanding-generation" loop. This is precisely where traditional architectures falter.

| Architecture Type | Multi-turn Capability | Core Bottleneck | Interaction Path | Efficiency & Fidelity |
| :--- | :--- | :--- | :--- | :--- |
| DiT-based Models | ❌ Not Natively Supported | Non-autoregressive, stateless | N/A (Full process restart) | Low |
| Hybrid Architectures | ⚠️ Supported, but Inefficient | Dual-branch, un-unified spaces | `Latent → Pixel → Feature` | Low, complex, lossy |
| Unified AR | ⚠️ Supported, but Inefficient | Heterogeneous spaces | `Latent → Pixel → Feature` | Low, lossy |
| **Ming-UniVision** | ✅ **Native & Highly Efficient**| **Unified Continuous Space** | **`Feature → Feature`** | **High & High-Fidelity** |

As the table shows, any architecture with separated spaces is doomed to the inefficient `Latent → Pixel → Feature` round-trip. This "pixel detour" introduces massive latency and causes contextual information to decay.

**Ming-UniVision** achieves a direct **`Feature → Feature` closed loop**. High-level features from an understanding task can be directly consumed by the next generation task, unlocking truly coherent multimodal sequence modeling. This enables tasks that once required multiple specialized models to emerge naturally within a single, unified framework:

*   **Iterative Image Enhancement:** Perform super-resolution, then directly continue with colorization or denoising.
*   **Generative Chain-of-Thought:** Perform an understanding task (e.g., "segment the car"), then directly apply an editing command to that region.

![Figure 4: Multi-turn Interaction Demo](https://mdn.alipayobjects.com/huamei_qlf8jc/afts/img/A*B3ckSaNK1cMAAAAARzAAAAgAehi-AQ/original)
*Figure 4: Multi-turn tasks like "Super-resolution → Colorization" and "Segmentation → Editing" are now part of a seamless flow.*

Understanding, generation, and editing are no longer isolated pipelines but are woven into a **continuous visual conversation.**

---

## Conclusion and The Road Ahead

We believe that a unified and continuous visual representation like MingTok opens up new possibilities for building more flexible and intuitive multimodal interactive systems.

We know this is just one step in a long journey. We have open-sourced our code and initial model weights, hoping to provide a useful foundation for the community and to inspire more discussion around unified representations. We look forward to collaborating with our peers to collectively advance the future of multimodal AI.

### Get Involved

*   **GitHub:** [Link to your repo]
*   **Technical Report:** [Link to your paper]
*   **Online Demo:** [Link to your demo]

Try out our open-source model **Ming-UniVision and MingTok-Vision** on our [**GitHub Page / Demo Page**](https://github.com/inclusionAI/Ming/blob/main/cookbook.ipynb). Please star our repo if you like it!


<!-- ---

Try out our open-source model **Ming-lite-omni 1.5** on our [**GitHub Page / Demo Page**](占位符：你的GitHub/Demo链接). Please star our repo if you like it!

To cite our work:
```

``` -->