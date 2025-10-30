---
title: "Ming-flash-omni-Preview，千亿参数 MoE，洞察与创造一体的全模态"
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
{{< button href="https://github.com/inclusionAI/Ming" label="GITHUB" external=true >}}   {{< button href="https://arxiv.org/abs/2510.24821" label="ARXIV" external=true >}}  🤗 <a href="https://huggingface.co/inclusionAI/Ming-flash-omni-Preview">Hugging Face</a>｜ 🤖 <a href="https://www.modelscope.cn/models/inclusionAI/Ming-flash-omni-Preview">ModelScope</a> 



全模态 Ming-omni 系列更新！Ming-flash-omni-Preview 是首个参数规模达到千亿的开源全模态大模型。基于 Ling 2.0 的稀疏 MoE 架构，Ming-flash-omni-Preview 总参数 103B， 激活 9B。相比之前很受欢迎的 Ming-lite-omni-1.5，Ming-flash-omni-Preview 在全模态理解和生成能力上均有提升，各模态总体效果达到开源全模态模型的领先水平,  尤其在可控图像生成、流式视频理解、以及语音识别等领域性能表现尤为突出。

![performance](https://mdn.alipayobjects.com/huamei_drbxn1/afts/img/5hflRY595xwAAAAAgBAAAAgADkliAQFr/original)

## 能力一览
### 可控图像生成
针对图像生成这个常见的场景，Ming-flash-omni-Preview 首创生成式分割范式 ，将 “图像分割” 重构为语义保持的编辑任务 (Generative Segmentation-as-Editing)，实现了细粒度的空间语义控制。Ming-flash-omni-Preview 在 GenEval 基准上评测达到 0.90 分，超越所有非强化学习的生成方法，展现出卓越的可控性。
<video src="https://gw.alipayobjects.com/v/huamei_drbxn1/afts/video/cb4mSp1jTwQAAAAAgIAAAAgAfoeUAQBr" width="704px"  controls></video>

### 流式视频理解
用户常有一种想跟 AI 基于现实场景持续对话，并通过 AI 来理解现实场景的需求。Ming-flash-omni-Preview 可以有效实现相关需求。如下图视频所示，Ming-flash-omni-Preview 可实现对流式视频的细粒度理解，看懂视频中的物体和交互，并实时提供相关理解和说明，帮助用户在实际场景中获得支持。
<video src="https://gw.alipayobjects.com/v/huamei_drbxn1/afts/video/n6k6SqtCCqMAAAAAgJAAAAgAfoeUAQBr" width="704px"  controls></video>

### 语音及方言理解
Ming-flash-omni-Preview 可实现上下文感知语音理解 (ContextASR) 和方言识别，在所有 12 个 ContextASR 子任务上全面 SOTA，对湖南话、闽南话、粤语等 15 种中国方言的理解能力大幅增强，对于在听不懂的方言中迷失的用户，能有效的提供翻译和实时理解支持。
<video src="https://gw.alipayobjects.com/v/huamei_drbxn1/afts/video/iEf7QK3W3m4AAAAAgBAAAAgAfoeUAQBr" width="704px"  controls></video>

### 音色克隆
Ming-flash-omni-Preview 的语音生成从离散 tokenizer 升级为连续 tokenizer，显著提升了音色克隆能力，中英文混合发音能力稳定性高，能够有效克隆原本对话的音色到新产生的对话中，seed-tts-zh WER 指标为 0.99，超过 qwen3 omni 和 seed-tts。
<video src="https://gw.alipayobjects.com/v/huamei_drbxn1/afts/video/Ru5dTrMPb30AAAAAgBAAAAgAfoeUAQBr" width="704px"  controls></video>

## 模型架构及能力简介
Ming-flash-omni-Preview 的模型结构图:

![architecture](https://mdn.alipayobjects.com/huamei_drbxn1/afts/img/MdHMSqYQCqAAAAAAVcAAAAgADkliAQFr/fmt.avif)

相比 Ming-lite-omni-1.5, Ming-flash-omni-Preview 主要有以下方面的技术优化:
### 基于稀疏专家架构的全模态训练 
Ming-flash-omni-Preview 将 Ling-Flash-2.0 稀疏 MoE 架构拓展到全模态大模型，基于 Ming-lite-omni 提出的模态级路由实现对各模态分布和路由策略建模，实现各模态的 “大容量、小激活”。通过在 Attention 层引入 VideoRoPE，强化对长视频的时空建模，提升视频交互能力。 另外在训练策略上：
1. 稳定稀疏训练：使用混合专家平衡方案（结合辅助负载均衡损失与路由器偏置更新），确保稀疏 MoE 架构下全模态训练的均匀激活和收敛性；
2. 上下文感知的 ASR 训练范式：语音训练任务上以任务 / 领域信息输入作为解码条件，显著提高专有名词识别和转录一致性。同时引入高质量方言等训练语料，实现对湖南话、闽南话、粤语等 15 种中国方言的识别准确率显著提升。

### 生成式分割编辑一体化
在构建统一多模态模型时，核心挑战在于如何高效融合图像的理解与生成能力。我们的Ming-lite-omni-1.5 通过冻结语言通路，并借助多尺度QueryToken注入层级化语义，从而在保持理解性能的同时，使生成目标能更好地与理解任务融合。这一训练策略虽然提升了稳定性，但由于理解与生成的学习目标本质上存在差异，即使引入层级化语义，那些细粒度的视觉知识（如物体属性和空间关系）仍难以高效迁移到高精度的生成与编辑任务中，进而限制了模型在生成质量和可控性上的提升。

为克服这一瓶颈，Ming-flash-omni-Preview 提出了 “生成式分割即编辑” 的协同训练范式。该范式将图像分割重构为语义保持的编辑任务（例如：“将香蕉涂成紫色”）。相应的设计所提供的关键帮助是：强制统一了理解和生成目标 —— 成功的编辑必须依赖对对象轮廓的精确理解，编辑质量直接为理解提供监督信号。这一范式直接增强了模型的细粒度时空语义控制能力，间接解决了纯文本到图像生成中的组合性问题。

在 GenEval 基准测试中，Ming-flash-omni-Preview 取得了 0.90 分，超越所有领先的非强化学习（non-RL）方法；在 GEdit 基准测试中，在物体删除、物体替换等精准编辑任务上的均分从 6.9 提升至 7.9。这两项结果共同证明：通过“生成式分割即编辑”训练所获得的细粒度时空语义控制能力，不仅显著提升了精准编辑任务的表现，还能够有效泛化到纯文本驱动的图像生成任务中。

### 高效全模态训练架构
训练全模态基础模型面临两大挑战：数据异构性（多模态输入形状不一）和模型异构性（模态专用编码器难以并行）。这些问题导致负载失衡、内存碎片化和流水线气泡，严重拖慢了训练速度。
为解决这些问题，我们在训练 Ming-flash-omni-Preview 模型时基于 Megatron-LM 框架进行了两项关键优化：
1. 序列打包 (Sequence Packing)：解决数据异构性。将变长序列密集打包成定长批次，大幅提升内存利用率和计算密度；
2. 弹性编码器分片 (Flexible Encoder Sharding)：解决模型异构性。扩展 Megatron-LM 支持模态编码器在 DP/PP/TP 上的细粒度分片，消除流水线气泡，实现负载均衡。
这些优化措施使 Ming-flash-omni-Preview 的训练吞吐量比基线提升了一倍。


## 开始使用 Ming-flash-omni-Preview
我们的模型和代码均已开源，欢迎大家试用、反馈和交流：
- GitHub：https://github.com/inclusionAI/Ming  
- Hugging Face:  https://huggingface.co/inclusionAI/Ming-flash-omni-Preview
- ModelScope: https://www.modelscope.cn/models/inclusionAI/Ming-flash-omni-Preview

## 后续规划
这次开放的是 Ming-flash-omni-Preview 版， 当前版本有一些不完善的地方:
1. 视觉文本理解能力，虽然Ming-flash-omni-Preview在全模态模型中效果整体领先，但和SOTA的专用VL大模型仍存在一定差距，我们会继续探索全模态omni模型的效果上限。
2. 语音能力：在语音识别和语音合成整体效果领先，语音多轮对话效果以及高质量的音色克隆是我们下一步的优化重点。
3. 图片生成能力:  模型在 GenEval 基准上取得 0.9分，展现了不错的可控性，并已具备文字生成和编辑能力，但在复杂布局文字渲染与编辑，以及特定IP 角色的生成方面还有待提升。

我们仍在持续优化 Ming-flash-omni-Preview 的使用体验，欢迎通过社区 discussion 讨论或 issue 向我们反馈问题，正式版本会很快跟大家见面。


