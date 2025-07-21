---
title: "Introducing Ming-Lite-Omni V1.5"
date: 2025-07-21T00:00:03+08:00
weight: 1
math: true
# draft: true
show_reading_time: true
show_bread_crumbs: true
show_post_nav_links: false # the prev/next after the content
show_code_copy_buttons: true
show_word_count: true
---

{{< button href="https://github.com/inclusionAI/Ming" label="GITHUB" external=true >}} 🤗 <a href="https://huggingface.co/inclusionAI/Ming-Lite-Omni-1.5">Hugging Face</a>｜ 🤖 <a href="https://www.modelscope.cn/models/inclusionAI/Ming-Lite-Omni-1.5">ModelScope</a>



We are excited to introduce Ming-lite-omni V1.5, a comprehensive upgrade that significantly enhances the omni-modal capabilities of the original Ming-lite-omni model (find it on 🤗<a href="https://huggingface.co/inclusionAI/Ming-Lite-Omni">Hugging Face</a>). This new version delivers remarkable improvements across a wide range of tasks, including image and text understanding, document analysis, video comprehension, speech understanding and synthesis, as well as image generation and editing.

Built on the Ling-lite-1.5 architecture, Ming-lite-omni V1.5 features a total of 20.3B parameters, with 3B active parameters in its Mixture of Experts (MoE) configuration. It has achieved impressive results across various multimodal benchmarks. Below, we highlight the key advancements in performance metrics and model architecture from this latest update.



<div style="text-align:center;margin: auto; width: 70%;">
  <img src="https://mdn.alipayobjects.com/huamei_aukff7/afts/img/dv7TTL8MW5EAAAAAWtAAAAgAeuUHAQFr/fmt.webp" alt="Image description" />
  <p style="font-size:14px; color:gray;">Performance Comparison</p>
</div>


<div style="text-align:center">
  <img src="https://mdn.alipayobjects.com/huamei_aukff7/afts/img/A_LZTJcsc3EAAAAAXuAAAAgAeuUHAQFr/fmt.webp" alt="Image description" />
  <p style="font-size:14px; color:gray;">Framework</p>
</div>



## Introduction

To achieve these advancements, we integrated our in-house innovations with cutting-edge developments from both academia and the open-source community. We explored several key areas, leading to significant breakthroughs and key findings detailed below.

### Image and Speech Generation

1.  **Dual-Branch Decoupling for Image Generation:** We implemented a **dual-branch decoupling strategy** that processes the reference image and the noise image with separate weights before they enter the Diffusion Transformer (DiT). This approach effectively increases the model's capacity for learning from the reference. To further refine the output, we added two extra transformer layers.
2.  **ID & Scene Consistency Loss:** To maintain character and scene identity during image editing, we introduced a new **ID & Scene Consistency Loss**. This function strategically increases focus on the edited region in the target image, boosts the influence of unedited areas from the reference image, and diminishes the influence of the edited areas from the reference.
3.  **Perceptual Enhancement Strategy:** We introduced a **Perceptual Enhancement Strategy** by improving the model's ability to perceive structures through tasks like segmentation and keypoint detection. This provides greater structural control during generation and editing, leading to significant score improvements on metrics related to object position, structure, and count (see [Table A](#table1) for details).
4.  **Multi-task Collaborative Learning:** A **Multi-task Collaborative Learning** approach allows generation and editing tasks to synergistically improve one another. By treating segmentation as a colorization-based editing task within a unified training pipeline, we achieved significant gains in segmentation accuracy and enhanced the precision of local edits, resulting in smoother and more natural transitions at the edges of edited areas.
5.  **New Audio Decoder:** On the speech generation front, we developed a novel audio decoder that is fully context-aware, directly processing output features from the LLM.
6.  **Efficient Speech Generation:** To improve prosody and real-time generation capabilities, we applied BPE encoding to the discrete audio codec tokens, which successfully reduced the audio frame rate by 35%.
7.  **Comprehensive Data Upgrades:**
    - Sourced high-quality portrait data, filtered by resolution, facial detail, and face size.
    - Collected and curated a high-quality celebrity dataset with processed face crops.
    - Expanded the model's capabilities by building new training subsets for edge maps, segmentation maps, text-in-image, and facial expressions.

