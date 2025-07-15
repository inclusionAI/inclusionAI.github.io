---
title: "Ming-Lite-Omni V1.5"
date: 2025-07-15T00:00:03+08:00
weight: 1
math: true
# draft: true
show_reading_time: true
show_bread_crumbs: true
show_post_nav_links: false # the prev/next after the content
show_code_copy_buttons: true
show_word_count: true
---

{{< button href="https://github.com/inclusionAI/Ming" label="GITHUB" external=true >}} 




# 🚀 Exciting News
We've just rolled out Ming-Lite-Omni V1.5, a major upgrade from the original version. This release keeps its core strengths while expanding into more multimodal tasks with optimized performance across the board. Experience enhancements like advanced document comprehension, MRoPE-based spatiotemporal position encoding, generative image segmentation, and improved image generation with ID retention. All these amazing features stem from **one unified** multimodal model, showcasing the power of modality unification. Stay tuned for detailed insights into each capability, and thank you for your support. We invite everyone to explore, share, and connect! 🌟


---


# Complex Document Understanding

The performance of the Ming-Omni-Lite model was systematically evaluated across a diverse set of benchmarks for Optical Character Recognition (OCR), chart analysis, and document understanding.
<!DOCTYPE html>
<html lang="zh-CN">
<table class="optimized-table">
    <thead>
        <tr>
            <th>Tasks</th>
            <th>Datasets</th>
            <th>Qwen2.5-VL-7B</th>
            <th>InternVL3-8B</th>
            <th>Ming-Omni-Lite</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="5" class="merged-cell">OCR-related Understanding</td>
            <td>ChartQA_test</td>
            <td>87.24</td>
            <td>86.60</td>
            <td>88.84</td>
        </tr>
        <tr>
            <!-- 后续4行中，第一列的<td>已被移除 -->
            <td>DocVQA_test</td>
            <td>95.57</td>
            <td>92.70</td>
            <td>93.68</td>
        </tr>
        <tr>
            <td>TextVQA_val</td>
            <td>85.06</td>
            <td>80.20</td>
            <td>82.27</td>
        </tr>
        <tr>
            <td>OCRBench</td>
            <td>87.8</td>
            <td>88.00</td>
            <td>88.90</td>
        </tr>
        <tr>
            <td>average</td>
            <td>88.91</td>
            <td>86.87</td>
            <td>88.42</td>
        </tr>
        <tr>
            <td>OCR-related Parsing</td>
            <td>OmniDocBench↓ en/zh</td>
            <td>30.8/39.8</td>
            <td>--</td>
            <td>34.9/34.9</td>
        </tr>
        <tr>
            <td>OCR-related Comprehensive</td>
            <td>OCRBenchV2 en/zh</td>
            <td>56.3/57.2</td>
            <td>--</td>
            <td>52.1/55.2</td>
        </tr>
    </tbody>
</table>

</body>
</html>

In OCR-related understanding tasks, Ming-Omni-Lite achieved an average score of 88.42, demonstrating performance comparable to the state-of-the-art 7B-parameter model, Qwen2.5VL-7B-Instruct (88.91). Notably, the model delivered state-of-the-art results on the challenging OCRBench (which assesses Text-Associated Vision Capability) and ChartQA benchmarks (which demand sophisticated visual analysis and logical reasoning of charts). This superior performance is attributed to its innovative training strategy, which integrates the Chain-of-Thought (CoT) paradigm to enable structured, multi-step reasoning pathways for complex problem-solving.

In the domain of OCR-related parsing, evaluated on the OmniDocBench benchmark for for multi-scene, multilingual, and various built-in (handwriting, tables, charts, chemical formulas, and mathematical expressions) documents. Ming-Omni-Lite exhibited exceptional capabilities. The model's strong performance in both English (34.9) and Chinese (34.9) contexts is a direct result of its training on a meticulously constructed, multi-source heterogeneous dataset.

---


## Text-Image Understanding and Human Experience

### **Text-Image Understanding**

