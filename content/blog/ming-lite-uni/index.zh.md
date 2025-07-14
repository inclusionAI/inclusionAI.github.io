---
title: "Ming-Lite-Uni：自然多模态交互统一架构的进展"
date: 2025-05-07T00:00:03+08:00
weight: 1
math: true
show_reading_time: true
show_bread_crumbs: true
show_post_nav_links: false
show_code_copy_buttons: true
show_word_count: true
---

<p align="left">
        {{< button href="https://github.com/inclusionAI/Ming/tree/Ming-Lite-Omni-Preview/Ming-unify" label="GITHUB" external=true >}} 📑 <a href="https://arxiv.org/abs/2505.02471">Technical Report</a>｜🤗 <a href="https://huggingface.co/inclusionAI/Ming-Lite-Uni">Hugging Face</a>｜🤖 <a href="https://modelscope.cn/models/inclusionAI/Ming-Lite-Uni">ModelScope</a>
</p>

## 简介

`Ming-Lite-Uni` 是一个开源的多模态框架，包含一个全新设计的统一视觉生成器，以及一个原生多模态自回归模型，用于整合视觉与语言能力。

本项目提供了集成 MetaQueries 与 M2-omni 框架的开源实现，并引入了创新性的**多尺度可学习Token机制**与**多尺度表示对齐策略**。Ming-Lite-Uni 利用固定的MLLM与可训练的扩散模型，使原生多模态AR模型不仅支持文本生成图像（text-to-image），还支持基于指令的图像编辑，从而扩展其功能，不再局限于视觉理解。实验结果表明，Ming-Lite-Uni 具备强大的性能表现，并在交互体验上展现出高度流畅性。目前该项目处于alpha阶段，将持续优化中。

感谢大家的支持与关注！我们正在稳步推进项目，并取得了良好进展，更多更新即将到来，敬请期待！

## 📌 更新日志