### Image, Text, Video, and Speech Understanding

1.  **MRoPE for Spatiotemporal Awareness:** We integrated MRoPE (Multi-dimensional RoPE), which applies positional encoding across three dimensions (time, height, and width). This equips the model with a native understanding of space and time, enabling highly efficient cross-modal modeling and significantly boosting comprehension accuracy for videos and complex images.
2.  **Efficient Full-Parameter Training:** By optimizing learning rates and the multimodal data mixture, we upgraded our pre-training from a phased approach of **freezing/unfreezing LLM layers** to a streamlined, **efficient full-parameter training** regimen. This shortened the training cycle by 26.5% with no loss in performance.
3.  **Video Understanding via Curriculum Learning:** We adopted a curriculum learning strategy for video understanding, progressively increasing the complexity from short-form to long-form videos to enhance the model's capabilities.
4.  **Complex Document Understanding with CoT:** For complex document analysis, we incorporated a Chain-of-Thought (CoT) strategy to build structured reasoning paths, effectively improving the model's problem-solving abilities on intricate queries.
5.  **Comprehensive Data Upgrades:**
    - **Pre-training:**
        - Added structured text entity data to fill knowledge graph gaps.
        - Expanded with high-quality product data to enhance general knowledge.
    - **Instruction Fine-Tuning:**
        - Improved data precision for fine-grained visual perception (e.g., object counting, color, and scene recognition).
        - Increased data depth for specialized domain recognition (e.g., flora/fauna, vehicles, and ingredients).
        - Enhanced cross-disciplinary reasoning in complex visual-text tasks through targeted data optimization.
        - For speech understanding, we infused instruction text with metadata like domain, topic, and language (including dialects). This boosted model performance and enabled comprehensive support for Mandarin, English, Cantonese, Sichuanese, Shanghainese, and Minnan.

### Aligning with User Preferences

To ensure that improvements on standard benchmarks translate directly to a superior real-world user experience, we created our own **human evaluation benchmark** and conducted internal, head-to-head evaluations against other models. Thanks to our high-quality preference alignment data, Ming-lite-omni V1.5 demonstrates a distinct advantage over leading models in the accuracy (low hallucination rate), relevance, formatting, and fluency of its visual question-answering responses. On our internal adversarial test set, Ming-lite-omni V1.5 achieved an **87.07% win rate** against Ming-lite-omni V1, marking a significant enhancement in user experience.



<!-- | 评测维度          | Qwen2.5-VL-7B | Ming-Omni-Lite V1.5 |
|:---------------:|:---------------:|:---------------:|
| 相关性   | 4.308         | 4.5            |
| 流畅性   | 4.765         | 4.91           |
| 内容丰富性 | 3.828         | 3.69           |
| 格式合理性 | 4.727         | 4.8            |
| 正确性   | 3.741         | 3.92           |
| **均分**            | **4.274**         | **4.365**          | -->