The new Ming-lite-omni v1.5 integrates 3D positional encoding, significantly enhancing its perception of image structure and dynamic information. Combined with enhanced training strategies and comprehensively upgraded, high-quality data, v1.5 achieves substantial performance leaps across key tasks including general image understanding, image object recognition, and vertical scene recognition. This provides a more powerful foundational capability for a wide range of visual applications.
1. Spatio-Temporal Position Encoding. We introducing MRoPE, this novel 3D block-wise position encoding across time, height, and width dimensions endows models with spatio-temporal awareness, enabling efficient cross-modal joint modeling and enhancing understanding accuracy in video and complex image scenarios.
2. Efficient Training Strategy. Through strategic optimization of learning rates and multimodal data mixtures, we transform traditional step-wise LLM freezing/unfreezing procedures into efficient full-parameter training. This approach reduces training cycles and computational costs without compromising model performance.
3. Comprehensive Data Improvement. 
  a. In the pre-training phase, we expand knowledge breadth and data quality by: incorporating structured text-entity data to fill knowledge graph gaps; introducing original-description constraints to suppress hallucinations in generation tasks; and expanding vertical-domain corpora to deepen domain understanding.
  b. In the instruction fine-tuning phase, we strengthen core tasks and advanced understanding by: enhancing fine-grained visual perception (object counting, color identification, scene recognition); deepening vertical category recognition (animals, plants, vehicles, ingredients); and optimizing cross-disciplinary text-image reasoning.

| Task Type          | Evaluation Benchmark   | Qwen2.5-VL-7B | Ming-Omni-Lite |
|--------------------|------------------------|---------------|----------------|
| **General**    | AI2D                   | 84.36         | 84.91          |
|                    | HallusionBench         | 55.77         | 54.59          |
|                    | MMBench_TEST_V11       | 82.75         | 80.73          |
|                    | MMMU                   | 56.56         | 54.33          |
|                    | MMStar                 | 65.27         | 65.07          |
|                    | MMVet                  | 71.61         | 73.99          |
|                    | MathVista              | 68.10         | 72.00          |
|                    | OCRBench               | 87.80         | 88.90          |
| **Object Detection**| RefCOCO_val            | 90.00         | 91.40          |
|                    | RefCOCO+_val           | 84.20         | 86.30          |
| **In-house Benchmarks**| General Knowledge      | 92.42         | 92.53          |
|                    | Vertical Categories    | 47.79         | 54.27          |

### **Human Experience**

Thanks to the construction of high-quality alignment preference data and the fine-tuning of DPO training hyperparameter search/data sampling strategy configurations, our model achieves SOTA (state-of-the-art) performance on an in-house human experience preference dataset compared to open-source models of equivalent inference parameter size. It surpasses Qwen2.5VL-7B-Instruct by 0.09/5 points in average score. Our model exhibits significant advantages in terms of content accuracy (low hallucination rate), relevance, format aesthetics, and fluency of expression in multimodal question-answering tasks. This means the model provides a superior comprehensive experience for users during the question-answering interaction process.

| Benchmark<br>(In-house) | Evaluation Dimensions | Qwen2.5-VL-7B | Ming-Omni-Lite |
|-------------------------|-----------------------|---------------|----------------|
| Human Preference        | Average Score         | 4.274         | 4.365          |
|                         | Relevance             | 4.308         | 4.5            |
|                         | Fluency               | 4.765         | 4.91           |
|                         | Richness              | 3.828         | 3.69           |
|                         | Appropriateness       | 4.727         | 4.8            |
|                         | Correctness           | 3.741         | 3.92           |


---

## Advancing the SOTA in Video Understanding


The pursuit of Artificial General Intelligence (AGI) necessitates robust video comprehension capabilities within Multimodal Large Language Models (MLLMs). Real-world information is inherently dynamic and sequential, with video conveying significantly richer spatiotemporal semantics than static images. We report that **Ming-Omni-Lite** has achieved notable advancements across several core video understanding benchmarks.

### Performance Overview: Comprehensive Benchmark Results

