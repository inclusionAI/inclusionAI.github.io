---
title: "Ming-Lite-Omni V1.5 介绍"
date: 2025-07-15T00:00:03+08:00
weight: 1
math: true
draft: true
show_reading_time: true
show_bread_crumbs: true
show_post_nav_links: false # the prev/next after the content
show_code_copy_buttons: true
show_word_count: true
---

{{< button href="https://github.com/inclusionAI/Ming/tree/Ming-Lite-Omni-Preview/Ming-unify" label="GITHUB" external=true >}} 



# 前言

本次发布的 Ming-Lite-Omni V1.5 是对初版 Ming-Lite-Omni 的一次全面升级。在保留既有优势的前提下，我们扩展了更多的多模态任务，并对所有任务的性能表现做了大幅度的优化，实现了诸如更强的复杂文档理解、基于 MRoPE 的时空感知位置编码、生成式图像分割、更棒的图像生成效果和ID保持能力等。所有这一切都来自 **一个** 多模态大模型，凸显了多模态统一的魅力。下面我们对各部分的能力做详细介绍，感谢大家的关注，欢迎广泛尝试并沟通交流！

---


# 复杂文档理解

我们在多种文字识别、图表分析和文档理解基准上对Ming-Omni-Lite模型进行了系统评估。如下表所示：
<!DOCTYPE html>
<html lang="zh-CN">
<table class="optimized-table">
    <thead>
        <tr>
            <th>任务类型</th>
            <th>评测基准</th>
            <th>Qwen2.5-VL-7B</th>
            <th>InternVL3-8B</th>
            <th>Ming-Omni-Lite</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="5" class="merged-cell">OCR理解</td>
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
            <td>OCR解析</td>
            <td>OmniDocBench↓ en/zh</td>
            <td>30.8/39.8</td>
            <td>--</td>
            <td>34.9/34.9</td>
        </tr>
        <tr>
            <td>OCR综合能力</td>
            <td>OCRBenchV2 en/zh</td>
            <td>56.3/57.2</td>
            <td>--</td>
            <td>52.1/55.2</td>
        </tr>
    </tbody>
</table>

</body>
</html>

在OCR理解任务上，Ming-Omni-Lite平均得分88.42，其综合表现与当前领先的70亿参数多模态语言模型Qwen2.5VL-7B-Instruct（88.91）处于同一水平。特别是在具有挑战性的OCRBench基准（聚焦文本视觉理解任务）以及需深度图表视觉分析与逻辑推理的ChartQA任务中，Ming-Omni-Lite分别取得突破性进展，相较Qwen2.5-VL-7B等主流竞品模型实现显著性能跃升。这一优势源于其创新的训练策略——通过引入"思维链"（Chain-of-Thought）范式，使模型能够分步骤构建结构化推理路径，从而有效提升复杂问题的解决能力。
在面向多场景应用且覆盖手写体、表格、图表及数学公式等复杂版式文档的多模态OCR解析基准OmniDocBench中，Ming-Omni-Lite通过多源异构训练数据集的构建，在中英文双语环境下均展现出卓越的性能表现（英文34.9/中文34.9）。

---


## 图文及体验

### **图文**

新版本Ming-lite-omni 1.5融合了3D位置编码，大幅提升对图像结构与动态信息的感知能力，配合更优的训练方法及全面升级的高质量数据，v1.5在通用图片理解、图像目标识别、垂类场景识别等多个关键任务上实现显著性能跃升，为广泛视觉应用提供更强大的基础能力。下面是本次版本迭代的改进清单及评测结果：
1. MRoPE 时空感知位置编码：引入了MRoPE，通过时间、高度、宽度三维分块位置编码，赋予模型时空感知能力，实现高效跨模态联合建模，提升对视频、复杂图像场景的理解精度。
2. 高效全参数训练策略：优化学习率与多模态数据配比，将理解阶段需分步冻结/解冻 LLM 的预训练流程，升级为高效全参数训练，缩短周期/降低消耗，保持性能无损。
3. 全方位数据升级：
  ○ 预训练阶段： 扩展知识广度与数据质量：新增文本实体结构化数据补全图谱盲区，生成任务引入原始描述约束抑制幻觉，扩充高质量垂类语料深化领域理解。
  ○ 指令微调阶段： 强化核心任务与高阶理解：提升细粒度视觉感知（目标计数/颜色/场景识别）精度，深化垂类识别（动植物/车辆/食材等）深度，优化跨学科复杂图文推理能力。