<div style="text-align: center; margin: auto; width: 80%; line-height: 1.1;">
  <table style="margin: 0 auto;">
    <thead>
      <tr>
        <th style="text-align: center;padding: 5px;">Benchmark Dimension</th>
        <th style="text-align: center;padding: 5px;">Qwen2.5-VL-7B</th>
        <th style="text-align: center;padding: 5px;">Ming-Omni-Lite V1.5</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align: center;padding: 2px;">Relevance</td>
        <td style="text-align: center;padding: 2px;">4.308</td>
        <td style="text-align: center;padding: 2px;">4.5</td>
      </tr>
      <tr>
        <td style="text-align: center;padding: 2px;">Fluency</td>
        <td style="text-align: center;padding: 2px;">4.765</td>
        <td style="text-align: center;padding: 2px;">4.91</td>
      </tr>
      <tr>
        <td style="text-align: center;padding: 2px;">Richness</td>
        <td style="text-align: center;padding: 2px;">3.828</td>
        <td style="text-align: center;padding: 2px;">3.69</td>
      </tr>
      <tr>
        <td style="text-align: center;padding: 2px;">Formatting</td>
        <td style="text-align: center;padding: 2px;">4.727</td>
        <td style="text-align: center;padding: 2px;">4.8</td>
      </tr>
      <tr>
        <td style="text-align: center;padding: 2px;">Accuracy</td>
        <td style="text-align: center;padding: 2px;">3.741</td>
        <td style="text-align: center;padding: 2px;">3.92</td>
      </tr>
      <tr>
        <td style="text-align: center;padding: 2px;"><strong>Average</strong></td>
        <td style="text-align: center;padding: 2px;"><strong>4.274</strong></td>
        <td style="text-align: center;padding: 2px;"><strong>4.365</strong></td>
      </tr>
    </tbody>
  </table>
</div>

<br>

## Demos
### Image Editing
To address the challenge of maintaining character and scene identity during image editing, we've introduced the **ID & Scene Consistency Loss**. This function strategically increases the weight of the edited region in the target image, boosts the influence of unedited areas from the reference image, and reduces the influence of the edited areas within that same reference.
<div style="text-align:center">
<img src="https://mdn.alipayobjects.com/huamei_aukff7/afts/img/e-mDS5UyUogAAAAAgCAAAAgAeuUHAQFr/fmt.webp" alt="Image description" />
<video src="https://gw.alipayobjects.com/v/huamei_aukff7/afts/video/UoqbRYQnZYEAAAAAgCAAAAgAeuUHAQFr" controls></video>
</div>

{{< fullwidth class="example-container" >}}
{{< example data="cases/seg_en.json" hide=false next=true scroll=true >}}
{{< /fullwidth >}}

<!-- 
引入<u>多任务协同学习策略</u>。通过联合训练链路实现生成与编辑的相互促进，将分割任务转化为彩色上色编辑任务，显著提升分割指标和图像局部编辑的精度与可控性，使编辑区域边缘更光滑：

<a id="image1"></a>
<div style="text-align:center">
  <img src="https://gcore.jsdelivr.net/gh/biao-gong/static@main/0715/0.webp" alt="Image description" />
  【待补充】
  <p style="font-size:14px; color:gray;">图A【占位】</p>
</div> -->

### Image Generation

We introduced a **Perceptual Enhancement Strategy** by optimizing the model's structural awareness through tasks like segmentation and keypoint detection. This improves its understanding of image details and spatial relationships, giving us greater structural control over the generation and editing process. The result is a significant boost in scores on the GenEval benchmark, particularly for metrics related to position, structure, and count:
<a id="table1"></a>
|   | 1-Obj | 2-Obj | Counting | Colors | Position | Color Attr | Avg. |
|---| :---:   | :---:   | :---:      | :---: |:---: |:---: |:---: |
|Ming-lite-omni| 0.99   | 0.77   | 0.68      | 0.78 | 0.46 |0.42 |0.64 |
|Ming-lite-omni V1.5| 0.99   | 0.93   | 0.86      | 0.87 |0.90 |0.66 |0.87 |  

