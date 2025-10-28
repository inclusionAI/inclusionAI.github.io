---
title: "Ming-flash-omni-Preview: The Hundred Billion-Scale MoE Unifying Perception and Generation"
date: 2025-10-28T00:00:03+08:00
weight: 1
math: true
# draft: true
show_reading_time: true
show_bread_crumbs: true
show_post_nav_links: false # the prev/next after the content
show_code_copy_buttons: true
show_word_count: true
---

{{< button href="https://github.com/inclusionAI/Ming" label="GITHUB" external=true >}} 🤗 <a href="https://huggingface.co/inclusionAI/Ming-flash-omni-Preview">Hugging Face</a>｜ 🤖 <a href="https://www.modelscope.cn/models/inclusionAI/Ming-flash-omni-Preview">ModelScope</a>


Omnimodal Ming-omni series update! **Ming-flash-omni-Preview** is the **first open-source omnimodal large model** with a parameter scale reaching the hundred billion-Scale level. Based on Ling 2.0's sparse MoE architecture, Ming-flash-omni-Preview has a total of **103B parameters** with **9B activated**. Compared to the previous version Ming-lite-omni-1.5, Ming-flash-omni-Preview has improved in both omnimodal understanding and generation capabilities. The overall performance across various modalities has reached a **leading level among open-source omnimodal models**, with particularly outstanding performance in **controllable image generation, streaming video understanding, and speech recognition**.