| 任务类型       | 评测基准          | Qwen2.5-VL-7B | Ming-Omni-Lite |
|---------------|-------------------|---------------|----------------|
| **通用图文**   | AI2D              | 84.36         | 84.91          |
|               | HallusionBench    | 55.77         | 54.59          |
|               | MMBench_TEST_V11  | 82.75         | 80.73          |
|               | MMMU              | 56.56         | 54.33          |
|               | MMStar            | 65.27         | 65.07          |
|               | MMVet             | 71.61         | 73.99          |
|               | MathVista         | 68.10         | 72.00          |
|               | OCRBench          | 87.80         | 88.90          |
| **目标检测**   | RefCOCO_val       | 90.00         | 91.40          |
|               | RefCOCO+_val      | 84.20         | 86.30          |
| **自建评测集** | 通识              | 92.42         | 92.53          |
|               | 垂类              | 47.79         | 54.27          |

### **体验**

得益于高质量的对齐偏好数据构建以及精细的DPO对齐训练超参数搜索/数据采样策略配置，与同等推理参数规模的开源模型相比，我们的模型在内部标注构建的人类体验偏好数据榜单中达到SOTA、均分超过Qwen2.5VL-7B-Instruct +0.09/5pt。我们的模型在图文问答的内容准确性（低幻觉率）、相关性、格式美观性以及表述流畅性方面有较大优势，即模型在问答响应过程中会给用户带来更佳的综合体验。

| 评测基准 | 评测维度          | Qwen2.5-VL-7B | Ming-Omni-Lite |
|------|---------------|---------------|----------------|
| 体验   | 均分            | 4.274         | 4.365          |
|      | 自建体验评测集_相关性   | 4.308         | 4.5            |
|      | 自建体验评测集_流畅性   | 4.765         | 4.91           |
|      | 自建体验评测集_内容丰富性 | 3.828         | 3.69           |
|      | 自建体验评测集_格式合理性 | 4.727         | 4.8            |
|      | 自建体验评测集_正确性   | 3.741         | 3.92           |

---

## 定义视频理解新标杆
在追求通用人工智能（AGI）的道路上，多模态大语言模型（MLLM）对视频内容的理解能力至关重要。现实世界的信息是动态、连续的，视频承载着远超静态图像的丰富时空语义。 **Ming-Omni-Lite** 在多项核心视频理解基准测试中取得了突破性进展。

### 性能

我们选取了当前最具代表性和挑战性的视频理解基准，将 Ming-Omni-Lite 与业界顶尖的同体量模型（Qwen2.5-VL-7B, Qwen2.5-Omni-7B, InternVL3-8B）进行了全面对比。结果评测结果展示了 Ming-Omni-Lite 的卓越性能：

| 评测基准                 | Qwen2.5-VL-7B | Qwen2.5-Omni-7B | InternVL3-8B | **Ming-Omni-Lite** |
| :----------------------- | :------------: | :--------------: | :----------: | :----------------: |
| **VideoMME(w/o subs)** |     65.10      |      64.30       |    66.30     |     **67.07**      |
| **VideoMME(w/ subs)**  |     71.60      |      72.40       |    68.90     |     **72.59**      |
| **VideoMME(avg)**      |     68.35      |      68.35       |    67.60     |     **69.83**      |
| **MVBench**            |     69.60      |      70.30       |  **75.40**   |       69.43        |
| **LongVideoBench**     |     56.00      |      54.82       |    58.80     |     **59.54**      |
| **OvOBench**           |     51.10      |      50.46       |    51.91     |     **52.17**      |

### 技术背后

Ming-Omni-Lite 在视频理解，尤其是长视频理解上的突破，源于我们在模型架构和训练策略上的多项创新：

*   **高效的时空建模器：** 加入3D RoPE，能更有效地捕捉视频帧内（空间）和帧间（时间）的依赖关系，提取关键的动态信息。
*   **高质量、多样化的视频-文本对齐数据：** 构建了大规模、涵盖丰富场景和任务的长/短视频-文本对数据集以及TPO（task-perference optimization）数据，包括时间检索以及视频跟踪。我们进行了精细清洗，确保模型学习到精准的对齐能力。
*   **创新的训练目标与课程学习：** 结合了视频特有的预训练和指令微调目标，并采用从短到长的课程学习策略，逐步提升模型处理长视频的复杂度。