| Original Image | Generated Depth Map | Generated Bounding Boxes | Generated Edge Map |
| :---: | :---: | :---: | :---: |
| ![](https://gcore.jsdelivr.net/gh/biao-gong/static@main/gen/1752466889319-bd19acce-c07d-4664-9890-41e4dff1ba8d.webp) | ![](https://gcore.jsdelivr.net/gh/biao-gong/static@main/gen/1752466903529-996bcd35-a9a0-484b-98bf-2f2468f4df42.webp) | ![](https://gcore.jsdelivr.net/gh/biao-gong/static@main/gen/1752466895795-1955ead5-6d94-4142-8d7b-e265352d2bcb.webp) | ![](https://gcore.jsdelivr.net/gh/biao-gong/static@main/gen/1752467020122-ad8b436c-bb33-4ef0-85b8-cf45ae8c9be1.webp) |



{{< fullwidth class="example-container" >}}
{{< example data="cases/chat_en.json" hide=false next=true scroll=true >}}
{{< /fullwidth >}}


### Speech Generation

| Text Inputs | Ming-lite-omni | Ming-lite-omni V1.5 |
| --- | :---: | :---: |
| Tyler, Lucy, Michelle, we're going to space! | <audio controls><source src="https://gcore.jsdelivr.net/gh/biao-gong/static@main/0715/tts_en1_v1.wav" type="audio/wav"></audio>  | <audio controls><source src="https://gcore.jsdelivr.net/gh/biao-gong/static@main/0715/tts_en1_v1.5.wav" type="audio/wav"></audio>  |
| what is the forecast for California for rain | <audio controls><source src="https://gcore.jsdelivr.net/gh/biao-gong/static@main/0715/tts_en2_v1.wav" type="audio/wav"></audio>  | <audio controls><source src="https://gcore.jsdelivr.net/gh/biao-gong/static@main/0715/tts_en2_v1.5.wav" type="audio/wav"></audio>  |
| Television can make you dumb, but it can also be good education. | <audio controls><source src="https://gcore.jsdelivr.net/gh/biao-gong/static@main/0715/tts_en3_v1.wav" type="audio/wav"></audio>  | <audio controls><source src="https://gcore.jsdelivr.net/gh/biao-gong/static@main/0715/tts_en3_v1.5.wav" type="audio/wav"></audio>  |



{{< fullwidth class="example-container" >}}
{{< example data="cases/ocrchat_en.json" hide=false next=true scroll=true >}}
{{< /fullwidth >}}


### Video Understanding
<table style="
    border-collapse: collapse;
    width: 100%;
    margin: 20px auto;
    border: none;
    font-size: 14.4px;
">
    <tr>
        <td style="
            padding: 10px;
            text-align: right;
            vertical-align: top;
            color: #777;
            border: none;
            white-space: nowrap;
        ">Users</td>
        <td style="
            padding: 10px;
            text-align: left;
            vertical-align: top;
            border: none;
        "><video src="https://gw.alipayobjects.com/v/huamei_aukff7/afts/video/tMqiS4N2yPAAAAAAgEAAAAgAeuUHAQFr" height="256px" controls></video><br>What is the little girl doing in the video?</td>
    </tr>
    <tr>
        <td style="
            padding: 10px;
            text-align: right;
            vertical-align: top;
            color: #777;
            border: none;
            white-space: nowrap;
        ">Ming-Lite-Omni</td>
        <td style="
            padding: 10px;
            text-align: left;
            vertical-align: top;
            border: none;
        ">The scene in the video takes place in a store, possibly a supermarket or large retail store, with shelves filled with various products including snacks and household items. The little girl in the video is pulling a display rack, apparently trying to move or play with it. Price tags are clearly visible, with one prominently displaying '18,690' in blue and white. The store is well-lit with fluorescent lights illuminating the entire area. If you need more detailed analysis or other assistance, please let me know!</td>
    </tr>
    <tr>
        <td style="
            padding: 10px;
            text-align: right;
            vertical-align: top;
            color: #777;
            border: none;
            white-space: nowrap;
        ">Ming-Lite-Omni V1.5</td>
        <td style="
            padding: 10px;
            text-align: left;
            vertical-align: top;
            border: none;
        ">The little girl is sleeping in a shopping cart.</td>
    </tr>
    <tr>
        <td style="
            padding: 10px;
            text-align: right;
            vertical-align: top;
            color: #777;
            border: none;
            white-space: nowrap;
        ">Users</td>
        <td style="
            padding: 10px;
            text-align: left;
            vertical-align: top;
            border: none;
        "><video src="https://gw.alipayobjects.com/v/huamei_aukff7/afts/video/NGX_T5E13IAAAAAAgIAAAAgAfoeUAQBr" height="192px" controls></video><br>Describe the protagonist's clothing in the video.</td>
    </tr>
    <tr>
        <td style="
            padding: 10px;
            text-align: right;
            vertical-align: top;
            color: #777;
            border: none;
            white-space: nowrap;
        ">Ming-Lite-Omni</td>
        <td style="
            padding: 10px;
            text-align: left;
            vertical-align: top;
            border: none;
        ">In the video, the protagonist is wearing a red top and carrying a bag with colorful patterns on their shoulder.</td>
    </tr>
    <tr>
        <td style="
            padding: 10px;
            text-align: right;
            vertical-align: top;
            color: #777;
            border: none;
            white-space: nowrap;
        ">Ming-Lite-Omni V1.5</td>
        <td style="
            padding: 10px;
            text-align: left;
            vertical-align: top;
            border: none;
        ">The protagonist in the video is wearing a red turtleneck sweater.</td>
    </tr>
    <tr>
        <td style="
            padding: 10px;
            text-align: right;
            vertical-align: top;
            color: #777;
            border: none;
            white-space: nowrap;
        ">Users</td>
        <td style="
            padding: 10px;
            text-align: left;
            vertical-align: top;
            border: none;
        "><video src="https://gw.alipayobjects.com/v/huamei_aukff7/afts/video/KD6LTqp9VTsAAAAAgMAAAAgAfoeUAQBr" height="192px" controls></video><br>Guess the time and location where this video was filmed.</td>
    </tr>
    <tr>
        <td style="
            padding: 10px;
            text-align: right;
            vertical-align: top;
            color: #777;
            border: none;
            white-space: nowrap;
        ">Ming-Lite-Omni</td>
        <td style="
            padding: 10px;
            text-align: left;
            vertical-align: top;
            border: none;
        ">Judging from the scenes in the video, this was likely filmed in New York's Central Park. The video shows iconic buildings and landscapes of Central Park, such as its lakes, bridges, and statues. Additionally, there are tourists walking, taking photos, and enjoying outdoor activities in the park, which further confirms that the filming location is New York's Central Park.</td>
    </tr>
    <tr>
        <td style="
            padding: 10px;
            text-align: right;
            vertical-align: top;
            color: #777;
            border: none;
            white-space: nowrap;
        ">Ming-Lite-Omni V1.5</td>
        <td style="
            padding: 10px;
            text-align: left;
            vertical-align: top;
            border: none;
        ">From the scenes in the video, the filming location appears to be New York's Central Park. The video showcases multiple attractions within the park, including lakes, bridges, statues, and fountains. The filming time seems to be during the daytime, with bright sunshine and clear weather, making it suitable for outdoor activities.</td>
    </tr>
</table>

<br>


## Get Started with Ming-lite-omni v1.5

The model and code for Ming-lite-omni v1.5 are now open-source, and we invite everyone to try it out, share feedback, and join the discussion. Looking ahead, we're excited to announce that a quantized and accelerated version is on the way. This future release will not only further enhance omni-modal performance but also make the model even more lightweight, all while strengthening its multimodal reasoning and generation capabilities. Stay tuned for more updates!

  - Github: https://github.com/inclusionAI/Ming
  - Hugging Face: https://huggingface.co/inclusionAI/Ming-Lite-Omni-1.5 
  - ModelScope: https://www.modelscope.cn/models/inclusionAI/Ming-Lite-Omni-1.5