Ming-Omni-Lite was rigorously evaluated against leading same-scale models (Qwen2.5-VL-7B, Qwen2.5-Omni-7B, InternVL3-8B) on prominent and challenging video understanding benchmarks. The results demonstrate Ming-Omni-Lite's superior performance:

| Benchmark                 | Qwen2.5-VL-7B | Qwen2.5-Omni-7B | InternVL3-8B | **Ming-Omni-Lite** |
| :------------------------ | :------------: | :--------------: | :----------: | :----------------: |
| **VideoMME(w/o subs)**    |     65.10      |      64.30       |    66.30     |     **67.07**      |
| **VideoMME(w/ subs)**     |     71.60      |      72.40       |    68.90     |     **72.59**      |
| **VideoMME(avg)**         |     68.35      |      68.35       |    67.60     |     **69.83**      |
| **MVBench**               |     69.60      |      70.30       |  **75.40**   |       69.43        |
| **LongVideoBench**        |     56.00      |      54.82       |    58.80     |     **59.54**      |
| **OvOBench**              |     51.10      |      50.46       |    51.91     |     **52.17**      |

### Technical Foundations: Architectural and Training Innovations

The advancements in video comprehension, particularly for long-form content, were achieved through key innovations in model architecture and training methodology:

*   **Efficient Spatiotemporal Modeling:** Incorporates MRoPE to effectively capture intra-frame (spatial) and inter-frame (temporal) dependencies, enabling precise extraction of critical dynamic information.
*   **High-Quality, Diverse Video-Text Alignment Data:** We have built a large-scale dataset of long/short video-text pairs and TPO (task-perference optimization) data covering a wide range of scenarios and tasks, including temporal retrieval and video tracking. We have performed detailed cleaning to ensure that the model learns accurate alignment capabilities.
*   **Innovative Training Objectives and Curriculum Learning:** Combines video-specific pretraining and instruction fine-tuning objectives, incorporating curriculum learning strategies that progressively increase temporal complexity from short to long videos.

### Conclusion: Enabling Advanced Video Interaction

Ming-Omni-Lite demonstrates superior performance compared to same-scale SOTA models on video understanding benchmarks. This validates its strong capability to process **complex, long-duration, information-dense** video content, laying a solid foundation for applications including video summarization, long-form video QA, intelligent tutoring, content moderation, and human-computer interaction.

We remain committed to advancing Ming-Omni-Lite's capabilities in video and multimodal domains, striving to develop intelligent agents capable of genuine comprehension, reasoning, and interaction with the real world.




---


## Audio Understanding and Generation

To enhance the capabilities of our model in Spoken Language Understanding (SLU), we incorporated an extensive and diverse corpus of speech data during the training phase. Furthermore, we integrated critical metadata—including domain, topic, language, and various dialects—directly into the instructional prompts for the understanding tasks. This methodology significantly improves the model's contextual comprehension. Our model demonstrates proficiency in understanding Mandarin Chinese, English, as well as a range of Chinese dialects such as Cantonese, Sichuan, Shanghai, and Minnan. As a result, it achieves **SOTA** performance on publicly available Mandarin and English benchmarks.


|        Model        | aishell1 | aishell2_android | aishell2_ios | cv15_zh  | fleurs_zh | 
|:-------------------:|:--------:|:----------------:|:------------:|:--------:|:---------:|
|    Ming-lite-omni   |   1.31   |     **2.45**     |   **2.45**   |   5.69   |   2.87    |
|     Qwen2.-Omni     |   1.18   |       2.75       |    2.63      | **5.20** |   3.00    |
|    Qwen2-Audio      |   1.53   |       2.92       |    2.92      |   6.90   |   7.50    |
|      Kimi-Audio     | **0.60** |       2.64       |    2.56      |   7.21   | **2.69**  |