### 迈向更智能的视频交互

Ming-Omni-Lite 在和同尺寸SOTA模型的视频理解基准评测上保持领先，它证明了 Ming-Omni-Lite 具备处理**复杂、长时间、信息密集**视频内容的强大能力，为视频摘要、长视频问答、智能教学、视频内容审核、人机交互等广泛应用场景奠定了坚实的基础。我们将持续投入研发，进一步释放 Ming-Omni-Lite 在视频乃至多模态领域的潜力，致力于打造能够真正理解、推理和与现实世界交互的智能体。


---


## 语音理解和生成

在语音理解方面，我们在训练中引入了丰富且多样的语音数据，并且将领域、主题、语种（包括方言）等信息引入到语音理解任务的指令文本中，增强模型的理解表现。我们的模型在语音理解方面支持中英文，粤语，四川话，上海话，闽南语等方言，在开源的中英文数据集上达到 **SOTA** 水平。


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
    <th class="tg-19xi">输入音频</th>
    <th class="tg-19xi">方言</th>
    <th class="tg-19xi">识别结果</th>
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

得益于模型卓越的语音理解能力，我们的模型在语音对话评估集上也取得优异的效果。

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
    <th class="tg-19xi">输入音频</th>
    <th class="tg-19xi">输出音频</th>
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

语音生成方面，Ming-lite-omni 集成了先进的音频解码器，该解码器接受来自LLM的输出隐藏状态，这使得模型能够处理上下文感知的多模态对话和标准的文本转语音（TTS）转换，从而生成自然流畅的语音 。为了提高韵律性能和实时生成能力，将离散的Audio codec token进行BPE编码，使得音频帧率降低了35%。


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
    <th class="tg-19xi">参考音频</th>
    <th class="tg-19xi">输入文本</th>
    <th class="tg-19xi">输出音频</th>
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


## 突破图像生成新极限

相较于早先发布的 Ming-Lite-Uni 以及 Ming-Omni，在此版本中，我们进一步提升了Ming对生成图像的 **场景一致性**（Scene Consistency）、**ID 一致性**（Character / Style Consistency）、以及 **多感知扩展**（Segmentation, Keypoints, Depth, …），让Ming从一个具备图像生成和图像编辑能力的多模态大模型（MLLM），变成一个能够处理更多图像生成任务以及效果更好的完整MLLM。下面是我们最近一段时间的工作进展的报告，欢迎大家交流讨论。

![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752039359523-ef57c4ba-3f99-4a9a-9515-5728b6c46c1c.webp)

| **GenEval指标** | **Overall score** | **Single Ojbect** | **Two Objects** | **Counting** | **Color** | **Position** | **Color Attr** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Ours | 0.86 | 100.00% | 96.72% | 76.56% | 89.89% | 89.75% | 68.69% |

### 模型结构回顾及改进
| **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">子模块</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">对应技术点</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">作用</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">关键点</font>** |
| --- | --- | --- | --- |
| **<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">跨模态桥接方式</font>** | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Channel concat / Token concat / Blend</font> | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">- </font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Channel concat</font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">：参数少、显存低，但语义对齐弱   </font><font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">- </font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Token concat</font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">：保语义结构，适合大分辨率   </font><font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">- </font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Blend</font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">：编辑/重绘场景更鲁棒</font> | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">根据任务需求选择桥接方式。目前采用Token Concat方案</font> |
| **<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">双分支表示解耦</font>** | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">解耦参考图图像patch编码和refiner参数</font> | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">- 提升参考图的独立控制参数容量，起到部分解耦的作用</font> | 双 patchfy 模块与双分支额外 refiner，提升了模型编辑与分割性能 |


+ 双分支解耦指在将图像送入 DiT 的 transformer 之前，使用不同的网络权重将参考图像与噪声图像进行 patchfy，这样能够有效降低参考图像信息对于编辑时语义遵循的影响，refiner 是在 patchfy 之后额外的两层轻量级 transformer，能够进一步增强这一效果，在推理分割上的性能评估表明了新增模块的有效性
    - 推理分割考验模型对于语义的正确理解，需要模型根据复杂的指令确定要分割的目标
    - 实验结果如下方表格所示，可以看到解耦的patchfy显著增强了推理分割的指标，增加 refiner 模块后能够进一步提升性能
