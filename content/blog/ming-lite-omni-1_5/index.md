---
title: "Ming-Lite-Omni V1.5"
date: 2025-07-14T00:00:03+08:00
weight: 1
draft: true
math: true
show_reading_time: true
show_bread_crumbs: true
show_post_nav_links: false # the prev/next after the content
show_code_copy_buttons: true
show_word_count: true
---

# 【英文版待更新】

{{< button href="https://github.com/inclusionAI/Ming/tree/Ming-Lite-Omni-Preview/Ming-unify" label="GITHUB" external=true >}} 


## Ming-Lite-Omni V1.5 整体评测结果

---


## 复杂文档理解

---


## 图文及体验

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