|      Model      | ws_meet | ws_net | lsc_test_cl | lsc_test_ot | multi_ls | cv15_en | flu_en  | vox_en  |
|:---------------:|:-------:|:------:|:-----------:|:-----------:|:--------:|:-------:|:-------:|:-------:|
| Ming-lite-omni  |  6.18   | **5.22** |  **1.24**  |   2.61     |  **4.13** | **6.95** | **3.28**|   6.82  |
|  Qwen2-Omni     | **5.90**|  7.70   |   1.80     |   3.40     |   7.56    |  7.60   |  4.10   | **5.80**|
|  Qwen2-Audio    |  7.16   |  8.42   |   1.60     |   3.60     |   5.40    |  8.60   |  6.90   |   6.84  |
|   Kimi-Audio    |  6.28   |  5.37   |   1.28     | **2.42**   |   5.88    | 10.31   |  4.44   |   7.97  |


<style type="text/css">
  .tg  {border:none;border-collapse:collapse;border-spacing:0;}
  .tg td{border-style:solid;border-width:0px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;
         padding:10px 5px;word-break:normal;}
  .tg th{border-style:solid;border-width:0px;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;
         overflow:hidden;padding:10px 5px;word-break:normal;}
  .tg .tg-x5q1{font-size:16px;text-align:left;vertical-align:top}
  .tg .tg-t0cb{background-color:#FFF;color:#1F1F1F;font-size:16px;text-align:left;vertical-align:middle}
  .tg .tg-hxmt{background-color:#FFF;color:#1F1F1F;font-size:16px;text-align:left;vertical-align:top}
  .tg .tg-19xi{background-color:#FFF;color:#1F1F1F;font-size:16px;font-weight:bold;text-align:center;vertical-align:middle}
</style>

<table class="tg"><thead>
  <tr>
    <th class="tg-19xi">Input Audio</th>
    <th class="tg-19xi">Dialect</th>
    <th class="tg-19xi">Recognition</th>
  </tr></thead>
  <tbody>
    <tr>
      <td class="tg-hxmt"><audio controls><source src="https://github.com/Biao-Gong/static/raw/refs/heads/main/aud/0715/asr1.wav" type="audio/wav"></audio></td>
      <td class="tg-t0cb" >粤语</td>
      <td class="tg-t0cb">你在干什么, 是不是不想聊天</td>
    </tr>
    <tr>
      <td class="tg-hxmt"><audio controls><source src="https://github.com/Biao-Gong/static/raw/refs/heads/main/aud/0715/asr2.wav" type="audio/wav"></audio></td>
      <td class="tg-t0cb">上海话</td>
      <td class="tg-t0cb">我们考试还没定下来呢</td>
    </tr>
    <tr>
      <td class="tg-hxmt"><audio controls><source src="https://github.com/Biao-Gong/static/raw/refs/heads/main/aud/0715/asr3.wav" type="audio/wav"></audio></td>
      <td class="tg-t0cb">闽南语</td>
      <td class="tg-t0cb">宝贝, 早点休息, 晚安</td>
    </tr>
    <tr>
      <td class="tg-hxmt"><audio controls><source src="https://github.com/Biao-Gong/static/raw/refs/heads/main/aud/0715/asr4.wav" type="audio/wav"></audio></td>
      <td class="tg-t0cb">四川话</td>
      <td class="tg-t0cb">我难受的很, 别人都睡了</td>
    </tr>
  </tbody>
</table>

Leveraging its superior speech understanding capabilities, our model also demonstrates exceptional performance on speech dialogue evaluation benchmarks.

| Model               | AlpacaEval  | CommonEval  |    SD-QA     |     MMSU     |  OpenBookQA  |    IFEval    |   AdvBench    |
|:--------------------|:-----------:|:-----------:|:------------:|:------------:|:------------:|:------------:|:-------------:|
| Qwen2-Audio-chat    |    3.69     |    3.40     |    35.35     |    35.43     |    49.01     |    22.57     |     98.85     |
| Baichuan-Audio      |    4.00     |    3.39     |    49.64     |    48.80     |    63.30     |    41.32     |     86.73     |
| GLM-4-Voice         |    4.06     |    3.48     |    43.31     |    40.11     |    52.97     |    24.91     |     88.08     |
| Kimi-Audio          |    4.46     |    3.97     | <b>63.12</b> | <b>62.17</b> | <b>83.52</b> | <b>61.10</b> | <b>100.00</b> |
| Qwen2.5-Omni        |    4.49     |    3.93     |    55.71     |    61.32     |    81.10     |    52.87     |     99.42     |
| Ming-lite-omni      | <b>4.65</b> | <b>4.30</b> |    61.16     |    45.77     |    65.93     |    55.60     |     98.08     |

<table class="tg"><thead>
  <tr>
    <th class="tg-19xi">Input Audio</th>
    <th class="tg-19xi">Ouput Audio</th>
  </tr></thead>
  <tbody>
    <tr>
      <td class="tg-hxmt"><audio controls><source src="https://github.com/Biao-Gong/static/raw/refs/heads/main/aud/0715/qa1.wav" type="audio/wav"></audio></td>
      <td class="tg-hxmt"><audio controls><source src="https://github.com/Biao-Gong/static/raw/refs/heads/main/aud/0715/qa1_out.wav" type="audio/wav"></audio></td>
    </tr>
    <tr>
      <td class="tg-hxmt"><audio controls><source src="https://github.com/Biao-Gong/static/raw/refs/heads/main/aud/0715/qa2.wav" type="audio/wav"></audio></td>
      <td class="tg-hxmt"><audio controls><source src="https://github.com/Biao-Gong/static/raw/refs/heads/main/aud/0715/qa2_out.wav" type="audio/wav"></audio></td>
    </tr>
  </tbody>
</table>

In the domain of speech synthesis, Ming-lite-omni incorporates an advanced audio decoder. This decoder is conditioned on the output hidden states from the LLM, which enables the model to handle both context-aware multimodal dialogue and standard TTS tasks, ultimately generating speech with high naturalness and fluency. To enhance prosodic performance and facilitate real-time generation, we apply Byte Pair Encoding (BPE) to the discrete audio codec tokens. This methodology results in a 35% reduction in the acoustic frame rate, thereby improving synthesis efficiency.


| Model           | seed-tts-eval-zh_wer | seed-tts-eval-zh_sim | seed-tts-eval-en_wer | seed-tts-eval-en_sim |
|:---------------:|:--------------------:|:--------------------:|:--------------------:|:--------------------:|
| Seed-TTS        |         1.11         | 0.796                |         2.24         | 0.762                |
| MaskGCT         |         2.27         | 0.774                |         2.62         | 0.714                |
| E2 TTS          |         1.97         | 0.730                |         2.19         | 0.710                |
| F5-TTS          |         1.56         | 0.741                |         1.83         | 0.647                |
| CosyVoice 2     |         1.45         | 0.748                |         2.57         | 0.652                |
| Qwen2.5-Omni-7B |         1.70         | 0.752                |         2.72         | 0.632                |
| Ming-Lite-Omni  |         2.00         | 0.686                |        4.299         | 0.513                |

<table class="tg"><thead>
  <tr>
    <th class="tg-19xi">Prompt Audio</th>
    <th class="tg-19xi">Input Text</th>
    <th class="tg-19xi">Output Audio</th>
  </tr></thead>
<tbody>
  <tr>
    <td class="tg-hxmt"><audio controls><source src="https://github.com/Biao-Gong/static/raw/refs/heads/main/aud/0715/tts1_prompt.wav" type="audio/wav"></audio></td>
    <td class="tg-t0cb" >我们的愿景是构建未来服务业的数字化基础设施，给世界带来更多微小而美好的改变。</td>
    <td class="tg-hxmt"><audio controls><source src="https://github.com/Biao-Gong/static/raw/refs/heads/main/aud/0715/tts1wav.wav" type="audio/wav"></audio></td>
  </tr>
  <tr>
    <td class="tg-hxmt"><audio controls><source src="https://github.com/Biao-Gong/static/raw/refs/heads/main/aud/0715/tts2_prompt.wav" type="audio/wav"></audio></td>
    <td class="tg-t0cb" >The stained glass offered a hypnotic atmosphere</td>
    <td class="tg-hxmt"><audio controls><source src="https://github.com/Biao-Gong/static/raw/refs/heads/main/aud/0715/tts2.wav" type="audio/wav"></audio></td>
  </tr>
</tbody>
</table>


---


## Breaking New Limits in Image Generation

<!-- 相较于早先发布的 Ming-Lite-Uni 以及 Ming-Omni，在此版本中，我们进一步提升了Ming对生成图像的 **场景一致性**（Scene Consistency）、**ID 一致性**（Character / Style Consistency）、以及 **多感知扩展**（Segmentation, Keypoints, Depth, …），让Ming从一个具备图像生成和图像编辑能力的多模态大模型（MLLM），变成一个能够处理更多图像生成任务以及效果更好的完整MLLM。下面是我们最近一段时间的工作进展的报告，欢迎大家交流讨论。 -->

🔥 Building on the earlier releases of Ming-Lite-Uni and Ming-Omni, this version takes Ming's image generation to the next level! We've enhanced scene consistency, ID consistency (for characters and styles), and perception expansion (including segmentation, keypoints, depth, and more). Ming has evolved from a multimodal large model (MLLM) with image generation and editing talents to a comprehensive MLLM capable of tackling even more image generation tasks with superior results. Check out our recent progress report below. We're eager to exchange ideas and discuss with you all!



![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752039359523-ef57c4ba-3f99-4a9a-9515-5728b6c46c1c.webp)

|  | **GenEval** | **Single Ojbect** | **Two Objects** | **Counting** | **Color** | **Position** | **Color Attr** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Ours | 0.86 | 100.00% | 96.72% | 76.56% | 89.89% | 89.75% | 68.69% |

### Model Structure Review and Improvements

| **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">Sub-module</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">Technical Point</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">Function</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">Key Points</font>** |
| --- | --- | --- | --- |
| **<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Cross-modal Bridging Method</font>** | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Channel concat / Token concat / Blend</font> | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">- </font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Channel concat</font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">: Fewer parameters, low memory use, but weaker semantic alignment   </font><font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">- </font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Token concat</font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">: Preserves semantic structure, suitable for high resolution   </font><font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">- </font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Blend</font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">: More robust for scene editing/rewriting</font> | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Choose bridging method based on task needs. Currently using Token Concat approach</font> |
| **<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Dual-branch Representation Decoupling</font>** | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Decouple reference image patch encoding and refiner parameters</font> | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">- Enhance the independent control parameter capacity of reference images, providing partial decoupling</font> | Dual patchfy modules and extra dual-branch refiner improve model editing and segmentation performance |


+ Dual-branch decoupling refers to using different network weights to patchfy reference images and noise images before feeding them into DiT’s transformer. This effectively reduces the influence of reference image information on semantic adherence during editing. The refiner is an extra lightweight two-layer transformer added after patchfy to further enhance this effect. Performance assessments in inference segmentation demonstrate the effectiveness of the new module.
    - Inference segmentation tests the model’s ability to correctly understand semantics, requiring it to determine the target of segmentation based on complex instructions.
    - Experimental results are shown in the table below. It is evident that decoupling patchfy significantly improves segmentation metrics. Adding the refiner module can further enhance performance.
+ GEdit Subset: ["background_change", "color_alter", "material_alter", "motion_change"]

| Mode ID | double-patchfy | add-refiner | refcoc segmentation metric | GEdit(subset-full) |
| --- | --- | --- | --- | --- |
| 0 | ❌ | ❌ | 62.8 | 6.129 |
| 1 | ✅ | ❌ | 64.2 | 6.391 |
| 2 | ✅ | ✅ | 64.5 | 6.306 |

### Conditional Control and Guidance Strategy
| **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">Sub-module</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">Technical Point</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">Function</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">Key Points</font>** |
| --- | --- | --- | --- |
| **<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Multi-condition CFG Control Strategy</font>** | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Semantic CFG vs Image CFG (Ref-Guided)</font> | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Multi-condition Classifier-free Guidance strategy: semantic binary differentiation and image ternary differentiation enhance ID consistency</font> | With pure semantic control, the edited image follows the instructions but loses all consistency with the original image; when the image branch guidance intensity is high, the edited result is almost identical to the original image |
| **<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">ID & Scene Consistency Loss</font>** | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Weight mask Loss + Scene Consistency Loss</font> | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Increase the weight of the target image editing area, while adding strong constraints to the non-editing area and weak constraints to the editing area of the reference image</font> | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Adjust λ to balance editing effects while maintaining ID consistency and scene consistency, avoiding overfitting</font> |

+ Comparison with Qwen-VLo


| prompt | ours | Qwen-VLo |
| --- | --- | --- |
| <font style="color:rgb(44, 44, 54);">Make the person in the image smile slightly without altering the original structure</font><br/>![](https://github.com/Biao-Gong/static/blob/main/gen/1752147843685-5b097f6b-b2aa-4baf-abe4-f1abd89265e8.png?raw=true) | ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752147837185-62077f0c-e7ec-415f-bd34-1c8453253949.webp) | ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752147953713-703c31c8-2fd1-4c2d-b4bc-6e0f52e70017.webp) |



### Perception Capability Expansion

+ **Generative Segmentation**

  Unlike generative image editing tasks, segmentation tasks have less detail consistency between the predicted mask and the original image. Hence, under the token concat approach, learning the consistency relationship between the original image and segmentation mask can be challenging. To address this, we model the segmentation target as a colored segmentation image—a fusion of mask and image—allowing more consistent details between the predicted target and the original image. This enhances the ability to learn the relationship between the segmentation map and the original image. During inference, the predicted image and original image are differenced, and noise is filtered to obtain the final prediction mask.

| Input Image | Inference Segmentation | Semantic Segmentation | Panoptic Segmentation |
| --- | --- | --- | --- |
| ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752115158022-12254e69-e8c0-43fb-a725-f6730cda22d8.webp) | ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752115142775-3975827c-4110-445b-af53-e20201d1043a.webp)<br/>prompt: Given the following instructions: little girl, pink, your monitors colors off friend p pink shirt girl; please perform referring segmentation on this image. | ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752116495974-7708ba3a-5909-46df-82f5-a1bfa1519d4d.webp)<br/>prompt: Please segment different **classes** in this image | ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752115151406-c4780a97-5f1c-46cd-9a45-d4ef600d0897.webp)<br/>prompt: Please segment different **instances** in this image. |