+ GEdit 子集：["background_change", "color_alter", "material_alter", "motion_change"]

| Mode ID | double-patchfy | add-refiner | refcoc 分割指标 | GEdit(subset-full) |
| --- | --- | --- | --- | --- |
| 0 | ❌ | ❌ | 62.8 | 6.129 |
| 1 | ✅ | ❌ | 64.2 | 6.391 |
| 2 | ✅ | ✅ | 64.5 | 6.306 |

### 条件控制与引导策略
| **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">子模块</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">对应技术点</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">作用</font>** | **<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">关键点</font>** |
| --- | --- | --- | --- |
| **<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">多条件的CFG控制策略</font>** | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">语义CFG vs 图像CFG（Ref-Guided）</font> | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">多条件的 Classifier-free Guidance 策略：语义二分差分+图像三分差分提升ID一致性</font> | 当纯语义控制时，编辑后的图像遵循了指令，但完全丧失与原图的一致性；图像分支指导强度较大时编辑结果几乎与原图一致 |
| **<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">ID & Scene Consistency Loss</font>** | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">Weight mask Loss + Scene Consistency Loss</font> | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">增大目标图编辑区域的权重，同时增加参考图非编辑区域的强约束和编辑区域的弱约束</font> | <font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0);">调整λ平衡身份保持下的编辑效果与场景一致性，避免过拟合</font> |



+ 与 Qwen-VLo 对比

| prompt | ours | Qwen-VLo |
| --- | --- | --- |
| <font style="color:rgb(44, 44, 54);">Make the person in the image smile slightly without altering the original structure</font><br/>![](https://github.com/Biao-Gong/static/blob/main/gen/1752147843685-5b097f6b-b2aa-4baf-abe4-f1abd89265e8.png?raw=true) | ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752147837185-62077f0c-e7ec-415f-bd34-1c8453253949.webp) | ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752147953713-703c31c8-2fd1-4c2d-b4bc-6e0f52e70017.webp) |





### 感知能力扩展

+ **生成式分割** 

  相比于生成式图像编辑任务，分割任务的预测mask和原图之间存在较少的细节一致性，因此在token concat方案下难以较快的学习到原图和分割mask 之间的一致性关系。因此，我们将图像的分割目标建模成彩色分割图像，即mask和图像的融合形式，从而使得预测目标和原图之间存在较多一致的细节，因此能够更好的学习到分割图和原图之间的一致关系。在推理时，将预测图像和原图做diff并进行噪声过滤获取最终的预测mask。

| 输入图像 | 推理分割 | 语义分割 | 全景分割 |
| --- | --- | --- | --- |
| ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752115158022-12254e69-e8c0-43fb-a725-f6730cda22d8.webp) | ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752115142775-3975827c-4110-445b-af53-e20201d1043a.webp)<br/>prompt: Given the following instructions: little girl, pink, your monitors colors off friend p pink shirt girl; please perform referring segmentation on this image. | ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752116495974-7708ba3a-5909-46df-82f5-a1bfa1519d4d.webp)<br/>prompt: Please segment different **classes** in this image | ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752115151406-c4780a97-5f1c-46cd-9a45-d4ef600d0897.webp)<br/>prompt: Please segment different **instances** in this image. |


+ **边缘轮廓图生成**

