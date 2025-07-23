---
title: "Ming-Lite-Omni V1.5 介绍"
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



# 概述
本次发布的 Ming-lite-omni V1.5 是对 Ming-lite-omni(<a href="https://github.com/inclusionAI/Ming/tree/v1.0">Github</a>)  全模态能力的一次全面升级， 在包括图文理解、文档理解、视频理解、语音理解和合成、图像生成和编辑等任务上均有明显提升。Ming-lite-omni V1.5 基于Ling-lite-1.5 构建，总参数20.3B, MoE部分激活参数为3B。与各领域同等规模的业界领先模型相比，在各模态基准测试中展现出极具竞争力的结果：

<div style="text-align:center;margin: auto; width: 70%;">
  <img src="https://mdn.alipayobjects.com/huamei_drbxn1/afts/img/vh2qSIuScFMAAAAAYuAAAAgADkliAQFr/original" alt="Image description" />
  <p style="font-size:14px; color:gray;">性能对比图</p>
</div>

# 关键能力升级
Ming-lite-omni v1.5 模型架构如下，和Ming-lite-omni v1版本的结构大体相同，区别在于为了增强图像编辑人物 和 场景一致性，升级Vision head 支持参考图特征输入。 


<div style="text-align:center">
  <img src="https://mdn.alipayobjects.com/huamei_aukff7/afts/img/A_LZTJcsc3EAAAAAXuAAAAgAeuUHAQFr/fmt.webp" alt="Image description" />
  <p style="font-size:14px; color:gray;">模型架构图</p>
</div>


模型能力上重点在全模态理解能力、精准的视觉编辑控制 以及 用户体验 三个方面进行优化升级。

## 增强的全模态理解能力
得益于数据质量优化，Ming-lite-omni v1.5 在视觉文本理解(包括图文理解、文档理解、视频理解)和语音理解等任务上均有明显提升，达到相同规模的业界领先水平。

**视觉文本理解**

| Task Type | Dataset | Qwen2.5-VL-7B | Ming-lite-omni | Ming-lite-omni v1.5 |
|---|---|---|---|---|
| OpenCompass图文 | AI2D | 84.36 | 83.1 | **84.91** |
| | HallusionBench | **55.77** | 55.0 | 54.59 |
| | MMBench_TEST_V11 | **82.75** | 80.8 | 80.73 |
| | MMMU | **56.56** | 56.3 | 54.33 |
| | MMStar | **65.27** | 64.7 | 65.07 |
| | MMVet | 71.61 | 71.3 | **73.99** |
| | MathVista | 68.10 | 71.6 | **72.00** |
| | OCRBench | 87.80 | 88.4 | **88.90** |
| | **Average** | 71.5 | 71.4 | **71.8** |
| 视频理解 | VideoMME(w/o subs) | 65.10 | 63.4 | **67.07** |
| | VideoMME(w/ subs) | 71.60 | 66.01 | **72.59** |
| | VideoMME(avg) | 68.35 | 67.7 | **69.83** |
| | MVBench | **69.60** | 67.7 | 69.43 |
| | LongVideoBench | 56.00 | 56.6 | **59.54** |
| | OvOBench | 51.10 | 48.48 | **52.17** |
| | **Average** | 61.26 | 58.89 | **62.74** |
| 文档理解 | ChartQA_test | 87.24 | 85.1 | **88.84** |
| | DocVQA_test | **95.57** | 93 | 93.68 |
| | TextVQA_val | **85.06** | 82.8 | 82.27 |
| | OCRBench | 87.8 | 88.4 | **88.9** |
| | **Average** | **88.91** | 87.32 | 88.42 |

**语音理解**
| Model | Average(Open-ended QA) | AlpacaEval | CommonEval | SD-QA | MMSU | OpenBookQA | IFEval | AdvBench |
|---|---|---|---|---|---|---|---|---|
| Ming-lite-omni v1.5 | 4.474 | 4.648 | 4.3 | 61.16 | 45.77 | 65.934 | 55.599 | 98.076 |
| Ming-lite-omni | 4.34 | 4.63 | 4.06 | 58.84 | 47.53 | 61.98 | 58.36 | 99.04 |
| MiniCPM-o | 4.285 | 4.42 | 4.15 | 50.72 | 54.78 | 78.02 | 49.25 | 97.69 |
| Kimi-Audio | 4.215 | 4.46 | 3.97 | 63.12 | 62.17 | 83.52 | 61.10 | 100.00 |
| Qwen2.5-Omni | 4.21 | 4.49 | 3.93 | 55.71 | 61.32 | 81.10 | 52.87 | 99.42 |
| GLM-4-Voice | 3.77 | 4.06 | 3.48 | 43.31 | 40.11 | 52.97 | 24.91 | 88.08 |

## 精准的视觉编辑控制