+ **Edge Contour Map Generation**

| Original Image | Depth Map | Detection Box | Edge Contour |
| --- | --- | --- | --- |
| ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752466889319-bd19acce-c07d-4664-9890-41e4dff1ba8d.webp) | ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752466903529-996bcd35-a9a0-484b-98bf-2f2468f4df42.webp) | ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752466895795-1955ead5-6d94-4142-8d7b-e265352d2bcb.webp) | ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752467020122-ad8b436c-bb33-4ef0-85b8-cf45ae8c9be1.webp) |

---

## Data Engineering

**OCR-related parsing corpus.** To enhance the base model's performance in text-associated vision capability and logical reasoning, we introduce the Chain-of-Thought (CoT) paradigm during training. The specific implementation strategies are as follows:
Firstly, we integrate the open-source ChartQA-PoT (Program-of-Thought) dataset into the training framework, with particular emphasis on improving the model's numerical computation capabilities for charts. This approach inherits the progressive reasoning philosophy of Chain-of-Thought, but innovatively adopts executable Python code as the intermediate reasoning medium. Secondly, to address the limitations of the prevalent "answer-direct prompting" pattern in conventional text-based question-answering datasets, we innovatively employ reinforcement learning models to generate multi-step reasoning trajectories and final answers from original training samples. Through formal verification, we construct a novel training dataset comprising validated "reasoning step-final answer" pairs. This methodology significantly enhances the model's adaptability to complex logical tasks.