| 原图 | 深度图 | 检测框 | 边缘轮廓 |
| --- | --- | --- | --- |
| ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752466889319-bd19acce-c07d-4664-9890-41e4dff1ba8d.webp) | ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752466903529-996bcd35-a9a0-484b-98bf-2f2468f4df42.webp) | ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752466895795-1955ead5-6d94-4142-8d7b-e265352d2bcb.webp) | ![](https://raw.githubusercontent.com/Biao-Gong/static/refs/heads/main/gen/1752467020122-ad8b436c-bb33-4ef0-85b8-cf45ae8c9be1.webp) |

---

## 数据优化

**文档解析语料**：为了提升基模在深度文本视觉分析与逻辑推理方面的性能，我们在训练过程中引入"思维链"（Chain-of-Thought）范式。具体实施策略如下：

首先，在训练体系中集成开源数据集ChartQA-PoT（Program-of-Thought），重点提升模型的图表数值计算能力。该方法继承了思维链的递进式推理理念，但突破性地采用可执行Python代码作为中间推理载体。其次，针对传统文本相关问答数据集中普遍存在的"答案直推"模式局限，我们创新性利用强化学习模型对原始训练样本进行多步推理轨迹及最终答案生成；筛选通过形式化验证的"推理步骤-最终答案"对构建新型训练集。该方法显著提升了模型对复杂逻辑任务的适应性。

**人类偏好语料**：多模态大模型的用户真实交互体验优化通过利用人类体验偏好数据对齐训练来提升性能。我们的体验偏好指令集主要由三个来源构成：应用端的真实用户对话数据、高质量开源指令数据集采样以及网站的搜索查询数据。对于网站的搜索查询数据，我们首先用纯文本查询通过搜索引擎检索相关的网络图像；随后，我们利用现有的MLLM改写生成多样的专业问题及其对应的答案。我们对上述的多种用户指令数据源生成出高质量的正样本以及负样本数据偏好对，并结合MLLM和专业人工标注员对这些问答对的质量进行标注校验，构建了覆盖9个主要领域的41个子类别人类体验偏好语料库。

**视频理解语料**：高质量的视频数据提供了更为丰富且精准的语义信息，能够有效提升模型对复杂视频场景的理解深度与广度。我们构建的视频语料库主要来源于两个方面：首先，我们深度挖掘并整合了现有开源视觉基础任务数据集，如采用目标跟踪数据集GOT-10K增强模型的物体追踪能力，利用时序检索数据集DiDemo提升模型的事件感知能力；其次，我们组织专业标注团队精心构建了一批高难度的视频问答样本对，用于训练模型的复杂推理能力。

**百科语料**：百科数据扩充了多模态大模型的可识别实体范围，为大模型注入专家级的细粒度实体识别能力。在这个版本中，我们共包含三大类共十小类的实体集合，分别为自然百科实体集（植物，动物）；人文百科实体集（名人，动漫角色，地标，LOGO，和艺术品）；和日常生活实体集（食材，菜品，汽车）。为了构建一个高质量的专家级细粒度百科实体数据集，我们首先从专业的学术网站或垂类站点上大规模的收集了一批实体集合，之后我们使用这些实体集合组成检索词，在公开的搜索引擎上获取这些实体数据。接着，我们设计了一个高效的逐级递进的实体数据清洗链路，包含CLIP图文相似度过滤，大模型是否可用二分判断过滤，和人工纠正过滤的流程。

**GUI语料**：GUI（图形用户界面）数据使模型在Android环境下具有基本的GUI导航能力。我们的GUI语料库主要由四个公共数据集构建：AITW， guiccourse， AndroidControl和AMEX。此外，我们利用可用的MLLM来优化类人GUI交互操作中每个步骤的推理过程，随后由另一个MLLM审查以提高数据质量。思维过程约束模型观察当前状态，反思之前的动作，在操作之前仔细考虑。为了更好地感知当前情况，我们加入了历史记忆，由前序的动作组成。

**图像生产与编辑语料**：我们的图像生成语料库主要来自两个来源：一是从公开的图像生成的高质量图像数据集（例如，text-to-image-2M、JourneyDB、BLip3o、Uniworld dataset、InstructPix2Pix-clip-filtered、SEED-Data-Edit-part2/3、Ultraedit等）；二是从 StyleBooth 和 WikiArt 中采样的图像风格迁移数据。另外我们构造了生成图像数据的管线, 生成了部分文生图和编辑数据。

**感知推理语料**：感知推理数据能够提升模型的综合理解能力和细粒度感知能力。在这个版本，我们针对目标计数、颜色识别、场景主题识别等感知类细分任务，从Object365、RefCOCO等开源数据集中，根据检测框数量、位置关系和物体类别数量等信息，筛选出一批潜在难样本。随后，利用VLM进行指定任务的问答合成，并通过多模型打分和人工过滤纠正的方式获得一批高质量样本。此外，为提升模型在感知任务上的推理能力，我们将上述合成数据改写为CoT形式，通过生成中间推理步骤，帮助模型分解复杂问题，提升综合感知能力。