Ming-lite-omni v1.5 针对图像编辑时的人物ID及场景ID一致性问题采用以下优化策略: 
1. 引入ID和场景一致性损失，通过增大目标图编辑区域的权重 和 参考图非编辑区域的参考强度， 同时降低参考图编辑区域的参考强度 以增强图像编辑一致性
2. 引入生成式检测分割任务增强感知能力。通过支持生成式分割和关键点检测，提升模型对画面细节和空间关系的理解，增强编辑和生成过程的结构可控性，显著提高评测指标中与位置、结构、数量相关的得分。
3. 引入多任务协同学习策略。通过联合训练链路实现生成与编辑的相互促进，将分割任务转化为彩色上色编辑任务，显著提升分割指标和图像局部编辑的精度与可控性，使编辑区域边缘更光滑。
基于以上优化，Ming-lite-omni v1.5在图像编辑能力明显提升，Gen-eval上达到0.87。

| Gen-eval | 1-Obj | 2-Obj | Counting | Colors | Position | ColorAttr | Avg. |
|---|---|---|---|---|---|---|---|
| Ming-lite-omni | 0.99 | 0.77 | 0.68 | 0.78 | 0.46 | 0.42 | 0.64 |
| Ming-lite-omni v1.5 | 0.99 | 0.93 | 0.86 | 0.87 | 0.90 | 0.66 | 0.87 |

## 优化的用户体验
得益于高质量的对齐偏好数据构建， Ming-lite-omni v1.5 在图文问答的内容准确性、相关性、格式美观性以及表述流畅性方面相比领先模型展现出一定优势， Ming-lite-omni v1.5在内部对抗评测集上相比Ming-lite-omni v1 胜和率为 87.07%, 使用体验得到了明显优化。

| 体验评测维度 | Qwen2.5-VL-7B | Ming-Omni-Lite V1.5 |
|---|---|---|
| 相关性 | 4.308 | 4.5 |
| 流畅性 | 4.765 | 4.91 |
| 内容丰富性 | 3.828 | 3.69 |
| 格式合理性 | 4.727 | 4.8 |
| 正确性 | 3.741 | 3.92 |
| **均分** | 4.274 | **4.365** |



## Ming-lite-omni v1.5能力展示
### 可控图像编辑和生成
Ming-lite-omni v1.5 重点优化了图像编辑的 场景一致性（Scene Consistency）、ID 一致性（Character / Style Consistency），在人物图像编辑时，在场景和人物ID 保持上展现出明显的优势，同时拓展了对生成式分割、深度预测、目标检测 以及 边缘轮廓生成 等感知任务的支持。

<div style="text-align:center">
<img src="https://mdn.alipayobjects.com/huamei_aukff7/afts/img/e-mDS5UyUogAAAAAgCAAAAgAeuUHAQFr/fmt.webp" alt="Image description" />
<video src="https://gw.alipayobjects.com/v/huamei_aukff7/afts/video/UoqbRYQnZYEAAAAAgCAAAAgAeuUHAQFr" controls></video>
</div>

{{< fullwidth class="example-container" >}}
{{< example data="cases/seg.json" hide=false next=true scroll=true >}}
{{< /fullwidth >}}

**深度及边缘检测**

| 原图 | 生成的深度图 | 生成的检测框 | 生成的边缘轮廓 |
| :---: | :---: | :---: | :---: |
| ![](https://gcore.jsdelivr.net/gh/biao-gong/static@main/gen/1752466889319-bd19acce-c07d-4664-9890-41e4dff1ba8d.webp) | ![](https://gcore.jsdelivr.net/gh/biao-gong/static@main/gen/1752466903529-996bcd35-a9a0-484b-98bf-2f2468f4df42.webp) | ![](https://gcore.jsdelivr.net/gh/biao-gong/static@main/gen/1752466895795-1955ead5-6d94-4142-8d7b-e265352d2bcb.webp) | ![](https://gcore.jsdelivr.net/gh/biao-gong/static@main/gen/1752467020122-ad8b436c-bb33-4ef0-85b8-cf45ae8c9be1.webp) |


### 音视频交互理解

<video src="https://gw.alipayobjects.com/v/huamei_drbxn1/afts/video/TptZRJDixVUAAAAAhqAAAAgADkliAQFr" controls></video>



### 体验对齐优化

{{< fullwidth class="example-container" >}}
{{< example data="cases/chat.json" hide=false next=true scroll=true >}}
{{< /fullwidth >}}




## 开始使用 Ming-lite-omni v1.5

<!-- Ming-lite-omni v1.5的模型和代码已开源，欢迎大家试用、反馈和交流。后续我们会持续优化Ming-lite-omni，持续提升在全模态的效果同时，让Ming-lite-omni更加轻量化，同时强化Ming-lite-omni的多模推理能力和生成能力。 -->

Ming-lite-omni v1.5的模型和代码已开源，诚邀大家试用、反馈和交流。值得期待的是，我们即将发布量化加速版本的Ming-lite-omni，该版本将不仅进一步优化全模态效果，还使Ming-lite-omni更加轻量化，同时强化多模推理和生成能力。欢迎持续关注！
  - Github: https://github.com/inclusionAI/Ming
  - Hugging Face: https://huggingface.co/inclusionAI/Ming-Lite-Omni-1.5 
  - ModelScope: https://www.modelscope.cn/models/inclusionAI/Ming-Lite-Omni-1.5