**Human preference corpus.** Human preference data optimizes MLLM responses through enhanced improved alignment with human-centric interaction patterns in the alignment tuning stage. Our preference corpus is primarily constructed from three sources: user-generated conversations in applications, search queries from websites, and high-quality open-source instruction datasets. Specifically, we first retrieve relevant web images via search engines to complement text-only user-generated dialogues or queries. We then leverage available MLLMs to generate diverse specialized questions and their corresponding answers. Afterwards, we organize those high-quality positive samples and the other negative ones to construct the preference corpus, which comprises 41 subcategories across 9 primary domains. Ultimately, we engage MLLMs and skilled human annotators to assess the quality of these QA pairs.

**Video understanding corpus.** High-quality video data provides richer and more precise semantic information, which effectively enhances the model’s depth and breadth of understanding complex video scenarios. The video corpus we constructed mainly derives from two sources: First, we have extensively mined and integrated existing open-source datasets for fundamental visual tasks—for example, leveraging the GOT-10K object tracking dataset to strengthen the model’s object tracking capability, and utilizing the DiDemo temporal retrieval dataset to improve the model’s event perception ability. Second, we organized a team of experts to meticulously annotate a set of challenging video question-answer pairs, dedicated to training the model’s capability for complex reasoning.

**Encyclopedia corpus.** Encyclopedia data integrates advanced domain-specific expertise into MLLMs for expert-level comprehension and perception, e.g., identifying rare or endangered species via Latin binomial nomenclature. In this version, our encyclopedia corpus spans 10 specific domains across biological categories (Plants and Animals), cultural categories (Celebrities, Anime characters, Landmarks, LOGOs, and Artworks), and daily-life categories (Ingredients, Dishes, and Vehicles). To construct a high-quality expert-level corpus, we first collect a wide range of encyclopedia entities from academic databases and institutional websites. We then employ these entities as search queries to collect semantically relevant images via search engines. Afterwards, we develop a progressive encyclopedia data filtering scheme, including clip consistency validation, MLLM-based binary verification, and manual refinement.