![performance](https://mdn.alipayobjects.com/huamei_drbxn1/afts/img/5hflRY595xwAAAAAgBAAAAgADkliAQFr/original)

## Capability Overview
### Controllable Image Generation
For image generation, Ming-flash-omni-Preview pioneers the **Generative Segmentation Paradigm**, reframing "image segmentation" as a **semantic-preserving editing task (Generative Segmentation-as-Editing)**, achieving fine-grained spatial semantic control. Ming-flash-omni-Preview achieved a score of **0.90** on the GenEval benchmark, surpassing all non-reinforcement learning generation methods and demonstrating exceptional controllability.
<video src="https://gw.alipayobjects.com/v/huamei_drbxn1/afts/video/cb4mSp1jTwQAAAAAgIAAAAgAfoeUAQBr" width="704px" controls></video>

### Streaming Video Understanding
Users often have a need to engage in continuous dialogue with AI based on real-world scenarios and to use AI to understand those scenarios. Ming-flash-omni-Preview can effectively fulfill these needs. As shown in the video below, Ming-flash-omni-Preview can achieve **fine-grained understanding of streaming video**, recognizing objects and interactions within the video, and providing relevant understanding and explanations in real-time to support users in practical scenarios.
<video src="https://gw.alipayobjects.com/v/huamei_drbxn1/afts/video/n6k6SqtCCqMAAAAAgJAAAAgAfoeUAQBr" width="704px"  controls></video>

### Speech and Dialect Understanding
Ming-flash-omni-Preview can achieve **Context-Aware Speech Recognition (ContextASR)** and **dialect recognition**, achieving **SOTA** across all 12 ContextASR subtasks. Its understanding ability for **15 Chinese dialects**, including Hunanese, Minnanese, and Cantonese, is significantly enhanced, effectively providing translation and real-time understanding support for users who might be lost in an unfamiliar dialect.
<video src="https://gw.alipayobjects.com/v/huamei_drbxn1/afts/video/iEf7QK3W3m4AAAAAgBAAAAgAfoeUAQBr" width="704px"  controls></video>

### Voice Cloning
Ming-flash-omni-Preview's speech generation has been upgraded from discrete tokenizers to **continuous tokenizers**, significantly enhancing voice cloning capabilities. It exhibits high stability in **mixed Chinese-English pronunciation**, and can effectively clone the voice from the original conversation into newly generated dialogue. The seed-tts-zh WER metric is **0.99**, surpassing Qwen3-omni and seed-tts.
<video src="https://gw.alipayobjects.com/v/huamei_drbxn1/afts/video/Ru5dTrMPb30AAAAAgBAAAAgAfoeUAQBr" width="704px"  controls></video>

## Model Architecture and Capability Introduction
Model structure diagram of Ming-flash-omni-Preview:

![architecture](https://mdn.alipayobjects.com/huamei_drbxn1/afts/img/MdHMSqYQCqAAAAAAVcAAAAgADkliAQFr/fmt.avif)

Compared to Ming-lite-omni-1.5, Ming-flash-omni-Preview primarily features the following technical optimizations:

### Omnimodal Training Based on Sparse Expert Architecture
Ming-flash-omni-Preview extends the **Ling-Flash-2.0 sparse MoE architecture** to the omni-modality. It models the distribution and routing strategy of each modality based on the **modality-level routing** proposed by Ming-lite-omni, achieving **"large capacity, small activation"** for each modality. By introducing **VideoRoPE** in the Attention layer, it enhances spatiotemporal modeling for long videos, improving video interaction capability. Additionally, in terms of training strategy:
1. **Stable Sparse Training:** Utilizes a **mixed expert balancing scheme** (combining auxiliary load balancing loss with router bias updates) to ensure uniform activation and convergence of omnimodal training under the sparse MoE architecture;
2. **Context-Aware ASR Training Paradigm:** For speech training tasks, task/domain information input is used as the decoding condition, significantly improving proper noun recognition and transcription consistency. It also introduces high-quality dialect training corpora, leading to a significant increase in recognition accuracy for **15 Chinese dialects**, including Hunanese, Minnanese, and Cantonese.

### Unified Generative Segmentation and Editing
The core challenge in building a unified multimodal model lies in how to efficiently integrate image understanding and generation capabilities. Our Ming-lite-omni-1.5 achieved this by freezing the language pathway and injecting hierarchical semantics using multi-scale QueryTokens, thereby allowing the generation objective to better integrate with the understanding task while preserving understanding performance. Although this training strategy improved stability, the fundamental differences between the learning objectives of understanding and generation mean that even with the introduction of hierarchical semantics, fine-grained visual knowledge (such as object attributes and spatial relationships) remains difficult to efficiently transfer to high-precision generation and editing tasks, thus limiting the improvement in model generation quality and controllability.
To overcome this bottleneck, Ming-flash-omni-Preview proposes the **"Generative Segmentation-as-Editing" collaborative training paradigm**. This paradigm reframes image segmentation as a semantic-preserving editing task (e.g., "paint the banana purple"). The key assistance provided by this design is: **It forcibly unifies the understanding and generation objectives** — successful editing must rely on precise understanding of the object's outline, and the editing quality directly provides supervision signals for understanding. This paradigm directly enhances the model's fine-grained spatiotemporal semantic control ability and indirectly solves the compositionality problem in pure text-to-image generation.
In the GenEval benchmark, Ming-flash-omni-Preview achieved a score of **0.90**, surpassing all leading non-reinforcement learning (non-RL) methods; in the GEdit benchmark, the average score for precise editing tasks such as object deletion and object replacement improved from **6.9 to 7.9**. These two results collectively prove that the fine-grained spatiotemporal semantic control capability gained through the "Generative Segmentation-as-Editing" training not only significantly improves performance in precise editing tasks but can also effectively generalize to pure text-driven image generation tasks.

### Efficient Omnimodal Training Architecture
Training omnimodal foundation models faces two major challenges: data heterogeneity (varied shapes of multi-modal inputs) and model heterogeneity (difficulty in parallelizing modality-specific encoders). These issues lead to load imbalance, memory fragmentation, and pipeline bubbles, severely slowing down the training speed.
To address these problems, we made two key optimizations based on the Megatron-LM framework when training the Ming-flash-omni-Preview model:
1. **Sequence Packing:** Solves data heterogeneity. Varied-length sequences are densely packed into fixed-length batches, significantly improving memory utilization and computational density;
2. **Flexible Encoder Sharding:** Solves model heterogeneity. Extends Megatron-LM to support fine-grained sharding of modality encoders across DP/PP/TP, eliminating pipeline bubbles and achieving load balancing.
These optimization measures resulted in a **doubling of the training throughput** of Ming-flash-omni-Preview compared to the baseline.

## Getting Started with Ming-flash-omni-Preview
Our model and code are open source. We welcome everyone to try, provide feedback, and exchange ideas:
- GitHub: https://github.com/inclusionAI/Ming
- Hugging Face: https://huggingface.co/inclusionAI/Ming-flash-omni-Preview
- ModelScope: https://www.modelscope.cn/models/inclusionAI/Ming-flash-omni-Preview

## Future Plan
The version released this time is the Ming-flash-omni-Preview, and the current version has some imperfections:
1. **Visual-Text Understanding Capability:** Although Ming-flash-omni-Preview's overall performance is leading among omnimodal models, there is still a gap compared to SOTA dedicated VL large models. We will continue to explore the performance upper limit of omnimodal models.
2. **Speech Capability:** Overall performance in speech recognition and speech synthesis is leading. The effects of multi-turn speech dialogue and high-quality voice cloning are our next optimization priorities.
3. **Image Generation Capability:** The model achieved a score of **0.90** on the GenEval benchmark, demonstrating good controllability, and already possesses text generation and editing capabilities. However, there is still room for improvement in rendering and editing text with complex layouts, as well as generating specific IP characters.

We are continuously optimizing the user experience of Ming-flash-omni-Preview. We welcome you to provide feedback via community discussion or issues. The official version will be released soon.