* [2025.05.03] 🔥 我们的 [技术报告](https://arxiv.org/abs/2505.02471) 已在 arXiv 发布
* [2025.05.03] 🔥 [Ming-Lite-Uni](https://github.com/inclusionAI/Ming) 首个版本正式开源

## 为什么重要？

Ming-Lite-Uni 的统一架构克服了传统方法的根本性局限：

| 传统方法                                                 | Ming-Lite-Uni 的优势                                                           |
| -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **模块化流程**<br>（如 CLIP/SigLIP + 扩散模型）           | **端到端统一模型**<br>理解与生成无缝融合                                        |
| **离散Token自回归**<br>（视觉定位能力有限）              | **连续Token空间**<br>原生支持细粒度视觉概念                                    |
| **固定分辨率处理**<br>（上采样会产生伪影）                | **多尺度自适应**<br>各分辨率下均保持一致的画质                                  |
| **编辑流程分离**<br>（需要手动对齐）                     | **对话驱动控制**<br>自然语言指导像素级编辑                                      |
| **理解瓶颈**<br>（视觉语义错位）                         | **联合表示学习**<br>理解与生成能力相互增强                                      |

## 核心增强点

- **统一的视觉理解与生成架构**：Ming-Lite-Uni 在 OpenCompass 榜单中理解得分达 69.7，优于 DeepSeek-VL2 (66.4)；同时在 GenEval 图像生成基准上取得 0.62 的得分，超过 SDXL (0.55)。
- **多尺度可学习Token**：引入4×/8×/16×多尺度的分层Token，分别捕捉图像的整体布局（低分辨率）、物体结构（中分辨率）和细节纹理（高分辨率），GenEval得分提升3.5%。
- **多尺度表示对齐**：设计了**尺度一致性损失**，通过原生分辨率优化确保各层级表示与最终结果的一致性，图像重建质量提升超过2dB PSNR，GenEval得分提升1.5%。
- **具备AGI能力的系统**：支持“生成城堡 → 添加日落 → 调整视角”等链式指令，响应时间<1秒（RTX 4090测试）。系统支持指令驱动的生成与编辑，并已对齐 GPT-4o（2025年3月行业标杆）。

## 赋能多模态交互

**Ming-Lite-Uni** 是统一的多模态理解模型，突破传统NLP与视觉理解范畴，进一步支持图像生成、图像编辑与风格迁移等交互式生成任务。

<!-- ![Ming_unify_usecases](figures/Ming_unify_usecases.png) -->

## 模型结构

**Ming-Lite-Uni** 是面向图像理解与高保真图像生成的统一多模态模型。其将图像表示压缩为连续视觉Token，并与文本Token一同输入自回归Transformer中进行处理；生成部分则由外部训练的扩散模型（SANA）执行，输入为Transformer生成的Token。

<img width="1034" alt="结构图" src="https://github.com/user-attachments/assets/927e090e-7cda-4f32-81de-774466973077" />

## Benchmark 评测
我们使用公开基准对 Ming-Lite-Uni 的多模态理解与文本生成图像能力进行了分别的定量评估。对于多模态理解，我们与传统的图文输入文本输出模型，以及具备视觉生成能力的最新模型进行了对比。对于多模态生成，我们在 GenEval 基准上评估了文本生成图像的表现。详细信息请参考我们的技术报告。

**Multimodal Understanding**

| Type              | Model                    | Avg. | MMB  | MMS  | MMMU | MathV | Hall | AI2D | MM-Vet |
| ----------------- | ------------------------ | ---- | ---- | ---- | ---- | ----- | ---- | ---- | ------ |
| **Und. Only**     | LLaVA-72B                | 68.0 | 84.5 | 65.8 | 56.6 | 68.4  | 47.9 | 86.2 | 60.6   |
|                   | Qwen2.5-VL-7B            | 76.2 | 87.8 | 71.1 | 67.9 | 70.8  | 58.8 | 88.2 | 76.7   |
|                   | Emu3-Chat                | -    | 58.5 | -    | 31.6 | -     | -    | -    | 37.2   |
|                   | InternVL2.5-78B          | 75.2 | 87.5 | 69.5 | 70   | 71.4  | 57.4 | 89.1 | 71.8   |
|                   | DeepSeek-VL2             | 66.4 | 81.2 | 61.0 | 50.7 | 59.4  | 51.5 | 84.5 | 60.0   |
|                   | GPT-4o-20241120 (closed) | 72.0 | 84.3 | 65.1 | 70.7 | 59.9  | 56.2 | 84.9 | 74.5   |
|                   | Step-1o (closed)         | 77.7 | 87.3 | 69.3 | 69.9 | 74.7  | 55.8 | 89.1 | 82.8   |
| **Und. and Gen.** | TokenFlow-XL             | -    | 68.9 | -    | 38.7 | -     | -    | -    | 40.7   |
|                   | Janus-Pro-7B             | -    | 79.2 | -    | 41.0 | -     | -    | -    | 50.0   |
|                   | **Ours (Ming-Lite-Uni)** | 69.7 | 80.7 | 60.5 | 51.2 | 68.3  | 51.8 | 84.5 | 72.3   |


**Image Generation**

| Type              | Method                   | Single Obj. | Two Obj. | Counting | Colors | Position | Color Attri. | Overall |
| ----------------- | ------------------------ | ----------- | -------- | -------- | ------ | -------- | ------------ | ------- |
| **Gen. Only**     | LlamaGen                 | 0.71        | 0.34     | 0.21     | 0.58   | 0.07     | 0.04         | 0.32    |
|                   | SDv2.1                   | 0.98        | 0.51     | 0.44     | 0.85   | 0.07     | 0.17         | 0.50    |
|                   | Emu3-Gen                 | 0.98        | 0.71     | 0.34     | 0.81   | 0.17     | 0.21         | 0.54    |
|                   | SDXL                     | 0.98        | 0.74     | 0.39     | 0.85   | 0.15     | 0.23         | 0.55    |
|                   | DALL-E 3                 | 0.96        | 0.87     | 0.47     | 0.83   | 0.43     | 0.45         | 0.67    |
|                   | SD3-Medium               | 0.99        | 0.94     | 0.72     | 0.89   | 0.33     | 0.60         | 0.74    |
| **Und. and Gen.** | Show-o                   | 0.95        | 0.52     | 0.49     | 0.82   | 0.11     | 0.28         | 0.53    |
|                   | TokenFlow-XL             | 0.95        | 0.60     | 0.41     | 0.81   | 0.16     | 0.24         | 0.55    |
|                   | Janus-Pro-1B             | 0.98        | 0.82     | 0.51     | 0.89   | 0.65     | 0.56         | 0.73    |
|                   | **Ours (Ming-Lite-Uni)** | 0.99        | 0.76     | 0.53     | 0.87   | 0.26     | 0.30         | 0.62    |

## Example Usage
#### System Requirements
- **Python:** >= 3.8
- **PyTorch:** >= 2.4.1+cu12.2 (CUDA 12.2 compatible)
- **flash-attn:** >= 2.6.3
#### Installation

We recommend installing the following versions to set up your environment using pip:

```
pip install -r requirements.txt
```

- ### Usage Guided
Below is an example of how to load and use the model:
```python
import torch
import os
from Ming_Uni.MingUniInference import Ming_Uni_Inference
from Ming_Uni.process import MyProcessor
device = torch.cuda.current_device()
device = torch.device(device)

model_path='../Ming-Lite-Uni/'
model = Ming_Uni_Inference(model_path)
model.to(torch.bfloat16)
model.to(device)
model.eval()

llm_model=os.path.join(model_path, 'qwen2_5_llm')
my_proc=MyProcessor(llm_model)

image_file = "tests/cake.jpg"
prompt = "add a candle on top of the cake"
inputs = my_proc.process(image_file=image_file, prompt=prompt, device=device)

result = model.image_gen_generate(inputs, steps=30, seed=42, cfg=5.0, height=512, width=512)[1]
result.save("result.png")
```
For more advanced usage, such as fine-tuning or generating images, refer to the documentation.

## 致谢

该项目目前处于早期阶段。尽管一些初步结果令人鼓舞，但要实现理解与生成的无缝整合，还需取得较大进展。代码和模型都需要进一步打磨和优化，因此我们选择将项目开源。欢迎社区贡献力量，共同完善和发展该项目。如果您有任何建议或发现代码中的问题，请通过 Pull Requests 进行贡献。感谢您的支持和关注！

## 开放协作

我们开源了 Ming-Lite-Uni，以加速向通用人工智能（AGI）迈进，特点包括：
- 📂 完整模型权重与测试代码
- 🧩 模块化架构，方便扩展
- 📊 全面基准测试（对比 GPT-4V、SDXL 等）

*"2025 年 3 月 ChatGPT-4 同步发布图像生成功能，印证了我们关于统一多模态 AI 是下一范式的愿景。"*

## 联系方式

如果在使用本项目过程中需要帮助或遇到问题，请在 GitHub 提交 issue。

## 许可与法律声明

Ming 遵循 [MIT 许可证](../LICENSE)，法律声明见项目根目录下的 [LEGAL.md 文件](../LEGAL.md)。

## 引用

如果您觉得我们的工作对您有帮助，欢迎引用。

```bibtex
@article{Mingunify2025,
    title   = {Ming-Lite-Uni: Advancements in Unified Architecture for Natural Multimodal Interaction},
    author  = {Inclusion AI, Ant Group},
    journal = {arXiv preprint},
    year    = {2025}
}
```