**GUI corpus.** The GUI (Graphic User Interface) data enables the model with basic GUI navigation ability on Android environment. Our GUI corpus is mainly constructed from four public datasets: AITW, GUICourse, AndroidControl and AMEX. Moreover, we leverage available MLLMs to optimize the reasoning process for each step within a human-like GUI interaction operation, which is subsequently reviewed by another MLLM to improve data quality. The thinking process constrains model to observe current state and reflect previous actions with careful consideration before acting. To better perceive current situation, we involve history memory, which includes preceding actions.

**Image generation and editing corpus.** Our image generation corpus mainly comes from two sources: High-quality images collected from public image generation datasets (e.g., text-to-image-2M, JourneyDB, BLip3o, Uniworld dataset, InstructPix2Pix-clip-filtered, SEED-Data-Edit-part2/3, Ultraedit, etc.); and image style transfer data sampled from StyleBooth and WikiArt. And also, we constructed a few generation pipelines, producing part of text-to-image and editing data.

**Perceptual reasoning corpus.** Perceptual reasoning data can enhance the model's comprehensive comprehension capabilities and fine-grained perceptual abilities. In this version, we focus on perception-oriented subtasks including object counting, color recognition, and scene theme identification. A set of potential challenging samples were curated from open-source datasets such as Object365 and RefCOCO through systematic filtering based on bounding box quantities, spatial relationships, and object category counts. Subsequently, these candidate samples underwent task-specific question-answer synthesis using Visual Language Models (VLMs), followed by rigorous quality assurance through multi-model evaluation scoring and manual filtering/correction to obtain high-quality annotations. Furthermore, to strengthen the model's reasoning capacity in perceptual tasks, we reformulated the synthesized data into Chain-of-Thought (CoT) format. This transformation introduces intermediate reasoning steps to assist the model in decomposing complex problems, thereby systematically improving its integrated perceptual understanding.

